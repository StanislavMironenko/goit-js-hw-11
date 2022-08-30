import markup from './markup'

export default async function loadMore() {
    await markup();
    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
  

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}