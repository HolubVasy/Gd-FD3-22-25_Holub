import React from 'react';
import './Shop.css';
import { ShopProps, Product } from '../types';

// Вариант 1: используя function declaration
function Shop({ name, products }: ShopProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/200x150?text=Image+Not+Found';
  };

  // Подсчет общей стоимости всех товаров
  let totalValue = 0;
  products.forEach(product => {
    totalValue += product.price * product.stock;
  });

  // Подсчет количества товаров с малым запасом (меньше 10)
  let lowStockCount = 0;
  products.forEach(product => {
    if (product.stock < 10) lowStockCount++;
  });

  // Создание массива категорий товаров
  const categories: string[] = [];
  products.forEach(product => {
    if (!categories.includes(product.name)) {
      categories.push(product.name);
    }
  });

  // Создаем массив строк таблицы
  const tableRows: JSX.Element[] = [];
  products.forEach((product: Product) => {
    tableRows.push(
      <tr key={product.id}>
        <td>
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
            onError={handleImageError}
          />
        </td>
        <td>{product.name}</td>
        <td>{product.getFormattedPrice()}</td>
        <td>{product.getStockStatus()}</td>
      </tr>
    );
  });

  return (
    <div className="shop">
      <h1>{name}</h1>
      
      {/* Статистика магазина */}
      <div className="shop-stats">
        <p>Общая стоимость товаров: ${totalValue.toFixed(2)}</p>
        <p>Товаров с малым запасом: {lowStockCount}</p>
        <p>Категории товаров: {categories.join(', ')}</p>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Остаток</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
}

export default Shop; 