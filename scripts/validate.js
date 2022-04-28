//////////////////////////////////
//////// Form Validations ////////
//////////////////////////////////

const showInputError = (formElement, input, configurations) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(configurations.errorClass);
  input.classList.add(configurations.inputErrorClass);
};

const hideInputError = (formElement, input, configurations) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(configurations.errorClass);
  input.classList.remove(configurations.inputErrorClass);
};

const checkInputValidity = (formElement, input, configurations) => {
  if (!input.validity.valid) {
    showInputError(formElement, input, configurations);
  } else {
    hideInputError(formElement, input, configurations);
  }
};

const hasInvalidInputs = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButton = (inputList, button, configurations) => {
  if (hasInvalidInputs(inputList)) {
    button.disabled = true;
    button.classList.add(configurations.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(configurations.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, configurations) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configurations.inputSelector)
  );
  const button = formElement.querySelector(configurations.submitButtonSelector);
  //add event listeners for each input field
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input, configurations);
      toggleButton(inputList, button, configurations);
    });
  });
};

const enableValidation = (configurations) => {
  const formList = Array.from(
    document.querySelectorAll(configurations.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formElement, configurations);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
});
