import { Popup } from './Popup.js';

class PopupDeleteCard extends Popup {
    constructor(selectorPopup, handleFormSubmit) {
        super(selectorPopup);
        this._popupForm = this._popupElement.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._callBack();
            this.close();
        })
    }

    setSubmitProcessing(call) {
        this._callBack = call;
    }
};

export { PopupDeleteCard };