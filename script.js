const itemsContainer = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const emptyCartBtn = document.querySelector('.empty-cart');
const containerPrice = document.querySelector('.containerPrice');
const totalPriceP = document.createElement('p');
totalPriceP.className = 'total-price';

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

const createProductItemElement = ({ id: sku, title: name, thumbnail: image, price: salePrice }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$${salePrice}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const dataForLocalStorage = () => {
  const localStorageData = [];
  const cartItemsElements = cartItems.children;
  for (let index = 0; index < cartItemsElements.length; index += 1) {
    const objData = {
      thumbnail: cartItemsElements[index].children[1].src,
      title: cartItemsElements[index].children[2].children[0].innerText,
      price: cartItemsElements[index].children[2].children[1].innerText.split('$')[1],
    };
    localStorageData.push(objData);
  }
  return localStorageData;
};

const loading = () => {
  const loadingElement = createCustomElement('h1', 'loading', 'carregando...');
  itemsContainer.appendChild(loadingElement);
};

const removeLoading = () => {
  const loadingElement = document.querySelector('.loading');
  if (loadingElement !== undefined) {
    loadingElement.remove();
  }
};

const prices = () => {
  const allPrices = document.querySelectorAll('.price');
  let total = 0;
  for (let index = 0; index < allPrices.length; index += 1) {
    total += Number(allPrices[index].innerText);
  }
  totalPriceP.innerText = `Total: R$${Math.round(total * 100) / 100}`;
  containerPrice.appendChild(totalPriceP);
};

emptyCartBtn.addEventListener('click', () => {
  cartItems.innerHTML = '';
  localStorage.clear();
  totalPriceP.innerText = `Total: R$${0}`;
});

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  event.target.parentElement.remove();
  saveCartItems(JSON.stringify(dataForLocalStorage()));
  prices();
};

const createDeleteCartProduct = () => {
  const removeItem = document.createElement('span');
  removeItem.className = 'removeItem';
  removeItem.innerText = 'X';
  removeItem.addEventListener('click', cartItemClickListener);
  return removeItem;
};

const createCartItemElement = ({ title: name, price: salePrice, thumbnail }) => {
  const container = document.createElement('div');
  container.className = 'cart__item';
  container.appendChild(createDeleteCartProduct());
  const img = document.createElement('img');
  img.src = thumbnail;
  img.alt = `Imagem ${name}`;
  container.appendChild(img);
  const productInfo = document.createElement('div');
  productInfo.className = 'productInfo';
  productInfo.appendChild(createCustomElement('p', 'cartProductName', name));
  const price = document.createElement('p');
  price.className = 'priceCart'; 
  price.innerHTML = `R$<span class='price'>${salePrice}</span>`;
  productInfo.appendChild(price);
  container.appendChild(productInfo);
  return container;
};

const savedList = (array) => {
  array.forEach((element) => {
    cartItems.appendChild(createCartItemElement(element));
  });
};

const addToCart = async (id) => {
  const itemAtual = await fetchItem(id);
  cartItems.appendChild(createCartItemElement(itemAtual));
  saveCartItems(JSON.stringify(dataForLocalStorage()));
  prices();
};

const loadShopCatalog = async () => {
  loading();
  await fetchProducts('computador')
  .then((data) => data.results.map((element) => itemsContainer
    .appendChild(createProductItemElement(element))));
  removeLoading();
  const allAddBtns = document.querySelectorAll('.item__add');
  allAddBtns.forEach((element) => {
    element.addEventListener('click', (event) => {
      const selectedItem = getSkuFromProductItem(event.target.parentElement);
      addToCart(selectedItem);
    });
  });
};

window.onload = async () => {
  await loadShopCatalog();
  const listData = JSON.parse(getSavedCartItems('cartItems'));
  if (listData) {
    savedList(listData);
  }
  prices();
};
