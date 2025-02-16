import { Outlet, Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-intro">
        <h2>Добро пожаловать на страницу контактов</h2>
        <p>Здесь вы можете узнать больше о нашем проекте и условиях использования</p>
        <div className="contact-links">
          <Link to="/contact/about">О нас</Link>
          <Link to="/contact/terms">Условия использования</Link>
        </div>
      </div>
      <div className="contact-content">
        <div className="sidebar">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/01_Chow_Chow.jpg/1280px-01_Chow_Chow.jpg" 
            alt="Чау-чау" 
          />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Contact; 