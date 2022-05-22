import { openModal, closeModal } from "./utils.js";
import { FormValidator, configurations } from "./FormValidator.js";
import { Card } from "./Card.js";

/// List where the cards live
const cards = document.querySelector(".cards");
const cardList = cards.querySelector(".cards__list");

///Forms and their elements
const profileForm = document.querySelector(".popup__form_type_profile");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileTitle = profile.querySelector(".profile__title");
const inputName = profileForm.querySelector(".form__input_type_profile-name");
const inputTitle = profileForm.querySelector(".form__input_type_profile-title");

const editProfileButton = profile.querySelector(".profile__edit-button");
const addPlaceButton = profile.querySelector(".profile__add-button");

const placeForm = document.querySelector(".popup__form_type_add-place");
const placeName = placeForm.querySelector(".form__input_type_place-name");
const placeURL = placeForm.querySelector(".form__input_type_place-url");

//Modals and their elements
const profileModal = document.querySelector(".popup_type_edit-profile");
const addPlaceModal = document.querySelector(".popup_type_add-place");
const imgPrevModal = document.querySelector(".popup_type_image-prev");
const profileCloseButton = profileModal.querySelector(
  ".popup__close-button_type_profile"
);
const placeCloseButton = addPlaceModal.querySelector(
  ".popup__close-button_type_place"
);
const imgPrevCloseButton = imgPrevModal.querySelector(
  ".popup__close-button_type_image-prev"
);

/// 6 initial cards
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

const cardTemplateSelector = "#card-template";

///////////////////////
/*     Validation    */
///////////////////////
const profileFormValidator = new FormValidator(configurations, profileForm);
const addFormValidator = new FormValidator(configurations, placeForm);

///////////////////////
/*   Card Creation   */
///////////////////////
function renderCard(card, list) {
  const cardToRender = new Card(card, cardTemplateSelector).generateCard();
  list.prepend(cardToRender);
}

initialCards.forEach((card) => renderCard(card, cardList));

/////////////////////////
//*   Event Handlers   */
/////////////////////////

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  closeModal(profileModal);
}

function addCard(e) {
  e.preventDefault();
  renderCard({ name: placeName.value, link: placeURL.value }, cardList);
  closeModal(addPlaceModal);
  placeForm.reset();
  addFormValidator.resetFormButton();
}

function fillProfileFormFields() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
}

/////////////////////
//////Event Listeners
/////////////////////
editProfileButton.addEventListener("click", () => {
  fillProfileFormFields();
  profileFormValidator.enableValidation();
  profileFormValidator.hideErrorsOnOpen();
  openModal(profileModal);
});

profileCloseButton.addEventListener("click", () => closeModal(profileModal));
addPlaceButton.addEventListener("click", () => {
  addFormValidator.enableValidation();
  openModal(addPlaceModal);
});
placeCloseButton.addEventListener("click", () => closeModal(addPlaceModal));
imgPrevCloseButton.addEventListener("click", () => closeModal(imgPrevModal));
profileForm.addEventListener("submit", handleProfileFormSubmit);
placeForm.addEventListener("submit", addCard);
