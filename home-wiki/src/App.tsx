// src/App.tsx
import React from 'react';
import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPage from './pages/Main/MainPage';
import Articles from './pages/Articles';
import Categories from './pages/Categories';
import Tags from './pages/Tags';
import CategoryArticles from './components/Category/CategoryArticles';
import TagArticles from './components/Tag/TagArticles';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path="/" element={<MainPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/categories/:id" element={<CategoryArticles />} />
          <Route path="/tags/:id" element={<TagArticles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
