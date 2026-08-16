import React from 'react';
import { getRepo } from '../../services/gitHubService';
import styles from './Repo.module.scss';
import ButtonLink from '../../components/shared/button-link';
import UserAvatar from '../../components/user-avatar';

//<--- REPOS IDS FUNCTIONS FOR THE CARDS --->
const Repo = ({ repo }) => {
  return (
    <div>
      <ButtonLink href='/' text='Back' />

      <div className={styles.header}>
        <span>{repo.name}</span>
      </div>
      <UserAvatar user={repo.owner}></UserAvatar>
      <div className={styles.description}>{repo.description}</div>
      <div className={styles.language}>{repo.language}</div>

      <ButtonLink
        href={repo.html_url}
        text='View on Github'
        type='dark'
        target='_blank'
        external
      />
    </div>
  );
};

//<--- SERVER SIDE PROPS FUNCTIONS --->
export const getServerSideProps = async ({ query }) => {
  const res = await getRepo(query.id);
  return {
    props: { repo: res.data },
  };
};

//<--- EXPORT FUNCTIONS --->
export default Repo;
