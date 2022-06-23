export class Card {
  constructor(
    data,
    selector,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard,
    userId
  ) {
    this._text = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handelLikeCard = handleLikeCard;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes.length;
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
    this._handelLikeCard(this._id);
  }

  _setEventListeners() {
    this._element.addEventListener("click", (evt) => {
      if (evt.target === this._likeButton) {
        this._handleLikeButton(evt);
      }
      if (evt.target === this._deleteButton) {
        // evt.currentTarget.remove();
        this._handleDeleteCard(this._id);
      }
      if (evt.target === this._image) {
        this._handleCardClick(evt);
      }
    });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getCloneFromTemplate();
    this._image = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");

    this._element.querySelector(".card__title").textContent = this._text;
    this._image.src = this._link;
    this._image.alt = `A beautiful scene in ${this._text}`;

    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._ownerId !== this._userId &&
      (this._deleteButton.style.display = "none");

    this._likeCount = this._element.querySelector(".card__like-count");
    this._likeCount.textContent = this._likes;

    this._setEventListeners();

    return this._element;
  }
}
