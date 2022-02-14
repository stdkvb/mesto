let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__name-input');
let profileName = document.querySelector('.profile__name');
let jobInput = document.querySelector('.popup__job-input');
let profileJob = document.querySelector('.profile__job');

function popupOpen() {
    formElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
editButton.addEventListener('click', popupOpen);


function popupClose() {
   formElement.classList.remove('popup_opened');   
}
closeButton.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    formElement.classList.remove('popup_opened');
}
formElement.addEventListener('submit', formSubmitHandler,);

