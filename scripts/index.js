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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function renderCard(initialCards) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardsList = document.querySelector('.cards__list');
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__img').src = initialCards.link;
  card.querySelector('.card__title').textContent = initialCards.name;
  cardsList.appendChild(card);
}

function renderCards() {
  initialCards.forEach(renderCard);
}

renderCards();






  

