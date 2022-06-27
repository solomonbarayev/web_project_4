export class Card {
  constructor(
    data,
    selector,
    { handleCardClick, handleDeleteCard, handleLikeCard },
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
    this._likes = data.likes;
  }

  _getCloneFromTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.addEventListener("click", (evt) => {
      if (evt.target === this._likeButton) {
        this._handelLikeCard(this._id);
      }
      if (evt.target === this._deleteButton) {
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

  likeCard(newLikes) {
    this._likeButton.classList.add("card__like-button_active");
    // this._likeCount.textContent = newLikesCount;
    this._likes = newLikes;
    this._likeCount.textContent = this._likes.length;
  }

  dislikeCard(newLikes) {
    this._likeButton.classList.remove("card__like-button_active");
    // this._likeCount.textContent = newLikesCount;
    this._likes = newLikes;
    this._likeCount.textContent = this._likes.length;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
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
    this._likeCount.textContent = this._likes.length;

    this.isLiked() && this.likeCard(this._likes);

    this._setEventListeners();

    return this._element;
  }
}
