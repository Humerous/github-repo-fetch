import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { buildSearchQuery } from '../helpers/navigation.helper';
import styles from './user-avatar.module.scss';

const UserAvatar = ({ user, searchText = '', language = '' }) => {
  if (!user) {
    return null;
  }

  const query = buildSearchQuery(searchText, language);
  const href = {
    pathname: `/profile/${user.login}`,
    query,
  };

  return (
    <div className={styles.user}>
      <Link href={href} className={styles.avatarLink} aria-label={`View ${user.login} profile`}>
        <Image
          className={styles.avatar}
          src={user.avatar_url}
          alt={`${user.login} GitHub avatar`}
          width={36}
          height={36}
        />
      </Link>
      <Link href={href} className={styles.userLink}>
        {user.login}
      </Link>
    </div>
  );
};

export default UserAvatar;
