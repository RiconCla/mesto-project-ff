//api

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-29",
  headers: {
    authorization: "1ba569ec-32a4-452a-b7a1-f12dce887874",
    "Content-Type": "application/json",
  },
};

//функция проверки запрос
const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

//функция запроса
const request = (endpoint, options = {}) => {
  const url = `${config.baseUrl}${endpoint}`; // Формируем полный URL
  const headers = { ...config.headers, ...options.headers }; // Объединяем заголовки
  return fetch(url, { ...options, headers }) // Выполняем запрос
    .then(handleResponse); // Обрабатываем ответ
};

//функция запроса карточек с сервера
export const getInitialCards = () => {
  return request('/cards') // Вместо прямого fetch
};


//получаем инфо о профиле (себе)
export const getUserInfo = () => {
  return request('/users/me', {
  })
};

//функция отправки обновления профиля на сервер
export const updateUserInfo = ({ name, about }) => {
  return request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify({ name, about })
  })
};

//функция отправки новой карточки на сервер
export const postNewCard = ({ name, link }) => {
  return request('/cards', {
    method: "POST",
    body: JSON.stringify({ name, link }),
  })
};

export const deleteCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
  })
};

export const addLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
  })
};

export const unLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
  })
};

export const updateAvatar = (url) => {
  return request('/users/me/avatar', {
    method: "PATCH",
    body: JSON.stringify({ avatar: url }),
  })
};
