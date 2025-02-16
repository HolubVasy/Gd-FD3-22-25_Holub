import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">🐕 ЧауЧау Блог</div>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/posts">Посты</Link>
        <Link to="/contact">Контакты</Link>
      </nav>
    </header>
  );
};

export default Header;
