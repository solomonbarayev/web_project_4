import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(".popup__image");
    this._popupCaption = this._popupElement.querySelector(".popup__caption");
  }

  open(image, caption) {
    this._popupImage.src = image;
    this._popupImage.alt = `A beautiful view of ${caption}`;
    this._popupCaption.textContent = caption;
    super.open();
  }
}
