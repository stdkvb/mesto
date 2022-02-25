//попап редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('#edit-popup');
const form = document.querySelector('.popup__form')
const editCloseButton = document.querySelector('[name=editPopupCloseButton]');
const nameInput = document.querySelector('[name=profile-name]');
const profileName = document.querySelector('.profile__name');
const jobInput = document.querySelector('[name=profile-job]');
const profileJob = document.querySelector('.profile__job');

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
editButton.addEventListener('click', popupOpen);

function popupClose() {
   popup.classList.remove('popup_opened'); 
  }
editCloseButton.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupClose();   
}
form.addEventListener('submit', formSubmitHandler);

//карточки мест
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

//попап добавления новой карточки
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('#add-popup');
const addCloseButton = document.querySelector('[name=addPopupCloseButton]');
const placeNameInput = document.querySelector('[name=place-name]');
const placeLinkInput = document.querySelector('[name=place-link]');

function addPopupOpen() {
  addPopup.classList.add('popup_opened');
}
addButton.addEventListener('click', addPopupOpen);

function addPopupClose() {
  addPopup.classList.remove('popup_opened');   
}
addCloseButton.addEventListener('click', addPopupClose);

function addSubmitHandler (evt) {
  evt.preventDefault();
  initialCards.unshift({
    name: placeNameInput.value,
    link: placeLinkInput.value
  });
  addPopupClose();
  renderCard(initialCards[0]);
}
const cardAddForm = document.querySelector('[name=cardAddForm]')
cardAddForm.addEventListener('submit', addSubmitHandler);

//лайк карточек
const likeButton = document.querySelector('.card__like-button'); 
const likeButtons = Array.from(document.querySelectorAll('.card__like-button'));
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_active');
  });
});





  

