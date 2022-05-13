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
const popupProfileEdit = '#editPopup';
const formElementEdit = document.querySelector('#editPopup').querySelector('.popup__form');
const popupCardAdd = '#addPopup';
const formElementAdd = document.querySelector('#addPopup').querySelector('.popup__form');
const popupFullSizeImage = '#imagePopup';
const nameInput = document.querySelector('.profile-name');
const jobInput = document.querySelector('.profile-job');
const cardListSelector = '.cards__list';
const cardAddButton = document.querySelector('.profile__add-button');
const cardTemplate = '.card-template';
const components = {
  like: '.card__like-button',
  delete: '.card__delete-button',
  cardImage: '.card__img',
  title: '.card__title'
};
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_is_invalid',
  errorClass: 'popup__input-error_active'
};
const profileInfo = {
  name: '.profile__name',
  job: '.profile__job'
};

export {
    initialCards,
    buttonEdit,
    popupProfileEdit,
    formElementEdit,
    popupCardAdd,
    formElementAdd,
    popupFullSizeImage,
    nameInput,
    jobInput,
    cardListSelector,
    cardAddButton,
    validationSettings,
    components,
    cardTemplate,
    profileInfo
};