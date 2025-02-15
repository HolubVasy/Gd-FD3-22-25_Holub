import { useParams, Navigate } from "react-router-dom";

export default function PostPage() {
  let { id } = useParams<{ id: string }>();

  if (!id || !/^\d+$/.test(id)) {
    return <Navigate to="/404" />;
  }

  return (
    <div>
      <h1>Post {id}</h1>
      <p>This is the content of post {id}.</p>
    </div>
  );
}
