const form = document.querySelector(".form");
const profile = document.querySelector(".profile");
const saveButton = form.querySelector(".form__button");

const profileName = profile.querySelector(".profile__name");
const profileTitle = profile.querySelector(".profile__title");
const inputName = form.querySelector(".form__input[name='name']");
const inputTitle = form.querySelector(".form__input[name='title']");

const editProfileButton = profile.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-button");

////adding these to enable like button functionality
const cards = document.querySelector(".cards");
const cardList = cards.querySelector(".cards__list");
const likesButtons = cards.querySelectorAll(".card__like-button");

////Adding 6 initial cards
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function createCard(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardTitleElement.textContent = data.name;
  const cardImg = cardElement.querySelector(".card__image");
  cardImg.src = data.link;
  return cardElement;
}

initialCards.forEach((card) => {
  const cardElement = createCard(card);
  cardList.prepend(cardElement);
});

///////////////
//Event Handlers
///////////////

function openForm() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
  popup.classList.add("popup_opened");
}

function closeForm() {
  popup.classList.remove("popup_opened");
}

function formHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
}

// //loop for like button functionality
// for (let i = 0; i < likesButtons.length; i++) {
//   const likeButton = likesButtons[i];
//   function toggleLike() {
//     likeButton.classList.toggle("card__like-button_active");
//   }
//   likeButton.addEventListener("click", toggleLike);
// }

///////////////
//Event Listeners
///////////////
editProfileButton.addEventListener("click", openForm);
closeButton.addEventListener("click", closeForm);
saveButton.addEventListener("click", closeForm);
form.addEventListener("submit", formHandler);
