export class FormValidator {
  constructor(configurations, formElement) {
    this._inputSelector = configurations.inputSelector;
    this._submitButtonSelector = configurations.submitButtonSelector;
    this._inactiveButtonClass = configurations.inactiveButtonClass;
    this._inputErrorClass = configurations.inputErrorClass;
    this._errorClass = configurations.errorClass;

    this._form = formElement;
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasOnlyValidInputs() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _enableButton() {
    this._button.disabled = true;
    this._button.classList.add(configurations.inactiveButtonClass);
  }

  _disableButton() {
    this._button.disabled = false;
    this._button.disabled = false;
    this._button.classList.remove(configurations.inactiveButtonClass);
  }

  _toggleButton() {
    if (this._hasOnlyValidInputs(this._inputList)) {
      this._enableButton(this._submitButtonSelector, configurations);
    } else {
      this._disableButton(this._submitButtonSelector, configurations);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._button = this._form.querySelector(this._submitButtonSelector);

    this._toggleButton();

    //add event listeners for each input field
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
  }

  resetFormButton() {
    this._enableButton();
  }

  hideErrorsOnOpen() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

export const configurations = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};
