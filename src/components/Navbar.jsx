import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/form">Form</Link> |{" "}
      <Link to="/api">API</Link>
    </nav>
  );
}

export default Navbar;
