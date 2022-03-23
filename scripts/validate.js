//проверка формы на валидность всех инпутов
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//активация кнопки после проверки на валидность
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-button_inactive');
    } else {
        buttonElement.classList.remove('popup__submit-button_inactive');
    };
};

//поиск элемента ошибки
const getErrorElement = (inputElement) => {
    return inputElement.closest('.popup__form-section').querySelector('.popup__input-error');
}

//отображение ошибки валидации
const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = getErrorElement(inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
    inputElement.classList.add('popup__input_is_invalid');
};

//скрытие ошибки валидации
const hideError = (formElement, inputElement) => {
    const errorElement = getErrorElement(inputElement);
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
    inputElement.classList.remove('popup__input_is_invalid');
};

//валидация инпутов
const checkValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showError(formElement, inputElement, errorMessage);
    } else {
        hideError(formElement, inputElement);
    };
};

//слушатели

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (event) => {
            checkValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = document.querySelectorAll('.popup__form');
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });

        setEventListeners(formElement);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
  });

