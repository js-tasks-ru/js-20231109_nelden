export default class NotificationMessage {
  static LastNotification = null;

  constructor(
    message = "Hello, world",
    { duration = 7000, type = "success" } = {}
  ) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.updateBtn();
    this.element = this.createElement();
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

  show(element = document.body) {
    if (NotificationMessage.LastNotification) {
      NotificationMessage.LastNotification.remove();
    }
    element.append(this.element);
    NotificationMessage.LastNotification = this;
    setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
