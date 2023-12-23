import { galleryItems } from "./gallery-items.js";
const gallery = document.querySelector(".gallery");

// 1) Create and render gallery markup
const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
       </li>`
  )
  .join("");
gallery.innerHTML = galleryMarkup;

// 2)Initializing
const lightbox = new SimpleLightbox(".gallery a", {
  captions: true,
  captionType: "attr",
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});
