const form = document.querySelector(".form");
const profile = document.querySelector(".profile");

const profileName = profile.querySelector(".profile__name");
const profileTitle = profile.querySelector(".profile__title");
const inputName = form.querySelector(".form__input[name='name']");
const inputTitle = form.querySelector(".form__input[name='title']");

const editProfileButton = profile.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-button");

///////////////
//Event Handlers
///////////////
function toggleForm() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
  popup.classList.toggle("popup_opened");
}

function formHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
}

///////////////
//Event Listeners
///////////////
editProfileButton.addEventListener("click", toggleForm);
closeButton.addEventListener("click", toggleForm);
form.addEventListener("submit", formHandler);
