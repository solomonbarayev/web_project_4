import {
  openModal,
  closeModal,
  handleProfileFormSubmit,
  profile,
  profileModal,
  profileForm,
  placeForm,
  addCard,
  renderCard,
  fillProfileFormFields,
  addPlaceModal,
  imgPrevModal,
  cardList,
} from "./utils.js";
import { FormValidator } from "./FormValidator.js";

const editProfileButton = profile.querySelector(".profile__edit-button");
const addPlaceButton = profile.querySelector(".profile__add-button");

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

///////////////////////
/*     Form Validation    */
///////////////////////
const validationConfigurations = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const profileFormValidator = new FormValidator(
  validationConfigurations,
  profileForm
);
const addFormValidator = new FormValidator(validationConfigurations, placeForm);

profileFormValidator.enableValidation();
addFormValidator.enableValidation();

///////////////////////
/*   Initial Card Creation   */
///////////////////////

initialCards.forEach((card) => renderCard(card, cardList));

//////////////////
// Event Listeners
//////////////////
editProfileButton.addEventListener("click", () => {
  fillProfileFormFields();
  profileFormValidator.enableButton();
  profileFormValidator.hideErrorsOnOpen();
  openModal(profileModal);
});

profileCloseButton.addEventListener("click", () => closeModal(profileModal));
addPlaceButton.addEventListener("click", () => {
  openModal(addPlaceModal);
});
placeCloseButton.addEventListener("click", () => closeModal(addPlaceModal));
imgPrevCloseButton.addEventListener("click", () => closeModal(imgPrevModal));
profileForm.addEventListener("submit", handleProfileFormSubmit);
placeForm.addEventListener("submit", addCard);
