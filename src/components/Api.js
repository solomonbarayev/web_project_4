class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => res.ok && res.json())
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => res.ok && res.json())
      .catch((err) => console.log(err));
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => res.ok && res.json())
      .catch((err) => console.log(err));
  }

  setUserAvatar(url) {
    // Send the following PATCH request to change the profile picture:
    // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    // In the request body, pass the JSON with a single property, avatar. This property should contain a link to the new profile picture. In the case that anything other than a link is sent, the server will return an error.
    // When the user hovers over their profile picture, the edit icon should appear on it:
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: url,
      }),
    })
      .then((res) => res.ok && res.json())
      .catch((err) => console.log(err));
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.ok && res.json())
      .catch((err) => console.log(err));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) => res.ok && res.json())
      .catch((err) => console.log(err));
  }

  // likeCard(cardId) {
  //   return fetch(`${this._baseUrl}/likes/${cardId}`, {
  //     headers: this._headers,
  //     method: "PUT",
  //     body: JSON.stringify(),
  //   })
  //     .then((res) => res.ok && res.json())
  //     .catch((err) => console.log(err));
  // }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-1",
  headers: {
    authorization: "2aae8d26-8315-4517-953d-28905b81f143",
    "Content-Type": "application/json",
  },
});
