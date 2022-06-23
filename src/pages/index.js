///// Importing styles for webpack to connect
import "./index.css";

////Imports
import {
  editProfileButton,
  addPlaceButton,
  validationConfigurations,
  profileForm,
  inputName,
  inputTitle,
  placeForm,
  cardTemplateSelector,
  avatar,
  avatarForm,
  editSubmitButton,
  avatarSubmitButton,
  addPlaceSubmitButton,
  profileImage,
  profileImageContainer,
} from "../utils/constants";

import { improveUI, resetAndCloseForm } from "../utils/utils";

import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithImage } from "../components/PopupWithImage.js";

import { FormValidator } from "../components/FormValidator.js";

import { UserInfo } from "../components/UserInfo";
import { Section } from "../components/Section";
import { Card } from "../components/Card";
import { api } from "../components/Api";
import { PopupWithSubmit } from "../components/PopupWithSubmit";

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

//setting up avatar image to load through callback to avoid empty image on load
profileImage.alt = "User's Profile Pic";
profileImage.classList.add("profile__image");

Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
  ([cards, userData]) => {
    userId = userData._id;

    placesSection.renderItems(cards);

    userInfo.setUserInfo(userData.name, userData.about);

    //adding avatar image only after successful fetch from api
    profileImageContainer.prepend(profileImage);

    userInfo.setUserAvatar(profileImage, userData.avatar);
  }
);

function generateCard(data) {
  const card = new Card(
    data,
    cardTemplateSelector,
    {
      handleCardClick: () => {
        imagePopup.open(data.link, data.name);
      },
      handleDeleteCard: (id) => {
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
      handleLikeCard: (id) => {
        const isLiked = card.isLiked();

        if (isLiked) {
          //dislike card
          api.dislikeCard(id).then((res) => {
            card.dislikeCard(res.likes);
            console.log("card is disliked", res);
          });
        } else {
          //like card
          api.likeCard(id).then((res) => {
            card.likeCard(res.likes);
            console.log("card is liked", res);
          });
        }

        card.isLiked();
      },
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

const avatarFormValidator = new FormValidator(
  validationConfigurations,
  avatarForm
);

profileFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__title",
  avatarSelector: ".profile__image",
});

////////////////////////////////
/*     Popup Instantiation    */
////////////////////////////////

const editPopup = new PopupWithForm(".popup_type_edit-profile", (data) => {
  improveUI(editSubmitButton, "Saving...");
  api.setUserInfo(data.name, data.title).then((data) => {
    improveUI(editSubmitButton, "Saving");
    userInfo.setUserInfo(data.name, data.about);
    resetAndCloseForm(profileForm, editPopup);
  });
});
editPopup.setEventListeners();

const addCardPopup = new PopupWithForm(".popup_type_add-place", (data) => {
  improveUI(addPlaceSubmitButton, "Creating...");
  api.createCard(data).then((res) => {
    renderCard(res);
    improveUI(addPlaceSubmitButton, "Create");
    resetAndCloseForm(placeForm, addCardPopup);
  });
  addFormValidator.resetFormButton();
});
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_type_image-prev");
imagePopup.setEventListeners();

const deletePopup = new PopupWithSubmit(".popup_type_delete-card");
deletePopup.setEventListeners();

const avatarPopup = new PopupWithForm(".popup_type_avatar", (data) => {
  improveUI(avatarSubmitButton, "Saving avatar...");
  api.setUserAvatar(data.link).then((res) => {
    userInfo.setUserAvatar(profileImage, res.avatar);
    improveUI(avatarSubmitButton, "Save");
    resetAndCloseForm(avatarForm, avatarPopup);
  });
});
avatarPopup.setEventListeners();

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

avatar.addEventListener("click", () => {
  avatarPopup.open();
});
