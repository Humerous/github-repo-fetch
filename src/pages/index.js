import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Search from '../components/Search';
import RepoList from '../components/Repo-List';
import { getQueryValue } from '../helpers/navigation.helper';
import { getSearchErrorType, searchRepos } from '../services/gitHubService';
import styles from './index.module.scss';

const Index = (props) => {
  const [searchText, setSearchText] = useState(props.searchText);
  const [repos, setRepos] = useState(props.repos);
  const [language, setLanguage] = useState(props.language);
  const [totalCount, setTotalCount] = useState(props.totalCount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(props.initialError);
  const searchTimer = useRef(null);

  useEffect(() => () => clearTimeout(searchTimer.current), []);

  const loadRepos = async (nextSearchText, nextLanguage) => {
    const cleanSearch = nextSearchText.trim();

    if (!cleanSearch) {
      setRepos([]);
      setTotalCount(0);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchRepos(cleanSearch, nextLanguage);

      if (response?.data) {
        setRepos(response.data.items || []);
        setTotalCount(response.data.total_count || 0);
      }
    } catch (requestError) {
      setRepos([]);
      setTotalCount(0);
      setError(getSearchErrorType(requestError));
    } finally {
      setLoading(false);
    }
  };

  const onSearchTextChange = (text) => {
    setSearchText(text);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => loadRepos(text, language), 350);
  };

  const onLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
    loadRepos(searchText, nextLanguage);
  };

  const clearLanguage = () => {
    setLanguage('');
    loadRepos(searchText, '');
  };

  return (
    <>
      <Head>
        <title>GitHub Repo Fetch</title>
      </Head>

      <div className={styles.container}>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>GitHub repository discovery</p>
            <h1>Find repositories worth exploring.</h1>
            <p className={styles.heroCopy}>
              Search GitHub repositories, filter by language, inspect repository details and explore the people behind the code.
            </p>
          </div>
          <div className={styles.heroVisual}>
            <Image
              className={styles.heroArtwork}
              src='/brand/hero-repo-discovery.svg'
              alt='Repository search, Git nodes and repository metadata illustrated in the GitHub Repo Fetch visual style.'
              width={760}
              height={470}
              priority
            />
          </div>
        </section>

        <Search
          searchText={searchText}
          language={language}
          onSearchTextChange={onSearchTextChange}
          onLanguageChange={onLanguageChange}
        />

        <section className={styles.resultsSection} aria-labelledby='results-heading'>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Repository results</p>
              <h2 id='results-heading'>Explore repositories</h2>
            </div>
            {searchText.trim() && (
              <p className={styles.resultCount}>
                {totalCount.toLocaleString('en-US')} {totalCount === 1 ? 'result' : 'results'}
              </p>
            )}
          </div>

          <RepoList
            loading={loading}
            repos={repos}
            error={error}
            onRetry={() => loadRepos(searchText, language)}
            onClearLanguage={clearLanguage}
            language={language}
            searchText={searchText}
          />
        </section>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const requestedSearch = getQueryValue(query.q).trim();
  const language = getQueryValue(query.language);
  const searchText = requestedSearch;

  if (!searchText) {
    return {
      props: {
        searchText: '',
        language,
        repos: [],
        totalCount: 0,
        initialError: null,
      },
    };
  }

  try {
    const response = await searchRepos(searchText, language);

    return {
      props: {
        searchText,
        language,
        repos: response.data.items || [],
        totalCount: response.data.total_count || 0,
        initialError: null,
      },
    };
  } catch (error) {
    return {
      props: {
        searchText,
        language,
        repos: [],
        totalCount: 0,
        initialError: getSearchErrorType(error),
      },
    };
  }
};

export default Index;
