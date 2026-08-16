import axios from 'axios';
import { axiosGetCancellable } from '../helpers/axios.helper';
//<--- API LINK TO GITHUB AND INFO --->
const axiosConfig = {
  baseURL: 'https://api.github.com/',
  auth: {
    username: process.env.GITHUB_CLIENT_ID,
    password: process.env.GITHUB_CLIENT_SECRET,
  },
};

//<--- SEARCH REPOS AND CODING LANGUAGES --->
function searchRepos(searchText, language) {
  const query = language ? `${searchText}+language:${language}` : searchText;

  if (isServer()) {
    return axios.get(
      `search/repositories?q=${query}&sort=stars&order=desc`,
      axiosConfig
    );
  }

  return axiosGetCancellable(`api/search?q=${query}&sort=stars&order=desc`);
}

//<--- GET REPOS BY Ids  --->
function getRepo(id) {
  return axios.get(`repositories/${id}`, axiosConfig);
}

//<--- GET PROFILE NAME  --->
function getProfile(username) {
  return axios.get(`users/${username}`, axiosConfig);
}

//<--- SERVER WINDOW  --->
function isServer() {
  return typeof window === 'undefined';
}

//<--- EXPORT FUNCTIONS  --->
export { searchRepos, getRepo, getProfile };
