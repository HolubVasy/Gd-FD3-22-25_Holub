import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PostsPage() {
  const [postIds, setPostIds] = useState<number[]>([]);

  useEffect(() => {
    let savedIds = sessionStorage.getItem("postIds");
    if (!savedIds) {
      let ids = Array.from({ length: 20 }, (_, i) => i + 1);
      sessionStorage.setItem("postIds", JSON.stringify(ids));
      setPostIds(ids);
    } else {
      setPostIds(JSON.parse(savedIds));
    }
  }, []);

  return (
    <div>
      <h1>Posts List</h1>
      <ul>
        {postIds.map((id) => (
          <li key={id}><Link to={`/post/${id}`}>Post {id}</Link></li>
        ))}
      </ul>
    </div>
  );
}
