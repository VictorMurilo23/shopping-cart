const saveCartItems = (item = undefined) => {
  if (item !== undefined) {
    localStorage.setItem('cartItems', item);
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
