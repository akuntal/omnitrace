import {CONFIG} from '../../config/config';
import {ToastAndroid} from 'react-native';

export const uploadGeolocation = async (data) => {
  return fetch(`${CONFIG.API_HOST}/api/contacts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(
        'Unable to reach server, pls try later',
        ToastAndroid.SHORT,
      );
    });
};
