const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];
const image = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;


//вернет тру если выбран дефолтный фильтр
const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};


//обновляет слайдер, подставляяя значения из текушего эфекта
// передаем ее в функцию где определяется chosenEffect
const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  //если дефолтный обьект скроет див со слайдером
  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};
// проверка на то что если нажат елемент без класса эфект-радиоб ничего не вовзвращает.
// а если с классом то chosenEffect = метод файнд ищет в эфектах нужный обьект у которого имя равно  значению value нажатого обьекта
// предаем колбэком в прослушку изменения инпутов
const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value); // ищем в эфек
  image.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

//если дефолтный установит стайл нон, если  выбраный то подставит нужный
const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get(); // назначаем sliderValue равным значению слайдера
  if (isDefault()) {
    image.style.filter = DEFAULT_EFFECT.style;
  } else {
    image.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  }
  effectLevel.value = sliderValue; // записываем значение слайдера в инпут для отправки
};

// Сбрасываем настройки

const resetEffect = () => {
  sliderContainer.classList.add('hidden');
  image.className = '';
}




// создаем слайдер , а обновляем когда определяем chosenEffect
noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
hideSlider();
//слушаем событие изменения инпутов и переопределяем значения chosenEffect, и обновляем слайдер
effects.addEventListener('change', onEffectsChange);

slider.noUiSlider.on('update', onSliderUpdate);

export {
  resetEffect
}
