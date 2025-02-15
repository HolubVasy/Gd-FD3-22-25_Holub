import React from 'react';
import Shop from './components/Shop';
import { Product } from './types';

const shopData = {
  name: "MyShop",
  products: [
    {
      id: 1,
      name: "Ноутбук",
      price: 999.99,
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      stock: 5
    },
    {
      id: 2,
      name: "Смартфон",
      price: 499.99,
      image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      stock: 8
    },
    {
      id: 3,
      name: "Наушники",
      price: 99.99,
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      stock: 15
    },
    {
      id: 4,
      name: "Планшет",
      price: 299.99,
      image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
      stock: 3
    }
  ] as Product[]
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Shop name={shopData.name} products={shopData.products} />
    </div>
  );
};

export default App; 