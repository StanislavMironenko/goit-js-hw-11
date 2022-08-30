const axios = require('axios').default;


export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }
  async getPicture() {
    const URL = 'https://pixabay.com/api/';
    const KEY = '29431057-3788866dfa976c317614a107f';

    const respons = await axios.get(`${URL}`, {
      params: {
        key: KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.per_page,
        page: this.page,
      },
    });
    this.incrementPage();
    
    return respons.data;
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
