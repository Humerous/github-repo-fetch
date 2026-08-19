import axios from 'axios';

let activeController = null;

async function axiosGetCancellable(url, config = {}) {
  if (activeController) {
    activeController.abort();
  }

  activeController = new AbortController();

  try {
    return await axios.get(url, {
      ...config,
      signal: activeController.signal,
    });
  } catch (error) {
    if (error.code === 'ERR_CANCELED' || error.name === 'CanceledError') {
      return null;
    }

    throw error;
  }
}

export { axiosGetCancellable };
