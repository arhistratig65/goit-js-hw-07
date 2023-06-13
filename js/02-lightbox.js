import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');

// const galleryMarkup = galleryItems
//   .map(createGalleryItemMarkup)
//   .join('');


const createGalleryItemMarkup = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>
  `;
};
const galleryMarkup = galleryItems.reduce((acc, item) => {
  return acc + createGalleryItemMarkup(item);
}, '');

galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250, captionsData: "alt" });

// console.log(galleryItems);

lightbox.on('show.simplelightbox', function () {
  document.addEventListener('keydown', handleKeyPress);
});

lightbox.on('close.simplelightbox', function () {
  document.removeEventListener('keydown', handleKeyPress);
});

function handleKeyPress(event) {
  if (event.key === 'Escape') {
    lightbox.close();
  }
}