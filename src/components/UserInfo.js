class UserInfo {
  constructor(selectorProfile) {
  this._userName = document.querySelector(selectorProfile.name);
  this._userAbout = document.querySelector(selectorProfile.about);
  this._userAvatar = document.querySelector(selectorProfile.avatar);
  }
  
  getUserValues() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    }
  } 
  
  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._userAbout.textContent = item.about;
    this.setUserAvatar(item);
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
  }
};

export { UserInfo };