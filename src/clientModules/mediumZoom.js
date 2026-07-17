/**
 * Docusaurus 客户端模块 — 图片点击放大（Lightbox）
 *
 * 利用 medium-zoom 库为文档中的图片提供点击放大灯箱效果。
 * 通过 Docusaurus 的 clientModules 机制自动加载，无需手动引入。
 *
 * 依赖：
 *   - medium-zoom       提供图片放大的核心功能（缩放、背景遮罩、手势）
 *   - medium-zoom/dist/style.css  默认样式（过渡动画）
 *
 * 生命周期：
 *   1. 模块加载时（顶层代码）：不执行任何操作，仅定义函数
 *   2. 首次渲染 / 路由切换时：Docusaurus 调用 onRouteDidUpdate()
 *      延迟 100ms 后挂载 mediumZoom 到页面上所有匹配的图片元素
 *
 * 设计要点：
 *   - 懒初始化（Lazy Init）：mediumZoom 实例在首次 attach 时才创建，
 *     避免 SSR 期间访问 window 导致构建报错
 *   - 幂等挂载：每次路由切换先 detach() 再 attach()，避免重复绑定
 *   - 延迟 100ms：等待 React 完成 DOM 渲染后再挂载
 */

import mediumZoom from 'medium-zoom';
import 'medium-zoom/dist/style.css';

// CSS 选择器：匹配文档内容中的图片，排除标记了 data-zoom-disabled 的图片
const selector = '.markdown img:not([data-zoom-disabled]), article img:not([data-zoom-disabled])';

// mediumZoom 实例（懒初始化 — 首次调用 getZoom() 时才创建）
// 不能直接在模块顶层创建，因为 mediumZoom 构造函数会访问 window，
// 而 Docusaurus SSR 构建时 window 不可用
let zoom = null;

/**
 * 获取或创建 mediumZoom 单例实例
 * @returns {mediumZoom.Zoom} mediumZoom 实例
 */
function getZoom() {
  if (!zoom) {
    zoom = mediumZoom({
      background: 'rgba(0, 0, 0, 0.88)', // 半透明黑色遮罩
      margin: 24,                          // 图片与视口边缘的间距
    });
  }
  return zoom;
}

/**
 * 将 mediumZoom 挂载到当前页面匹配的图片元素上
 * 先解除旧绑定（detach），再重新绑定（attach），确保导航后图片正确绑定
 */
function attachZoom() {
  getZoom().detach();           // 解除上一页图片的绑定
  getZoom().attach(selector);    // 绑定当前页图片
}

/**
 * Docusaurus 路由生命周期钩子
 *
 * 在以下时机被 Docusaurus 调用：
 *   - 首次加载：previousLocation 为 undefined → !previousLocation 为 true → 执行
 *   - 路由切换：pathname 变化 → 执行
 *   - 同一页面内 hash 跳转：pathname 不变 → 跳过（无需重新挂载）
 *
 * @param {object}   location         当前路由的 location 对象
 * @param {object}   previousLocation 上一个路由的 location 对象（首次加载时为 undefined）
 */
export function onRouteDidUpdate({location, previousLocation}) {
  if (!previousLocation || location.pathname !== previousLocation.pathname) {
    // 延迟 100ms 等待 React 提交 DOM 更新后再挂载 zoom
    setTimeout(attachZoom, 100);
  }
}
