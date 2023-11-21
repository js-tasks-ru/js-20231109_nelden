export default class ColumnChart {
  constructor(data = [], label = "", link = "", value = 0) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
  }

  getChartOrders() {
    return `<div class="dashboard__chart_orders">
    <div class="column-chart" style="--chart-height: 50">
      <div class="column-chart__title">
        Total orders
        <a href="/sales" class="column-chart__link">View all</a>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">344</div>
        <div data-element="body" class="column-chart__chart">
          <div style="--value: 2" data-tooltip="6%"></div>
          <div style="--value: 22" data-tooltip="44%"></div>
          <div style="--value: 5" data-tooltip="11%"></div>
          <div style="--value: 50" data-tooltip="100%"></div>
          <div style="--value: 12" data-tooltip="25%"></div>
          <div style="--value: 4" data-tooltip="8%"></div>
          <div style="--value: 13" data-tooltip="28%"></div>
          <div style="--value: 5" data-tooltip="11%"></div>
          <div style="--value: 23" data-tooltip="47%"></div>
          <div style="--value: 12" data-tooltip="25%"></div>
          <div style="--value: 34" data-tooltip="69%"></div>
          <div style="--value: 1" data-tooltip="3%"></div>
          <div style="--value: 23" data-tooltip="47%"></div>
          <div style="--value: 27" data-tooltip="56%"></div>
          <div style="--value: 2" data-tooltip="6%"></div>
          <div style="--value: 1" data-tooltip="3%"></div>
        </div>
      </div>
    </div>
  </div>`;
  }
}
