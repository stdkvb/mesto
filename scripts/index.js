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

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#editPopup');
const addPopup = document.querySelector('#addPopup');
const imagePopup = document.querySelector('#imagePopup')
const nameInput = document.querySelector('[name=profile-name]');
const profileName = document.querySelector('.profile__name');
const jobInput = document.querySelector('[name=profile-job]');
const profileJob = document.querySelector('.profile__job');

//открытие попапа редактирования профиля
function editPopupOpen() {
    editPopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
editButton.addEventListener('click', editPopupOpen);

//редактирование профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose(editPopup);   
}
editPopup.addEventListener('submit', formSubmitHandler);

//закрытие попапа
const popups = Array.from(document.querySelectorAll('.popup'));
const closeButtons = popups.map((item) =>
  item.querySelector('.popup__close-button'));
function popupClose(popup) {
   popup.classList.remove('popup_opened');
  }
closeButtons.forEach((item) => 
  item.addEventListener('click', () => popupClose(item.closest('.popup')))
);

//вывод начальных карточек
const cardsList = document.querySelector('.cards__list');
initialCards.forEach((item) =>
  cardsList.append(renderCard(item.name, item.link))
);

function renderCard(titleValue, imageValue) {
  //создание карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const createCard = cardTemplate.cloneNode(true);
  createCard.querySelector('.card__title').textContent=titleValue;
  createCard.querySelector('.card__img').src=imageValue;
  //лайк карточки
  const likeButton = createCard.querySelector('.card__like-button');
  likeButton.addEventListener ('click', function (event) {
    event.target.classList.toggle('card__like-button_active');
  });
  //удаление карточки
  const deleteButton = createCard.querySelector('.card__delete-button');
  deleteButton.addEventListener ('click', function (event) {
    event.target.closest('.card').remove();
  });
  //просмотр фото
  const cardImage = createCard.querySelector('.card__img');
  cardImage.src = imageValue;
  cardImage.addEventListener("click", () =>
    imagePopupOpen(titleValue, imageValue)
  );
  return createCard;
}

//открытие попапа добавления новой карточки
const addButton = document.querySelector('.profile__add-button');
function addPopupOpen() {
  addPopup.classList.add('popup_opened');
  placeNameInput.value='';
  placeLinkInput.value='';
}
addButton.addEventListener('click', addPopupOpen);

//добавление новой карточки
const placeNameInput = document.querySelector('[name=placeNameInput]');
const placeLinkInput = document.querySelector('[name=placeLinkInput]');
function addSubmitHandler(event) {
  event.preventDefault();
  cardsList.prepend(renderCard(placeNameInput.value, placeLinkInput.value));
  popupClose(addPopup);
}
addPopup.addEventListener('submit', addSubmitHandler);

//открытие попапа картинки
function imagePopupOpen(titleValue, imageValue) {
  imagePopup.querySelector('.popup__image').src = imageValue;
  imagePopup.querySelector('.popup__description').textContent = titleValue;
  imagePopup.classList.add('popup_opened');
}
