import { openModal } from "./utils.js";

export class Card {
  constructor(data, selector) {
    this._text = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getCloneFromTemplate() {
    const cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handlePreviewImage() {
    this._imageModalSelector = document.querySelector(".popup_type_image-prev");
    this._popupImage = this._imageModalSelector.querySelector(".popup__image");
    this._popupCaption =
      this._imageModalSelector.querySelector(".popup__caption");
    this._popupImage.src = this._link;
    this._popupCaption.textContent = this._text;
    openModal(this._imageModalSelector);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () => this._element.remove());
    this._image.addEventListener("click", () => this._handlePreviewImage());
  }

  generateCard() {
    this._element = this._getCloneFromTemplate();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._text;
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._image = this._element.querySelector(".card__image");
    this._setEventListeners();
    return this._element;
  }
}
