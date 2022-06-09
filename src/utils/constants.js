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

const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

const validationConfigurations = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const profileForm = document.querySelector(".popup__form_type_profile");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileTitle = profile.querySelector(".profile__title");
const inputName = profileForm.querySelector(".form__input_type_profile-name");
const inputTitle = profileForm.querySelector(".form__input_type_profile-title");
const placeForm = document.querySelector(".popup__form_type_add-place");

const addPlaceModal = document.querySelector(".popup_type_add-place");
const imgPrevModal = document.querySelector(".popup_type_image-prev");

const cards = document.querySelector(".cards");
const cardList = cards.querySelector(".cards__list");
const cardTemplateSelector = "#card-template";

export {
  initialCards,
  editProfileButton,
  addPlaceButton,
  validationConfigurations,
  profileForm,
  profile,
  profileName,
  profileTitle,
  inputName,
  inputTitle,
  placeForm,
  addPlaceModal,
  imgPrevModal,
  cardList,
  cardTemplateSelector,
};
