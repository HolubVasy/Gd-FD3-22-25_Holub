import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: "10px", background: "#eee" }}>
      <nav>
        <Link to="/start">Home</Link> | 
        <Link to="/contact">Contact</Link> | 
        <Link to="/posts">Posts</Link>
      </nav>
    </header>
  );
}
