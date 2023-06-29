import listLoader from "./listLoader";
import { list } from ".main";
const sort_first_name_btn = document.querySelector(".sort-first-name");
const sort_last_name_btn = document.querySelector(".sort-last-name");
const sort_ID_btn = document.querySelector(".sort-ID");
const sort_date_btn = document.querySelector(".sort-date");
const sort_status_btn = document.querySelector(".sort-status");

let sorter = false;

function sortingOptions() {
  const msg = "sortingOptions loaded.";
  console.log(msg);
  return msg;
}

function sortOptionsClickHandler(property, buttonElement) {
  console.log(`handleSortButtonClick: ${property}`, sorter);
  sorter = !sorter;
  console.log("sorter: ", sorter);
  sortItems(property, sorter);
}

function sortItems(property, sorter) {
  let array = sort_array_by(list_items, property, sorter);
  listLoader(array);
}

sort_first_name_btn.addEventListener('click', () => sortOptionsClickHandler("firstName", sort_first_name_btn));
sort_last_name_btn.addEventListener('click', () => sortOptionsClickHandler("lastName", sort_last_name_btn));
sort_ID_btn.addEventListener('click', () => sortOptionsClickHandler("ID", sort_ID_btn));
sort_date_btn.addEventListener('click', () => sortOptionsClickHandler("date", sort_date_btn));
sort_status_btn.addEventListener('click', () => sortOptionsClickHandler("firstName", sort_status_btn));

function sort_array_by(array, sort, desc = false) {
  console.log("sort_array_by", array, sort, desc);
  array.sort(function (a, b) {
    if (a[sort] < b[sort]) return -1;
    if (a[sort] > b[sort]) return 1;
    return 0;
  });

  if (desc) array.reverse();
  return array;
}
export default sortingOptions;
