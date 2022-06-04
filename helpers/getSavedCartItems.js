const getSavedCartItems = (item) => {
  if (item !== undefined) {
    localStorage.getItem(item);
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
