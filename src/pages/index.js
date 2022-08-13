import './index.css';
import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import {
  avatarEditButton,
  popupEditAvatar,
  formElementAvatarEdit,
  buttonEdit,
  popupProfileEdit,
  formElementEdit,
  popupCardAdd,
  formElementAdd,
  popupFullSizeImage,
  popupDeleteCard,
  nameInput,
  jobInput,
  cardListSelector,
  cardAddButton,
  validationSettings,
  components,
  cardTemplate,
  profileInfo
} from '../utils/constants.js';

//подключение к серверу
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
  authorization: 'dbcecacf-b1f5-45b4-b0c5-067f006cc586',
  'Content-Type': 'application/json'
  }
});

let userID;
const userInfo = new UserInfo(profileInfo);

api.getData()
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData)
    userID = userData._id;
    cardList.setItems(cardsData);
  })
  .catch(err => console.log(err))

//фулсайз картинка
const popupImage = new PopupWithImage(popupFullSizeImage);
popupImage.setEventListeners()

//удаление карточки
const popupDelete = new PopupDeleteCard(popupDeleteCard);
popupDelete.setEventListeners()

//создание нового объекта карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      popupImage.open(data);
    },
    handleDeleteClick: () => {
      popupDelete.open();
      popupDelete.setSubmitProcessing(() => {
        api.deleteCard(data._id)
          .then(() => {
            card.deleteCard();
            popupDelete.close();
          })
          .catch(err => console.log(err));
      })
    },
    handleLikeCard: () => {
      api.likeCard(data._id)
        .then((res) => {
          card.likesCounter(res.likes);
          card.like();
        })
        .catch(err => console.log(err));
    },
    handleDislikeCard: () => {
      api.dislikeCard(data._id)
        .then((res) => {
          card.likesCounter(res.likes);
          card.dislike();
        })
        .catch(err => console.log(err));
    }
  }, components, cardTemplate, userID);
  return card.generateCard();
}

//добавление карточек в разметку
const cardList = new Section({
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card);
  }
}, cardListSelector)

//редактирование аватара
const popupFormAvatarEdit = new PopupWithForm(popupEditAvatar, (link) => {
  popupFormAvatarEdit.loading(true);
  api.editAvatar(link)
    .then((data) => {
      userInfo.setUserAvatar(data);
      popupFormAvatarEdit.close();
    })
    .finally(() => popupFormAvatarEdit.loading(false))
    .catch(err => console.log(err))
})
popupFormAvatarEdit.setEventListeners();

//добавление новой карточки
const popupFormAddCard = new PopupWithForm(popupCardAdd, card => {
  popupFormAddCard.loading(true);
  api.addCard(card)
    .then(data => {
      const card = createCard(data);
      cardList.addItem(card);
      popupFormAddCard.close();
    })
    .then(() => popupFormAddCard.loading(false))
    .catch(err => console.log(err))
})
popupFormAddCard.setEventListeners()

//редактирование профиля
const popupFormEditProfile = new PopupWithForm(popupProfileEdit, values => {
  popupFormEditProfile.loading(true);
    api.setUserInfo(values)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupFormEditProfile.close();
      })
      .finally(() => popupFormEditProfile.loading(false))
      .catch((err) => console.log(err))
  })
popupFormEditProfile.setEventListeners();

//валидация формы редактирования профиля
const popupEditFormValidation = new FormValidator(validationSettings,formElementEdit);
popupEditFormValidation.enableValidation();

//валидация формы добавления карточек
const popupCardAddFormValidation = new FormValidator(validationSettings,formElementAdd);
popupCardAddFormValidation.enableValidation();

//валидация формы редактированя аватара
const popupEditAvatarValidation = new FormValidator(validationSettings,formElementAvatarEdit);
popupEditAvatarValidation.enableValidation();

//обработчики событий
avatarEditButton.addEventListener('click', () => {
  popupEditAvatarValidation.resetValidation();
  popupFormAvatarEdit.open();
})

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
