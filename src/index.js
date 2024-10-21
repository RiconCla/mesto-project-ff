import './styles/index.css';
import { initialCards, addCard, cardDelete, cardLike } from './components/cards.js'
import { openModal, closeModal, checkClickOnOverlay, checkClickEscape, imageModal} from './components/modal.js'


// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
//Находим все попапы
export const modals = document.querySelectorAll('.popup');
//Попап профиля
const modalProfile = document.querySelector('.popup_type_edit');
//Попап нового места
const modalNewCard = document.querySelector('.popup_type_new-card');
//Попап открытой карточки
export const modalImageCard = document.querySelector('.popup_type_image');
//Находим элемент с изображением(Попап открытой карточки)
export const modalImagePicture = modalImageCard.querySelector('.popup__image');
//Находим элемент с описанием карточки(Попап открытой карточки)
export const modalImageDescription = modalImageCard.querySelector('.popup__caption');

//Форма редактирования профиля
const formEditProfile = document.forms['edit-profile']
//Получаем доступ к полю "Имя" в форме редактирования профиля
const formProfileInputName = formEditProfile.elements.name;
//Получаем доступ к полю "Описание" в форме редактирования профиля
const formProfileInputDescription = formEditProfile.elements.description;

//Получаем доступ к значению "Имя" в профиле
const profileName = document.querySelector('.profile__title');
//Получаем доступ к значению "Описание" в профиле
const profileDescription = document.querySelector('.profile__description');

//Форма добавления новой карточки
const formNewCard = document.forms['new-place'];
//Получаем доступ к полю "Название" в форме создания карточки
const formNewCardInputName = formNewCard.elements['place-name'];
//Получаем доступ к полю "Ссылка на картинку" в форме создания карточки
const formNewCardInputLink = formNewCard.elements.link;

//Находим Кнопку профиль
const profileEditButton = document.querySelector('.profile__edit-button');
//Находим кнопку добавления новой карточки
const addCardButton = document.querySelector('.profile__add-button');


//функция отправки формы "профиль"
function handlerEditProfile(evt){
  evt.preventDefault();
  profileName.textContent = formProfileInputName.value;
  profileDescription.textContent = formProfileInputDescription.value;
  closeModal(modalProfile);
};

//функция отправки формы "Новое место"
function handlerAddNewCard(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = formNewCardInputName.value;
  newCard.link = formNewCardInputLink.value;
  renderNewCard(newCard);
  closeModal(modalNewCard);
  formNewCard.reset();
}

//функция добавления нового места (из формы) в начало списка
function renderNewCard(card) {
  placesList.prepend(addCard(card, cardDelete, cardLike, imageModal));
}

//Слушатель на форму редактирования профиля
formEditProfile.addEventListener('submit', handlerEditProfile);

//Слушатель на форму добавления нового места
formNewCard.addEventListener('submit', handlerAddNewCard);

//Слушатель на кнопку "+"(Добавление новой карточки)
addCardButton.addEventListener('click',() => {
  openModal(modalNewCard);
});

//Слушатель на кнопку "Редактировать профиль"
profileEditButton.addEventListener('click',() => {
  formProfileInputName.value = profileName.textContent;
  formProfileInputDescription.value = profileDescription.textContent;
  openModal(modalProfile);
});

//Функция для инициализации слушателей для кнопок "крестик"
const addListenerModalDeleteButtons = (modal) => {
  const button = modal.querySelector('.popup__close');
  button.addEventListener('click',() => {
    closeModal(modal);
  });
}

//Вывод карточек на страницу из объекта
initialCards.forEach((item) => {
  const card = addCard(item, cardDelete, cardLike, imageModal);
  placesList.append(card);
});

//Каждому попапу добавляем класс плавной анимации
Array.from(modals).forEach(item => item.classList.add('popup_is-animated'));

//Вешаем обработчики на кнопки закрытия внутри попапов
addListenerModalDeleteButtons(modalProfile);
addListenerModalDeleteButtons(modalNewCard);
addListenerModalDeleteButtons(modalImageCard);


