import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

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
