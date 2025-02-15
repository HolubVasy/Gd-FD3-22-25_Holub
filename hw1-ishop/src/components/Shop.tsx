import React from 'react';
import './Shop.css';
import { ShopProps, Product } from '../types';

const Shop: React.FC<ShopProps> = ({ name, products }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/200x150?text=Image+Not+Found';
  };

  return (
    <div className="shop">
      <h1>{name}</h1>
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
          {products.map((product: Product) => (
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
              <td>${product.price}</td>
              <td>{product.stock} шт.</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shop; 