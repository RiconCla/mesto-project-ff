
export {openModal, closeModal, checkClickOnOverlay, checkClickEscape, imageModal}
import {modals, modalImagePicture, modalImageDescription, modalImageCard} from '../index.js'

// @todo: Функция открытия модального окна
 function openModal (modal){
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown',checkClickEscape);
  checkClickOnOverlay(modal);
}

// @todo: Функция закрытие модального окна
function closeModal (modal){
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown',checkClickEscape);
}

//Функция проверки клика вне попапа
function checkClickOnOverlay (modal) {
  modal.addEventListener('mousedown',(evt)=> {
    if (evt.currentTarget == evt.target){
      closeModal(evt.currentTarget);
    }
  });
}

//Функция для заккрытия попапов по Escape
function checkClickEscape(evt) {
  if(evt.key === 'Escape') {
    const popupOpened =  Array.from(modals).find(item => item.classList.contains('popup_is-opened'))
    closeModal(popupOpened);
  }
}

//Функция открытия карточки
function imageModal (description, image){
  modalImageDescription.textContent = description;
  modalImagePicture.src = image;
  modalImagePicture.alt = description;
  openModal(modalImageCard);
  checkClickOnOverlay(modalImageCard);
}
