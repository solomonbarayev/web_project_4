import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    //collects data from all the input fields and returns that data as an object.
    this._inputList = [...this._formElement.querySelectorAll(".form__input")];
    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    //It modifies the setEventListeners() parent method. The setEventListeners() method of the PopupWithForm class has to add the submit event handler to the form and the click event listener to the close icon.
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
  close = () => {
    //It modifies the close() parent method in order to reset the form once the popup is closed.
    this._formElement.reset();
    super.close();
  };
}
