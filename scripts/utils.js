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
