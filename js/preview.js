import { show } from './full-preview.js';

const NEW_POST_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const PICTURES_LIST = document.querySelector('.pictures');
const PostListFragment = document.createDocumentFragment();

const createPostElement = ({ url, likes, comments, description }) => {
  const newPhoto = NEW_POST_TEMPLATE.cloneNode(true);
  newPhoto.querySelector('.picture__img').src = url;
  newPhoto.querySelector('.picture__comments').textContent = comments.length;
  newPhoto.querySelector('.picture__likes').textContent = likes;
  return newPhoto;
};

const attachPreviewHandler = (post, { url, likes, comments, description }) => {
  post.addEventListener('click', (evt) => {
    evt.preventDefault();
    show(url, likes, comments, description);
  });
};


const renderPhotos = (data) => {
 data.forEach((el) => {
    const newPost = createPostElement(el);
    PostListFragment.appendChild(newPost);
    attachPreviewHandler(newPost, el);
  });
  PICTURES_LIST.appendChild(PostListFragment);
};


export {renderPhotos}
