const fetchItem = async (item = undefined) => {
  if (item !== 'MLB1615760527' || item === undefined) {
    return new Error('You must provide an url');
  }

  if (item === 'MLB1615760527') {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
