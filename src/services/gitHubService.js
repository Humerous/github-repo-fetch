import axios from 'axios';
import { axiosGetCancellable } from '../helpers/axios.helper';

function getGitHubHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

const axiosConfig = {
  baseURL: 'https://api.github.com/',
  headers: getGitHubHeaders(),
};

function buildSearchQuery(searchText, language) {
  return [searchText.trim(), language ? `language:${language}` : '']
    .filter(Boolean)
    .join(' ');
}

function searchRepos(searchText, language) {
  const q = buildSearchQuery(searchText, language);
  const params = { q, sort: 'stars', order: 'desc' };

  if (isServer()) {
    return axios.get('search/repositories', {
      ...axiosConfig,
      params,
    });
  }

  return axiosGetCancellable('/api/search', { params });
}

function getRepo(id) {
  return axios.get(`repositories/${id}`, axiosConfig);
}

function getProfile(username) {
  return axios.get(`users/${username}`, axiosConfig);
}

function getSearchErrorType(error) {
  const status = error?.response?.status;
  return status === 403 || status === 429 ? 'rate-limit' : 'error';
}

function isServer() {
  return typeof window === 'undefined';
}

export { getProfile, getRepo, getSearchErrorType, searchRepos };
