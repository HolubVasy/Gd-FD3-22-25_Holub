import { useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { posts } from './postsData';

// Добавим резервное изображение
const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/01_Chow_Chow.jpg/1280px-01_Chow_Chow.jpg";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [imgError, setImgError] = useState(false);

  if (!id || !/^\d+$/.test(id)) {
    return <Navigate to="/404" />;
  }

  const postIndex = parseInt(id) - 1;
  const post = posts[postIndex];

  if (!post) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="post-page">
      <h2>{post.title}</h2>
      <img 
        src={imgError ? fallbackImage : post.image}
        alt="Чау-чау" 
        onError={() => setImgError(true)}
        style={{ 
          maxWidth: '600px', 
          width: '100%', 
          borderRadius: '12px',
          margin: '2rem auto',
          display: 'block',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }} 
      />
      <p style={{ lineHeight: 1.6, fontSize: '1.1rem', color: '#444' }}>
        {post.text}
      </p>
    </div>
  );
};

export default Post; 