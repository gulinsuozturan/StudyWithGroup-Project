export const BASE_URL = 'http://10.0.2.2:5000/api/v1';

export const fetchImages = async () => {
    const response = await fetch('https://unsplash.it/list');
    const images = await response.json();
  
    return images;
  };
  
  export const getImageFromId = id =>
    `https://unsplash.it/${600}/${600}?image=${id}`;
  