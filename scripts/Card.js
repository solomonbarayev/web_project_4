import { openModal } from "./utils.js";

const imageModalSelector = document.querySelector(".popup_type_image-prev");
const popupImage = imageModalSelector.querySelector(".popup__image");
const popupCaption = imageModalSelector.querySelector(".popup__caption");

export class Card {
  constructor(data, selector) {
    this._text = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getCloneFromTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handlePreviewImage() {
    popupImage.src = this._link;
    popupImage.alt = `A beautiful sight in ${this._text}`;
    popupCaption.textContent = this._text;
    openModal(imageModalSelector);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    this._deleteButton.addEventListener("click", () => this._element.remove());
    this._image.addEventListener("click", () => this._handlePreviewImage());
  }

  generateCard() {
    this._element = this._getCloneFromTemplate();
    this._image = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._element.querySelector(".card__title").textContent = this._text;
    this._image.src = this._link;
    this._image.alt = `A beautiful scene in ${this._text}`;

    this._setEventListeners();

    return this._element;
  }
}
