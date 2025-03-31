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
import ContactInfo from './pages/ContactInfo';
import TermsOfUse from './pages/TermsOfUse';
import CreateArticle from './pages/CreateArticle';
import ArticleDetails from './pages/ArticleDetails';
import EditArticle from './pages/EditArticle';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path="/" element={<MainPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/articles/create" element={<CreateArticle />} />
          <Route path="/articles/:id/edit" element={<EditArticle />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/categories/:id" element={<CategoryArticles />} />
          <Route path="/tags/:id" element={<TagArticles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
