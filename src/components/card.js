 //Функция создания карточки
 export function addCard ({ name, link }, handlerDelete, handlerLike, handlerImagePopup) {
  //Темплейт карточки
  const cardTamplate = document.querySelector('#card-template').content;
  const cardElement = cardTamplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  cardTitle.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  //обработчик открытия модалки изображения
  cardImage.addEventListener('click', () => handlerImagePopup(name, link));

  //Находим кнопку удаления  
  const cardElementDeleteButton = cardElement.querySelector('.card__delete-button');
  //обработчик для отслеживаняи клика для удаления карточки
  cardElementDeleteButton.addEventListener('click', handlerDelete);
  //Находим кнопку лайка
  const cardElementLike = cardElement.querySelector('.card__like-button');
  //обработчик для отслеживаняи клика лайка на карточке
  cardElementLike.addEventListener('click', handlerLike);

  return cardElement;
}

//Функция лайка карточки
export function cardLike (evt) {
  const like = evt.target;
  like.classList.toggle('card__like-button_is-active');
}

//Функция удаления карточки
export function cardDelete (evt){
  const target = evt.target.closest('.card');
  target.remove();
};