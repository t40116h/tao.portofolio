import { ScrambleText } from '@/components/ui/scrambletext';
import Link from 'next/link';
import styles from './home.module.scss';

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroPanel}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroGreeting}>Hello, I&apos;m</span>
              <span className={styles.heroName}>Taopik Hidayat</span>
            </h1>
          </div>
        </div>
      </section>

      <section id="about" className={styles.section}>
        <div className={styles.sectionContent}>
          <h3 className={styles.sectionTitle}>About</h3>
          <div className={styles.sectionPanel}>
            <div className={styles.aboutContent}>
              <p>I&apos;m a developer exploring the evolving landscape of AI and Web3 technologies. My journey involves continuous learning and experimentation, always seeking to understand how these tools can create meaningful solutions.</p>
              <p>I approach technology with curiosity and humility, recognizing that the field is constantly evolving. When I&apos;m not coding, you&apos;ll find me sketching ideas, exploring new concepts, or enjoying a thoughtful cup of coffee while pondering the next challenge.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className={styles.section}>
        <div className={styles.sectionContent}>
          <h3 className={styles.sectionTitle}>Work</h3>
          <div className={styles.sectionPanel}>
            <div className={styles.workContent}>
              <p>I&apos;m building projects that reflect my curiosity about technology and its potential to create meaningful change. Each piece represents a step in my learning journey, an experiment in thoughtful development, and an effort to contribute solutions that matter.</p>
              <Link href="/projects" className={styles.seeMoreLink}>
                <ScrambleText>VIEW PROJECTS</ScrambleText>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="articles" className={styles.section}>
        <div className={styles.sectionContent}>
          <h3 className={styles.sectionTitle}>Articles</h3>
          <div className={styles.sectionPanel}>
            <div className={styles.articlesContent}>
              <p>Here I share thoughts and learnings from my journey with technology and creativity. These writings reflect my ongoing exploration of ideas, from practical tutorials to reflections on how technology shapes our world and influences human creativity.</p>
              <Link href="/articles" className={styles.seeMoreLink}>
                <ScrambleText>VIEW ARTICLES</ScrambleText>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={styles.section}>
        <div className={styles.sectionContent}>
          <h3 className={styles.sectionTitle}>Contact</h3>
          <div className={styles.sectionPanel}>
            <div className={styles.contactContent}>
              <p>Have an idea or want to connect? I&apos;d love to hear from you and explore how we might collaborate on something meaningful. Whether it&apos;s technology, creativity, or just sharing perspectives on the world we&apos;re shaping together.</p>
              <Link href="/contact" className={styles.seeMoreLink}>
                <ScrambleText>VIEW CONTACT</ScrambleText>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
