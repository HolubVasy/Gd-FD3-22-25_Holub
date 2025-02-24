import React from 'react';
import Shop from './components/shop/Shop';
import { shopData } from './shopData';

function App() {
  return (
    <div className="App">
      <Shop name={shopData.name} products={shopData.products} />
    </div>
  );
}

export default App; 