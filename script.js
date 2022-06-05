const sectionNavegador = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const carrinho = document.querySelector('.cart');
const botaoEsvaziar = document.querySelector('.empty-cart');
const p = document.createElement('p');
p.className = 'total-price';

const colocaLoading = () => {
  const h1 = document.createElement('h1');
  h1.className = 'loading';
  h1.innerText = 'carregando...';
  sectionNavegador.appendChild(h1);
};

const removeLoading = () => {
  const loading = document.querySelector('.loading');
  if (loading !== undefined) {
    loading.remove();
  }
};

const precos = () => {
  const todosOsPrecos = getSavedCartItems('cartItems').split(' ')
  .filter((element) => element.includes('$'))
  .map((preco) => Number(preco.replace(/[^\d,.]+/g, ''))); /* vai tirar tudo, menos os numeros, e depois vai transformar tudo no tipo number
  https://stackoverflow.com/questions/9261822/regex-that-replace-any-chars-except-number#:~:text=%5B%5E%5Cd.%2C%5D,%22%2C%20a%20negated%20character%20class. <-- me ajudou na parte de pegar só os números de uma string
  */
  const total = todosOsPrecos.reduce((acc, cur) => acc + cur, 0);
  p.innerText = `${Math.round(total * 100) / 100}`; // https://www.codingem.com/javascript-how-to-limit-decimal-places/ <-- usei isso pra descobrir outros meios de limitar as casas decimais
  carrinho.appendChild(p);
};

botaoEsvaziar.addEventListener('click', () => {
  cartItems.innerHTML = '';
  localStorage.clear();
  p.innerText = `${0}`;
});

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cartItems.innerText);
  precos();
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const listaSalva = (array) => {
  array.forEach((element) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = element;
    li.addEventListener('click', cartItemClickListener);
    cartItems.appendChild(li);
  });
};

const colocaNoCarrinho = async (id) => {
  const itemAtual = await fetchItem(id);
  cartItems.appendChild(createCartItemElement(itemAtual));
  saveCartItems(cartItems.innerText);
  precos();
};

window.onload = async () => {
  colocaLoading();
  await fetchProducts('computador')
  .then((data) => data.results.forEach((element) => {
    sectionNavegador.appendChild(createProductItemElement(element));
  }));
  await removeLoading();
  const todosOsBotoesCarrinho = document.querySelectorAll('.item__add');
   todosOsBotoesCarrinho.forEach((element) => {
    element.addEventListener('click', (event) => {
      const itemSelecionado = getSkuFromProductItem(event.target.parentElement);
      colocaNoCarrinho(itemSelecionado);
    });
  });
  listaSalva(getSavedCartItems('cartItems').split('\n'));
  precos();
};
