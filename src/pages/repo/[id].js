import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getRepo } from '../../services/gitHubService';
import { buildResultsHref, getQueryValue } from '../../helpers/navigation.helper';
import ButtonLink from '../../components/shared/button-link';
import UserAvatar from '../../components/user-avatar';
import styles from './Repo.module.scss';

const Repo = ({ repo, searchText, language }) => {
  const topics = Array.isArray(repo.topics) ? repo.topics.slice(0, 6) : [];
  const backHref = buildResultsHref(searchText, language);

  return (
    <>
      <Head>
        <title>{repo.name} | GitHub Repo Fetch</title>
      </Head>

      <article className={styles.page}>
        <Link href={backHref} className={styles.backLink}>← Back to results</Link>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Repository</p>
          <h1>{repo.name}</h1>
        </header>

        <div className={styles.owner}>
          <UserAvatar user={repo.owner} searchText={searchText} language={language} />
        </div>

        <p className={styles.description}>{repo.description || 'No description provided.'}</p>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Language</span>
            <span className={styles.metricValue}>{repo.language || 'Not specified'}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Stars</span>
            <span className={styles.metricValue}>{repo.stargazers_count.toLocaleString('en-US')}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Forks</span>
            <span className={styles.metricValue}>{repo.forks_count.toLocaleString('en-US')}</span>
          </div>
        </div>

        {topics.length > 0 && (
          <div className={styles.topics} aria-label='Repository topics'>
            {topics.map((topic) => <span key={topic}>{topic}</span>)}
          </div>
        )}

        <ButtonLink
          href={repo.html_url}
          text='View on GitHub'
          type='dark'
          target='_blank'
          external
        />
      </article>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  try {
    const response = await getRepo(getQueryValue(query.id));

    return {
      props: {
        repo: response.data,
        searchText: getQueryValue(query.q),
        language: getQueryValue(query.language),
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Repo;
