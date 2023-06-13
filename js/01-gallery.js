import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const galleryRef = document.querySelector(".gallery");

// const galleryMarkup = galleryItems
//   .map(createGalleryItemMarkup)
//   .join('');

const createGalleryItemMarkup = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
};
const galleryMarkup = galleryItems.reduce((acc, item) => {
  return acc + createGalleryItemMarkup(item);
}, "");

galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);

galleryRef.addEventListener("click", lightBox);

function lightBox(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const img = event.target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${img}" width="800" height="600">
`);

  instance.show();

  galleryRef.addEventListener("keydown", escClick);

  function escClick(event) {
    console.log(event.key, event.code);
    if (event.key === "Escape") {
      instance.close();
    }
  }
}
