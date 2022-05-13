import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(selectorPopup, handleFormSubmit) {
      super(selectorPopup);
      this._handleFormSubmit = handleFormSubmit;
    }
  
    _getInputValues() {
      this._inputList = this._popupForm.querySelectorAll('.popup__input');
      this._formValues = {};
      this._inputList.forEach(input => {this._formValues[input.name] = input.value});
      return this._formValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._popupForm = this._popupElement.querySelector('.popup__form');
      this._popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      });
    }
  
    close() {
      super.close();
      this._popupForm.reset();
    }
};

export { PopupWithForm };