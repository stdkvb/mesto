class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    _errorHandle(res) {
        if(res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка № ${res.ok} – ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          method: "GET",
          headers: this._headers
        })
          .then(this._errorHandle)
    }

    setUserInfo() {
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

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
          method: "GET",
          headers: this._headers
        })
          .then(this._errorHandle)
    }

};

export { Api };