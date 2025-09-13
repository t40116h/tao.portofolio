import Footer from '@/components/ui/footer';
import Header from '@/components/ui/header';
import styles from './layout.module.scss';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
