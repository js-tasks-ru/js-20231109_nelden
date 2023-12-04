export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement();
    this.sortField = document
      .getElementById("field")
      .querySelector("[selected]")
      .getAttribute("value");
    this.sort(this.sortValue, this.sortOrder);
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
    this.sortOrder = document
      .getElementById("order")
      .querySelector("[selected]")
      .getAttribute("value");
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
    return this.data
      .map((item) => {
        return `
          <a href="/products/${item.id}" class="sortable-table__row">
            ${this.headerConfig[0].template(item.images)}
            <div class="sortable-table__cell">${item.title}</div>
            <div class="sortable-table__cell">${item.quantity}</div>
            <div class="sortable-table__cell">${item.price}</div>
            <div class="sortable-table__cell">${item.sales}</div>
          </a>`;
      })
      .join("");
  }

  updateSortOrder() {}

  sort(fieldValue, orderValue) {
    const rows = document.querySelectorAll(".sortable-table__row");
    let rowsArray = Array.from(rows);

    rowsArray.sort(function (a, b) {
      let cellA = a.querySelectorAll(".sortable-table__cell")[2].innerText;
      let cellB = b.querySelectorAll(".sortable-table__cell")[2].innerText;
      return cellA.localeCompare(cellB, ["ru"]);
    });

    const container = document.querySelector(".sortable-table__body");
    rowsArray.forEach(function (row) {
      container.appendChild(row);
    });
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
