import ApiService from './js/pictureApiService';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  btnLoadMore: document.querySelector('.load-more'),
};
var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'tags',
  captionDelay: 250,
});

const apiService = new ApiService();
//
refs.form.addEventListener('submit', getSearch);
refs.btnLoadMore.addEventListener('click', loadMore);

function getSearch(e) {
    e.preventDefault();
    console.log(refs.btnLoadMore.classList);
    refs.btnLoadMore.classList.remove('is-hidden');
  apiService.resetPage();
  apiService.query = e.currentTarget.elements.searchQuery.value;
  refs.gallery.innerHTML = '';

  try {
    markup();
  } catch (error) {
    console.log(error);
  }
}

function loadMore() {
  markup();
}
async function markup() {
    const allData = await apiService.getPicture();
    if (refs.btnLoadMore.classList.contains('.is-hidden')) {
        console.log("hello")
        Notiflix.Notify.failure(`Hooray! We found ${allData.totalHits} images.`);
    }
  const data = await allData.hits;

  if (data.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  createCards(data);
}

function createCards(data) {
  const cards = data
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => {
        return ` <a class="gallery__item"
        href="${largeImageURL}">            
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</a>`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', cards);
}



refs.gallery.addEventListener('click', e => {
    e.preventDefault();
    lightbox.open()
  lightbox.on('show.simplelightbox', function () {
   console.log("hello")
  });
  console.log(e.currentTarget);
  console.log(e.target);
});
