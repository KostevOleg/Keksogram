const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1; // Классический вариант возвращение ошибки, Так как функция должно возвращать число она вернет число
  }
  if(max < min) {
    [min, max] = [max, min]
  }
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // Максимум и минимум включаются
};


const stringCount = (text, sing) => text.length <= sing ? true : false ;


const getRandomElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const checkEscapeKey = (evt) => evt.key === ('Escape' || 'Esc')

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const debounce = (cb, delay) => {
  let timerId; // создаем таймер

  // возвраещаем анонимную функцию которая вызывается при каждом вызове дебаунса
  //внутри мы чекаем есть ли уже таймерИД и если есть мы его чистимб отменяя множество запусков колбека
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    //создаем новый таймер
    timerId = setTimeout(() => {
      cb(...args); // отвечает за вызов колбэк функции cb с переданными аргументами
      timerId = null; // обнуляем таймер
    }, delay);
  };
};

export {getRandomNumber, stringCount, getRandomElement, checkEscapeKey, shuffleArray, debounce}
