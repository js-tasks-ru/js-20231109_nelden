export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement();
    this.sortValue = document.querySelectorAll("[selected]")[0].text;
    this.sortOrder = document.querySelectorAll("[selected]")[1].text;
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
    const div = this.headerConfig
      .map(
        (item) =>
          `
    <div class="sortable-table__cell" data-id=${item.id} data-sortable=${item.sortable} data-order=${this.sortOrder}>
      <span>${item.title}</span>
    </div>`
      )
      .join("");
    return `
    <div data-element="header" class="sortable-table__header sortable-table__row">
        ${div}
    </div>`;
  }

  createTableBodyTemplate() {
    return `<div data-element="body" class="sortable-table__body">
      ${this.createProductMatrixTemplate()}
    </div>`;
  }

  createProductMatrixTemplate() {
    return this.data.map((item) => {
      return `
          <a href="/products/${item.id}" class="sortable-table__row">
            ${this.headerConfig[0].template(item.images)}
            <div class="sortable-table__cell">${item.title}</div>
            <div class="sortable-table__cell">${item.quantity}</div>
            <div class="sortable-table__cell">${item.price}</div>
            <div class="sortable-table__cell">${item.sales}</div>
          </a>`;
    }).join("");
  }

  sort(fieldValue, orderValue) {}

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
