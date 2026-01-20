import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


// Seçiciler
const form = document.querySelector("#searchForm");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector("#loader");

// SimpleLightbox örneği
const lightbox = new SimpleLightbox(".gallery a");

// API isteği fonksiyonu
async function fetchImages(query) {
  const API_KEY = "54263025-950edd76720feea70ed7c80b6"; // kendi anahtarını buraya koy
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.hits;
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
    });
    console.error(error);
    return [];
  }
}

// Form submit olayı
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = e.target.query.value.trim();
  if (!query) return;

  gallery.innerHTML = ""; // önceki sonuçları temizle
  showLoader();

  const images = await fetchImages(query);

  hideLoader();

  if (images.length === 0) {
    iziToast.info({
      title: "Info",
      message:
        "Sorry, there are no images matching your search query. Please try again!",
    });
    return;
  }

  renderGallery(images);
  lightbox.refresh();
});

// Galeri render fonksiyonu
function renderGallery(images) {
  const markup = images
    .map(
      (img) => `
      <li class="gallery-item">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${img.likes}</p>
          <p><b>Views:</b> ${img.views}</p>
          <p><b>Comments:</b> ${img.comments}</p>
          <p><b>Downloads:</b> ${img.downloads}</p>
        </div>
      </li>
    `
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
}

// Loader kontrolü
function showLoader() {
  loader.classList.remove("hidden");
}
function hideLoader() {
  loader.classList.add("hidden");
}
