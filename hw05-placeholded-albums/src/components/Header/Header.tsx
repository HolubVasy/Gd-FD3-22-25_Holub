import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link to="/">PA</Link>
          </li>
          <li>
            <Link to="/albums">Albums</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/random-photo">Random Photo</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 