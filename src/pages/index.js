///// Importing styles for webpack to connect
import "./index.css";

////Imports
import {
  initialCards,
  editProfileButton,
  addPlaceButton,
  validationConfigurations,
  profileForm,
  inputName,
  inputTitle,
  placeForm,
  cardList,
  cardTemplateSelector,
} from "../utils/constants";

import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithImage } from "../components/PopupWithImage.js";

import { FormValidator } from "../components/FormValidator.js";

import { UserInfo } from "../components/UserInfo";
import { Section } from "../components/Section";
import { Card } from "../components/Card";

///////////////////////////////
/*   Initial Card Creation   */
///////////////////////////////

const placesSection = new Section(
  {
    items: initialCards,
    renderer: (data) => renderCard(data),
  },
  ".cards__list"
);

placesSection.render();

function generateCard(data) {
  const card = new Card(data, cardTemplateSelector, () => {
    imagePopup.open(data.link, data.name);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(data) {
  const element = generateCard(data);
  placesSection.addItem(element);
}

//////////////////////////////////////////
/*     Form Validation Instantiation    */
//////////////////////////////////////////

const profileFormValidator = new FormValidator(
  validationConfigurations,
  profileForm
);
const addFormValidator = new FormValidator(validationConfigurations, placeForm);

profileFormValidator.enableValidation();
addFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__title",
});

////////////////////////////////
/*     Popup Instantiation    */
////////////////////////////////

const editPopup = new PopupWithForm(".popup_type_edit-profile", (data) => {
  userInfo.setUserInfo(data.name, data.title);
});
editPopup.setEventListeners();

const addCardPopup = new PopupWithForm(".popup_type_add-place", (data) => {
  renderCard(data);
  addFormValidator.resetFormButton();
});
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_type_image-prev");
imagePopup.setEventListeners();

//////////////////
// Event Listeners
//////////////////
editProfileButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  inputName.value = info.name;
  inputTitle.value = info.job;
  profileFormValidator.hideErrors();
  profileFormValidator.enableButton();
  editPopup.open();
});

addPlaceButton.addEventListener("click", () => {
  addCardPopup.open();
  addFormValidator.hideErrors();
});
