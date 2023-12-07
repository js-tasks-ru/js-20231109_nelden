export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement();
    this.sortType = this.getSortType();
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


  getSortFieldIndex(sortField) {
    let idx = this.headerConfig.map((item, index) => {
      if (item.id == sortField) {
        return index;
      }});
    return idx.filter((item) => item); 
  }


  getSortType(sortField) {
    let sortType = this.headerConfig.map((item) => {
      if (item.id == sortField) {
        return item.sortType;
      }
      return sortType.filter((item) => item);
    });
  }

  sortByASC(node, idx) {
    return Array.from(node).sort((a, b) => {
      let textA = a.querySelectorAll('.sortable-table__cell')[idx].textContent;
      let textB = b.querySelectorAll('.sortable-table__cell')[idx].textContent;
      return textA.localeCompare(textB);
    });
  }

  sortByDESC(node, idx) {
    return Array.from(node).sort((a, b) => {
      let textA = a.querySelectorAll('.sortable-table__cell')[idx].textContent;
      let textB = b.querySelectorAll('.sortable-table__cell')[idx].textContent;
      return textB.localeCompare(textA);
    });
  }


  sortByOrder(orderValue, node, idx) {
    if (orderValue == 'asc') {
      return this.sortByASC(node, idx);
    }
    return this.sortByDESC(node, idx);
  }


  sort(fieldValue, orderValue) {
    const rows = document.querySelectorAll('div.sortable-table__body > a');
    const idx = this.getSortFieldIndex(fieldValue);
    let body = document.querySelectorAll('div.sortable-table__body')[0];
    const sorted = this.sortByOrder(orderValue, rows, idx);
    sorted.forEach(item => body.appendChild(item));
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
