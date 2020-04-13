export const getIncrementalArray = (min, max) => {
  const arr = [];
  for (let i = max; i >= min; i--) {
    arr.push(i);
  }
  return arr;
};

export const STATUS_COLORS = {
  high: '#D94444',
  mid: '#ffaa1d',
  low: '#008000',
};

export const convertTimestampToDate = (time) => {
  const d = new Date(time);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
};

export const GEOLOCATION_DELAY = 60000; // 300000; - 5 min

export const UPLOAD_DELAY = 60 * 60 * 24 * 1000; //one day

export const FETCH_STATUS_DELAY = 5000;

export const LIMITS_GEOLOCATIONS = 21 * (UPLOAD_DELAY / GEOLOCATION_DELAY);
