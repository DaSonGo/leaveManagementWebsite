//This function fetches the JSON data and returns it.
async function JSONFileFetcher() {
  const result = await fetch("./user.json");
  const data = await result.json();
  console.log('data fetched');
  return data.requests;
}

export default JSONFileFetcher;
