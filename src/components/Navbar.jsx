import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";


function Navbar() 
{
    const { isProfileFilled } = useContext(UserContext);
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/form">Form</Link> |{" "}
      <Link to="/api">API</Link>
      <p>
        {isProfileFilled
        ? "Profile completed (:"
        : "Please fill out the form to complete your profile"}
      </p>

    </nav>
  );
}

export default Navbar;
