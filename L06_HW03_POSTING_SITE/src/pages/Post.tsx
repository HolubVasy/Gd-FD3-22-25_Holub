import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!/^\d+$/.test(id || '')) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="post-page">
      <h2>Пост #{id}</h2>
      <p>Это пост о Чау-чау номер {id}</p>
    </div>
  );
};

export default Post;
