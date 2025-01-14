import "./styles/index.css";
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  postNewCard,
  deleteCard,
  addLike,
  unLike,
  updateAvatar,
} from "./components/api.js";
import {
  addCard,
  checkedStatusLike,
  updateStateCounterandLike,
} from "./components/card.js";
import {
  openModal,
  closeModal,
  setupClickOnOverlay,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
//Находим все попапы
const modals = document.querySelectorAll(".popup");
//Попап профиля
const modalProfile = document.querySelector(".popup_type_edit");
//Попап нового места
const modalNewCard = document.querySelector(".popup_type_new-card");
//Попап открытой карточки
const modalImageCard = document.querySelector(".popup_type_image");
//Попап удаления карточки
const modalDeleteCard = document.querySelector(".popup_type_delete");
//Попап изменения аватара
const modalProfileImage = document.querySelector(".popup_type_edit-avatar");

//Находим элемент с изображением(Попап открытой карточки)
const modalImagePicture = modalImageCard.querySelector(".popup__image");
//Находим элемент с описанием карточки(Попап открытой карточки)
const modalImageDescription = modalImageCard.querySelector(".popup__caption");

//Форма редактирования профиля
const formEditProfile = document.forms["edit-profile"];
//Получаем доступ к полю "Имя" в форме редактирования профиля
const formProfileInputName = formEditProfile.elements.name;
//Получаем доступ к полю "Описание" в форме редактирования профиля
const formProfileInputDescription = formEditProfile.elements.description;
//Получаем дсотуп к кнопке отправки данных
const formProfileSubmitButton = formEditProfile.querySelector(".popup__button");

//Получаем доступ к значению "Имя" в профиле
const profileName = document.querySelector(".profile__title");
//Получаем доступ к значению "Описание" в профиле
const profileDescription = document.querySelector(".profile__description");

//Форма добавления новой карточки
const formNewCard = document.forms["new-place"];
//Получаем доступ к полю "Название" в форме создания карточки
const formNewCardInputName = formNewCard.elements["place-name"];
//Получаем доступ к полю "Ссылка на картинку" в форме создания карточки
const formNewCardInputLink = formNewCard.elements.link;
//Получаем дсотуп к кнопке отправки данных
const formNewCardSubmitButton = formNewCard.querySelector(".popup__button");

//Находим Кнопку профиль
const profileEditButton = document.querySelector(".profile__edit-button");
//Находим кнопку добавления новой карточки
const addCardButton = document.querySelector(".profile__add-button");

//Форма yастройки аватара
const profileImageForm = document.forms["edit-avatar"];
//Получаем доступ к полю ссылки для изменения аватара
const profileImageInput = profileImageForm.elements.avatar;
//Находим кнопку изменения/сохранения аватара
const profileImageFormSubmitButton = profileImageForm.querySelector(".popup__button");
//Получаем доступ к аватарке профиля
const profileAvatar = document.querySelector(".profile__image");

//Форма удаления карточки
const formDeleteCard = document.forms["delete-card"];

//функция отправки формы "профиль"
function handlerEditProfile(evt) {
  evt.preventDefault();
  renderLoading({ buttonElement: formProfileSubmitButton, isLoading: true });
  updateUserInfo({
    name: formProfileInputName.value,
    about: formProfileInputDescription.value,
  })
    .then(({ name, about, avatar }) => {
      setProfile({ name, about, avatar });
      closeModal(modalProfile);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: formProfileSubmitButton,
        isLoading: false,
      });
    });
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([{ name, about, avatar, ["_id"]: myUserId }, cardsData]) => {
    setProfile({ name, about, avatar });

    cardsData.forEach((card) => {
      placesList.append(
        addCard({
          card,
          setDeleteConfirmation,
          handlerСardLike,
          openImageModal,
          myUserId,
          modalDeleteCard,
        })
      );
    });
    formNewCard.addEventListener("submit", (evt) =>
      handlerAddNewCard(evt, myUserId)
    );
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

//функция отправки формы "Новое место"
function handlerAddNewCard(evt, myUserId) {
  evt.preventDefault();
  renderLoading({ buttonElement: formNewCardSubmitButton, isLoading: true });
  const newCard = {
    name: formNewCardInputName.value,
    link: formNewCardInputLink.value,
  };
  postNewCard(newCard)
    .then((newCard) => {
      renderNewCard(newCard, myUserId);
      closeModal(modalNewCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: formNewCardSubmitButton,
        isLoading: false,
      });
    });
}

