import React from 'react';
import Link from 'next/link';
import { FaCode, FaCodeBranch, FaStar } from 'react-icons/fa';
import { buildSearchQuery } from '../helpers/navigation.helper';
import UserAvatar from './user-avatar';
import styles from './Repo-List-Item.module.scss';

const RepoListItem = ({ repo, searchText, language }) => {
  const topics = Array.isArray(repo.topics) ? repo.topics.slice(0, 3) : [];
  const detailsHref = {
    pathname: `/repo/${repo.id}`,
    query: buildSearchQuery(searchText, language),
  };

  return (
    <article className={styles.repoCard}>
      <div className={styles.cardHeader}>
        <UserAvatar user={repo.owner} searchText={searchText} language={language} />
        <span className={styles.language}>
          <FaCode aria-hidden='true' />
          {repo.language || 'Not specified'}
        </span>
      </div>

      <div className={styles.cardBody}>
        <h2 className={styles.repoName}>
          <Link href={detailsHref}>{repo.name}</Link>
        </h2>
        <p className={styles.description}>
          {repo.description || 'No description provided.'}
        </p>

        {topics.length > 0 && (
          <div className={styles.topics} aria-label='Repository topics'>
            {topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.metrics}>
          <span aria-label={`${repo.stargazers_count} stars`}>
            <FaStar aria-hidden='true' />
            {repo.stargazers_count}
          </span>
          <span aria-label={`${repo.forks_count} forks`}>
            <FaCodeBranch aria-hidden='true' />
            {repo.forks_count}
          </span>
        </div>

        <Link href={detailsHref} className={styles.detailsLink}>
          View details →
        </Link>
      </div>
    </article>
  );
};

export default RepoListItem;
