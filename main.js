const list = document.querySelector('.list');
const sort_name_btn = document.querySelector('.sort-name');
const sort_ID_btn = document.querySelector('.sort-ID');
const sort_date_btn = document.querySelector('.sort-date');
const sort_status_btn = document.querySelector('.sort-status');
const add_form_btn = document.querySelector('.add-form');
const remove_form_btn = document.querySelector('.remove-form');

const list_items = [data];

let sorter = false;
function sortNameButton(sorter){
    console.log("sortNameButton", sorter)
    const desc = false;
    let array = sort_array_by(list_items, 'Name', sorter);
    displayList(array);
}
sort_name_btn.addEventListener('click', () => {
    console.log("addEventListener");
    sorter=!sorter;
    console.log("sorter: ", sorter);
    return sortNameButton(sorter)}, false);

function sortIdButton (sorter){
    console.log("sortIdButton", sorter);
    const desc = false;
    let array = sort_array_by(list_items, 'ID', sorter);
    displayList(array);
}
sort_ID_btn.addEventListener('click', () => {
    console.log("addEventListener");
    sorter=!sorter;
    console.log("sorter: ", sorter);
    return sortIdButton(sorter)}, false);


function sortDateButton (sorter){
    console.log("sortDateButton", sorter);
    const desc = false;
    let array = sort_array_by(list_items, 'date', sorter);
    displayList(array);
}


sort_date_btn.addEventListener('click', ()=> {
    console.log("addEventListener");
    sorter=!sorter;
    console.log("sorter: ", sorter);
    return sortDateButton(sorter)}, false);


function sort_array_by(array, sort, desc = false){
    console.log("sort_array_by", array, sort, desc);
    array.sort(function(a,b){
        if (a[sort]<b[sort])return -1;
        if (a[sort]>b[sort])return 1;
        return 0;
    });

    if (desc) array.reverse();
    return array;
}
function displayList(array = []){
    list.innerHTML ="";

    for(let i = 0; i < array.length; i++){
        let item = array[i];

        let item_element  = document.createElement('div');
        item_element.classList.add('list-item');

        let name = document.createElement('div');
        name.classList.add('item-name');
        name.innerText = item.name;

        item_element.appendChild(name);

        let ID = document.createElement('div');
        ID.classList.add('item-ID');
        ID.innerText = item.ID;

        item_element.appendChild(ID);

        let date = document.createElement('div');
        date.classList.add('item-date');
        date.innerText = item.date;

        item_element.appendChild(date);

        let status = document.createElement('div');
        status.classList.add('item-status');
        status.innerText = item.status;

        item_element.appendChild(status);

        list.appendChild(item_element);
    }
}

function createItemDiv(className, innerText) {
    const div = document.createElement('div');
    div.classList.add(className);
    div.innerText = innerText;
    return div;
}

function item() {
    const div = createItemDiv('item', 'This is a new item');
    // additional logic for item function
}

function add_btn(){
    
}
add_form_btn.addEventListener('click', () => {
    console.log("addEventListener");
    console.log("sorter: ", sorter);
    return sortNameButton(sorter)}, false);

window.onload = function(){
    displayList(list_items);
}