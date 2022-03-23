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
const popupCardAdd = document.querySelector('#addPopup');
const popupFullSizeImage = document.querySelector('#imagePopup');
const popupImage = popupFullSizeImage.querySelector('.popup__image');
const popupDescription = popupFullSizeImage.querySelector('.popup__description');
const nameInput = document.querySelector('[name=profile-name]');
const profileName = document.querySelector('.profile__name');
const jobInput = document.querySelector('[name=profile-job]');
const profileJob = document.querySelector('.profile__job');
const cardTemplate = document.querySelector('#card-template');
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const cardsList = document.querySelector('.cards__list');
const cardAddButton = document.querySelector('.profile__add-button');
const placeNameInput = document.querySelector('[name=placeNameInput]');
const placeLinkInput = document.querySelector('[name=placeLinkInput]');
const popups = document.querySelectorAll('.popup');

//создание карточки
function renderCard(titleValue, imageValue) {
  const createCard = cardTemplate.content.cloneNode(true);
  createCard.querySelector('.card__title').textContent=titleValue;
  const cardImage = createCard.querySelector('.card__img');
  cardImage.src=imageValue;
  cardImage.alt=titleValue;
  //лайк карточки
  const cardLikeButton = createCard.querySelector('.card__like-button');
  cardLikeButton.addEventListener ('click', function (event) {
    event.target.classList.toggle('card__like-button_active');
  });
  //удаление карточки
  const cardDeleteButton = createCard.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener ('click', function (event) {
    event.target.closest('.card').remove();
  });
  //просмотр фото
  cardImage.src = imageValue;
  cardImage.addEventListener('click', () =>
    openImagePopup(titleValue, imageValue)
  );
  return createCard;
};

//вывод начальных карточек
initialCards.forEach((item) =>
  cardsList.append(renderCard(item.name, item.link))
);

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

//открытие попапа полной картинки
function openImagePopup(titleValue, imageValue) {
  popupImage.src = imageValue;
  popupImage.alt = titleValue;
  popupDescription.textContent = titleValue;
  openPopup(popupFullSizeImage);
};

//открытие попапа добавления новой карточки
function openAddPopup() {
  placeNameInput.value='';
  placeLinkInput.value='';
  openPopup(popupCardAdd);
};

//добавление новой карточки
function addSubmitHandler(event) {
  event.preventDefault();
  cardsList.prepend(renderCard(placeNameInput.value, placeLinkInput.value));
  closePopup(popupCardAdd);
};

//закрытие попапа
const closePopup = function () {
  const popupOpened = document.querySelector('.popup_opened');
  if (popupOpened) {
    popupOpened.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
  }
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

//обработчики событий
buttonEdit.addEventListener('click', openEditPopup);
popupProfileEdit.addEventListener('submit', submitProfileForm);
cardAddButton.addEventListener('click', openAddPopup);
buttonsClosePopup.forEach((item) => item.addEventListener('click', closePopup));
popupCardAdd.addEventListener('submit', addSubmitHandler);
popups.forEach((item) => item.addEventListener('click', closePopupClickOverlay));

