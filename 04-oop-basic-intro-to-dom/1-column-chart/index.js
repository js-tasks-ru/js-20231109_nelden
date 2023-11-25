
function formatHeading(value, label) {
  if (label == 'sales') {
    return '$' + value.toLocaleString('en-US');
  }
  return value;
}

export default class ColumnChart {
  constructor({ data = [], label = '', link = '', value = 0 } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = Number(value);
    this.formatHeading = formatHeading;
    this.value = this.formatHeading(this.value, this.label);
    this.chartHeight = 50;
    this.total = this.data.reduce((acc, item) => acc + item, 0);
    this.element = this.createElement();
  }
   
  getValuePercentage(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;
    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  createBodyTemplate() {
    if (this.data != 0) {
      return this.getValuePercentage(this.data).map((item) => `
      <div style="--value: ${item.value}" data-tooltip=${item.percent}></div>`
      ).join("");}
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
      <div data-element="header" class="column-chart__header">${this.value}</div>
      <div data-element="body" class="column-chart__chart">${this.createBodyTemplate()}</div>
    </div>
  </div>`;
  }

  createChartTemplateLoading() {
    return `
          <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
              Total ${this.label}
              <a class="column-chart__link" href="#">View all</a>
            </div>
            <div class="column-chart__container">
              <div data-element="header" class="column-chart__header"></div>
              <div data-element="body" class="column-chart__chart"></div>
        </div>
      </div>`;
  }
   

  createElement() {
    const element = document.createElement('div');
    if (!this.keys) {
      document.body.insertAdjacentHTML('beforeend', this.createChartTemplateLoading());
    } else {
      element.innerHTML = this.createChartTemplate();
    }
    return element;
  }

  update(newData) {
    const newChartBodyTemplate = this.createBodyTemplate(newData);

    this.element.querySelector(".column-chart__chart").innerHTML = newChartBodyTemplate;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
