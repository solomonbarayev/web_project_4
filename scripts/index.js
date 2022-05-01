import { configurations, toggleButton, hideErrorsOnClose } from "./validate.js";

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

//Function that creates a card with all of its components
function createCard(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardTitleElement.textContent = data.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = `A beautiful place in ${data.name}`;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  //eventListeners
  cardImage.addEventListener("click", () => previewImage(data));
  deleteButton.addEventListener("click", () => cardElement.remove());
  likeButton.addEventListener("click", () =>
    toggleClass(likeButton, "card__like-button_active")
  );
  return cardElement;
}

function renderCard(card, list) {
  list.prepend(createCard(card));
}

//creating the initial set of cards with the renderCard function
initialCards.forEach((card) => renderCard(card, cardList));

///////////////
//Event Handlers
///////////////

function isNotPreviewModal(modal) {
  return !modal.classList.contains("popup_type_image-prev") ? true : false;
}

function checkEditAndAddModals(modal) {
  if (isNotPreviewModal(modal)) {
    const inputList = [...modal.querySelectorAll(configurations.inputSelector)];
    const button = modal.querySelector(configurations.submitButtonSelector);
    toggleButton(inputList, button, configurations);
  }
}

function openModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEscape);
  document.addEventListener("mousedown", clickOutsideToClose);
  //passing the toggleButton function here so inputs get checked after they are filled
  checkEditAndAddModals(modal);
}

function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEscape);
  document.removeEventListener("mousedown", clickOutsideToClose);
  isNotPreviewModal(modal) && hideErrorsOnClose(modal);
}

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
}

function previewImage(card) {
  const popupImage = imgPrevModal.querySelector(".popup__image");
  const popupCaption = imgPrevModal.querySelector(".popup__caption");
  popupImage.src = card.link;
  popupImage.alt = `A beautiful place in ${card.name}`;
  popupCaption.textContent = card.name;
  openModal(imgPrevModal);
}

function toggleClass(component, cl) {
  component.classList.toggle(cl);
}

function fillProfileFormFields() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
}

function closeOnEscape(e) {
  const currentPopup = document.querySelector(".popup_opened");
  if (e.key === "Escape") {
    closeModal(currentPopup);
  }
}

function clickOutsideToClose(e) {
  const currentPopup = document.querySelector(".popup_opened");
  if (e.target.classList.contains("popup")) {
    closeModal(currentPopup);
  }
}

/////////////////////
//////Event Listeners
/////////////////////
editProfileButton.addEventListener("click", () => {
  fillProfileFormFields();
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
