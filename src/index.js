import ApiService from './js/pictureApiService';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  // btnLoadMore: document.querySelector('.load-more'),
  guard: document.querySelector('.js-guard'),
};
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const options = {
  root: null,
  rootMargin: '500px',
  threshold: 1,
};
const observer = new IntersectionObserver(createNewList, options);
const apiService = new ApiService();
let maxAmountPages = 0;

refs.form.addEventListener('submit', getSearch);
// refs.btnLoadMore.addEventListener('click', loadMore);




function getSearch(e) {
    e.preventDefault();  
    
    apiService.resetPage();
    apiService.query = e.currentTarget.elements.searchQuery.value;
    refs.gallery.innerHTML = '';
  
    markup();    
 observer.observe(refs.guard);
}

// async function loadMore() {
//  await markup();
//  const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();
  

//   window.scrollBy({
//     top: cardHeight *2,
//     behavior: 'smooth',
//   }, );
// }
async function markup() {
  const allData = await apiService.getPicture();
  const data = await allData.hits;
  maxAmountPages = Math.ceil(allData.totalHits / apiService.per_page);

  if (data.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
//  if (maxAmountPages > 1) {
//    refs.btnLoadMore.classList.remove('is-hidden');
//  }
if (refs.gallery.innerHTML === '' && data.length !== 0) {
  Notiflix.Notify.info(`Hooray! We found ${allData.totalHits} images.`);
}

createCards(data);
if (maxAmountPages === apiService.page - 1) {
  //  refs.btnLoadMore.classList.add('is-hidden');
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
return
}
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
        return `<div class="photo-card">            
  <a class="gallery__item"
        href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: </b>${likes}
    </p>
    <p class="info-item">
      <b>Views: </b>${views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b> ${downloads}
    </p>
  </div></div>
`;
      }
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', cards);
   lightbox.refresh();
}
function createNewList(entries) {
  console.log(entries)
  entries.forEach(entry => {
    if(entry.isIntersecting){
      if (maxAmountPages === apiService.page - 1) {   
             return
      };
    markup();
    }
  });
};


