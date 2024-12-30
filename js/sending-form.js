import { request } from './fetch.js';
import { checkEscapeKey } from './itil.js'
import { closeUploadModal } from './editor.js'
const currentForm = document.querySelector('.img-upload__form'); // находим форму
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success')
const body= document.querySelector('body')

// Функция показа с удалением слушателей при успешной отправке
const onSuccess = () => {
  let successSection = successTemplate.cloneNode(true)
  let closeSuccessSectionBtn = successSection.querySelector('.success__button');
  currentForm.reset()
  const closeSuccessSection = () => {
    successSection.remove();
    closeSuccessSectionBtn.removeEventListener('click', closeSuccessSection);
    document.removeEventListener('keydown', closeSuccessSection);
  };

  closeSuccessSectionBtn.addEventListener('click', closeSuccessSection);
  document.addEventListener('keydown', (evt) => {
    if (checkEscapeKey(evt)) {
      closeSuccessSection()
    }
  });
  closeUploadModal()
  body.appendChild(successSection);
}

//Функция показа с удалением слушателей при ошибке в отправке отправке
const onErorre = () => {
  let errorSection = errorTemplate.cloneNode(true)
  let closeEroreSectionBtn = errorSection.querySelector('.error__button');
  // closeEroreSectionBtn.texContent = 'Перезагрузить сайт '

  const closeErrorSection = () => {
    errorSection.remove();
    closeEroreSectionBtn.removeEventListener('click', closeErrorSection);
    document.removeEventListener('keydown', closeSuccessSection);
  };

  closeEroreSectionBtn.addEventListener('click', closeErrorSection);
  document.addEventListener('keydown', (evt) => {
    if (checkEscapeKey(evt)) {
      closeErrorSection()
    }
  });
  closeUploadModal()
  body.appendChild(errorSection);
}


currentForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  console.log('форма аля улю')
  request (onSuccess, onErorre, 'POST', formData)
});

export { onErorre }
