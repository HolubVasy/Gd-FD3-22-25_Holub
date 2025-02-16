import React from 'react';
import Shop from './components/shop/Shop';
import { shopData } from './data/Shop/shopData';

const App: React.FC = () => {
  return (
    <div className="App">
      <Shop name={shopData.name} products={shopData.products} />
    </div>
  );
};

export default App; 