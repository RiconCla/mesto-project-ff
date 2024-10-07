// @todo: Темплейт карточки
const cardTamplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard ({name, link}, handlerDelete) {
  const cardElement = cardTamplate.querySelector('.card').cloneNode(true);
  const cardName = cardElement.querySelector('.card__title').textContent = name;
  const cardImage = cardElement.querySelector('.card__image').src = link;
  cardImage.src = name;
  const cardElementDeleteButton = cardElement.querySelector('.card__delete-button');
  cardElementDeleteButton.addEventListener('click', handlerDelete);
  
  return cardElement;
}

// @todo: Функция удаления карточки
function cardDelete (event){
  const target = event.target.closest('.card');
  target.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const card = addCard(item, cardDelete)
  placesList.append(card);
});



