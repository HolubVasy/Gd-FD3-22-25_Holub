// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import MainContent from './components/MainContent';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
};

export default App;