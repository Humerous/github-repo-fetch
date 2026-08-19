import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NavBar.module.scss';

const MenuIcon = ({ open }) => (
  <svg
    className={styles.menuIcon}
    viewBox='0 0 48 48'
    aria-hidden='true'
    focusable='false'
  >
    {open ? (
      <>
        <path d='M12 12 36 36M36 12 12 36' />
        <circle cx='12' cy='12' r='2.6' />
        <circle cx='36' cy='12' r='2.6' />
        <circle cx='24' cy='24' r='2.8' />
        <circle cx='12' cy='36' r='2.6' />
        <circle cx='36' cy='36' r='2.6' />
      </>
    ) : (
      <>
        <path d='M12 13H35M12 24H31M12 35H35' />
        <circle cx='9' cy='13' r='2.6' />
        <circle cx='9' cy='24' r='2.6' />
        <circle cx='9' cy='35' r='2.6' />
        <circle className={styles.menuLens} cx='35' cy='24' r='4.7' />
        <path className={styles.menuLens} d='m38.5 27.5 4 4' />
      </>
    )}
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav
        className={`navbar is-dark ${styles.navbar}`}
        role='navigation'
        aria-label='Primary navigation'
      >
        <div className={`navbar-brand ${styles.brandRow}`}>
          <Link href='/' className={`navbar-item ${styles.brand}`} onClick={closeMenu}>
            <img
              className={styles.brandMark}
              src='/brand/icon-mark-dark.svg'
              width='38'
              height='32'
              alt=''
              aria-hidden='true'
            />
            <span className={styles.wordmark}>
              <span>GitHub Repo </span><span className={styles.fetch}>Fetch</span>
            </span>
          </Link>

          <button
            type='button'
            className={styles.menuButton}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls='primary-navigation'
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        <div
          id='primary-navigation'
          className={`navbar-menu ${menuOpen ? 'is-active' : ''}`}
        >
          <div className='navbar-end'>
            <Link
              href='/'
              className={`navbar-item ${styles.navLink} ${router.pathname === '/' ? styles.active : ''}`}
              aria-current={router.pathname === '/' ? 'page' : undefined}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href='/about'
              className={`navbar-item ${styles.navLink} ${router.pathname === '/about' ? styles.active : ''}`}
              aria-current={router.pathname === '/about' ? 'page' : undefined}
              onClick={closeMenu}
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
