const getErrorElement = (inputElement) => {
    return inputElement.closest('.popup__form-section').querySelector('.popup__input-error');
}

const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = getErrorElement(inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
    inputElement.classList.add('popup__input_is_invalid');
};

const hideError = (formElement, inputElement) => {
    const errorElement = getErrorElement(inputElement);
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
    inputElement.classList.remove('popup__input_is_invalid');
};

const checkValidity = (formElement, inputElement) => {
    console.log(inputElement.validity);
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showError(formElement, inputElement, errorMessage);
    } else {
        hideError(formElement, inputElement);
    };
};

const setEventListeners = (formElement) => {
    const inputList = formElement.querySelectorAll('.popup__input');
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (event) => {
            console.log(event.target.name, event.target.value);

            checkValidity(formElement, inputElement);
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

enableValidation ();