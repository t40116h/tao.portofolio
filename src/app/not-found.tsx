import Link from 'next/link';
import { ScrambleText } from '@/components/ui/scrambletext';
import styles from './notfound.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>
            <ScrambleText>Page Not Found</ScrambleText>
          </h2>
          <p className={styles.description}>
            <ScrambleText>The page you&apos;re looking for doesn&apos;t exist or has been moved.</ScrambleText>
          </p>
          <Link href="/" className={styles.homeLink}>
            <ScrambleText>Return Home</ScrambleText>
          </Link>
        </div>
      </div>
    </div>
  );
}
