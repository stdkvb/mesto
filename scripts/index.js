let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form')
let closeButton = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__input_profile_name');
let profileName = document.querySelector('.profile__name');
let jobInput = document.querySelector('.popup__input_profile_job');
let profileJob = document.querySelector('.profile__job');

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
editButton.addEventListener('click', popupOpen);


function popupClose() {
   popup.classList.remove('popup_opened');   
}
closeButton.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();   
}
form.addEventListener('submit', formSubmitHandler,);

