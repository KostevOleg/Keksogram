const uploadInput = document.querySelector('#upload-file');
const previewPhoto = document.querySelector('.img-upload__preview > img');
const effectPrew = document.querySelectorAll('.effects__preview'); //работаем с бакраунд image
const CORRECT_EXTENSIONS_NAMES = ['jpeg', 'png', 'gif', 'jpg']

const DIMENSIONS_PREVIEW = {
  WIDHT: '600',
  HEIGHT: '600'
}

uploadInput.addEventListener('change', (evt) => {

  const file = uploadInput.files[0];
  const nameFile = file.name.toLowerCase();
  const matches = CORRECT_EXTENSIONS_NAMES.some((it) => nameFile.endsWith(it));

  if(matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewPhoto.src = reader.result;
      previewPhoto.width = DIMENSIONS_PREVIEW.WIDHT;
      previewPhoto.height = DIMENSIONS_PREVIEW.HEIGHT;
      previewPhoto.style.backgroundSize = 'cover';
      effectPrew.forEach(element => {
        element.style.backgroundImage = `url(${reader.result})`
      });
    })
    reader.readAsDataURL(file)
  }
})
