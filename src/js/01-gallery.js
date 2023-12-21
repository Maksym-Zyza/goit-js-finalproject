import { galleryItems } from "./gallery-items.js";
const gallery = document.querySelector(".gallery");

// 1) Create and render gallery markup
const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
  )
  .join("");
gallery.innerHTML = galleryMarkup;

// 2) Delegating to ul.gallery and getting the url of the large image
gallery.addEventListener("click", handlerOpenImg);

function handlerOpenImg(evt) {
  if (evt.target === evt.currentTarget) return;
  evt.preventDefault();

  const currentImg =
    evt.target.closest(".gallery__item").children[0].children[0];
  const { source } = currentImg.dataset;
  const image = galleryItems.find(({ original }) => original === source);
  showImgModal(image);
}

function showImgModal({ original, description }) {
  const instance = basicLightbox.create(`
    <div class="modal">
      <img width="100%" height="100%" src="${original}" alt="${description}">
    </div>
  `);

  instance.show();

  function keyboardEvtListener(evt) {
    evt.code === "Escape" && instance.close();
  }

  document.addEventListener("keydown", keyboardEvtListener);
  closeImgModal(instance, keyboardEvtListener);
}

function closeImgModal(keyboardEvtListener) {
  document.addEventListener("keydown", (evt) => {
    if (evt.code === "Escape" && keyboardEvtListener) {
      document.removeEventListener("keydown", keyboardEvtListener);
    }
  });
}
