import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store.js";
import { toggleMode } from "../store/themeSlice.js";

function Navbar() {
  const dispatch = useDispatch();

  // קריאה ל־Redux state
  const mode = useSelector((state: RootState) => state.theme.mode);
  const fontSize = useSelector((state: RootState) => state.theme.fontSize);

  return (
    <nav style={{ fontSize }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/form">Form</Link> |{" "}
      <Link to="/api">API</Link>

      <p>
        Current theme: <strong>{mode}</strong>
      </p>

      <button onClick={() => dispatch(toggleMode())}>
        Toggle Theme
      </button>
    </nav>
  );
}

export default Navbar;
