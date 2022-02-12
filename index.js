let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
function popupOpen() {
    formElement.classList.add('popup_opened');
}
editButton.addEventListener('click', popupOpen);
function popupClose() {
   formElement.classList.remove('popup_opened');
}
closeButton.addEventListener('click', popupClose);

let nameInput = document.querySelector('.popup__name-input');
let profileName = document.querySelector('.profile__name');
nameInput.value = profileName.textContent;

let jobInput = document.querySelector('.popup__job-input');
let profileJob = document.querySelector('.profile__job');
jobInput.value = profileJob.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', popupClose);

let likeButton = document.querySelector('.element__like-button');
function like() {
    likeButton.classList.toggle('element__like-button_active');
}
likeButton.addEventListener('click', like);