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
console.log("displayList imported.");
export default displayList();
