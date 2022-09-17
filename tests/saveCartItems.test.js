const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Verifica se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  it('Verifica se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    const argumento = '<ol><li>Item</li></ol>'
    saveCartItems(argumento)
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', argumento);
  })

  it('Verifica se ao não passar parametros, localStorage não é chamado.', () => {
    saveCartItems()
    expect(localStorage.setItem).not.toHaveBeenCalled();
  })
});
