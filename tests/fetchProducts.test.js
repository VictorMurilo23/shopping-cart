require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })

  it('Verifica se, ao chamar função fetchProducts com o argumento "computador", fetch foi chamada', () => {
    const argumento = 'computador'
    fetchProducts(argumento)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('Verifica se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith(url)
  })

  it('Verifica, se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    const resultado = await fetchProducts('computador')
    expect(resultado).toEqual(computadorSearch)
  })

  it('Verifica se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const resultado = await fetchProducts()
    expect(resultado).toEqual(new Error('You must provide an url'))
  })
});
