import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getProfile } from '../../services/gitHubService';
import { buildResultsHref, getQueryValue } from '../../helpers/navigation.helper';
import ButtonLink from '../../components/shared/button-link';
import styles from './Profile.module.scss';

const Profile = ({ profile, searchText, language }) => {
  const backHref = buildResultsHref(searchText, language);
  const displayName = profile.name || profile.login;

  return (
    <>
      <Head>
        <title>{displayName} | GitHub Repo Fetch</title>
      </Head>

      <article className={styles.page}>
        <Link href={backHref} className={styles.backLink}>← Back to results</Link>

        <header className={styles.profileHeader}>
          <Image
            className={styles.avatar}
            src={profile.avatar_url}
            alt={`${profile.login} GitHub avatar`}
            width={96}
            height={96}
            priority
          />
          <div>
            <p className={styles.username}>@{profile.login}</p>
            <h1 className={styles.name}>{displayName}</h1>
          </div>
        </header>

        {profile.bio && <p className={styles.bio}>{profile.bio}</p>}
        {profile.location && <p className={styles.location}>{profile.location}</p>}

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricValue}>{profile.followers.toLocaleString('en-US')}</span>
            <span className={styles.metricLabel}>Followers</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricValue}>{profile.following.toLocaleString('en-US')}</span>
            <span className={styles.metricLabel}>Following</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricValue}>{profile.public_repos.toLocaleString('en-US')}</span>
            <span className={styles.metricLabel}>Public repositories</span>
          </div>
        </div>

        <ButtonLink
          href={profile.html_url}
          text='View GitHub Profile'
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
    const response = await getProfile(getQueryValue(query.id));

    return {
      props: {
        profile: response.data,
        searchText: getQueryValue(query.q),
        language: getQueryValue(query.language),
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default Profile;
