class FormValidator {
    constructor (validationSettings, form) {
        this._validationSettings = validationSettings;
        this._form = form;
        this._button = this._form.querySelector(this._validationSettings.submitButtonSelector);
        this._inputs = Array.from(this._form.querySelectorAll(this._validationSettings.inputSelector));
  }

  //проверка формы на валидность всех инпутов
  _hasInvalidInput() {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //активация кнопки после проверки на валидность
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._validationSettings.inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    } else {
      this._button.classList.remove(this._validationSettings.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
  }
  
  //отображение ошибки валидации
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.classList.add(this._validationSettings.errorClass);
  }

  //скрытие ошибки валидации
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorClass);    
  }

  //валидация инпутов
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //слушатели
  _setEventListeners = () => {
    this.toggleButtonState();
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    }

  resetValidation() {
    this.toggleButtonState();
    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
};

export { FormValidator };