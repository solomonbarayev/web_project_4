export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
    console.log(this._avatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      title: this._profileJob.textContent,
    };
  }
  setUserInfo(name, job) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }

  //set up with avatarElement parameter so that image can be added to DOM only after successfully fetched from server
  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setAvatarVisible() {
    this._avatar.style.visibility = "visible";
  }
}
