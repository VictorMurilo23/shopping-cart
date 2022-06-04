const getSavedCartItems = (item) => {
  if (item !== undefined) {
    return localStorage.getItem(item);
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
