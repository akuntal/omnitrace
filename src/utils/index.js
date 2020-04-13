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
