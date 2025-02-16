import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="start-page">
      <h1>Добро пожаловать в мир Чау-чау!</h1>
      <p>Узнайте больше о самых пушистых собаках в мире</p>
      <p>Посмотрите наш первый пост: <Link to="/post/1">Всё о Чау-чау</Link></p>
    </div>
  );
};

export default Start; 