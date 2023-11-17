import JSONFileFetcher from "./JSONFileFetcher.js";
import apiDataFetcher from "./apiDataFetcher.js";
import { addAbsence, API_URL } from "./apiDataPoster.js";

// import addForm from "./addForm.js";
import { openEditModal, closeEditModal, populateFormFields, editHandleSubmit, acceptButtonHandler, denyButtonHandler, formatDate } from './listLoader.js';

// import formPage from "./formPage.js";

//display list imports
import listLoader, { createAndAppendElement } from "./listLoader.js";
//----------------------

//import sortingOptions from "./sortingOptions.js";
import sortingOptions, { sortItems, sortOptionsClickHandler } from "./sortingOptions.js";

//----------------------
export const list = document.querySelector(".list");
export const list_items = await JSONFileFetcher();
let existingData = list_items;

export const apiData = await apiDataFetcher();
console.log("This is API Data", apiData);


const sort_first_name_btn = document.querySelector(".sort-first-name");
const sort_last_name_btn = document.querySelector(".sort-last-name");
const sort_ID_btn = document.querySelector(".sort-ID");
const sort_date_btn = document.querySelector(".sort-date");
const sort_status_btn = document.querySelector(".sort-status");


const sortDropDown = document.getElementById('sortDropDown');

sortDropDown.addEventListener('change', function () {
    const selectedOption = sortDropDown.value;

    switch (selectedOption) {
        case 'sort-first-name':
            sortOptionsClickHandler("sort-first-name", sort_first_name_btn);
            break;

        case 'sort-last-name':
            sortOptionsClickHandler("sort-last-name", sort_last_name_btn);
            break;

        case 'sort-ID':
            sortOptionsClickHandler("sort-ID", sort_ID_btn);
            break;
        case 'sort-date':
            sortOptionsClickHandler("sort-date", sort_date_btn);
            break;
        case 'sort-status':
            sortOptionsClickHandler("sort-status", sort_status_btn);
            break;
        default:
            break;
    }
});

//-------------------------------------------------------------
//Modal Created && Add Form Button

const addModal = document.getElementById('addModal');
const startDatePickerInput = document.getElementById('addStartDate');
const endDatePickerInput = document.getElementById('addEndDate');

function flatPickrInit() {
    flatpickr(startDatePickerInput, {
        dateFormat: "m/d/y"
    });

    flatpickr(endDatePickerInput, {
        dateFormat: "m/d/y"
    })
}
function openAddModal() {
    addModal.style.display = 'block';
}
function closeAddModal() {
    // const modal = document.getElementById('myModal');
    addModal.style.display = 'none';
}

let idCounter = 0;
async function addHandleSubmit(event) {
    event.preventDefault();

    const existingData = apiData;

    const startDatePickerValue = startDatePickerInput.value;
    const endDatePickerValue = endDatePickerInput.value

    const parsedStartDate = new Date(startDatePickerValue);
    const parsedEndDate = new Date(endDatePickerValue);
    console.log("this is parsed Data", parsedStartDate);
    console.log("this is parsed Data", parsedEndDate)

    const isoStartDate = parsedStartDate.toISOString();
    const isoEndDate = parsedEndDate.toISOString();

    const firstName = document.getElementById('addFirstName').value;
    const lastName = document.getElementById('addLastName').value;
    const leaveDropDown = document.getElementById('addLeaveDropDown').value;
    const description = document.getElementById('addDescription').value;
    const apiPeriodStartDate = isoStartDate;
    const apiPeriodEndDate = isoEndDate;
    let reason = document.getElementById('addLeaveDropDown').value;

    const uniqueID = `${Date.now()}_${idCounter}`;
    idCounter++;
    let defaultStatus = 'pending'

    if (reason === "sick-leave") {
        reason = "Sick Leave";
    } else if (reason === "annual-leave") {
        reason = "Annual Leave";
    }


    const inputData =
    {
        "id": uniqueID,
        "status": defaultStatus,
        "firstName": firstName,
        "lastName": lastName,
        "leaveDropDown": leaveDropDown,
        "description": description,
        "periodStartDate": apiPeriodStartDate,
        "periodEndDate": apiPeriodEndDate,
        "type": reason
    }
    console.log(inputData);

    let response;
    console.log('this is response before try block', response)
    try {
        response = await addAbsence(API_URL, inputData);
        console.log("API RESPONSE in try block", response);
    } catch (error) {
        console.error('Error during API request:', error);
        console.log('Response text:', await response.text()); // Log the response text
        throw error;
    }



    // existingData.push(inputData);

    // const updatedData = JSON.stringify(existingData);
    // const parsedData = JSON.parse(updatedData);
    // console.log("this is parsedData", parsedData);

    closeAddModal();
}

