import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api';
import { getImages } from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.input'),
  loader: document.querySelector('#loader'),
  gallery: document.querySelector('.gallery'),
};

function showLoader() {
  refs.loader.classList.remove('hidden');
}
function hideLoader() {
  refs.loader.classList.add('hidden');
}

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const query = refs.input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  showLoader();

  searchImages(query)
    .then(images => {
      hideLoader();

      if (images.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      } else {
        getImages(images);
      }
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong! Please try again later.',
        position: 'topRight',
        timeout: 5000,
      });
      console.error('Error fetching images:', error);
    });
  refs.form.reset();
});
