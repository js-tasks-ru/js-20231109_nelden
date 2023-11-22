export default class ColumnChart {
  constructor(props) {
    this.data = !Array.isArray(props.data) ? 0 : props.data;
    this.total = !Array.isArray(props.data)
      ? 0
      : props.data.reduce((acc, item) => acc + item, 0);
    this.label = props.label == "" ? "" : props.label;
    this.link = props.link;
    this.value = props.value;
    this.element = this.createElement(this.createTemplate());
  }

  createTemplate() {
    return `
    <div id="${this.label}" class="dashboard__chart_${this.label}">
    <div class="column-chart" style="--chart-height: 50">
      <div class="column-chart__title">
        Total ${this.label}
        <a href="/sales" class="column-chart__${this.link}">View all</a>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">
        ${this.value}</div>
        <div data-element="body" class="column-chart__chart">
        ${this.createChartBodyTemplate()}
        </div>
      </div>
    </div>`;
  }

  createElement(template) {
    let element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createChartBodyTemplate() {
    if (this.data == 0) {
      return `<img src='./charts-skeleton.svg'></img>`;
    }
    return this.data
      .map(
        (element) =>
          `<div style="--value: ${element}" 
          data-tooltip=${(element / this.total) * 100}%></div>`
      )
      .join("");
  }
}
