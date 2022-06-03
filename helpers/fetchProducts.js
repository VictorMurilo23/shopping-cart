const fetchProducts = async (produto = undefined) => {
  if (produto !== 'computador' || produto === undefined) {
    return new Error('You must provide an url');
  }

  if (produto === 'computador') {
    const Url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
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
