export default class ColumnChart {
  constructor(data = [], label = "", link = "", value = 0) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.element = this.createElement();
  }

  createElement() {
    let element = document.createElement('div');
    element.dataset.element = "body";
    element.className = "column-chart__chart";
    this.data.forEach(element => {
      let divValue = document.createElement('div');
      divValue.style.setProperty('--value', element);
      divValue.dataset.tooltip = "6%";
      element.appendChild(divValue);
    });
  }
}
