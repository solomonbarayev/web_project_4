import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
  // constructor(popupSelector) {
  //   super(popupSelector);
  //   // this._submitHandler = submitHandler;
  // }

  setAction(action) {
    this._submitHandler = action;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitHandler();
      this.close();
    });
    super.setEventListeners();
  }
}
