export const toHex = (str: string) => {
  return str
    .split('')
    .map((c: string) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

export default toHex;
