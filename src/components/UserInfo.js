class UserInfo {
  constructor(selectorProfile) {
  this._userName = document.querySelector(selectorProfile.name);
  this._userJob = document.querySelector(selectorProfile.job);
  }
  
  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    }
  } 
  
  setUserInfo({name, job}) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
};

export { UserInfo };