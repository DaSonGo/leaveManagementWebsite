
import JSONFileFetcher from "./JSONFileFetcher.js";


import addForm from "./addForm.js";
import formPage from "./formPage.js";
// import displayList from "./displayList.js";
import { createAndAppendElement } from "./listLoader.js";
import listLoader from "./listLoader.js";
//import sortingOptions from "./sortingOptions.js";

export const list = document.querySelector(".list");
const list_items = await JSONFileFetcher();

const SORT_OPTIONS = [
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


const sort_first_name_btn = document.querySelector(".sort-first-name");
const sort_last_name_btn = document.querySelector(".sort-last-name");
const sort_ID_btn = document.querySelector(".sort-ID");
const sort_date_btn = document.querySelector(".sort-date");
const sort_status_btn = document.querySelector(".sort-status");

let sorter = false;

function sortOptionsClickHandler(property, buttonElement) {
  // console.log(`handleSortButtonClick: ${property}`, buttonElement);

  // if (property == ".sort-first-name") { property = "firstName"; }
  // if (property == ".sort-last-name") { property = "lastName"; }
  // if (property == ".sort-ID") { property = "ID"; }
  // if (property == ".sort-date") { property = "date"; }
  // if (property == ".sort-status") { property = "status"; }
  // console.log(property);
  const sorter = SORT_OPTIONS.find((sort) => {
    return property === sort.sortKey && sort.sortBy;
  })

  // sortItems(property);
  sortItems(sorter.sortBy);
}
function sort_array_by(array, sort) {
  // console.log("sort_array_by_before", array, sort);
  const sortByContainer = _.sortBy(array, (obj) => {
    return obj[sort];
  });

  return sortByContainer;
}
function sortItems(property) {
  console.log("sortItem running: ", property);
  let array = sort_array_by(list_items, property);
  listLoader(array);
}

sort_first_name_btn.addEventListener('click', () => sortOptionsClickHandler("sort-first-name", sort_first_name_btn));
sort_last_name_btn.addEventListener('click', () => sortOptionsClickHandler("sort-last-name", sort_last_name_btn));
sort_ID_btn.addEventListener('click', () => sortOptionsClickHandler("sort-ID", sort_ID_btn));
sort_date_btn.addEventListener('click', () => sortOptionsClickHandler("sort-date", sort_date_btn));
sort_status_btn.addEventListener('click', () => sortOptionsClickHandler("sort-status", sort_status_btn));


function sort_array_by_first_name() {
  const sortByFirstName = _.sortBy(list_items, (obj) => obj.firstName);
  return sortByFirstName;
}


// listLoader(sort_array_by_first_name());


listLoader(list_items);