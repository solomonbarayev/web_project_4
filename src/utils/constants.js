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

const placeForm = document.querySelector(".popup__form_type_add-place");

const cardTemplateSelector = "#card-template";
const avatar = document.querySelector(".profile__image-container");
const avatarForm = document.querySelector(".popup__form_type_avatar");

export {
  avatar,
  avatarForm,
  editProfileButton,
  addPlaceButton,
  validationConfigurations,
  profileForm,
  placeForm,
  cardTemplateSelector,
};
