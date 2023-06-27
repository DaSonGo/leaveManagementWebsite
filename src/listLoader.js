import JSONFileFetcher from "./JSONFileFetcher.js";

const fileString = JSON.stringify(JSONFileFetcher);
function listLoader() {
  const list_items = [fileString];
}

export default listLoader;
