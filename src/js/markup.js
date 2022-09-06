import Notiflix from 'notiflix';
import { apiService } from './getSearch';
import createCards from './createCards'
import { gallery, guard } from './elementsOfDOM';
import { observer } from './observer';
export  let maxAmountPages = 0;

export default async function markup() {
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
  if (gallery.innerHTML === '' && data.length !== 0) {
    Notiflix.Notify.info(`Hooray! We found ${allData.totalHits} images.`);
  }

  createCards(data);
  if (maxAmountPages === apiService.page - 1) {
    //  refs.btnLoadMore.classList.add('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    return;
  }
    observer.observe(guard);
}
