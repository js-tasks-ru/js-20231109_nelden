export default class NotificationMessage {
  constructor(
    message = "Hello, world",
    { duration = 7000, type = "success" } = {}
  ) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.updateBtn();
    this.element = this.createElement();
    this.removeByTimeOut();
  }

  updateBtn() {
    let btn = document.getElementById("btn1");
    if (btn) {
      btn.innerText = `${this.message}`;
    }
  }

  createElement() {
    const div = document.createElement("div");
    div.style = `--value:${this.duration / 1000}s`;
    div.classList.add("notification", this.type);
    div.innerHTML = this.createMessageTemplate();
    return div;
  }

  createMessageTemplate() {
    return `
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">${this.message}</div>
    </div>`;
  }

  show(element = this.createElement()) {
    document.body.appendChild(element);
  }

  destroy() {
    this.remove();
  }

  remove() {
    this.element.remove();
  }

  removeByTimeOut() {
    setTimeout(() => this.element.remove());
  }
}
