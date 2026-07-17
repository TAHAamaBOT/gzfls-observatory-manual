/**
 * 首页组件
 *
 * 页面结构（从上到下）：
 *   1. HomepageHeader  — Hero 横幅区域（标题、副标题、CTA 按钮）
 *   2. HomepageFeatures — 三大特性卡片（天文理论、设备手册、N.I.N.A. 文档）
 *   3. HomeIntro       — 社团介绍区域（关于我们 + 活动亮点）
 *
 * 依赖：
 *   - @docusaurus/Link           Docusaurus SPA 导航 Link 组件
 *   - @docusaurus/useDocusaurusContext  获取 siteConfig（标题、标语等）
 *   - @theme/Layout              Docusaurus 页面布局壳（导航栏 + 页脚）
 *   - @theme/Heading             语义化标题组件（自动生成锚点 ID）
 *   - HomepageFeatures           本地组件（三大特性卡片）
 *   - ./index.module.css         CSS Module（Hero 布局样式）
 */

import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

/**
 * Hero 横幅区域
 *
 * 使用 Docusaurus 内置的 .hero--primary 类作为基础样式（背景、颜色），
 * 叠加 CSS Module 中的 .heroBanner 控制内边距和布局。
 * 背景图片和渐变效果在 custom.css 的 .hero--primary 中定义。
 */
function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--outline button--lg"
            to="/docs">
            开始探索
          </Link>
        </div>
      </div>
    </header>
  );
}

/**
 * 社团介绍区域
 *
 * 展示社团简介文字和四个活动亮点标签（校内观测、校外联谊、学术研究、摄影实践）。
 * 样式在 custom.css 的 .home-intro 区域中定义。
 */
function HomeIntro() {
  return (
    <section className="home-intro">
      <Heading as="h2">关于我们</Heading>
      <p>
        广州外国语学校译星者天文协会（Stellar Decoder）致力于在校园内推广天文科普，
        定期组织天台观星活动，带领社员探索宇宙的奥秘。我们秉持学术严谨与人文关怀并重的理念，
        打造独具特色的广外天文品牌社团。
      </p>
      <div className="intro-highlights">
        <span className="intro-highlight">
          <span className="highlight-dot"></span>
          校内观测
        </span>
        <span className="intro-highlight">
          <span className="highlight-dot"></span>
          校外联谊
        </span>
        <span className="intro-highlight">
          <span className="highlight-dot"></span>
          学术研究
        </span>
        <span className="intro-highlight">
          <span className="highlight-dot"></span>
          摄影实践
        </span>
      </div>
    </section>
  );
}

/**
 * 首页默认导出
 *
 * 组合 HomepageHeader → HomepageFeatures → HomeIntro 三个区域，
 * 包裹在 Docusaurus Layout 中（自动提供导航栏、页脚、SEO meta 标签）。
 */
export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`欢迎来到${siteConfig.title}`}
      description="广州外国语学校译星者天文协会。我们在校内开展天文科普和天台观星，打造学术规范严谨而富有人文关怀的广外品牌社团。">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomeIntro />
      </main>
    </Layout>
  );
}
