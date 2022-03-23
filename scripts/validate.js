//проверка формы на валидность всех инпутов
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

//активация кнопки после проверки на валидность
const toggleButtonState = (inputList, buttonElement, formComponents) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(formComponents.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(formComponents.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    };
};

//отображение ошибки валидации
const showError = (formElement, inputElement, errorMessage, formComponents) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formComponents.errorClass);
    inputElement.classList.add(formComponents.inputErrorClass);
};

//скрытие ошибки валидации
const hideError = (formElement, inputElement, formComponents) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(formComponents.errorClass);
    inputElement.classList.remove(formComponents.inputErrorClass);
};

//валидация инпутов
const checkValidity = (formElement, inputElement, formComponents) => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showError(formElement, inputElement, errorMessage, formComponents);
    } else {
        hideError(formElement, inputElement, formComponents);
    };
};

//слушатели
const setEventListeners = (formElement, formComponents) => {
    const inputList = Array.from(formElement.querySelectorAll(formComponents.inputSelector));
    const buttonElement = formElement.querySelector(formComponents.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, formComponents);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (event) => {
            checkValidity(formElement, inputElement, formComponents);
            toggleButtonState(inputList, buttonElement, formComponents);
        });
    });
};

enableValidation = (formComponents) => {
    const formList = document.querySelectorAll(formComponents.formSelector);
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        setEventListeners(formElement, formComponents);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_is_invalid',
    errorClass: 'popup__input-error_active'
  });

