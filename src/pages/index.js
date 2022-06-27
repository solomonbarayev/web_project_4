///// Importing styles for webpack to connect
import "./index.css";

////Imports
import {
  editProfileButton,
  addPlaceButton,
  validationConfigurations,
  profileForm,
  placeForm,
  cardTemplateSelector,
  avatar,
  avatarForm,
} from "../utils/constants";

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
    renderer: renderCard,
  },
  ".cards__list"
);

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    placesSection.renderItems(cards);
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => console.log(err));

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
          api
            .deleteCard(id)
            .then((res) => {
              console.log("card is deleted", res);
              //remove it from DOM
              card.removeCard();
            })
            .then(() => {
              console.log("server deleted card");
              deletePopup.close();
            })
            .catch((err) => console.log(err));
        });
      },
      handleLikeCard: (id) => {
        const isLiked = card.isLiked();

        if (isLiked) {
          //dislike card
          api
            .dislikeCard(id)
            .then((res) => {
              card.dislikeCard(res.likes);
              console.log("card is disliked", res);
            })
            .catch((err) => console.log(err));
        } else {
          //like card
          api
            .likeCard(id)
            .then((res) => {
              card.likeCard(res.likes);
              console.log("card is liked", res);
            })
            .catch((err) => console.log(err));
        }
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
  editPopup.renderLoading(true, "Saving...");
  api
    .setUserInfo(data.name, data.title)
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      editPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => editPopup.renderLoading(false));
});
editPopup.setEventListeners();

const addCardPopup = new PopupWithForm(".popup_type_add-place", (data) => {
  addCardPopup.renderLoading(true, "Creating...");
  api
    .createCard(data)
    .then((res) => {
      renderCard(res);
      addCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => addCardPopup.renderLoading(false));
});
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(".popup_type_image-prev");
imagePopup.setEventListeners();

const deletePopup = new PopupWithSubmit(".popup_type_delete-card");
deletePopup.setEventListeners();

const avatarPopup = new PopupWithForm(".popup_type_avatar", (data) => {
  avatarPopup.renderLoading(true, "Saving avatar...");
  api
    .setUserAvatar(data.link)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.renderLoading(false));
});
avatarPopup.setEventListeners();

//////////////////
// Event Listeners
//////////////////
editProfileButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  editPopup.setInputValues(info);
  profileFormValidator.hideErrors();
  profileFormValidator.enableButton();
  editPopup.open();
});

addPlaceButton.addEventListener("click", () => {
  addFormValidator.resetFormButton();
  addCardPopup.open();
  addFormValidator.hideErrors();
});

avatar.addEventListener("click", () => {
  avatarFormValidator.resetFormButton();
  avatarPopup.open();
});
