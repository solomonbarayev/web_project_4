import { Card } from "../components/Card.js";

//  **** DECLARING VARIABLES  **** //

export const profileForm = document.querySelector(".popup__form_type_profile");
export const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileTitle = profile.querySelector(".profile__title");
const inputName = profileForm.querySelector(".form__input_type_profile-name");
const inputTitle = profileForm.querySelector(".form__input_type_profile-title");
export const profileModal = document.querySelector(".popup_type_edit-profile");
export const placeForm = document.querySelector(".popup__form_type_add-place");
const placeName = placeForm.querySelector(".form__input_type_place-name");
const placeURL = placeForm.querySelector(".form__input_type_place-url");
const imageModalSelector = document.querySelector(".popup_type_image-prev");
const popupImage = imageModalSelector.querySelector(".popup__image");
const popupCaption = imageModalSelector.querySelector(".popup__caption");

export const addPlaceModal = document.querySelector(".popup_type_add-place");
export const imgPrevModal = document.querySelector(".popup_type_image-prev");

const cards = document.querySelector(".cards");
export const cardList = cards.querySelector(".cards__list");
const cardTemplateSelector = "#card-template";

function closeOnEscape(e) {
  const currentPopup = document.querySelector(".popup_opened");
  if (e.key === "Escape") {
    closeModal(currentPopup);
  }
}

function clickOverlayToClose(e) {
  const currentPopup = document.querySelector(".popup_opened");
  if (e.target.classList.contains("popup")) {
    closeModal(currentPopup);
  }
}

export function openModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEscape);
  document.addEventListener("mousedown", clickOverlayToClose);
}

export function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEscape);
  document.removeEventListener("mousedown", clickOverlayToClose);
}

export function handlePreviewImage(thisLink, thisName) {
  popupImage.src = thisLink;
  popupImage.alt = `A beautiful sight in ${thisName}`;
  popupCaption.textContent = thisName;
  openModal(imageModalSelector);
}

export function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  closeModal(profileModal);
}

export function renderCard(card, list) {
  const cardToRender = new Card(card, cardTemplateSelector).generateCard();
  list.prepend(cardToRender);
}

export function addCard(e) {
  e.preventDefault();
  renderCard({ name: placeName.value, link: placeURL.value }, cardList);
  closeModal(addPlaceModal);
  placeForm.reset();
  addFormValidator.resetFormButton();
}

export function fillProfileFormFields() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
}
