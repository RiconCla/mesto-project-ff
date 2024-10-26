
export { openModal, closeModal, setupClickOnOverlay, checkClickEscape }

// @todo: Функция открытия модального окна
 function openModal (modal){
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown',checkClickEscape);
}

// @todo: Функция закрытие модального окна
function closeModal (modal){
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown',checkClickEscape);
}

//Функция проверки клика вне попапа
function setupClickOnOverlay (modal) {
  modal.addEventListener('mousedown',(evt)=> {
    if (evt.currentTarget == evt.target){
      closeModal(evt.currentTarget);
    }
  });
}

//Функция для закрытия попапов по Escape
function checkClickEscape(evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
}