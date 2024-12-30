import './itil.js';
import './preview.js';
import './full-preview.js';
import './effect.js';
import './editor.js';
import './valid.js'
import './sending-form.js'
import './fetch.js'
import './show-new-photo.js'

import { renderPhotos } from './preview.js';
import { request } from './fetch.js';
import { shuffleArray, debounce } from './itil.js'
const DEFAULT_PREVIEW_LOAD = 25;
const RANDOM_PREVIEW_LOAD = 10;
const DELEY_TIME = 300;

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
const filtrBlock = document.querySelector('.img-filters');
const filterBtns = filtrBlock.querySelectorAll('button')
let photos = [];


const removeActiveClass = () => {
  filterBtns.forEach((el) => {
    el.classList.remove('img-filters__button--active')
  })
}

const removePhotos = () => {
  let images = document.querySelectorAll('.picture')
  if (images) {
    images.forEach(el => {
      el.remove()
    })
  }
}

const filtres = {
'filter-default': () => renderPhotos(photos.slice(0, DEFAULT_PREVIEW_LOAD)),
'filter-discussed': () => renderPhotos(photos.slice().sort((a, b) => b.comments.length  - a.comments.length)),
'filter-random': () => renderPhotos(shuffleArray(photos.slice()).slice(0, RANDOM_PREVIEW_LOAD)),
}


const onSuccess = (data) => {
 photos = data;
 renderPhotos(photos.slice())
 filtrBlock.classList.remove('img-filters--inactive');
}


const onError = (data) => {
  let erorrReceivingData = errorTemplate.cloneNode(true)
  let closeEroreReceivingBtn = erorrReceivingData.querySelector('.error__button');
  let erorTitle = erorrReceivingData.querySelector('.error__title').textContent = 'Проблема с сервером';
  closeEroreReceivingBtn.textContent = 'Перезагрузить сайт';

  const closeErrorRecievingSection = () => {
    window.location.reload();
    erorrReceivingData.remove();
    closeEroreReceivingBtn.removeEventListener('click', closeErrorRecievingSection);

  };
  closeEroreReceivingBtn.addEventListener('click', closeErrorRecievingSection);
  body.appendChild(erorrReceivingData);
}

request (onSuccess, onError, 'GET',)

const onFilterClickClasses = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
  removeActiveClass()
  evt.target.classList.add('img-filters__button--active');
}
}

const onFilterClick =  debounce((evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    removePhotos()
    filtres[evt.target.id]()
  }
}, DELEY_TIME )

filtrBlock.addEventListener('click', onFilterClick)

filtrBlock.addEventListener('click', onFilterClickClasses)
