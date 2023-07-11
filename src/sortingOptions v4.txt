import listLoader, { createAndAppendElement } from "./listLoader.js";
import { list_items, list } from "./index.js";

const sortingOptions = [
  {
    sortKey: "sort-first-name",
    sortBy: "firstName",
  },
  {
    sortKey: "sort-last-name",
    sortBy: "lastName",
  },
  {
    sortKey: "sort-ID",
    sortBy: "ID",
  },
  {
    sortKey: "sort-date",
    sortBy: "date",
  },
  {
    sortKey: "sort-status",
    sortBy: "status",
  },
]


export function sortOptionsClickHandler(property, buttonElement) {
  const sorter = sortingOptions.find((sort) => {
    return property === sort.sortKey && sort.sortBy;
  })
  sortItems(sorter.sortBy);
}
function sort_array_by(array, sort) {
  const sortByContainer = _.sortBy(array, (obj) => {
    return obj[sort];
  });

  return sortByContainer;
}
export function sortItems(property) {
  console.log("sortItem running: ", property);
  let array = sort_array_by(list_items, property);
  listLoader(array);
}

// sort_first_name_btn.addEventListener('click', () => sortOptionsClickHandler("sort-first-name", sort_first_name_btn));
// sort_last_name_btn.addEventListener('click', () => sortOptionsClickHandler("sort-last-name", sort_last_name_btn));
// sort_ID_btn.addEventListener('click', () => sortOptionsClickHandler("sort-ID", sort_ID_btn));
// sort_date_btn.addEventListener('click', () => sortOptionsClickHandler("sort-date", sort_date_btn));
// sort_status_btn.addEventListener('click', () => sortOptionsClickHandler("sort-status", sort_status_btn));


export default sortingOptions;
