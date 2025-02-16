import React from 'react';
import Shop from './components/shop/Shop';
import { shopData } from './data/Shop/shopData';
import { ShopContext } from './contexts/ShopContext';

const App: React.FC = () => {
  return (
    <ShopContext.Provider value={shopData}>
      <div className="App">
        <Shop />
      </div>
    </ShopContext.Provider>
  );
};

export default App; 