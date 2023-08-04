import JSONFileFetcher from "./JSONFileFetcher.js";
import { list } from "./index.js";

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
    editButton.addEventListener("click", () => openEditModal(item));
    item_element.appendChild(editButton);


    list.appendChild(item_element);
    console.log("List displayed!");
  }
}

//----------------------------------------------------------
// const existingData = list_items;
const editModal = document.getElementById('editModal');
const startDatePickerInput = document.getElementById('startDate');
const endDatePickerInput = document.getElementById('endDate');

function flatPickrInit() {
  flatpickr(startDatePickerInput, {
    dateFormat: "m/d/y"
  });

  flatpickr(endDatePickerInput, {
    dateFormat: "m/d/y"
  })
}
export function populateFormFields(index, list_items) {
  console.log('this is listLoader existing Data', list_items);
  document.getElementById('firstName').value = list_items[index].firstName;
  document.getElementById('lastName').value = list_items[index].lastName;
  document.getElementById('leaveDropDown').value = list_items[index].leaveDropDown;
  document.getElementById('description').value = list_items[index].description;
  document.getElementById('startDate').value = list_items[index].startDatePickerInput;
  document.getElementById('endDate').value = list_items[index].endDatePickerInput;
  document.getElementById('editIndex').value = index;
}


export function openEditModal(index) {
  populateFormFields(index);
  editModal.style.display = 'block';
}

export function closeEditModal() {
  editModal.style.display = 'block';
}
export function editHandleSubmit(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const leaveDropDown = document.getElementById('leaveDropDown').value;
  const description = document.getElementById('description').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  const editedData = {
    "firstName": firstName,
    "lastName": lastName,
    "leaveDropDown": leaveDropDown,
    "description": description,
    "startDate": startDate,
    "endDate": endDate
  };

  const index = parseInt(document.getElementById('editIndex').value);

  if (index >= 0 && index < list_items.length) {
    list_items[index] = editedData;

    console.log('Updated Data:', list_items);
    populateFormFields(index, list_items);
    closeEditModal();
  } else {
    alert('Invalid index');
  }
}


flatPickrInit();

export default listLoader;
