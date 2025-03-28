// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import Home from './pages/home';
import About from './pages/about';
import Articles from './pages/Article/Articles';
import ArticleDetails from './pages/Article/ArticleDetails';
import Categories from './pages/Category/Categories';
import CategoryDetails from './pages/Category/CategoryDetails';
import Tags from './pages/Tag/Tags';
import TagDetails from './pages/Tag/TagDetails';
import Profile from './pages/Profile';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoryDetails />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tags/:id" element={<TagDetails />} />
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
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
