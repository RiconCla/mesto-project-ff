//api

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: '1ba569ec-32a4-452a-b7a1-f12dce887874',
    'Content-Type': 'application/json'
  }
}

//функция запроса карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse)
  .then((data) => {
    return data;
  })
}

//функция запроса
const handleResponse = (response) => {
  if(response.ok){
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

//получаем инфо о профиле (себе)
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse)
  .then((data => {
    return data;
  }))
}

//функция отправки обновления профиля на сервер
export const updateUserInfo = ({name, about}) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({name, about})
  })
  .then(handleResponse)
  .then((data => {
    return data;
  }))
};

//функция отправки новой карточки на сервер
export const postNewCard = ({name, link}) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({name, link})
  })
  .then(handleResponse)
  .then((data => {
    return data;
  }))
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then(handleResponse)
}


export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT',
  })
  .then(handleResponse)
  .then((data => {
    return data;
  }))
}

export const unLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then(handleResponse)
  .then((data => {
    return data;
  }))
}

export const updateAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({avatar: url})
  })
  .then(handleResponse)
  .then((data => {
    return data;
  }));
}