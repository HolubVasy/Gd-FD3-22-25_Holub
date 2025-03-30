// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '#/components/Layout/Layout';
import MainPage from '#/pages/Main/MainPage';
import Articles from '#/pages/Articles';
import TagDetails from '#/pages/Tag/TagDetails';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/tag/:id" element={<TagDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
