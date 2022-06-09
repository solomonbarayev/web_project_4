export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render() {
    this._items.forEach((item) => {
      const card = this._renderer(item);
      this._container.append(card);
    });
  }

  addItem(item) {
    this._container.append(this._renderer(item));
  }
}
