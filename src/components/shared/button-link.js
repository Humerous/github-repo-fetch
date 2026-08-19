import React from 'react';
import Link from 'next/link';
import styles from './button-link.module.scss';

const ButtonLink = ({ href, text, type = 'primary', target, external }) => {
  const types = {
    primary: 'is-primary',
    dark: 'is-dark',
    light: 'is-light',
  };
  const buttonClass = `button ${types[type] || types.primary}`;

  if (external) {
    return (
      <div className={styles.button}>
        <a
          className={buttonClass}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          href={href}
        >
          {text}
        </a>
      </div>
    );
  }

  return (
    <div className={styles.button}>
      <Link href={href} className={buttonClass} target={target}>
        {text}
      </Link>
    </div>
  );
};

export default ButtonLink;
