class UserInfo {
  constructor(selectorProfile) {
  this._userName = document.querySelector(selectorProfile.name);
  this._userAbout = document.querySelector(selectorProfile.about);
  }
  
  getUserValues() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    }
  } 
  
  setUserInfo({name, about}) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }
};

export { UserInfo };