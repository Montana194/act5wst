const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL || '/api/v1'
).replace(/\/$/, '');

async function fetchCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('The API returned an invalid response.');
  }

  if (Array.isArray(result)) return result;
  if (result && Array.isArray(result.data)) return result.data;
  throw new Error('The API response did not contain a list of records.');
}

export { fetchCollection };
