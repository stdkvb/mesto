import './index.css';
import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';



import {
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

//API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
  authorization: 'dbcecacf-b1f5-45b4-b0c5-067f006cc586',
  'Content-Type': 'application/json'
  }
});

//фулсайз картинка
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
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  }
}, cardListSelector)

api.getInitialCards()
  .then((cardsData) => {
    cardList.setItems(cardsData)
  })

//добавление новой карточки
const popupFormAddCard = new PopupWithForm(popupCardAdd, formSubmit => {
  const card = createCard(formSubmit);
  cardList.addItem(card);
}
)
popupFormAddCard.setEventListeners()

//редактирование профиля
const userInfo = new UserInfo(profileInfo)
const popupFormEditProfile = new PopupWithForm(popupProfileEdit, values => {
    api.setUserInfo(values)
      .then((data) => {
        userInfo.setUserInfo(data)
      })
      .catch((err) => console.log(err));
  }
)

api.getUserInfo()
  .then(values => {
    userInfo.setUserInfo(values)
  })
  .catch(err => {console.log(err)})

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
  const {name, about} = userInfo.getUserValues();
  nameInput.value = name;
  jobInput.value = about;
  popupEditFormValidation.resetValidation();
  popupFormEditProfile.open(); 
});
