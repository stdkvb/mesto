import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

//объявление переменных
const buttonEdit = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('#editPopup');
const formElementEdit = popupProfileEdit.querySelector('.popup__form');
const popupCardAdd = document.querySelector('#addPopup');
const formElementAdd = popupCardAdd.querySelector('.popup__form');
const popupFullSizeImage = document.querySelector('#imagePopup');
const popupImage = popupFullSizeImage.querySelector('.popup__image');
const popupDescription = popupFullSizeImage.querySelector('.popup__description');
const nameInput = document.querySelector('[name=profile-name]');
const profileName = document.querySelector('.profile__name');
const jobInput = document.querySelector('[name=profile-job]');
const profileJob = document.querySelector('.profile__job');
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const cardsList = document.querySelector('.cards__list');
const cardAddButton = document.querySelector('.profile__add-button');
const placeNameInput = document.querySelector('[name=placeNameInput]');
const placeLinkInput = document.querySelector('[name=placeLinkInput]');
const popups = document.querySelectorAll('.popup');
const popupSubmitButton = popupCardAdd.querySelector('.popup__submit-button');

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_is_invalid',
  errorClass: 'popup__input-error_active'
};

const components = {
  template: '#card-template',
  like: '.card__like-button',
  delete: '.card__delete-button',
  image: '.card__img',
  title: '.card__title',
  imagePopup: openImagePopup,
};

//создание нового объекта карточки
function createCard(name, link, components) {
  const card = new Card(name, link, components);
  const cardElement = card.generateCard();
  return cardElement;
}

//добавление карточки в разметку
function addCard(item) {
  cardsList.prepend(item);
}

//вывод начальных карточек
initialCards.forEach(function (item) {
  addCard(createCard(item.name, item.link, components));
});

//общая функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

//открытие попапа редактирования профиля
function openEditPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupProfileEdit);
};

//редактирование профиля
function submitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileEdit);   
};

//открытие попапа добавления новой карточки
function openAddPopup() {
  placeNameInput.value='';
  placeLinkInput.value='';
  popupSubmitButton.classList.add('popup__submit-button_inactive');
  popupSubmitButton.setAttribute('disabled', true);
  openPopup(popupCardAdd);
};

//добавление новой карточки
function addSubmitHandler(event) {
  event.preventDefault();
  addCard(createCard(placeNameInput.value, placeLinkInput.value, components));
  closePopup(popupCardAdd);
};


//открытие попапа полной картинки
function openImagePopup(titleValue, imageValue) {
  popupImage.src = imageValue;
  popupImage.alt = titleValue;
  popupDescription.textContent = titleValue;
  openPopup(popupFullSizeImage);
};


//закрытие попапа
const closePopup = function () {
  const popupOpened = document.querySelector('.popup_opened');
  if (popupOpened) {
    popupOpened.classList.remove('popup_opened');
  }
  document.removeEventListener('keydown', closePopupEsc);
};

//закрытие попапа нажатием Esc
const closePopupEsc = function (event) {
  if(event.key === "Escape") {
		closePopup();
  };
};

//закрытие попапа кликом на оверлей
const closePopupClickOverlay = function (event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
};

//валидация формы редактирования профиля
const popupEditFormValidation = new FormValidator(validationSettings,formElementEdit);
popupEditFormValidation.enableValidation();

//валидация формы добавления карточек
const popupCardAddFormValidation = new FormValidator(validationSettings,formElementAdd);
popupCardAddFormValidation.enableValidation();

//обработчики событий
buttonEdit.addEventListener('click', openEditPopup);
popupProfileEdit.addEventListener('submit', submitProfileForm);
cardAddButton.addEventListener('click', openAddPopup);
buttonsClosePopup.forEach((item) => item.addEventListener('click', closePopup));
popupCardAdd.addEventListener('submit', addSubmitHandler);
popups.forEach((item) => item.addEventListener('click', closePopupClickOverlay));

