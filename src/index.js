import './css/styles.css';
import cardTpl from './templates/cardTpl.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './js/apiServise';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', onGalleryClick);
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', onFormSubmit);
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click',onClick)
loadMoreBtn.classList.add('is-hidden');

const apiService = new ApiService();


function onFormSubmit(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.elements.searchQuery.value;

  if (apiService.query === '') {
    return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }

  
  apiService.resetPage();
  clearGallery();
  onClick();
}

function onClick() {  
  apiService.fetchPhoto().then(hits => {
    if (hits.length === 0) {
      loadMoreBtn.classList.add('is-hidden');
      return Notify.failure("Sorry, there are no images matching your search query. Please try again.");       
  }
    renderGallery(hits);
   
     if (hits.length > 0) {
      Notify.info(`"Hooray! We found ${apiService.totalHits} images."`);        
    }       
   
    if (hits.length === apiService.totalHits || hits.length > apiService.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      Notify.warning("We're sorry, but you've reached the end of search results.");        
    }
  }).then(smoothScroll);  
  
}

function renderGallery(hits) {
  gallery.insertAdjacentHTML('beforeend', cardTpl(hits));
  loadMoreBtn.classList.remove('is-hidden');
}

function clearGallery() {
  gallery.innerHTML = '';
}

function onGalleryClick(evt) {
  evt.preventDefault();
  let lightbox = new SimpleLightbox('.gallery a');

    lightbox.options.captionsData = 'alt';       
  lightbox.options.captionDelay = 250;
  lightbox.refresh();
    
}

function smoothScroll() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

}

