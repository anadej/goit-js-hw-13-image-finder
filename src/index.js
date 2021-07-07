import './sass/main.scss';

import imgCardTpl from './tpl/img-card.handlebars';
import fetchImages from './apiService.js';
import debounce from 'lodash.debounce';

import { error, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  searchFormRef: document.querySelector('.search-form_input'),
  galleryRef: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

refs.searchFormRef.addEventListener('input', debounce(onInputImgSearch, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMore);
let page = 1;
let inputQuery;

function onInputImgSearch(e) {
  refs.galleryRef.innerHTML = '';
  inputQuery = e.target.value;
  fetchImages(inputQuery).then(data => {
    checkLastPage(data);
    renderGallery(data);
  });
}

function onLoadMore() {
  fetchImages(inputQuery, ++page).then(data => {
    checkLastPage(data);
    renderGallery(data);
  });
  scrollIntoView(); //прокрутка к последней li
}

function scrollIntoView() {
  refs.galleryRef.lastElementChild.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function checkLastPage({ totalHits }) {
  if (page === Math.ceil(totalHits / 12)) {
    alert({
      text: 'Download last page',
      delay: 1000,
    });
    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }
  if (totalHits === 0) {
    alert({
      text: 'No images found!',
      delay: 1000,
    });
    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function renderGallery({ hits }) {
  refs.galleryRef.insertAdjacentHTML('beforeend', imgCardTpl(hits));
}
