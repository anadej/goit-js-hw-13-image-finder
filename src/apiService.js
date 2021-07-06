function fetchImages(query, page = 1) {
  const API_KEY = '22379212-1d76d5c959d3b258038bd5be4';
  const BASE_URL = 'https://pixabay.com/api';
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`;
  return fetch(url).then(res => {
    if (res.status === 404) {
      return Promise.reject('Something went wrong!');
    }
    return res.json();
  });
}

export default fetchImages;
