import JSONFileFetcher from "./JSONFileFetcher.js";

// import addForm from "./addForm.js";
// import formPage from "./formPage.js";

//display list imports
import listLoader, { createAndAppendElement } from "./listLoader.js";
//----------------------

//import sortingOptions from "./sortingOptions.js";
import sortingOptions, { sortItems, sortOptionsClickHandler } from "./sortingOptions.js";
// import { parse } from "path";
//----------------------
export const list = document.querySelector(".list");
export const list_items = await JSONFileFetcher();
const tempItems = list_items;


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
//Modal Created
const modal = document.getElementById('myModal');
const openModalBtn = document.getElementById('openModal');
const closeBtn = document.getElementsByClassName('close')[0];

function openModal() {
    modal.style.display = 'block';
}
function closeModal() {
    // const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}
function handleSubmit(event) {
    event.preventDefault();

    const existingData = list_items;

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const id = document.getElementById('ID').value;
    const description = document.getElementById('description').value;

    const inputData =
    {
        "firstName": firstName,
        "lastName": lastName,
        "ID": id,
        "description": description
    }

    console.log(inputData);

    existingData.push(inputData);

    const updatedData = JSON.stringify(existingData);
    const parsedData = JSON.parse(updatedData);
    console.log('this is updatedData', updatedData);
    console.log('this is parsedData', parsedData);
    closeModal();
}

openModalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

const form = document.getElementById('myForm');
form.addEventListener('submit', handleSubmit);
//-----------------------------------------------------------




let currentPage = 1;
const itemsPerPage = 4;
function updateList(currentPage) {
    listLoader(list_items, currentPage, itemsPerPage);
    currentPageElement.innerText = currentPage;
}

const paginationContainer = document.querySelector(".pagination-container");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const currentPageElement = paginationContainer.querySelector("pagination-numbers");

console.log('website is fully Loaded');
prevButton.addEventListener("click", () => {
    console.log("previous Button", currentPage);
    if (currentPage > 1) {
        currentPage--;
        console.log("this is previousButton ", currentPage);
        updateList(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(list_items.length / itemsPerPage);
    console.log('next button clicked');
    if (currentPage < totalPages) {
        currentPage++;
        updateList(currentPage);
    }
});

updateList();