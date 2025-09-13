import styles from './projects.module.scss';

const projectCategories = [
  {
    name: 'Account Abstraction',
    type: 'infra',
    description: 'Smart contract wallets and account management'
  },
  {
    name: 'Analytics',
    type: 'infra',
    description: 'Data analysis and blockchain insights'
  },
  {
    name: 'Cross-Chain',
    type: 'infra',
    description: 'Interoperability between blockchains'
  },
  {
    name: 'Dev Tooling',
    type: 'infra',
    description: 'Developer tools and frameworks'
  },
  {
    name: 'Gaming Infra',
    type: 'infra',
    description: 'Infrastructure for gaming applications'
  },
  {
    name: 'Identity',
    type: 'infra',
    description: 'Digital identity and verification'
  },
  {
    name: 'Indexer',
    type: 'infra',
    description: 'Blockchain data indexing'
  },
  {
    name: 'Onramp',
    type: 'infra',
    description: 'Fiat to crypto conversion'
  },
  {
    name: 'Oracle',
    type: 'infra',
    description: 'Real-world data for smart contracts'
  },
  {
    name: 'Privacy',
    type: 'infra',
    description: 'Privacy-preserving technologies'
  },
  {
    name: 'RPC',
    type: 'infra',
    description: 'Remote procedure calls for blockchains'
  },
  {
    name: 'Stablecoin',
    type: 'infra',
    description: 'Stable digital currencies'
  },
  {
    name: 'Wallet',
    type: 'infra',
    description: 'Cryptocurrency wallet solutions'
  },
  {
    name: 'Zero-Knowledge',
    type: 'infra',
    description: 'Privacy through zero-knowledge proofs'
  },
  {
    name: 'AI',
    type: 'app',
    description: 'Artificial intelligence applications'
  },
  {
    name: 'DeFi',
    type: 'app',
    description: 'Decentralized finance protocols'
  },
  {
    name: 'DePIN',
    type: 'app',
    description: 'Decentralized physical infrastructure'
  },
  {
    name: 'Gaming',
    type: 'app',
    description: 'Blockchain gaming applications'
  },
  {
    name: 'Governance',
    type: 'app',
    description: 'DAO and governance platforms'
  },
  {
    name: 'NFT',
    type: 'app',
    description: 'Non-fungible token marketplaces'
  },
  {
    name: 'Payments',
    type: 'app',
    description: 'Cryptocurrency payment solutions'
  },
  {
    name: 'Prediction Market',
    type: 'app',
    description: 'Decentralized prediction markets'
  },
  {
    name: 'RWA',
    type: 'app',
    description: 'Real world asset tokenization'
  },
  {
    name: 'Social',
    type: 'app',
    description: 'Decentralized social networks'
  }
];

export default function ProjectsPage() {

  return (
    <section className={styles.projectsSection}>
      <div className={styles.projectsContent}>
        <h1 className={styles.projectsTitle}>Projects</h1>

        <div className={styles.projectsGrid}>
          {projectCategories.map((category) => (
            <div
              key={category.name}
              className={styles.projectItem}
            >
              <span className={styles.borderTop}></span>
              <span className={styles.borderRight}></span>
              <span className={styles.borderBottom}></span>
              <span className={styles.borderLeft}></span>

              {/* Default content */}
              <div className={styles.defaultContent}>
                <div className={styles.itemBody}>
                  <div className={styles.textContainer}>
                    <span className={styles.categoryName}>{category.name}</span>
                    <span className={styles.categoryType}>{category.type}</span>
                  </div>
                </div>
              </div>

              {/* Hover content */}
              <div className={styles.hoverContent}>
                {/* Category name in top-left corner */}
                <div className={styles.categoryNameCorner}>
                  <div className={styles.textContainerSmall}>
                    <span className={styles.categoryNameCornerText}>{category.name}</span>
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

                {/* Simple hint in center */}
                <div className={styles.simpleHint}>
                  SOON
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
