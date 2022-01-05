const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24990805-177fdba4f9c4ee8f853f6b4d2';
const axios = require('axios');

export default class ApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
        this.totalHits = null;
  };
  
  
async fetchPhoto() {  
    const url=`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`
    
    const fetch = await axios.get(url);
    const hits = fetch.data.hits;
    const totalHits = fetch.data.totalHits;
    this.totalHits = totalHits;
    this.incrementPage();
    console.log(fetch.data);
    return hits;
}
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
    
    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        this.searchQuery=newQuery;
    }
}


