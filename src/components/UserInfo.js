export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }
  setUserInfo(name, job) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }

  //set up with avatarElement parameter so that image can be added to DOM only after successfully fetched from server
  setUserAvatar(avatarElement, avatar) {
    this._avatar = avatarElement;
    this._avatar.src = avatar;
  }
}
