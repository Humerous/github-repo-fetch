import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Search from '../components/Search';
import { searchRepos } from '../services/gitHubService';
import RepoList from '../components/Repo-List';
import { getRandomWord } from '../helpers/randomWord.helper';
import styles from './index.module.scss';

//<--- INDEX PAGE FUNCTION--->

const Index = (props) => {
  const [searchText, setSearchText] = useState(props.searchText);
  const [repos, setRepos] = useState(props.repos);
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);

  //<--- SEARCH FUNCTION--->
  const onSearchTextChange = (text) => {
    setSearchText(text);
    if (text) {
      loadRepos(text, language);
    }
  };

  //<--- LANGUAGE CHANGE FUNCTION--->
  const onLanguageChange = (language) => {
    setLanguage(language);
    loadRepos(searchText, language);
  };

  //<--- LOAD REPOS FUNCTION--->
  const loadRepos = async (searchText, language) => {
    setLoading(true);
    const res = await searchRepos(searchText, language);
    if (res && res.data) {
      setLoading(false);
      setRepos(res.data.items);
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.logo} src='/img/study.svg'></img>
      <Search
        searchText={searchText}
        language={language}
        onSearchTextChange={onSearchTextChange}
        onLanguageChange={onLanguageChange}
      />
      <RepoList loading={loading} repos={repos} />
    </div>
  );
};

//<--- EXPORT RANDOM NAME GENERATOR FOR REPOS INPUT FILED --->
export const getServerSideProps = async () => {
  const searchText = getRandomWord();
  const res = await searchRepos(searchText);

  return {
    props: {
      searchText: searchText,
      repos: res.data.items,
    },
  };
};

//<--- EXPORT FUNCTIONS --->
export default Index;
