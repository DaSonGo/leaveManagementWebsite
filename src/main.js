import JSONFileFetcher from "./JSONFileFetcher.js";
//import sortingOptions from "./sortingOptions.js";
import addForm from "./addForm.js";
import formPage from "./formPage.js";
// import displayList from "./displayList.js";
//import listLoader from "./listLoader.js";
const list = document.querySelector(".list");

const list_items = await JSONFileFetcher();
// console.log("these are list items", list_items);
// let sorter = false;

// function createItemElement() {
//   let item_element = document.createElement("div");
//   item_element.classList.add("list-item");
// }

// function displayList(array = []) {
//   list.innerHTML = "";
//   console.log("in displayList");
//   for (let i = 0; i < array.length; i++) {
//     let item = array[i];

//     let item_element = document.createElement("div");
//     item_element.classList.add("list-item");

//     let firstName = document.createElement("div");
//     firstName.classList.add("item-firstName");
//     firstName.innerText = item.firstName;

//     item_element.appendChild(firstName);

//     let lastName = document.createElement("div");
//     lastName.classList.add("item-lastName");
//     lastName.innerText = item.lastName;

//     item_element.appendChild(lastName);

//     let ID = document.createElement("div");
//     ID.classList.add("item-ID");
//     ID.innerText = item.ID;

//     item_element.appendChild(ID);

//     let date = document.createElement("div");
//     date.classList.add("item-date");
//     date.innerText = item.date;

//     item_element.appendChild(date);

//     let status = document.createElement("div");
//     status.classList.add("item-status");
//     status.innerText = item.status;

//     item_element.appendChild(status);

//     list.appendChild(item_element);
//     console.log("List  displayed!");
//   }
// }
function createAndAppendElement(parentElement, elementType, className, textContent) {
  const element = document.createElement(elementType);
  element.classList.add(className);
  element.innerText = textContent;
  parentElement.appendChild(element);
}
function listLoader(array = []) {

  list.innerHTML = "";
  console.log("in displayList");

  for (let i = 0; i < array.length; i++) {
    let item = array[i];

    let item_element = document.createElement("div");
    item_element.classList.add("list-item");

    createAndAppendElement(item_element, 'div', 'item-firstName', item.firstName);
    createAndAppendElement(item_element, 'div', 'item-lastName', item.lastName);
    createAndAppendElement(item_element, 'div', 'item-ID', item.ID);
    createAndAppendElement(item_element, 'div', 'item-date', item.date);
    createAndAppendElement(item_element, 'div', 'item-status', item.status);

    list.appendChild(item_element);
    console.log("List displayed!");
  }
}
listLoader(list_items);
