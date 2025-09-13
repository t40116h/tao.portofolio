'use client';

import { ScrambleText } from '@/components/ui/scrambletext';
import styles from './header.module.scss';

export default function DesktopNav() {
  return (
    <>
      {/* Desktop Navigation */}
      <div className={styles.navCenter}>
        <ul className={styles.navList}>
          <li><a href="/about"><ScrambleText>About</ScrambleText></a></li>
          <li><a href="/projects"><ScrambleText>Work</ScrambleText></a></li>
          <li><a href="/articles"><ScrambleText>Articles</ScrambleText></a></li>
          <li><a href="/contact"><ScrambleText>Contact</ScrambleText></a></li>
          <li><a href="/social"><ScrambleText>Social</ScrambleText></a></li>
        </ul>
      </div>

      {/* Desktop CTA */}
      <div className={styles.navRight}>
        <a href="/contact" className={styles.ctaLink}><ScrambleText>let's talk</ScrambleText></a>
      </div>
    </>
  );
}
