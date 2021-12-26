import './css/styles.css';
import debounce from 'lodash.debounce';
import API from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryListTpl from './templates/countryList.hbs';
import countryCardTpl from './templates/countryCard.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('div.country-info');
inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value.trim();
    console.log(searchQuery);

    countryInfo.innerHTML = '';
    countryList.innerHTML = '';

    if (searchQuery) {
        API.fetchCountries(searchQuery)
        .then(searchCountry)
        .catch(onFetchError)
    }
    
}

function searchCountry(countryName) { 
    const list = countryListTpl(countryName);
    const card = countryCardTpl(countryName);
    if (countryName.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name');    
    };
    if (1 < countryName.length && countryName.length < 10) {
        return countryList.innerHTML = list;        
    };

    return countryInfo.innerHTML = card;
}

function onFetchError() {
        Notify.failure('Oops, there is no country with that name');    
}
