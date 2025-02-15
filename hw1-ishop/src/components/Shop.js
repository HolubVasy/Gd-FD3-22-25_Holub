import React from 'react';
import './Shop.css';

const Shop = ({ name, products }) => {
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
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.name} className="product-image" />
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