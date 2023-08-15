//This function fetches the JSON data and returns it.
async function apiDataFetcher() {
  const result = await fetch("https://hr-api-dev.everfit.io/api/public/leave-absence/get-list?limit=15&page=1");
  const data = await result.json();
  return data.data.list;
}

export default apiDataFetcher;
