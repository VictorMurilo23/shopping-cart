const fetchItem = async (item = undefined) => {
  if (item === undefined) {
    return new Error('You must provide an url');
  }

  const url = `https://api.mercadolibre.com/items/${item}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
