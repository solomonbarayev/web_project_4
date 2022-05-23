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

export function openModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEscape);
  document.addEventListener("mousedown", clickOutsideToClose);
}

export function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEscape);
  document.removeEventListener("mousedown", clickOutsideToClose);
}

//////////////////////////////////////////////
// Preview Image Popup Variables and Handler//
//////////////////////////////////////////////

const imageModalSelector = document.querySelector(".popup_type_image-prev");
const popupImage = imageModalSelector.querySelector(".popup__image");
const popupCaption = imageModalSelector.querySelector(".popup__caption");

export function handlePreviewImage(thisLink, thisName) {
  popupImage.src = thisLink;
  popupImage.alt = `A beautiful sight in ${thisName}`;
  popupCaption.textContent = thisName;
  openModal(imageModalSelector);
}
