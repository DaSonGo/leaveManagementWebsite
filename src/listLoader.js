import JSONFileFetcher from "./JSONFileFetcher.js";
import { list, updateList } from "./index.js";


export const list_items = await JSONFileFetcher();
// export const list = document.querySelector("list");
console.log("this is listloader list_items", list_items);
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

    createAndAppendElement(item_element, "div", "item-firstName", item.firstName);
    createAndAppendElement(item_element, "div", "item-lastName", item.lastName);
    createAndAppendElement(item_element, "div", "item-start-date", item.startDate);
    createAndAppendElement(item_element, "div", "item-end-date", item.endDate);
    createAndAppendElement(item_element, "div", "item-status", item.status);
    createAndAppendElement(item_element, "div", "item-reason", item.reason);

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => openEditModal(item.ID));
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
  const item = list_items.find(item => item.ID === id);
  if (!item) return;
  // const stringifiedEditStartDate = JSON.parse(JSON.stringify(item.startDate));
  const stringifiedEditStartDate = item.startDate;
  // const stringifiedEditEndDate = JSON.parse(JSON.stringify(item.endDate));
  const stringifiedEditEndDate = item.endDate;
  // const stringifiedReason = JSON.parse(JSON.stringify(item.reason));
  const stringifiedReason = item.reason;
  selectedId = id;

  console.log(id, list_items);
  console.log('this is listLoader existing item', item);
  console.log('this is listLoader item-id', item.ID);
  console.log('this is dropDownList', item.reason);
  console.log("this is selectedID", selectedId);

  document.getElementById('editFirstName').value = item.firstName;
  document.getElementById('editLastName').value = item.lastName;
  document.getElementById('editID').value = item.ID;
  document.getElementById('editLeaveDropDown').value = lookup.get(lookup.get(stringifiedReason));
  document.getElementById('editDescription').value = item.description;
  document.getElementById('editStartDate').value = stringifiedEditStartDate;
  document.getElementById('editEndDate').value = stringifiedEditEndDate;
  document.getElementById('editIndex').value = list_items.findIndex(it => id.ID === selectedId);

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

  const index = list_items.findIndex(item => item.ID === selectedId)

  // if (index >= 0 && index < list_items.length)
  if (index !== -1) {
    list_items[index] = editedData;

    console.log('Updated Data:', list_items);
    console.log('Current index:', index);
    // populateFormFields(index, list_items);
    populateFormFields(ID, list_items);
    // acceptButtonHandler(index, list_items);
    acceptButtonHandler(ID, list_items);
    denyButtonHandler(ID, list_items);
    closeEditModal();
  } else {
    alert('Invalid index');
  }
}

export function acceptButtonHandler(id) {
  const item = list_items.find((item) => item.ID === id)
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
  const item = list_items.find((item) => id === item.ID)
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

export default listLoader;