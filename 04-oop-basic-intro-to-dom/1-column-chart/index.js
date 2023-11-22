export default class ColumnChart {
  constructor(data = [], label = "", link = "", value = 0) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    let element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createChartBodyTemplate() {
    if (!Array.isArray(this.data)) {
      return `<img src='./charts-skeleton.svg'></img>`;
    }
    return this.data
      .map(
        (element) => `<div style="--value: ${element}" data-tooltip="6%"></div>`
      )
      .join("");
  }

  createTemplate() {
    return `<div class="column-chart" style="--chart-height: 50">
      <div class="column-chart__title">
        Total ${this.label}
        <a href="/sales" class="column-chart__link">View all</a>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">344</div>
        <div data-element="body" class="column-chart__chart">
        ${this.createChartBodyTemplate()}
        </div>
      </div>
    </div>`;
  }
}
