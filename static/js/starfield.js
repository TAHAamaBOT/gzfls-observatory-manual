/**
 * 星空背景动画 — 基于 Canvas 的动态星空效果
 *
 * 在页面最底层创建一个全屏 <canvas> 元素，绘制以下内容：
 *   1. 随机分布的 120 颗闪烁星星（模拟夜空）
 *   2. 近距离星星之间的半透明连线（模拟星座）
 *   3. 鼠标附近的径向光晕（交互反馈）
 *
 * 加载方式：
 *   - 通过 docusaurus.config.js 的 scripts 配置以 defer 方式加载
 *   - defer 确保脚本在 DOM 解析完成后、DOMContentLoaded 之前执行
 *   - 不阻塞页面渲染（非关键路径资源）
 *
 * 依赖：无外部库，仅使用浏览器原生 Canvas 2D API
 *
 * 性能策略：
 *   - Canvas 位于 z-index: 0，不阻挡页面交互（pointer-events: none）
 *   - resize 事件使用 requestAnimationFrame 节流，避免拖拽窗口时的计算风暴
 *   - 缩放窗口时星星按比例保持相对位置，消除视觉跳变
 *   - 尊重用户 prefers-reduced-motion 偏好，匹配时跳过动画
 */

(function () {
  'use strict';

  // ===== 配置常量 =====
  const STAR_COUNT = 120;          // 星星总数
  const MAX_LINE_DIST = 120;       // 星座连线最大距离（px），超过此距离不连线
  const LINE_OPACITY = 0.18;       // 连线基础透明度
  const TWINKLE_SPEED = 0.008;     // 闪烁速度（值越大越快，控制 sin 波的频率）

  // ===== 模块状态 =====
  let canvas, ctx;                 // Canvas 元素及 2D 绘图上下文
  let stars = [];                 // 星星数据数组 [{x, y, r, baseAlpha, phase, speed}, ...]
  let cachedLines = [];           // 预计算的星座连线 [{i, j, dist}, ...]，星星位置不变时复用
  let animationId;                // requestAnimationFrame 返回的动画帧 ID
  let currentTheme = 'light';     // 当前主题（'light' | 'dark'），影响星星颜色
  let width, height;              // Canvas 实际像素尺寸（跟随视口）
  let mouseX = -1, mouseY = -1;     // 鼠标坐标（初始 -1，加载时不显示光晕）

  /**
   * 生成或更新星星数据
   *
   * 两种模式：
   *   1. 首次创建（无参数）：在 Canvas 范围内随机撒 120 颗星
   *   2. 窗口缩放（传入旧尺寸）：按比例缩放现有星星坐标，
   *      保持它们在画面中的相对位置不变，避免视觉跳变
   *
   * 每颗星星的属性：
   *   - x, y       : 像素坐标
   *   - r          : 半径（0.4 ~ 2.0 px），影响亮度和是否有核心光晕
   *   - baseAlpha  : 基础透明度（0.3 ~ 1.0），控制星星的亮暗
   *   - phase      : 闪烁相位（0 ~ 2π），使不同星星异步闪烁
   *   - speed      : 闪烁速度倍率（0.5 ~ 1.5 × TWINKLE_SPEED）
   *
   * @param {number} [oldWidth]  缩放前的 Canvas 宽度
   * @param {number} [oldHeight] 缩放前的 Canvas 高度
   */
  function createStars(oldWidth, oldHeight) {
    if (oldWidth && oldHeight && stars.length > 0) {
      // 模式 2：按比例缩放现有星星坐标
      const scaleX = width / oldWidth;
      const scaleY = height / oldHeight;
      stars.forEach((s) => {
        s.x = Math.min(width, s.x * scaleX);
        s.y = Math.min(height, s.y * scaleY);
      });
    } else {
      // 模式 1：首次全量随机生成
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.4 + Math.random() * 1.6,
          baseAlpha: 0.3 + Math.random() * 0.7,
          phase: Math.random() * Math.PI * 2,
          speed: TWINKLE_SPEED * (0.5 + Math.random()),
        });
      }
    }
    computeLines();  // 星星位置改变后重新计算连线缓存
  }

  /**
   * 预计算星座连线数据
   *
   * 星星位置在帧间是静态的（仅在 resize 时改变），因此 O(n²) 距离
   * 计算只需执行一次并缓存结果。每帧 draw() 直接遍历 cachedLines
   * 绘制连线，跳过重复的 Math.sqrt 计算。
   *
   * cachedLines 结构：[{i, j, dist}, ...]
   *   - i, j  : stars 数组索引
   *   - dist  : 两星之间的欧几里得距离
   */
  function computeLines() {
    cachedLines = [];
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_LINE_DIST) {
          cachedLines.push({ i, j, dist });
        }
      }
    }
  }

  /**
   * 获取当前主题对应的颜色方案
   *
   * 返回 RGB 分量字符串（不含 rgb() 包裹），方便在 rgba() 中复用：
   *   - star: 星星的颜色分量
   *   - line: 星座连线的颜色分量
   *   - bg  : Canvas 背景色
   *
   * 浅色模式：深蓝紫星星 + 蓝灰连线 + 透明背景（融入页面底色）
   * 深色模式：纯白星星 + 淡蓝连线 + 深色背景
   *
   * @returns {{star: string, line: string, bg: string}} 颜色方案
   */
  function getColors() {
    if (currentTheme === 'dark') {
      return {
        star: '255, 255, 255',        // 纯白
        line: '180, 200, 255',        // 淡蓝
        bg: '#0a0a1a',
      };
    }
    return {
      star: '60, 70, 140',            // 深蓝紫
      line: '100, 120, 180',          // 蓝灰
      bg: 'transparent',              // 透明，让页面背景透出
    };
  }

  /**
   * 更新 Canvas 尺寸以匹配视口大小
   *
   * Canvas 的 width/height 属性控制其像素分辨率，必须与 CSS 尺寸同步
   * 才能避免图像模糊。此处直接读取 window.innerWidth/Height 设置像素尺寸。
   *
   * @returns {{oldWidth: number, oldHeight: number}} 缩放前的尺寸，供 createStars 做比例缩放
   */
  function resize() {
    const oldWidth = width;
    const oldHeight = height;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;             // 像素级同步，避免模糊
    canvas.height = height;
    return { oldWidth, oldHeight };
  }

  /**
   * 动画主循环 — 每帧清除画布并重绘全部内容
   *
   * 绘制顺序（从底到顶）：
   *   1. 清空画布
   *   2. 绘制 120 颗闪烁星星（alpha 由 sin 波驱动，异步闪烁）
   *   3. 较大星星（r > 1.2）额外绘制明亮核心
   *   4. 绘制近距离星星之间的半透明连线（距离越近越亮）
   *   5. 绘制鼠标周围的径向光晕
   *   6. 通过 requestAnimationFrame 递归调度下一帧
   *
   * 闪烁算法：
   *   alpha = baseAlpha × (0.6 + 0.4 × sin(timestamp × speed + phase))
   *   sin 波在 [0.6-0.4, 0.6+0.4] = [0.2, 1.0] × baseAlpha 之间正弦振荡
   *
   * @param {number} timestamp requestAnimationFrame 传入的高精度时间戳（毫秒）
   */
  function draw(timestamp) {
    const colors = getColors();
    ctx.clearRect(0, 0, width, height);

    // --- 绘制星星 ---
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      // 通过 sin 波驱动透明度在 baseAlpha 的 0.2~1.0 倍之间振荡
      const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(timestamp * s.speed + s.phase));

      // 星星主体
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors.star},${Math.max(0.08, alpha)})`;
      ctx.fill();

      // 较大星星的明亮核心（让亮星看起来更有层次）
      if (s.r > 1.2) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.star},${Math.min(1, alpha * 1.4)})`;
        ctx.fill();
      }
    }

    // --- 绘制星座连线 ---
    // 使用预计算的 cachedLines，避免每帧 O(n²) 距离计算
    for (let k = 0; k < cachedLines.length; k++) {
      const { i, j, dist } = cachedLines[k];
      // 连线透明度随距离线性衰减：越近越亮
      const lineAlpha = LINE_OPACITY * (1 - dist / MAX_LINE_DIST);
      ctx.beginPath();
      ctx.moveTo(stars[i].x, stars[i].y);
      ctx.lineTo(stars[j].x, stars[j].y);
      ctx.strokeStyle = `rgba(${colors.line},${lineAlpha})`;
      ctx.lineWidth = 0.4;
      ctx.stroke();
    }

    // --- 鼠标光晕 ---
    // 以鼠标为中心绘制径向渐变光晕，半径 160px
    if (mouseX >= 0 && mouseY >= 0 && mouseX < width && mouseY < height) {
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 160);
      gradient.addColorStop(0, `rgba(${colors.star},0.06)`);
      gradient.addColorStop(1, `rgba(${colors.star},0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(mouseX - 160, mouseY - 160, 320, 320);
    }

    // 递归调度下一帧（无限循环，直到页面卸载）
    animationId = requestAnimationFrame(draw);
  }

  /**
   * 检测当前 Docusaurus 主题模式
   *
   * Docusaurus 在 <html> 元素上设置 data-theme 属性来标记主题：
   *   - data-theme="dark"  → 深色模式
   *   - 其他 / 不存在      → 浅色模式
   *
   * @returns {'dark' | 'light'} 当前主题标识
   */
  function detectTheme() {
    const htmlTheme = document.documentElement.getAttribute('data-theme');
    return htmlTheme === 'dark' ? 'dark' : 'light';
  }

  /**
   * 初始化星空背景
   *
   * 执行流程：
   *   1. 检查 prefers-reduced-motion（无障碍），匹配则跳过全部动画
   *   2. 创建全屏 <canvas> 元素并插入 <body> 最前面（z-index: 0）
   *   3. 获取 2D 绘图上下文
   *   4. 检测并记录当前主题
   *   5. 设置 Canvas 尺寸、生成星星、启动动画循环
   *   6. 注册 resize / mousemove / theme-change 事件监听
   *
   * Canvas 样式说明：
   *   - position: fixed — 固定定位，不随滚动移动
   *   - z-index: 0    — 位于所有页面内容之下（#__docusaurus 的 z-index 为 1）
   *   - pointer-events: none — 鼠标事件穿透，不阻挡页面交互
   *   - aria-hidden: true   — 对屏幕阅读器隐藏（纯装饰性元素）
   */
  function init() {
    // 尊重用户"减少动效"系统偏好（Windows / macOS / Linux 辅助功能设置）
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      return; // 不渲染星空，节省 GPU 资源
    }

    // 创建 Canvas 元素
    canvas = document.createElement('canvas');
    canvas.id = 'starfield-canvas';
    canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);     // 插入为 body 第一个子元素（最底层）
    ctx = canvas.getContext('2d');

    // 初始化主题、尺寸、星星数据，启动动画
    currentTheme = detectTheme();
    resize();
    createStars();
    animationId = requestAnimationFrame(draw);

    // --- 事件监听 ---

    // 窗口缩放：使用 requestAnimationFrame 节流，避免拖拽窗口时高频触发
    // 同时按比例缩放星星坐标，保持它们在画面中的相对位置不变
    let resizePending = false;
    window.addEventListener('resize', () => {
      if (!resizePending) {
        resizePending = true;
        requestAnimationFrame(() => {
          const { oldWidth, oldHeight } = resize();
          createStars(oldWidth, oldHeight);
          resizePending = false;
        });
      }
    });

    // 鼠标追踪：用于在 draw() 中绘制鼠标附近的径向光晕
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // 主题切换监听：通过 MutationObserver 监听 <html> 的 data-theme 属性变化
    // Docusaurus 切换深/浅色模式时会更新该属性，observer 捕获变化后更新 currentTheme
    const observer = new MutationObserver(() => {
      const newTheme = detectTheme();
      if (newTheme !== currentTheme) {
        currentTheme = newTheme;
        // 无需重绘——下一帧 draw() 会自动读取新 currentTheme 的颜色方案
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }

  /**
   * 启动入口 — 检查 DOM 就绪状态后调用 init()
   *
   * 脚本通过 <script defer> 加载，defer 保证执行时 DOM 已解析完毕。
   * 但仍需检查 readyState：如果脚本因某种原因在 DOM 解析完成后才执行，
   * 则直接调用 init() 而非等待永远不会触发的 DOMContentLoaded。
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
