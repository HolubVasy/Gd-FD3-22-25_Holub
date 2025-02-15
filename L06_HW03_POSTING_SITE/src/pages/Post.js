import { useParams, Navigate } from 'react-router-dom';

function Post() {
  const { id } = useParams();

  if (!/^\d+$/.test(id)) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="post-page">
      <h2>Пост #{id}</h2>
      <p>Это пост о Чау-чау номер {id}</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
    </div>
  );
}

export default Post;