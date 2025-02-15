import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Shop from './components/Shop';

const shopData = {
  name: "MyShop",
  products: [
    {
      id: 1,
      name: "Ноутбук",
      price: 999.99,
      image: "https://picsum.photos/200/150?random=1",
      stock: 5
    },
    {
      id: 2,
      name: "Смартфон",
      price: 499.99,
      image: "https://picsum.photos/200/150?random=2",
      stock: 8
    },
    {
      id: 3,
      name: "Наушники",
      price: 99.99,
      image: "https://picsum.photos/200/150?random=3",
      stock: 15
    },
    {
      id: 4,
      name: "Планшет",
      price: 299.99,
      image: "https://picsum.photos/200/150?random=4",
      stock: 3
    }
  ]
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Shop name={shopData.name} products={shopData.products} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
