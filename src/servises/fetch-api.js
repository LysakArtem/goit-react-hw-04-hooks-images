const API_KEY = '18602896-269905921176f8eb36b1925d1';
const BASE_URL = 'https://pixabay.com/api';
function fetchData(searchImages, currentPage) {
  const url = `${BASE_URL}/?q=${searchImages}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then((res) => res.json());
}
const api = { fetchData };
export default api;
