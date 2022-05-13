class UserInfo {
  constructor(selectorProfile) {
  this._userName = document.querySelector(selectorProfile.name);
  this._userJob = document.querySelector(selectorProfile.job);
  }
  
  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    }
    return this._userData;
  }
  
  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._userJob.textContent = item.job;
  }
};

export { UserInfo };