import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div>
      <h1>Welcome to the site</h1>
      <p>Example post: <Link to="/post/1">Post 1</Link></p>
    </div>
  );
}
