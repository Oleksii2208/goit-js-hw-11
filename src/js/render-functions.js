import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
};

export function getImages(images) {
  gallery.innerHTML = '';

  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" />
        <div class="image-info">
          <p><strong>Likes</strong> ${likes}</p>
          <p><strong>Views</strong> ${views}</p>
          <p><strong>Comments</strong> ${comments}</p>
          <p><strong>Downloads</strong> ${downloads}</p>
        </div>
      </a>`
    )
    .join('');

  gallery.innerHTML = markup;

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'botton',
    captionDelay: 250,
    overlayOpacity: 0.7,
  });

  lightbox.refresh();
}
