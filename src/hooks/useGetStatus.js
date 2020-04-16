import {CONFIG} from '../config/config';

export const fetchStatus = (phone) => {
  return fetch(`${CONFIG.API_HOST}/api/status/${phone}`, {
    method: 'GET',
  })
    .then((response) => response.json())

    .catch((error) => {
      console.log(error);
    });
};

export const fetchAddress = (lat, long) => {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse.php?format=json&lat=${lat}&lon=${long}&zoom=21`,
    {
      method: 'GET',
    },
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};

export const fetchAllAddress = (locations) => {
  const promises = locations.map(({lat, long}) => fetchAddress(lat, long));

  return Promise.all(promises);
};
