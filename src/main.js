import JSONFileFetcher from "./JSONFileFetcher.js";
import sortingOptions from "./sortingOptions.js";
import addForm from "./addForm.js";
import formPage from "./formPage.js";
// import displayList from "./displayList.js";

const list = document.querySelector(".list");
const myData = document.querySelector(".myData");
const sort_name_btn = document.querySelector(".sort-name");
const sort_ID_btn = document.querySelector(".sort-ID");
const sort_date_btn = document.querySelector(".sort-date");
const sort_status_btn = document.querySelector(".sort-status");
const add_form_btn = document.querySelector(".add-form");
const remove_form_btn = document.querySelector(".remove-form");

//const list_items = [JSON.parse(JSONFileFetcher)];
// JSONFileFetcher();
const list_items = await JSONFileFetcher();
console.log("these are list items", list_items);
let sorter = false;

function createItemElement() {
  let item_element = document.createElement("div");
  item_element.classList.add("list-item");
}

function displayList(array = []) {
  list.innerHTML = "";
  console.log("in displayList");
  for (let i = 0; i < array.length; i++) {
    let item = array[i];

    let item_element = document.createElement("div");
    item_element.classList.add("list-item");

    let firstName = document.createElement("div");
    firstName.classList.add("item-firstName");
    firstName.innerText = item.firstName;

    item_element.appendChild(firstName);

    let lastName = document.createElement("div");
    lastName.classList.add("item-lastName");
    lastName.innerText = item.lastName;

    item_element.appendChild(lastName);

    let ID = document.createElement("div");
    ID.classList.add("item-ID");
    ID.innerText = item.ID;

    item_element.appendChild(ID);

    let date = document.createElement("div");
    date.classList.add("item-date");
    date.innerText = item.date;

    item_element.appendChild(date);

    let status = document.createElement("div");
    status.classList.add("item-status");
    status.innerText = item.status;

    item_element.appendChild(status);

    list.appendChild(item_element);
    console.log("List  displayed!");
  }
}
displayList(list_items);
