import axios from 'axios';

export function searchImages(query) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const params = new URLSearchParams({
    key: '48867408-88b49db3a4e372b4d460477c4',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `${BASE_URL}${END_POINT}?${params}`;
  return axios
    .get(url)
    .then(response => response.data.hits)
    .catch(error => {
      console.log('Error images:', error);
      return [];
    });
}
