// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import Home from './pages/Home';
import About from './pages/About';
import Articles from './pages/Articles';
import ArticleDetails from './pages/Article/ArticleDetails';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
// Removed problematic imports due to errors

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/categories" element={<Categories />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* можно добавить 404 */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
