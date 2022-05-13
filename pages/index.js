import { Card } from '../scripts/Сard.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { UserInfo } from '../scripts/UserInfo.js';

import {    
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
} from '../utils/constants.js';

const popupImage = new PopupWithImage(popupFullSizeImage);
popupImage.setEventListeners()

//создание нового объекта карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      popupImage.open(data);
    }
  }, components, cardTemplate);
  return card.generateCard();
}

//добавление карточек в разметку
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  }
}, cardListSelector)
cardList.setItems();

//добавление новой карточки
const popupFormAddCard = new PopupWithForm(popupCardAdd, handleSubmitForm => {
  const card = createCard(handleSubmitForm);
  cardList.addItem(card);
}
)
popupFormAddCard.setEventListeners()

//редактирование профиля
const userInfo = new UserInfo(profileInfo)
const popupFormEditProfile = new PopupWithForm(popupProfileEdit, handleSubmitForm => {
    userInfo.setUserInfo(handleSubmitForm);
  }
)

popupFormEditProfile.setEventListeners();

//валидация формы редактирования профиля
const popupEditFormValidation = new FormValidator(validationSettings,formElementEdit);
popupEditFormValidation.enableValidation();

//валидация формы добавления карточек
const popupCardAddFormValidation = new FormValidator(validationSettings,formElementAdd);
popupCardAddFormValidation.enableValidation();

//обработчики событий
cardAddButton.addEventListener('click', () => {
  popupCardAddFormValidation.resetValidation();
  popupFormAddCard.open();
});

buttonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupEditFormValidation.resetValidation();
  popupFormEditProfile.open();
});