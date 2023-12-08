export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement();
  }

  createElement() {
    const div = document.createElement("div");
    div.setAttribute("data-element", "productsContainer");
    div.classList.add("products-list__container");
    div.innerHTML =
      this.createTableHeaderTemplate() + this.createTableBodyTemplate();
    return div;
  }

  createTableHeaderTemplate() {
    window.onload = function () {
      this.sortOrder = order.firstElementChild?.text;
    };
    const template = this.headerConfig
      .map((item) => {
        if (item.title === "Name") {
          return `
            <div class="sortable-table__cell" data-id=${item.id} data-sortable=${item.sortable} data-order=${this.sortOrder}>
              <span>${item.title}</span>
              <span data-element="arrow" class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
              </span>
          </div>`;
        }
        return `<div class="sortable-table__cell" data-id=${item.id} data-sortable=${item.sortable} data-order=${this.sortOrder}>
      <span>${item.title}</span>
    </div>`;
      })
      .join("");

    return `
    <div data-element="header" class="sortable-table__header sortable-table__row">
        ${template}
    </div>`;
  }

  createTableBodyTemplate() {
    return `<div data-element="body" class="sortable-table__body">
      ${this.createProductMatrixTemplate()}
    </div>`;
  }

  createProductMatrixTemplate() {
    const template = this.headerConfig[0].template;
    return this.data
      .map((item) => {
        return `
          <a href="/products/${item.id}" class="sortable-table__row">
            ${template(item.images)}
            <div class="sortable-table__cell">${item.title}</div>
            <div class="sortable-table__cell">${item.quantity}</div>
            <div class="sortable-table__cell">${item.price}</div>
            <div class="sortable-table__cell">${item.sales}</div>
          </a>`;
      })
      .join("");
  }

  getSortFieldIndex(sortField) {
    let idx = this.headerConfig.map((item, index) => {
      if (item.id == sortField) {
        return index;
      }
    });
    return idx.filter((item) => item);
  }

  getSortType(sortField) {
    let sortType = this.headerConfig.map((item) => {
      if (item.id == sortField) {
        return item.sortType;
      }
    });
    return sortType.filter((item) => item);
  }

  sortByASC(node, idx, isNumeric) {
    return Array.from(node).sort((a, b) => {
      let textA = a.querySelectorAll(".sortable-table__cell")[idx].textContent;
      let textB = b.querySelectorAll(".sortable-table__cell")[idx].textContent;
      return textA.localeCompare(textB, undefined, { numeric: isNumeric });
    });
  }

  sortByDESC(node, idx, isNumeric) {
    return Array.from(node).sort((a, b) => {
      let textA = a.querySelectorAll(".sortable-table__cell")[idx].textContent;
      let textB = b.querySelectorAll(".sortable-table__cell")[idx].textContent;
      return textB.localeCompare(textA, undefined, { numeric: isNumeric });
    });
  }

  sortByOrder(orderValue, node, idx, isNumeric) {
    if (orderValue == "asc") {
      return this.sortByASC(node, idx, isNumeric);
    }
    return this.sortByDESC(node, idx, isNumeric);
  }

  sort(fieldValue, orderValue) {
    const rows = document.querySelectorAll("div.sortable-table__body > a");
    const idx = this.getSortFieldIndex(fieldValue);
    let body = document.querySelector("div.sortable-table__body");
    const isNumeric = this.getSortType(fieldValue) == "number";
    const sorted = this.sortByOrder(orderValue, rows, idx, isNumeric);
    sorted.forEach((item) => body.appendChild(item));
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
