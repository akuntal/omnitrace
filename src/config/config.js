export const CONFIG = {
  API_HOST: 'http://tuner.eastus.cloudapp.azure.com:8080',
};

export const GEOLOCATION_DELAY = 30000; // 300000; - 5 min

export const ONE_DAY = 60 * 60 * 24 * 1000; //one day

export const FETCH_STATUS_DELAY = 5000;

export const LIMITS_GEOLOCATIONS = 21 * (ONE_DAY / GEOLOCATION_DELAY);
