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

const editSubmitButton = profileForm.querySelector(
  validationConfigurations.submitButtonSelector
);

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileTitle = profile.querySelector(".profile__title");
const inputName = profileForm.querySelector(".form__input_type_profile-name");
const inputTitle = profileForm.querySelector(".form__input_type_profile-title");
const placeForm = document.querySelector(".popup__form_type_add-place");

const addPlaceModal = document.querySelector(".popup_type_add-place");
const imgPrevModal = document.querySelector(".popup_type_image-prev");

const cardTemplateSelector = "#card-template";
const avatar = document.querySelector(".profile__image-container");
const avatarForm = document.querySelector(".popup__form_type_avatar");
const avatarSubmitButton = avatarForm.querySelector(
  validationConfigurations.submitButtonSelector
);
const addPlaceSubmitButton = placeForm.querySelector(
  validationConfigurations.submitButtonSelector
);
const profileImage = document.createElement("img");
const profileImageContainer = document.querySelector(
  ".profile__image-container"
);

export {
  profileImage,
  profileImageContainer,
  avatar,
  avatarForm,
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
  cardTemplateSelector,
  editSubmitButton,
  avatarSubmitButton,
  addPlaceSubmitButton,
};
