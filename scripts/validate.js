//////////////////////////////////
//////// Form Validations ////////
//////////////////////////////////

const showInputError = (formElement, input, configurations) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  //add error message
  errorElement.textContent = input.validationMessage;
  //add error class
  errorElement.classList.add(configurations.errorClass);
  input.classList.add(configurations.inputErrorClass);
};

const hideInputError = (formElement, input, configurations) => {
  const errorElement = formElement.querySelector(`.${input.id}-error`);
  //remove error message
  errorElement.textContent = "";
  //remove error class
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

  toggleButton(inputList, button, configurations);

  //add event listeners for each input field
  inputList.forEach((input) => {
    //checking if the inputs that are auto populated are being red as populated
    console.log(input.value.length);

    input.addEventListener("input", () => {
      //check the validity
      checkInputValidity(formElement, input, configurations);
      toggleButton(inputList, button, configurations);
    });
  });
};

const enableValidation = (configurations) => {
  const formList = Array.from(
    document.querySelectorAll(configurations.formSelector)
  );

  //prevent Default behavior for every form
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
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
