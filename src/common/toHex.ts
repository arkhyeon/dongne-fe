export const toHex = str => {
  return str
    .split('')
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

export default toHex;
