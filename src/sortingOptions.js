import listLoader, { createAndAppendElement } from "./listLoader.js";
import { list_items, list } from "./index.js";
import apiDataFetcher from "./apiDataFetcher.js";
export const apiData = await apiDataFetcher();

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
    console.log('this is sorting property', property);
    return property === sort.sortKey && sort.sortBy;
  })
  sortItems(sorter.sortBy);
}
function sort_array_by(array, sort) {
  const sortByContainer = _.sortBy(array, (obj) => {
    if (sort === 'status') {
      const statusCheck = obj.status;
      console.log('this is StatusCheck', statusCheck);

      if (statusCheck === 'pending') {
        return -1;
      } else if (statusCheck === 'deny') {
        return 1;
      } else {
        return 0;
      }
    }

    if (sort === 'date') {
      const dateCheck = obj.date;
      console.log('this is dateCheck', dateCheck);
      const sortByContainer = -new Date(dateCheck);
      return sortByContainer;
    }

    return obj[sort];
  });


  return sortByContainer;
}
export function sortItems(property) {
  console.log("sortItem running: ", property);
  let array = sort_array_by(apiData, property);
  listLoader(array);
}

// sort_first_name_btn.addEventListener('click', () => sortOptionsClickHandler("sort-first-name", sort_first_name_btn));
// sort_last_name_btn.addEventListener('click', () => sortOptionsClickHandler("sort-last-name", sort_last_name_btn));
// sort_ID_btn.addEventListener('click', () => sortOptionsClickHandler("sort-ID", sort_ID_btn));
// sort_date_btn.addEventListener('click', () => sortOptionsClickHandler("sort-date", sort_date_btn));
// sort_status_btn.addEventListener('click', () => sortOptionsClickHandler("sort-status", sort_status_btn));


export default sortingOptions;
