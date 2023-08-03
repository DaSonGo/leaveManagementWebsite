import JSONFileFetcher from "./JSONFileFetcher.js";
import { list } from "./index.js";

export const list_items = await JSONFileFetcher();
// export const list = document.querySelector("list");
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
  paginatedItems.forEach(item => { //array.length causes the pagination to properly paginate. But causes potential bug/memory leak
    let item_element = document.createElement("div");
    item_element.classList.add("list-item");
    if (item) {
      createAndAppendElement(item_element, "div", "item-firstName", item.firstName);
      createAndAppendElement(item_element, "div", "item-lastName", item.lastName);
      createAndAppendElement(item_element, "div", "item-start-date", item.startDate);
      createAndAppendElement(item_element, "div", "item-end-date", item.endDate);
      createAndAppendElement(item_element, "div", "item-status", item.status);
      createAndAppendElement(item_element, "div", "item-reason", item.reason);
    }


    list.appendChild(item_element);
    console.log("List displayed!");
  })
}
export default listLoader;
