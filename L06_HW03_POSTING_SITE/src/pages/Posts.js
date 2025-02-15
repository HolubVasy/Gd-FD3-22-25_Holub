import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Posts() {
  const [postIds, setPostIds] = useState([]);

  useEffect(() => {
    const savedIds = sessionStorage.getItem('postIds');
    if (savedIds) {
      setPostIds(JSON.parse(savedIds));
    } else {
      const newIds = Array.from({ length: 20 }, (_, i) => i + 1);
      sessionStorage.setItem('postIds', JSON.stringify(newIds));
      setPostIds(newIds);
    }
  }, []);

  return (
    <div className="posts-page">
      <h2>Статьи о Чау-чау</h2>
      <div className="posts-list">
        {postIds.map(id => (
          <Link key={id} to={`/post/${id}`}>Пост #{id}</Link>
        ))}
      </div>
    </div>
  );
}

export default Posts;