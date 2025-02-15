import { Link, Outlet } from "react-router-dom";

export default function ContactPage() {
  return (
    <div>
      <h1>Contact</h1>
      <img src="https://via.placeholder.com/150" alt="Contact" style={{ float: "left", marginRight: "20px" }} />
      <p>Select a section:</p>
      <nav>
        <Link to="about">About</Link> | 
        <Link to="terms">Terms</Link>
      </nav>
      <div style={{ marginTop: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
