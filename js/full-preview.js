import { checkEscapeKey } from './itil.js'

const bigPhoto = document.querySelector('.big-picture');
const body = document.querySelector('body');
const comentsList = bigPhoto.querySelector('.social__comments');
const comentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const modalCloseBtn = document.querySelector('.big-picture__cancel');
const comentsLoaderBtn= document.querySelector('.comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
const comentInput = document.querySelector('.social__footer-text');
const comentBtn = document.querySelector('.social__footer-btn');
const likeCounter = document.querySelector('.likes-count')


let comentsArray = []
let commentsToShow  = 5;
let loadedComents;



const createComment = (commentData) => {
  const newComment = comentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = commentData.avatar;
  newComment.querySelector('.social__picture').alt = commentData.name;
  newComment.querySelector('.social__text').textContent = commentData.message;
  return newComment;
};

const showComments = (comments) => {
  comentsList.textContent = ''; // Очищаем содержимое, но не удаляем сам элемент
  comments.slice(0, commentsToShow).forEach((comment) => {
    const newComment = createComment(comment);
    comentsList.appendChild(newComment);
  });

  loadedComents = Array.from(bigPhoto.querySelectorAll('.social__comment'));

  if(comentsArray.length == loadedComents.length) {
    comentsLoaderBtn.style.display = 'none';
  }

  socialCommentCount.textContent = `${loadedComents.length} из ${comentsArray.length} коментариев`


};


const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  modalCloseBtn.removeEventListener('click', closeBigPhoto);
  document.removeEventListener('keydown', checkEscapeKey);
  commentsToShow = 5;
  loadedComents = 0;
  comentsLoaderBtn.style.display = 'block';
}


const show = (url, likes, coments, description) => {
  comentsArray = coments
  body.classList.add('modal-open')
  bigPhoto.querySelector('.big-picture__img > img').src = url;
  bigPhoto.querySelector('.likes-count').textContent = likes;
  bigPhoto.querySelector('.social__caption').textContent = description;
  showComments(coments)
  let numberOfComments = coments.length;
  modalCloseBtn.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', (evt) => {
    if (checkEscapeKey(evt)) {
      closeBigPhoto()
    }
  });
  bigPhoto.classList.remove('hidden');
}

const onClickComentsMore = () => {
  comentsList.textContent = '';
  commentsToShow += 5;
  showComments([... comentsArray].slice(0, commentsToShow));
}




const resetComentForm = () => {
  comentInput.value = '';
}

const createNewComent = () => {
    return {
      id: 1005,
      avatar: 'img/avatar-6.svg',
      message: comentInput.value,
      name: 'Имя пользователя',
    }
}


const sendingComment = () => {
  const comment = createNewComent();
  comentsArray.unshift(comment);
  resetComentForm();
  showComments(comentsArray);
  console.log(comment);
};


likeCounter.addEventListener('click', () => {
  let likes = likeCounter.textContent
  if(likeCounter.classList.contains('likes-count--active')) {
    likeCounter.textContent = Number(likes) - 1;
    likeCounter.classList.remove('likes-count--active');
  } else {
  likeCounter.classList.toggle('likes-count--active');
  likeCounter.textContent = Number(likes) + 1;
  }
})

comentBtn.addEventListener('click', sendingComment)

comentsLoaderBtn.addEventListener('click', onClickComentsMore)


export {show}
