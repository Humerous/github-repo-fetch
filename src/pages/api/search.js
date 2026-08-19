import axios from 'axios';

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

export default async function handler(req, res) {
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  const sort = typeof req.query.sort === 'string' ? req.query.sort : 'stars';
  const order = typeof req.query.order === 'string' ? req.query.order : 'desc';

  if (!q) {
    return res.status(400).json({ message: 'A repository search is required.' });
  }

  try {
    const response = await axios.get('search/repositories', {
      ...axiosConfig,
      params: { q, sort, order },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    const status = error?.response?.status || 500;
    const message = status === 403 || status === 429
      ? 'GitHub request limit reached.'
      : 'Unable to load repositories.';

    return res.status(status).json({ message });
  }
}
