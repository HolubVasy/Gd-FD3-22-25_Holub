import React, { useContext } from 'react';
import './Shop.css';
import { ShopContext } from '../../contexts/ShopContext';
import { Product } from '../../models/Product';

const Shop: React.FC = () => {
  const { name, products } = useContext(ShopContext);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/200x150?text=Image+Not+Found';
  };

  // Counting the total value of all products
  let totalValue = 0;
  products.forEach(product => {
    totalValue += product.price * product.stock;
  });

  // Counting the number of products with low stock (less than 10)
  let lowStockCount = 0;
  products.forEach(product => {
    if (product.stock < 10) lowStockCount++;
  });

  // Creating an array of product categories
  const categories: string[] = [];
  products.forEach(product => {
    if (!categories.includes(product.name)) {
      categories.push(product.name);
    }
  });

  // Creating an array of table rows
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
      
      {/* Shop statistics */}
      <div className="shop-stats">
        <p>Total value of products: ${totalValue.toFixed(2)}</p>
        <p>Products with low stock: {lowStockCount}</p>
        <p>Product categories: {categories.join(', ')}</p>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
};

export default Shop; 