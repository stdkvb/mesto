import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popupElement.querySelector('.popup__image');
      this._popupCaption = this._popupElement.querySelector('.popup__description');
    }
  
    open({name, link}) {
      super.open();
      this._popupImage.src = link;
      this._popupImage.alt = `Фотография загруженная пользователем`;
      this._popupCaption.textContent = name;
    }
  
  };

  export { PopupWithImage };