import { AnimatedBrandIcon } from '@/components/ui/badge';
import { ABOUT_CONTENT } from '@/constants/about';
import styles from './about.module.scss';

export default function AboutPage() {
  return (
    <div className="container">
      <section className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <h1 className={styles.aboutTitle}>{ABOUT_CONTENT.title}</h1>

          <div className={styles.badgeContainer}>
            <AnimatedBrandIcon />
          </div>

          <div className={styles.aboutText}>
            {ABOUT_CONTENT.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
