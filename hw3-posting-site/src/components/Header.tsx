import { Link } from 'react-router-dom';

export default function Header() {
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
}
