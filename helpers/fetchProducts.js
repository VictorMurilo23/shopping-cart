const fetchProducts = async (QUERY = undefined) => {
  if (QUERY !== 'computador' || QUERY === undefined) {
    return new Error('You must provide an url');
  }

  if (QUERY === 'computador') {
    const Url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
    const response = await fetch(Url);
    const data = await response.json();
    return data;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
