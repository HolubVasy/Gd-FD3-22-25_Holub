import { Link, Outlet } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-intro">
        <h2>Наши контакты</h2>
        <p>Узнайте больше о нашем сайте и условиях использования</p>
      </div>
      <div className="contact-content">
        <div className="sidebar">
          <img 
            src="https://images.dog.ceo/breeds/chow/n02112137_10654.jpg" 
            alt="Чау-чау" 
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <nav>
            <Link to="/contact/about">О нас</Link>
            <Link to="/contact/terms">Условия использования</Link>
          </nav>
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Contact; 