import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image, caption) {
    this._popupElement.querySelector(".popup__image").src = image;
    this._popupElement.querySelector(".popup__caption").textContent = caption;
    super.open();
  }
}
