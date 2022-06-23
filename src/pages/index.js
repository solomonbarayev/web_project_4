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
  profileName,
  profileTitle,
} from "../utils/constants";

import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithImage } from "../components/PopupWithImage.js";

import { FormValidator } from "../components/FormValidator.js";

import { UserInfo } from "../components/UserInfo";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { api } from "../components/Api";
import { PopupWithSubmit } from "../components/PopupWithSubmit";
import { codePointAt } from "core-js/core/string";

///////////////////////////////
/*   Initial Card Creation   */
///////////////////////////////

const placesSection = new Section(
  {
    renderer: (data) => renderCard(data),
  },
  ".cards__list"
);

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
  ([cards, userData]) => {
    userId = userData._id;

    console.log(userId);

    placesSection.renderItems(cards);

    userInfo.setUserInfo(userData.name, userData.about);
  }
);

function generateCard(data) {
  const card = new Card(
    data,
    cardTemplateSelector,
    //handleCardClick
    () => {
      imagePopup.open(data.link, data.name);
    },
    //handeDeleteCard
    (id) => {
      deletePopup.open();

      deletePopup.setAction(() => {
        // submit modal
        api.deleteCard(id).then((res) => {
          console.log("card is deleted", res);
          //remove it from DOM
          card.removeCard();
        });
      });
    },
    //handleLikeCard
    (id) => {
      console.log("card is liked", id);
      // api.likeCard(id).then((res) => {
      //   console.log("card is liked", res);
      // });
    },
    //comparing userId to cardId
    userId
  );
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
const profileImage = document.querySelector(".profile__image");

api
  .setUserAvatar(
    "https://i0.wp.com/www.dogwonder.co.uk/wp-content/uploads/2009/12/tumblr_ku2pvuJkJG1qz9qooo1_r1_400.gif?resize=320%2C320"
  )
  .then((res) => (profileImage.src = res.avatar));

const editPopup = new PopupWithForm(".popup_type_edit-profile", (data) => {
  //userInfo.setUserInfo(data.name, data.title);
  api.setUserInfo(data.name, data.title).then((data) => {
    userInfo.setUserInfo(data.name, data.about);
  });
});
editPopup.setEventListeners();

const addCardPopup = new PopupWithForm(".popup_type_add-place", (data) => {
  api.createCard(data).then((res) => {
    renderCard(res);
  });
  addFormValidator.resetFormButton();
});
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_type_image-prev");
imagePopup.setEventListeners();

const deletePopup = new PopupWithSubmit(".popup_type_delete-card");
deletePopup.setEventListeners();

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
