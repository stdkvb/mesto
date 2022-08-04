class Card {
  constructor({ data,  handleCardClick, handleDeleteClick }, components, template, userID) {
    this._templateContent = document.querySelector(template).content;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._like = components.like;
    this._delete = components.delete;
    this._cardImage = components.cardImage;
    this._title = components.title;
    this.deleteCard = this.deleteCard.bind(this);
    this._userID = userID;
    this._ownerID = data.owner._id;
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
    this._elementTitle.textContent = this._name;
    this._elementCardImage.src = this._link;
    this._elementCardImage.alt = this._link;
    if(this._userID !== this._ownerID) {
      this._elementDeleteButton.classList.add('card__delete-button_disable');
    }
    this._setEventListeners();
    return this._element;
  }

  //лайк карточки
  _likeCard() {
    this._elementLikeButton.classList.toggle('card__like-button_active');
  }

  //удаление карточки
  deleteCard() {
    this._element.remove();
    this.element = null;
  }
  
  //слушатели событий
  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => this._likeCard());
    this._elementDeleteButton.addEventListener('click', () => this._handleDeleteClick());
    this._elementCardImage.addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));
  }
};

export { Card };