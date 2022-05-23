import { handlePreviewImage } from "./utils.js";

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

  _handleLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_active");
  }

  _setEventListeners() {
    this._element.addEventListener("click", (evt) => {
      if (evt.target === this._likeButton) {
        this._handleLikeButton(evt);
      }
      if (evt.target === this._deleteButton) {
        evt.currentTarget.remove();
      }
      if (evt.target === this._image) {
        handlePreviewImage(this._link, this._text);
      }
    });
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
