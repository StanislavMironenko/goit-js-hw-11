import { gallery } from './elementsOfDOM';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import card from '../template/card.hbs';
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


export default async function createCards(data) {

const cards = card(data)


  gallery.insertAdjacentHTML('beforeend', cards);
  lightbox.refresh();
}
