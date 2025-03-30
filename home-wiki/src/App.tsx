// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '#/components/Layout/Layout';
import MainPage from '#/pages/Main/MainPage';
import Articles from '#/pages/Articles';
import CategoryArticles from './components/Category/CategoryArticles';
import TagArticles from './components/Tag/TagArticles';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/categories/:id" element={<CategoryArticles />} />
          <Route path="/tag/:id" element={<TagArticles />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
