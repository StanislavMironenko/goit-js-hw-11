import ApiService from './pictureApiService';
import markup from './markup';
import { observer } from './observer';
import { guard, form, gallery } from './elementsOfDOM';
import Notiflix from 'notiflix';
export const apiService = new ApiService();

form.addEventListener('submit', getSearch);


export default async function getSearch(e) {
  e.preventDefault();
  let searchValue = e.currentTarget.elements.searchQuery.value.trim();
  if (searchValue === apiService.query || searchValue==='') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      apiService.resetPage();
      
      apiService.query = e.currentTarget.elements.searchQuery.value.trim();
      
      gallery.innerHTML = '';
      console.log("getSearch!!!")
      markup();
    } 
    observer.disconnect(guard);

 
}




