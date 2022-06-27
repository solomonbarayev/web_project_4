import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._submitHandler = submitHandler;
    this._inputList = [...this._formElement.querySelectorAll(".form__input")];
    this._submitButton = this._formElement.querySelector(".form__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    //collects data from all the input fields and returns that data as an object.
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    //It modifies the setEventListeners() parent method. The setEventListeners() method of the
    //PopupWithForm class has to add the submit event handler to the form and the
    //click event listener to the close icon.
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler(this._getInputValues());
    });
    super.setEventListeners();
  }
  close = () => {
    //It modifies the close() parent method in order to reset the form once the popup is closed.
    super.close();
    this._formElement.reset();
  };

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
