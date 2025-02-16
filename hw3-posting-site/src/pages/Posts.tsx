import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { posts } from './postsData';

const Posts = () => {
  const [postIds, setPostIds] = useState<number[]>([]);

  useEffect(() => {
    const savedIds = sessionStorage.getItem('postIds');
    if (savedIds) {
      setPostIds(JSON.parse(savedIds));
    } else {
      const newIds = Array.from({ length: posts.length }, (_, i) => i + 1);
      sessionStorage.setItem('postIds', JSON.stringify(newIds));
      setPostIds(newIds);
    }
  }, []);

  return (
    <div className="posts-page">
      <h2 style={{ marginBottom: '2rem' }}>Статьи о Чау-чау</h2>
      <div className="posts-list">
        {postIds.map(id => {
          const post = posts[id - 1];
          if (!post) return null;
          return (
            <Link key={id} to={`/post/${id}`} className="post-preview">
              <img 
                src={post.image} 
                alt={post.title}
                className="post-preview-image"
              />
              <h3>{post.title}</h3>
              <p>{post.text.substring(0, 100)}...</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Posts; 