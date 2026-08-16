import React, { useState } from 'react';
import Link from 'next/link';

//<--- NAVBAR FUNCTION --->
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className='navbar is-primary'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-brand'>
        <Link href='/'>
          <a className='navbar-item' onClick={closeMenu}>Github Repository 🗂️</a>
        </Link>
        <button
          type='button'
          className={`navbar-burger burger ${menuOpen ? 'is-active' : ''}`}
          aria-label='menu'
          aria-expanded={menuOpen}
          aria-controls='navbarBasicExample'
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </button>
      </div>

      <div
        id='navbarBasicExample'
        className={`navbar-menu ${menuOpen ? 'is-active' : ''}`}
      >
        <div className='navbar-start'>
          <Link href='/'>
            <a className='navbar-item' onClick={closeMenu}>Home</a>
          </Link>
          <Link href='/about'>
            <a className='navbar-item' onClick={closeMenu}>About</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

//<--- EXPORT FUNCTION --->
export default Navbar;
