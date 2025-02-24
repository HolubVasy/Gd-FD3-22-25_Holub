import React from 'react';

export type Product = {
  id: number;
  name: string;
  price: number;
  url: string;
  stock: number;
};

type ShopProps = {
  name: string;
  products: Product[];
};

export default function Shop({ name, products }: ShopProps) {
  const totalValue = products.reduce((sum, product) => 
    sum + (product.price * product.stock), 0
  );

  const lowStockCount = products.filter(product => product.stock < 10).length;

  const tableRows: JSX.Element[] = [];
  products.forEach(product => {
    tableRows.push(
      <tr key={product.id}>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.name}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>${product.price.toFixed(2)}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.stock}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
          <img src={product.url} alt={product.name} style={{ width: '50px', height: '50px' }} />
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>{name}</h1>
      
      <div>
        <p>Total value: ${totalValue.toFixed(2)}</p>
        <p>Low stock items: {lowStockCount}</p>
      </div>

      <table style={{ 
        width: '100%', 
        borderSpacing: '0',
        border: '1px solid #ddd',
        borderCollapse: 'collapse'
      }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stock</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
}