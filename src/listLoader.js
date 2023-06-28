import JSONFileFetcher from "./JSONFileFetcher.js";

export const list_items = await JSONFileFetcher();

function createAndAppendElement(parentElement, elementType, className, textContent) {
  const element = document.createElement(elementType);
  element.classList.add(className);
  element.innerText = textContent;
  parentElement.appendChild(element);
}
function listLoader(array = []) {
  const list = document.querySelector("list");
  list.innerHTML = "";
  console.log("in displayList");

  for (let i = 0; i < array.length; i++) {
    let item = array[i];

    let item_element = document.createElement("div");
    item_element.classList.add("list-item");

    createAndAppendElement(item_element, "div", "item-firstName", item.firstName);
    createAndAppendElement(item_element, "div", "item-lastName", item.lastName);
    createAndAppendElement(item_element, "div", "item-ID", item.ID);
    createAndAppendElement(item_element, "div", "item-date", item.date);
    createAndAppendElement(item_element, "div", "item-status", item.status);

    list.appendChild(item_element);
    console.log("List displayed!");
  }
}
export default listLoader;
