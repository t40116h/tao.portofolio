import { AnimatedBrandIcon } from '@/components/ui/badge';
import styles from './about.module.scss';

export default function AboutPage() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContent}>
        <h1 className={styles.aboutTitle}>About</h1>

        <div className={styles.badgeContainer}>
          <AnimatedBrandIcon />
        </div>

        <div className={styles.aboutText}>
          <p>I'm a developer exploring the evolving landscape of technology with curiosity and care. My journey involves continuous learning and experimentation, always seeking to understand how these tools can create meaningful solutions.</p>
          <p>I approach technology with humility, recognizing that the field is constantly evolving. When I'm not coding, you'll find me exploring new concepts or enjoying a thoughtful moment while pondering the next challenge.</p>
          <p>Based in Ciamis, West Java, Indonesia.</p>
        </div>
      </div>
    </section>
  );
}
