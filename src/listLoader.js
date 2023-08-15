import JSONFileFetcher from "./JSONFileFetcher.js";
import apiDataFetcher from "./apiDataFetcher.js";
import { list, updateList } from "./index.js";


export const list_items = await JSONFileFetcher();
export const apiData = await apiDataFetcher();
console.log("This is API DATA", apiData);
console.log('API Data end date', apiData[0].periodEndDate)
// export const list = document.querySelector("list");
// console.log("this is listloader list_items", list_items);
export function createAndAppendElement(parentElement, elementType, className, textContent) {
  const element = document.createElement(elementType);
  element.classList.add(className);
  element.innerText = textContent;
  parentElement.appendChild(element);
}

function listLoader(array = [], currentPage = 1, itemsPerPage = 6) {

  list.innerHTML = "";
  console.log("in displayList");

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = array.slice(startIndex, endIndex);

  for (let i = 0; i < itemsPerPage; i++) { //array.length allow the pagination to properly paginate. But causes potential bug/memory leak
    let item = paginatedItems[i];
    let item_element = document.createElement("div");
    item_element.classList.add("list-item");

    const apiStartDate = formatDate(item.periodStartDate);
    const apiEndDate = formatDate(item.periodEndDate);


    createAndAppendElement(item_element, "div", "item-firstName", item.firstName);
    createAndAppendElement(item_element, "div", "item-lastName", item.lastName);
    createAndAppendElement(item_element, "div", "item-period-start-date", apiStartDate);
    createAndAppendElement(item_element, "div", "item-period-end-date", apiEndDate);
    createAndAppendElement(item_element, "div", "item-status", item.status);
    createAndAppendElement(item_element, "div", "item-type", item.type);

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => openEditModal(item._id));
    item_element.appendChild(editButton);


    list.appendChild(item_element);
    console.log("List displayed!");
  }
}

//----------------------------------------------------------
// const existingData = list_items;
const editModal = document.getElementById('editModal');
const startDatePickerInput = document.getElementById('editStartDate');
const endDatePickerInput = document.getElementById('editEndDate');
let selectedId = null;

function flatPickrInit() {
  flatpickr(startDatePickerInput, {
    dateFormat: "m/d/y"
  });

  flatpickr(endDatePickerInput, {
    dateFormat: "m/d/y"
  })
}
export function populateFormFields(id) {
  console.log('populate', id);
  const lookup = new Map();
  lookup.set('Annual Leave', 'annual-leave');
  lookup.set('WFH', 'WFH');
  lookup.set('Sick Leave', 'sick-leave');
  const item = apiData.find(item => item._id === id);
  if (!item) return;


  const stringifiedReason = item.type;
  selectedId = id;

  const apiStartDate = formatDate(item.periodStartDate);
  const apiEndDate = formatDate(item.periodEndDate);


  console.log(id, apiData);
  console.log('this is listLoader existing item', item);
  console.log('this is listLoader item-id', item._id);
  console.log('this is dropDownList', item.type);
  console.log("this is selectedID", selectedId);

  document.getElementById('editFirstName').value = item.firstName;
  document.getElementById('editLastName').value = item.lastName;
  document.getElementById('editID').value = item._id;
  document.getElementById('editLeaveDropDown').value = lookup.get(stringifiedReason);
  document.getElementById('editDescription').value = item.description;
  document.getElementById('editStartDate').value = apiStartDate;
  document.getElementById('editEndDate').value = apiEndDate;
  document.getElementById('editIndex').value = apiData.findIndex(it => id === selectedId);

  console.log("this is startdate", startDatePickerInput);
  console.log("this is end date", endDatePickerInput);
  console.log("this is editIndex", document.getElementById('editIndex').value)
}


export function openEditModal(id) {
  editModal.style.display = 'block';
  populateFormFields(id);
}

export function closeEditModal() {
  editModal.style.display = 'none';
}
export function editHandleSubmit(event) {
  event.preventDefault();

  const firstName = document.getElementById('editFirstName').value;
  const lastName = document.getElementById('editLastName').value;
  const ID = document.getElementById('editID').value;
  const leaveDropDown = document.getElementById('editLeaveDropDown').value;
  const description = document.getElementById('editDescription').value;
  const startDatePickerInput = document.getElementById('editStartDate').value;
  const endDatePickerInput = document.getElementById('editEndDate').value;

  const editedData = {
    "firstName": firstName,
    "lastName": lastName,
    "ID": ID,
    "startDate": startDatePickerInput,
    "endDate": endDatePickerInput,
    "reason": leaveDropDown,
    "description": description,
  };

  const index = apiData.findIndex(item => item.ID === selectedId)
  console.log("this is index", index);
  // if (index >= 0 && index < list_items.length)
  if (index !== -1) {
    apiData[index] = editedData;

    console.log('Updated Data:', apiData);
    console.log('Current index:', index);
    // populateFormFields(index, list_items);
    populateFormFields(ID, apiData);
    // acceptButtonHandler(index, list_items);
    acceptButtonHandler(ID, apiData);
    denyButtonHandler(ID, apiData);

    closeEditModal();
  } else {
    alert('Invalid index');
  }
}

export function acceptButtonHandler(id) {
  const item = apiData.find((item) => item.ID === id)
  console.log("check id", id);
  console.log("Check if data status found", item);
  if (item) {
    item.status = "Approved";

    console.log("Item has been approved:", item);
    console.log('Form with ID ' + item.ID + ' has been approved');
  } else {
    console.log("form not found", id);
  }

}


export function denyButtonHandler(id) {
  const item = apiData.find((item) => id === item.ID)
  console.log("check id", id);
  console.log("Check if data status found", item);
  if (item) {
    item.status = "Deny";

    const denialReason = prompt("Enter reason for denial: ");
    if (denialReason) {
      console.log("Reason for denial: ", denialReason);
    }

    console.log("Item has been Denied:", item);
    console.log('Form with ID ' + item.ID + ' has been denied');
  } else {
    console.log("form not found", id);
  }

}

flatPickrInit();

//----------------------------------------------------------
//Format data functions

function formatDate(dateString) {
  const date = new Date(dateString);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}



export default listLoader;