import { cardAddButton } from "../utils/constants";

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    getData() {
      return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    _errorHandle(res) {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          method: "GET",
          headers: this._headers
        })
          .then(this._errorHandle)
    }

    setUserInfo(userInfo) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: userInfo.name,
            about: userInfo.about
          })
        })
          .then(this._errorHandle)
    }

    editAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            avatar: link.avatar
          })
        })
          .then(this._errorHandle)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          method: "GET",
          headers: this._headers
        })
          .then(this._errorHandle)
    }

    addCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: card.name,
            link: card.link
          })
        })
          .then(this._errorHandle)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
          method: "DELETE",
          headers: this._headers
        })
          .then(this._errorHandle)
    }

    likeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: "PUT",
          headers: this._headers
        })
          .then(this._errorHandle)
    }

    dislikeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: "DELETE",
          headers: this._headers
        })
          .then(this._errorHandle)
    }
};
 
export { Api };