flatPickrInit();
const openAddModalBtn = document.getElementById('openAddModal');
const closeAddBtn = document.getElementsByClassName('closeAddModal')[0];

openAddModalBtn.addEventListener('click', openAddModal);
closeAddBtn.addEventListener('click', closeAddModal);
window.addEventListener('click', function (event) {
    if (event.target === addModal) {
        closeAddModal();
    }
});

const addForm = document.getElementById('addForm');
addForm.addEventListener('submit', addHandleSubmit);



//-----------------------------------------------------------
//Edit Modal Created

const openEditModalBtn = document.getElementById('openEditModal');
const closeEditBtn = document.querySelector('.closeEditModal');
const editForm = document.getElementById('editForm');
const approveEditModalBtn = document.getElementById('editApprove');
const denyEditModalBtn = document.getElementById('editDeny');



openEditModalBtn.addEventListener('click', () => openEditModal()); // Open edit modal for the first item

closeEditBtn.addEventListener('click', closeEditModal);
window.addEventListener('click', function (event) {
    if (event.target === editModal) {
        closeEditModal();
    }
});
editForm.addEventListener('submit', editHandleSubmit);

approveEditModalBtn.addEventListener('click', () => {
    acceptButtonHandler();
});

denyEditModalBtn.addEventListener('click', () => {
    denyButtonHandler();
});


//-----------------------------------------------------------
//Pagination Completed
const paginationContainer = document.querySelector(".pagination-container");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const currentPageElement = paginationContainer.querySelector(".pagination-numbers");

let currentPage = 1;
const itemsPerPage = 6;

export function updateList(currentPage) {
    listLoader(apiData, currentPage, itemsPerPage);
}
function createPaginationNumbers(totalPages) {
    // const paginationNumbersDiv = document.createElement('div');
    // paginationNumbersDiv.classList.add("pagination-numbers");
    const paginationNumbersContainer = document.querySelector(".pagination-numbers");

    for (let i = 1; i <= totalPages; i++) {
        const pageNumberButton = document.createElement("button");
        pageNumberButton.innerText = i;
        pageNumberButton.addEventListener("click", () => {
            currentPage = i;
            updateList(currentPage);
        });

        paginationNumbersContainer.appendChild(pageNumberButton);
    }
    // paginationNumbersContainer.appendChild(list);
    return;
}

const totalPages = Math.ceil(apiData.length / itemsPerPage);
createPaginationNumbers(totalPages);



prevButton.addEventListener("click", () => {
    console.log("previous Button", currentPage);
    if (currentPage > 1) {
        currentPage--;
        console.log("this is previousButton ", currentPage);
        updateList(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(apiData.length / itemsPerPage);
    console.log('next button clicked');
    if (currentPage < totalPages) {
        currentPage++;
        updateList(currentPage);
    }
});


//-----------------------------------------------------------
//Search-bar Creation

const searchInput = document.getElementById('searchInput')

function search() {
    const searchTerm = searchInput.value.toLowerCase()
    const startDateFormat = formatDate(apiData.periodStartDate);
    const endDateFormat = formatDate(apiData.periodEndDate);

    const filteredResults = apiData.filter(item =>
        item.firstName.toLowerCase().includes(searchTerm) ||
        item.lastName.toLowerCase().includes(searchTerm) ||
        item._id.includes(searchTerm) ||
        startDateFormat.toLowerCase().includes(searchTerm) ||
        endDateFormat.toLowerCase().includes(searchTerm) ||
        item.status.toLowerCase().includes(searchTerm)
    );

    listLoader(filteredResults);
}



function debounce(func, delay) {
    let timeoutID;
    return function () {
        const context = this;
        const args = arguments
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => search.apply(context, args), delay);
    };
}

const debouncedSearch = debounce(search, 300);

searchInput.addEventListener("input", debouncedSearch);


//-----------------------------------------------------------
//Remove Button

// function remove_btn(index) {
//     let modifiableData = apiData;

//     if (Array.isArray(modifiableData) && index >= 0 && index < modifiableData.length) {
//         modifiableData.splice(index, 1);

//         updateList(modifiableData);
//     }
// }
// remove_btn();
updateList();