//функция добавления нового места (из формы) в начало списка
function renderNewCard(card, myUserId) {
  placesList.prepend(
    addCard({
      card,
      setDeleteConfirmation,
      handlerСardLike,
      openImageModal,
      myUserId,
      modalDeleteCard,
    })
  );
}

//Слушатель на форму редактирования автара
profileImageForm.addEventListener("submit", handlerUpdateAvatar);

//Слушатель на форму редактирования профиля
formEditProfile.addEventListener("submit", handlerEditProfile);

//Слушатель на кнопку "+"(Добавление новой карточки)
addCardButton.addEventListener("click", () => {
  formNewCard.reset();
  clearValidation(modalNewCard, validationConfig);
  openModal(modalNewCard);
});

//Слушатель на кнопку "Редактировать профиль"
profileEditButton.addEventListener("click", () => {
  clearValidation(formEditProfile, validationConfig);
  formProfileInputName.value = profileName.textContent;
  formProfileInputDescription.value = profileDescription.textContent;
  openModal(modalProfile);
});

//Слушатель на кнопку "редактировать аватар"
profileAvatar.addEventListener("click", () => {
  profileImageForm.reset();
  clearValidation(modalProfileImage, validationConfig);
  openModal(modalProfileImage);
});

//Слушатель на форму удаления карточки
formDeleteCard.addEventListener("submit", handlerDeleteCard);

let currentCard;
let cardId;

// Функция установки текущей карточки для удаления
function setDeleteConfirmation(cardElement, id) {
  currentCard = cardElement;
  cardId = id;
}

function handlerDeleteCard(evt) {
  evt.preventDefault();
  if (!cardId || !currentCard) return;
  deleteCard(cardId)
    .then(() => {
      currentCard.remove();
      closeModal(modalDeleteCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      currentCard = null; // Сброс
      cardId = null; // Сброс
    });
}

//Функция для инициализации слушателей для кнопок "крестик"
const addListenerModalDeleteButton = (modal) => {
  const button = modal.querySelector(".popup__close");
  button.addEventListener("click", () => {
    closeModal(modal);
  });
};

//Функция открытия карточки
function openImageModal(description, image) {
  modalImageDescription.textContent = description;
  modalImagePicture.src = image;
  modalImagePicture.alt = description;
  openModal(modalImageCard);
}

//Каждому попапу добавляем класс плавной анимации и вещаем обработчики на кнопки закрытия внутри попапов
modals.forEach((item) => {
  item.classList.add("popup_is-animated");
  addListenerModalDeleteButton(item);
  setupClickOnOverlay(item);
});

//конфиг валидации для форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

enableValidation(validationConfig);

//функция вставки инфы профиля
const setProfile = ({ name, about, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = about;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
};

//Функция лайка карточки
function handlerСardLike(likeButton, cardId, countLike, myUserId) {
  const isLiked = checkedStatusLike(likeButton); // Проверяем текущее состояние лайка
  const result = isLiked ? unLike : addLike;
  result(cardId)
    .then((cardsData) => {
      updateStateCounterandLike(countLike, cardsData, likeButton, myUserId);
    })
    .catch((error) => {
      console.error(error);
    });
}

//функция обновления аватара
function handlerUpdateAvatar(evt) {
  evt.preventDefault();
  renderLoading({
    buttonElement: profileImageFormSubmitButton,
    isLoading: true,
  });
  updateAvatar(profileImageInput.value)
    .then(({ name, about, avatar }) => {
      setProfile({ name, about, avatar });
      closeModal(modalProfileImage);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileImageFormSubmitButton,
        isLoading: false,
      });
    });
}

//Функция отображения "загрузки" на кнопке
const renderLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
};
