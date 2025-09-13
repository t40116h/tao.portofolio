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
            <ScrambleText>The page you're looking for doesn't exist or has been moved.</ScrambleText>
          </p>
          <a href="/" className={styles.homeLink}>
            <ScrambleText>Return Home</ScrambleText>
          </a>
        </div>
      </div>
    </div>
  );
}
