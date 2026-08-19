import React from 'react';
import RepoListItem from './Repo-List-Item';
import styles from './Repo-List.module.scss';

const RepoList = ({
  repos,
  loading,
  error,
  onRetry,
  onClearLanguage,
  language,
  searchText,
}) => {
  if (loading) {
    return (
      <div className={styles.repoList} aria-live='polite' aria-label='Loading repositories'>
        <span className={styles.srOnly}>Searching repositories…</span>
        {[0, 1, 2, 3].map((item) => (
          <div className={styles.skeleton} key={item} aria-hidden='true'>
            <span className={styles.skeletonLineSmall} />
            <span className={styles.skeletonLine} />
            <span className={styles.skeletonLine} />
            <span className={styles.skeletonLineShort} />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    const rateLimited = error === 'rate-limit';

    return (
      <div className={styles.state} role='alert'>
        <h2>{rateLimited ? "GitHub's request limit has been reached." : "We couldn't load repositories."}</h2>
        <p>{rateLimited ? 'Please try again shortly.' : 'GitHub may be unavailable. Try the search again.'}</p>
        <button type='button' className='button is-primary' onClick={onRetry}>Try again</button>
      </div>
    );
  }

  if (!searchText?.trim()) {
    return (
      <div className={styles.state}>
        <h2>Search GitHub repositories.</h2>
        <p>Enter a repository name, topic or keyword to get started.</p>
      </div>
    );
  }

  if (!repos || repos.length === 0) {
    return (
      <div className={styles.state}>
        <h2>No repositories found.</h2>
        <p>Try another search term or language.</p>
        {language && (
          <button type='button' className='button is-light' onClick={onClearLanguage}>
            Clear language filter
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.repoList}>
      {repos.map((repo) => (
        <RepoListItem
          key={repo.id}
          repo={repo}
          searchText={searchText}
          language={language}
        />
      ))}
    </div>
  );
};

export default RepoList;
