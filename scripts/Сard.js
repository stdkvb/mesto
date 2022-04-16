class Card {
    constructor (name, link, components) {
        this._title = name;
        this._link = link;
        this._template = components.template;
        this._like = components.like;
        this._delete = components.delete;
        this._image = components.image;
        this._titleCard = components.title;
        this._openImagePopup = components.imagePopup;
  }

  //копирование шаблона карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  //наполнение шаблона карточки
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(this._image);
    this._elementTitle = this._element.querySelector(this._titleCard);
    this._elementLikeButton = this._element.querySelector(this._like);
    this._elementDeleteButton = this._element.querySelector(this._delete);
    this._elementImage.src = this._link;
    this._elementImage.alt = this._link;
    this._elementTitle.textContent = this._title;
    this._setEventListeners();
    return this._element;
  }

  //лайк карточки
  _likeCard() {
    this._elementLikeButton.classList.toggle('card__like-button_active');
  }

  //удаление карточки
  _deleteCard() {
    this._element.remove();
  }

  //слушатели событий
  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._elementDeleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._elementImage.addEventListener('click', () => {
      this._openImagePopup(this._title, this._link);
    });
  };
};

export { Card };