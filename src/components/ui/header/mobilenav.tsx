'use client';

import { ScrambleText } from '@/components/ui/scrambletext';
import styles from './header.module.scss';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <>
      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isOpen ? styles.active : ''}`}>
        <nav className={styles.mobileMenu}>
          {/* Close Button */}
          <button
            className={styles.mobileCloseButton}
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            <ScrambleText shouldScramble={false}>CLOSE</ScrambleText>
          </button>

          {/* Navigation Content */}
          <div className={styles.mobileNavContent}>
            <ul className={styles.mobileNavList}>
              <li>
                <a href="/about" onClick={onClose}>
                  <ScrambleText shouldScramble={false}>About</ScrambleText>
                </a>
              </li>
              <li>
                <a href="/projects" onClick={onClose}>
                  <ScrambleText shouldScramble={false}>Work</ScrambleText>
                </a>
              </li>
              <li>
                <a href="/articles" onClick={onClose}>
                  <ScrambleText shouldScramble={false}>Articles</ScrambleText>
                </a>
              </li>
              <li>
                <a href="/contact" onClick={onClose}>
                  <ScrambleText shouldScramble={false}>Contact</ScrambleText>
                </a>
              </li>
              <li>
                <a href="/social" onClick={onClose}>
                  <ScrambleText shouldScramble={false}>Social</ScrambleText>
                </a>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className={styles.mobileCta}>
            <a href="/contact" onClick={onClose} className={styles.mobileCtaLink}>
              <ScrambleText shouldScramble={false}>let's talk</ScrambleText>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
