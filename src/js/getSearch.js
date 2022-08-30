import ApiService from './pictureApiService';
import markup from './markup';
import { observer } from './observer';
import { guard, form, gallery } from './elementsOfDOM';
export const apiService = new ApiService();


form.addEventListener('submit', getSearch);


export default async function getSearch(e) {
  e.preventDefault();
  apiService.resetPage();

  apiService.query = e.currentTarget.elements.searchQuery.value;

  gallery.innerHTML = '';

  await markup();
  observer.observe(guard);
}




