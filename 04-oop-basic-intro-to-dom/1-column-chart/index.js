export default class ColumnChart {
  constructor({
    data = [],
    label = "",
    link = "",
    value = 0,
    formatHeading = (value) => value,
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = formatHeading(value);
    this.chartHeight = 50;
    this.total = this.data.reduce((acc, item) => acc + item, 0);

    this.element = this.createElement();
    this.createLoading();
  }

  getValuePercentage(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;
    return data.map((item) => {
      return {
        percent: ((item / maxValue) * 100).toFixed(0) + "%",
        value: String(Math.floor(item * scale)),
      };
    });
  }

  createBodyTemplate() {
    if (this.data.length != 0) {
      return this.getValuePercentage(this.data)
        .map(
          (item) => `
      <div style="--value: ${item.value}" data-tooltip=${item.percent}></div>`
        )
        .join("");
    }
    return `<img src='./charts-skeleton.svg'></img>`;
  }

  createChartTemplate() {
    return `
    <div class="column-chart" style="--chart-height: ${this.chartHeight}">
    <div class="column-chart__title">
      Total ${this.label}
      <a href=${this.link} class="column-chart__link">View all</a>
    </div>
    <div class="column-chart__container">
      <div data-element="header" class="column-chart__header">${
        this.value
      }</div>
      <div data-element="body" class="column-chart__chart">${this.createBodyTemplate()}</div>
    </div>
  </div>`;
  }

  createLoading() {
    if (this.data.length == 0) {
      this.element.classList.add("column-chart_loading");
    }
  }

  createElement() {
    const element = document.createElement("div");
    element.innerHTML = this.createChartTemplate();
    return element;
  }

  update(newData) {
    const newChartBodyTemplate = this.createBodyTemplate(newData);

    this.element.querySelector(".column-chart__chart").innerHTML =
      newChartBodyTemplate;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
