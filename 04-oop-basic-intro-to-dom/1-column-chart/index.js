export default class ColumnChart {
  constructor(props) {
    this.data = !Array.isArray(props.data) ? [0] : props.data;
    this.total = !Array.isArray(props.data)
      ? 0
      : props.data.reduce((acc, item) => acc + item, 0);
    this.label = props.label == "" ? "Empty label" : props.label;
    this.link = props.link;
    this.value =
      this.label == "sales"
        ? `$${props.value.toLocaleString("en-US")}`
        : props.value;
    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createTemplate() {
    if (this.data) {
      return `
    <div id="${this.label}" class="dashboard__chart_${this.label}">
    <div class="column-chart" style="--chart-height: 50">
      <div class="column-chart__title">${this.label}
        <a href="/${this.label}" class="column-chart__link">${this.link}</a>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">
        ${this.value}</div>
        <div data-element="body" class="column-chart__chart">
        ${this.createChartBodyTemplate(this.data)}
        </div>
      </div>
    </div>`;
    }
  }

  createChartBodyTemplate(data) {
    const maxValue = Math.max(...this.data);
    const scale = 50 / maxValue;
    if (data == 0) {
      return `<img src='./charts-skeleton.svg'></img>`;
    }
    return this.data
      .map(
        (item) =>
          `<div style="--value: ${String(Math.floor(item * scale))}" 
          data-tooltip=${((item / maxValue) * 100).toFixed(0) + "%"}></div>`
      )
      .join("");
  }

  update(newData) {
    this.data = !Array.isArray(newData) ? 0 : newData;
    this.total = !Array.isArray(newData)
      ? 0
      : newData.reduce((acc, item) => acc + item, 0);

    const newChartBodyTemplate = this.createChartBodyTemplate(this.data);

    this.element.querySelector(".column-chart__chart").innerHTML =
      newChartBodyTemplate;
  }
}
