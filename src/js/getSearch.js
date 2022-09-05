import ApiService from './pictureApiService';
import markup from './markup';
import { observer } from './observer';
import { guard, form, gallery } from './elementsOfDOM';
export const apiService = new ApiService();
import Notiflix from 'notiflix';

form.addEventListener('submit', getSearch);


export default async function getSearch(e) {
  e.preventDefault();
  let searchValue = e.currentTarget.elements.searchQuery.value;
  if (searchValue === apiService.query) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.')
      return
    } else {
    apiService.resetPage();
    
    apiService.query = e.currentTarget.elements.searchQuery.value;

  gallery.innerHTML = '';

  await markup();
  observer.observe(guard);
  } 
}




