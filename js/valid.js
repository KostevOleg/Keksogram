const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
}

const hashtagInput = document.querySelector('.text__hashtags');
const comentInput = document.querySelector('.text__description');
const formBtn = document.querySelector('#upload-submit');
const form = document.querySelector('.img-upload__form');

// функция которая отменят закрытие формы если импут в фокусу и отнимает у него фокус
const stopPropEsc = (el) => {
  el.addEventListener('keydown', (evt) => {
    if(evt.key === Keys.ESC || evt.key === Keys.ESCAPE) {
      evt.stopPropagation()
      el.blur()
    }
  })
}
stopPropEsc(hashtagInput)
stopPropEsc(comentInput)

hashtagInput.addEventListener('input', () => {
  // Устанавливаем начальное значение валидности поля ввода
  hashtagInput.setCustomValidity('');

  // Получаем текст из поля ввода, удаляем лишние пробелы и приводим к нижнему регистру
  let inputText = hashtagInput.value.trim().toLowerCase();
  // Разбиваем текст на массив по пробелам
  let inputArray = inputText.split(' ');

  // Проверяем, начинается ли каждый хэш-тег с символа '#'
  const isStartNotHashtag = inputArray.some((item) => item[0] !== '#');
  if (isStartNotHashtag) {
      hashtagInput.setCustomValidity('Хэш-тег должен начинаться с символа #');
      hashtagInput.style.boxShadow = '0 0 8px red';
  } else {
    hashtagInput.style.boxShadow = '';
  }

  // Проверяем, что хотя бы один хэш-тег не состоит только из символа '#'
  const isStartHash = inputArray.some((item) => item === '#');
  if (isStartHash) {
      hashtagInput.setCustomValidity('Хеш-тег не может состоять только из одной решетки (#)');
      hashtagInput.style.boxShadow = '0 0 8px red';
  } else {
    hashtagInput.style.boxShadow = '';
  }

  // Проверяем, что длина каждого хэш-тега не превышает 20 символов
  const lengthHash = inputArray.some((item) => item.length > 20);
  if (lengthHash) {
      hashtagInput.setCustomValidity('Максимальная длина хэш-тега 20 символов, включая символ #');
      hashtagInput.style.boxShadow = '0 0 8px red';
  } else {
    hashtagInput.style.boxShadow = '';
  }

  // Проверяем, что количество хэш-тегов не превышает 5
  if (inputArray.length > 5) {
      hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      hashtagInput.style.boxShadow = '0 0 8px red';
  } else {
    hashtagInput.style.boxShadow = '';
  }

  // Проверяем, разделяются ли хэш-теги пробелами
  const hashtagsSeparatedBySpace = inputArray.some((item) => item.indexOf('#', 1) >= 0);
  if (hashtagsSeparatedBySpace) {
      hashtagInput.setCustomValidity('Хэш-теги должны разделяться пробелами');
      hashtagInput.style.boxShadow = '0 0 8px red';
  } else {
    hashtagInput.style.boxShadow = '';
  }

  // Проверяем, есть ли дубликаты хэш-тегов в массиве
  const duplicates = inputArray.filter((item, index) => inputArray.indexOf(item) !== index);
  if (duplicates.length > 0) {
      hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      hashtagInput.style.boxShadow = '0 0 8px red';
  } else {
    hashtagInput.style.boxShadow = '';
  }

  // Проверяем, содержит ли строка после символа '#' только буквы и цифры
  const isSpecialSimbol = (inputText) => {
      return /[!@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(inputText);
  }
  if (isSpecialSimbol(inputText)) {
      hashtagInput.setCustomValidity('Строка после символа # должна содержать только буквы и цифры');
      hashtagInput.style.boxShadow = '0 0 8px red';
  } else {
    hashtagInput.style.boxShadow = '';
  }
});


comentInput.addEventListener('input', function() {
  // Проверка условия невалидности
  if (textarea.value.length > 140) {
      // Установка пользовательского сообщения о невалидности
      textarea.setCustomValidity('Текст  не должен содержать более 140 символов');
      // Установка стиля (красная рамка)
      hashtagInput.style.boxShadow = '0 0 8px red';
  } else {
      // Сброс пользовательского сообщения о невалидности
      textarea.setCustomValidity('');
      // Удаление стиля (возвращение к стандартной рамке)
      hashtagInput.style.boxShadow = '';
  }
});





 // Можно и так но setCustomValidity не красивый
// hashtagInput.addEventListener('input', () => {
//   // Устанавливаем начальное значение валидности поля ввода
//   hashtagInput.setCustomValidity('');

//   // Получаем текст из поля ввода, удаляем лишние пробелы и приводим к нижнему регистру
//   let inputText = hashtagInput.value.trim().toLowerCase();
//   // Разбиваем текст на массив по пробелам
//   let inputArray = inputText.split(' ');

//   // Проверяем, начинается ли каждый хэш-тег с символа '#'
//   const isStartNotHashtag = inputArray.some((item) => item[0] !== '#');
//   const isStartHash = inputArray.some((item) => item === '#');
//   const lengthHash = inputArray.some((item) => item.length > 20);
//   const hashtagsSeparatedBySpace = inputArray.some((item) => item.indexOf('#', 1) >= 0);
//   const duplicates = inputArray.filter((item, index) => inputArray.indexOf(item) !== index);
//   const isSpecialSymbol = (inputText) => /[!@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(inputText);

//   // Проверяем, что хотя бы одно условие не выполняется и устанавливаем соответствующее сообщение
//   if (isStartNotHashtag || isStartHash || lengthHash || hashtagsSeparatedBySpace || duplicates.length > 0 || isSpecialSymbol(inputText)) {
//       // Устанавливаем сообщение о невалидности
//       hashtagInput.setCustomValidity('Пожалуйста, введите корректные хэш-теги');
//       // Устанавливаем красную рамку
//       hashtagInput.style.boxShadow = '0 0 8px red';
//   } else {
//       // Если все условия выполняются, снимаем сообщение о невалидности
//       hashtagInput.setCustomValidity('');
//       // Убираем красную рамку
//       hashtagInput.style.boxShadow = '';
//   }
// });


