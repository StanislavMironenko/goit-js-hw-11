import { maxAmountPages } from './markup';
import { apiService } from './getSearch';
import markup from './markup';

const options = {
  root: null,
  rootMargin: '500px',
  threshold: 1,
};
export const observer = new IntersectionObserver(createNewList, options);

function createNewList(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (maxAmountPages === apiService.page - 1) {
        return;
      }
      markup();
    }
  });
}
