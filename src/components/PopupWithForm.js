import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(selectorPopup, handleFormSubmit) {
      super(selectorPopup);
      this._handleFormSubmit = handleFormSubmit;
      this._popupForm = this._popupElement.querySelector('.popup__form');
      this._inputList = this._popupForm.querySelectorAll('.popup__input');
      this._popupSubmitButton = this._popupForm.querySelector('.popup__submit-button');
      this._popupSubmitButtonText = this._popupSubmitButton.textContent
    }
  
    _getInputValues() {
      this._formValues = {};
      this._inputList.forEach(input => {this._formValues[input.name] = input.value});
      return this._formValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  
    close() {
      super.close();
      this._popupForm.reset();
    }

    loading(isLoading) {
      if(isLoading) {
        this._popupSubmitButton.textContent = 'Сохранение...'
      }
      else {
        this._popupSubmitButton.textContent = this._popupSubmitButtonText;
      }
    }
};

export { PopupWithForm };