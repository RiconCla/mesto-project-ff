import { openModal } from "./modal.js";

//Функция создания карточки
export function addCard({
  card,
  setDeleteConfirmation,
  handlerСardLike,
  openImageModal,
  myUserId,
  modalDeleteCard
}) {
  //Темплейт карточки
  const cardTamplate = document.querySelector("#card-template").content;
  const cardElement = cardTamplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;
  //находим счетчик лайков карточки
  const cardElementLikeCount = cardElement.querySelector(".card__like-counter");
  //присваемываем карточке полученное кол-во лайков
  cardElementLikeCount.textContent = card.likes.length;

  //обработчик открытия модалки изображения
  cardImage.addEventListener("click", () =>
    openImageModal(card.name, card.link)
  );

  //Находим кнопку удаления
  const cardElementDeleteButton = cardElement.querySelector(
    ".card__delete-button"
  );

  if (card.owner._id !== myUserId) {
    cardElementDeleteButton.remove();
  } else {
    //обработчик для отслеживаняи клика для удаления карточки
    cardElementDeleteButton.addEventListener("click", (evt) => {
      openModal(modalDeleteCard);
      setDeleteConfirmation(cardElement, card._id);
    });
  }

  //Находим кнопку лайка
  const cardElementLike = cardElement.querySelector(".card__like-button");

  if (card.likes.some((element) => element._id === myUserId)) {
    cardElementLike.classList.add("card__like-button_is-active");
  }
  //обработчик для отслеживаняи клика лайка на карточке
  cardElementLike.addEventListener("click", () =>
    handlerСardLike(cardElementLike, card._id, cardElementLikeCount)
  );

  return cardElement;
}

export function checkedStatusLike(buttonLike) {
  return buttonLike.classList.contains("card__like-button_is-active");
}

export function updateStateCounterandLike(
  countLike,
  cardData,
  likeButton,
  myUserId
) {
  likeButton.classList.toggle("card__like-button_is-active");
  countLike.textContent = cardData.likes.length;
}
