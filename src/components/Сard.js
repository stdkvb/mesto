class Card {
  constructor({ data,  handleCardClick, handleDeleteClick, handleLikeCard, handleDislikeCard }, components, template, userID) {
    this._templateContent = document.querySelector(template).content;
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner.name;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDislikeCard = handleDislikeCard;
    this._like = components.like;
    this._delete = components.delete;
    this._cardImage = components.cardImage;
    this._title = components.title;
    this._likeCounter = components.likeCounter;
    this.deleteCard = this.deleteCard.bind(this);
    this._userID = userID;
    this._ownerID = data.owner._id;
    this._cardID = data._id;
  }

  //копирование шаблона карточки
  _getTemplate() {
    const cardElement = this._templateContent.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  //наполнение шаблона карточки
  generateCard() {
    this._element = this._getTemplate();
    this._elementDeleteButton = this._element.querySelector(this._delete);
    this._elementLikeButton = this._element.querySelector(this._like);
    this._elementCardImage = this._element.querySelector(this._cardImage);
    this._elementTitle = this._element.querySelector(this._title);
    this._elementLikeCounter = this._element.querySelector(this._likeCounter);
    this._elementTitle.textContent = this._name;
    this._elementCardImage.src = this._link;
    this._elementCardImage.alt = `Картинка «${this._name}» пользователя ${this._ownerUser}`;
    this._elementLikeCounter.textContent = this._likes.length;
    
    if(this._userID !== this._ownerID) {
      this._elementDeleteButton.classList.add('card__delete-button_disable');
    }

    if(this._likes.some(like => like._id === this._userID)) {
      this._elementLikeButton.classList.add('card__like-button_active');
    }
   
    this._setEventListeners();
    return this._element;
  
  }

  //лайк карточки
  like() {
    this._elementLikeButton.classList.add('card__like-button_active');
  }

  dislike() {
    this._elementLikeButton.classList.remove('card__like-button_active');
  }

  likesCounter(likes) {
    if (likes.length === 0) {
      this._elementLikeCounter.textContent = "0";
    } else {
    this._elementLikeCounter.textContent = likes.length;
    }
  }

  //удаление карточки
  deleteCard() {
    this._element.remove();
    this.element = null;
  }
  
  //слушатели событий
  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => {
      if (this._elementLikeButton.classList.contains('card__like-button_active')) {
        this._handleDislikeCard();
      } else {
        this._handleLikeCard();
      };
    });  
    this._elementDeleteButton.addEventListener('click', () => this._handleDeleteClick());
    this._elementCardImage.addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));
  }
  
};

export { Card };