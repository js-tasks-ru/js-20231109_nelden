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
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
    <div class="sortable-table__cell" data-id="images" data-sortable="false" data-order="asc">
      <span>Image</span>
    </div>
    <div class="sortable-table__cell" data-id="title" data-sortable="true" data-order="asc">
      <span>Name</span>
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    </div>
    <div class="sortable-table__cell" data-id="quantity" data-sortable="true" data-order="asc">
      <span>Quantity</span>
    </div>
    <div class="sortable-table__cell" data-id="price" data-sortable="true" data-order="asc">
      <span>Price</span>
    </div>
    <div class="sortable-table__cell" data-id="sales" data-sortable="true" data-order="asc">
      <span>Sales</span>
    </div>
  </div>`;
  }

  createTableBodyTemplate() {
    return `<div data-element="body" class="sortable-table__body">
      ${this.createProductMatrixTemplate()}
    </div>`;
  }

  createProductMatrixTemplate() {
    return this.data.map((item) => {
      const imageUrl = item.images[0].url;
      return `
          <a href="/products/${item.id}" class="sortable-table__row">
            <div class="sortable-table__cell">
              <img class="sortable-table-image" alt="Image" src="${imageUrl}">
            </div>
            <div class="sortable-table__cell">${item.title}</div>
            <div class="sortable-table__cell">${item.quantity}</div>
            <div class="sortable-table__cell">${item.price}</div>
            <div class="sortable-table__cell">${item.sales}</div>
          </a>`;
    });
  }
}
