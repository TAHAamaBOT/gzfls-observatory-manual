import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

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

function Feature({icon, title, description, to}) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={clsx('feature-card', styles.featureCard)}>
        <span className="feature-icon">{icon}</span>
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
