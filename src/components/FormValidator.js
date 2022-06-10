export class FormValidator {
  constructor(configurations, formElement) {
    this._form = formElement;
    this._inputSelector = configurations.inputSelector;
    this._submitButtonSelector = configurations.submitButtonSelector;
    this._inactiveButtonClass = configurations.inactiveButtonClass;
    this._inputErrorClass = configurations.inputErrorClass;
    this._errorClass = configurations.errorClass;
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

  _hasInvalidInputs() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton() {
    this._button.disabled = true;
    this._button.classList.add(this._inactiveButtonClass);
  }

  enableButton() {
    this._button.disabled = false;
    this._button.classList.remove(this._inactiveButtonClass);
  }

  _toggleButton() {
    if (this._hasInvalidInputs()) {
      this._disableButton();
    } else {
      this.enableButton();
    }
  }

  _setEventListeners() {
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._toggleButton();
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
    this._disableButton();
  }

  hideErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
