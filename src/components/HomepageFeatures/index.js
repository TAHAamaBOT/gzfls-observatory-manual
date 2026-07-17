/**
 * 首页特性卡片组件
 *
 * 在首页 Hero 下方展示三个导航卡片，引导用户进入核心文档区域：
 *   1. 天文理论   → /docs/theory/celestial-coordinates
 *   2. 设备手册   → /docs/equipment/list
 *   3. N.I.N.A. 文档 → /docs/NINA
 *
 * 样式分离：
 *   - custom.css (.feature-card .feature-icon)  全局视觉样式（背景、边框、阴影、hover 动效）
 *   - styles.module.css (.features)  局部布局样式（flex 容器）
 *
 * 依赖：
 *   - clsx                    拼接多个 CSS 类名
 *   - @docusaurus/Link        SPA 导航链接（客户端路由，不刷新页面）
 *   - @theme/Heading          语义化标题（自动生成锚点 ID）
 */

import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/**
 * 特性卡片数据
 *
 * 每个卡片包含：
 *   - title       : 卡片标题
 *   - icon        : Emoji 图标（纯装饰，通过 aria-hidden 对屏幕阅读器隐藏）
 *   - description : 卡片描述文字（JSX，支持换行）
 *   - to          : 点击后的导航目标路径
 */
const FeatureList = [
  {
    title: '天文理论',
    icon: '🔭',
    description: (
      <>
        从天球坐标系到天体力学，系统学习天文理论基础。
        涵盖坐标系、时间系统、星等内容，为观测实践打下扎实基础。
      </>
    ),
    to: '/docs/theory/celestial-coordinates',
  },
  {
    title: '设备手册',
    icon: '📡',
    description: (
      <>
        望远镜、赤道仪、CCD 相机等观测设备的操作指南与维护手册。
        从入门到进阶，让每一次观测都有备而来。
      </>
    ),
    to: '/docs/equipment/list',
  },
  {
    title: 'N.I.N.A. 文档',
    icon: '🖥️',
    description: (
      <>
        N.I.N.A. 天文摄影自动化软件的中文翻译文档。
        从安装配置到高级序列编排，助你拍出震撼深空照片。
      </>
    ),
    to: '/docs/NINA',
  },
];

/**
 * 单个特性卡片
 *
 * 布局：col--4（Infima 12 列网格，占 4 列 = 1/3 宽度）
 * 类名组合：
 *   - "feature-card"       全局 CSS 类（视觉样式）
 *   - styles.featureCard   CSS Module 类（当前为空，保留用于未来扩展）
 *
 * @param {object}  props
 * @param {string}  props.icon        Emoji 图标
 * @param {string}  props.title       卡片标题
 * @param {JSX}     props.description 卡片描述
 * @param {string}  props.to          导航目标路径
 */
function Feature({icon, title, description, to}) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={clsx('feature-card', styles.featureCard)}>
        <span className="feature-icon" aria-hidden="true">{icon}</span>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
