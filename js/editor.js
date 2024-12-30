import { resetEffect } from './effect.js'


const uploadModal = document.querySelector('.img-upload__overlay')
const uploadInput = document.querySelector('#upload-file');
const body = document.querySelector('body');
const CloseUploadModalBtn = document.querySelector('#upload-cancel');
const scaleValue = document.querySelector('.scale__control--value');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview > img');

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
}

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
}


const resetSetting = () => {
  imgPreview.style.filter = '';
  imgPreview.style = 'transform: scale(1.00)'
  uploadInput.value = '';
};

const closeUploadModal = () => {
  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');
  resetSetting()
  resetEffect()
};

const OpenUploadModal = () => {
  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleValue.value = '100%'
}

// const showChoosePhoto = (evt) => {
//   const file = evt.target.files[0]
//   console.log(file)
// }


//по изменению инпута открываем модалку и подписываемся на закрытие модалки
uploadInput.addEventListener('change', (evt) => {
  OpenUploadModal();

  const selectedFile = evt.target.files[0]; // Получаем выбранный файл

  console.log(selectedFile); // Выводим информацию о файле в консоль

  CloseUploadModalBtn.addEventListener('click', () => {
    closeUploadModal();
  });
  document.addEventListener('keydown', (evt) => {
    if(evt.key === Keys.ESC || evt.key === Keys.ESCAPE) {
      closeUploadModal();
      evt.stopPropagation();
    }
  });
});



//  Зум изображения

const changeScale = (direction) => {
  let scale = parseInt(scaleValue.value);
  const step = Scale.STEP * (direction === 'bigger' ? 1 : -1);

  scale += step;
  if (scale >= Scale.MAX) {
    scale = Scale.MAX;
  } else if (scale <= Scale.MIN) {
    scale = Scale.MIN;
  }

  scaleValue.value = scale + '%';
  scale /= 100;
  imgPreview.style.transform = `scale(${scale})`;
};

scaleBiggerBtn.addEventListener('click', () => {
  changeScale('bigger');
});

scaleSmallerBtn.addEventListener('click', () => {
  changeScale('smaller');
});


export { closeUploadModal }
