import React from 'react';
import TextInput from './shared/text-input';
import Select from './shared/select';
import LANGUAGES from '../constants/languages.constant';
import styles from './Search.module.scss';

const Search = ({ language, searchText, onSearchTextChange, onLanguageChange }) => {
  const languages = [{ value: '', label: 'All languages' }, ...LANGUAGES];

  return (
    <form className={styles.search} role='search' onSubmit={(event) => event.preventDefault()}>
      <TextInput
        id='repo-search'
        className={styles.searchInput}
        label='Repository search'
        value={searchText}
        placeholder='Search repositories'
        onChange={onSearchTextChange}
      />
      <Select
        id='language-filter'
        className={styles.languageSelect}
        label='Language'
        value={language}
        options={languages}
        onChange={onLanguageChange}
      />
    </form>
  );
};

export default Search;
