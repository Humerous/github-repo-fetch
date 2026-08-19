function getQueryValue(value) {
  if (Array.isArray(value)) {
    return value[0] || '';
  }

  return value || '';
}

function buildSearchQuery(searchText, language) {
  const query = {};

  if (searchText) {
    query.q = searchText;
  }

  if (language) {
    query.language = language;
  }

  return query;
}

function buildResultsHref(searchText, language) {
  const query = buildSearchQuery(searchText, language);

  if (Object.keys(query).length === 0) {
    return '/';
  }

  return { pathname: '/', query };
}

export { buildResultsHref, buildSearchQuery, getQueryValue };
