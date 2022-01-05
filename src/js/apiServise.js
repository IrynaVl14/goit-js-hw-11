const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24990805-177fdba4f9c4ee8f853f6b4d2';

export default class ApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
        this.totalHits = null;
  };
  
fetchPhoto() {  
    // console.log('fetch',this)


    return fetch(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`)
    
        .then(response => {
            //    console.log('response',this)          
         
            if (!response.ok) {
                throw new Error(response.status);
            }
           
            // console.log('response', response.json());
            return response.json();
        })
        .then(({ hits,totalHits }) => {
           this.totalHits = totalHits
         
         this.incrementPage();
        //  console.log('hits',hits);
       
         return hits;
         
      });
    
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
