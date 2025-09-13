import styles from './social.module.scss';

const socialPlatforms = [
  {
    name: 'GitHub',
    icon: 'github',
    url: 'https://github.com/T40116H'
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    url: 'N/A'
  },
  {
    name: 'X',
    icon: 'x',
    url: 'https://x.com/T40116H'
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://instagram.com/tao.labs'
  },
  {
    name: 'Discord',
    icon: 'discord',
    url: 'https://discord.com/T40116H'
  },
  {
    name: 'Telegram',
    icon: 'telegram',
    url: 'https://t.me/T40116H'
  }
];

export default function SocialPage() {
  return (
    <section className={styles.socialSection}>
      <div className={styles.socialContent}>
        <h1 className={styles.socialTitle}>Social</h1>

        <div className={styles.socialGrid}>
          {socialPlatforms.map((platform) => {
            const isLinkedInNA = platform.name === 'LinkedIn' && platform.url === 'N/A';

            return isLinkedInNA ? (
              <div
                key={platform.name}
                className={styles.socialItem}
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
                aria-label={`${platform.name} - Not Available`}
              >
                <span className={styles.borderTop}></span>
                <span className={styles.borderRight}></span>
                <span className={styles.borderBottom}></span>
                <span className={styles.borderLeft}></span>

                {/* Default content */}
                <div className={styles.defaultContent}>
                  <div className={styles.itemBody}>
                    <div className={styles.textContainer}>
                      <span className={styles.platformText}>{platform.name}</span>
                    </div>
                  </div>
                </div>

                {/* Hover content */}
                <div className={styles.hoverContent}>
                  {/* Platform name in top-left corner */}
                  <div className={styles.platformNameCorner}>
                    <div className={styles.textContainerSmall}>
                      <span className={styles.platformTextSmall}>{platform.name}</span>
                    </div>
                  </div>

                  {/* N/A hint in center */}
                  <div className={styles.visitHint}>
                    N/A
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialItem}
                aria-label={`Visit ${platform.name}`}
              >
                <span className={styles.borderTop}></span>
                <span className={styles.borderRight}></span>
                <span className={styles.borderBottom}></span>
                <span className={styles.borderLeft}></span>

                {/* Default content */}
                <div className={styles.defaultContent}>
                  <div className={styles.itemBody}>
                    <div className={styles.textContainer}>
                      <span className={styles.platformText}>{platform.name}</span>
                    </div>
                  </div>
                </div>

                {/* Hover content */}
                <div className={styles.hoverContent}>
                  {/* Platform name in top-left corner */}
                  <div className={styles.platformNameCorner}>
                    <div className={styles.textContainerSmall}>
                      <span className={styles.platformTextSmall}>{platform.name}</span>
                    </div>
                  </div>

                  {/* Arrow in top-right corner */}
                  <span className={styles.arrowIcon} aria-hidden>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 7H17V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  {/* Visit hint in center */}
                  <div className={styles.visitHint}>
                    View
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
