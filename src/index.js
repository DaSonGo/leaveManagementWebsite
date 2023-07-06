
import JSONFileFetcher from "./JSONFileFetcher.js";

// import addForm from "./addForm.js";
// import formPage from "./formPage.js";

//display list imports
import listLoader, { createAndAppendElement } from "./listLoader.js";
//----------------------

//import sortingOptions from "./sortingOptions.js";
import sortingOptions, { sortItems, sortOptionsClickHandler } from "./sortingOptions.js";
//----------------------
export const list = document.querySelector(".list");
export const list_items = await JSONFileFetcher();

const sort_first_name_btn = document.querySelector(".sort-first-name");
const sort_last_name_btn = document.querySelector(".sort-last-name");
const sort_ID_btn = document.querySelector(".sort-ID");
const sort_date_btn = document.querySelector(".sort-date");
const sort_status_btn = document.querySelector(".sort-status");

sort_first_name_btn.addEventListener('click', () => sortOptionsClickHandler("sort-first-name", sort_first_name_btn));
sort_last_name_btn.addEventListener('click', () => sortOptionsClickHandler("sort-last-name", sort_last_name_btn));
sort_ID_btn.addEventListener('click', () => sortOptionsClickHandler("sort-ID", sort_ID_btn));
sort_date_btn.addEventListener('click', () => sortOptionsClickHandler("sort-date", sort_date_btn));
sort_status_btn.addEventListener('click', () => sortOptionsClickHandler("sort-status", sort_status_btn));


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

    console.log('this is event: ', event);

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const id = document.getElementById('ID').value;
    const description = document.getElementById('description').value;

    // console.log('First Name:', firstName);
    // console.log('Last Name: ', lastName);
    // console.log('ID:', id);
    // console.log('Description:', description);

    const inputData = [
        {
            "firstName": firstName,
            "lastName": lastName,
            "ID": id,
            "description": description
        }
    ]
    console.log(list_items);
    console.log(inputData);

    const convertedData = JSON.stringify(inputData);


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

listLoader(list_items);