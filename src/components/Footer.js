import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.identity}>
        <img
          src='/brand/icon-mark-dark.svg'
          width='34'
          height='29'
          alt=''
          aria-hidden='true'
        />
        <div>
          <p className={styles.brand}>
            GitHub Repo <span>Fetch</span>
          </p>
          <p className={styles.note}>
            Original 2020 project · restored and modernised in 2026.
          </p>
          <p className={styles.studio}>© 2026 Chameleon Unicode Studios</p>
        </div>
      </div>

      <nav
        className={styles.links}
        aria-label='Footer navigation'>
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <a
          href='https://github.com/Humerous/GitHub-Repo-Fetch-mern_nextjs-api-app'
          target='_blank'
          rel='noopener noreferrer'>
          GitHub
        </a>
      </nav>
    </div>
  </footer>
);

export default Footer;
