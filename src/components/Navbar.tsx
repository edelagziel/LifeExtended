import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store.js";
import { toggleTheme } from "../store/themeSlice.js";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Navbar() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <AppBar
      position="static"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "transparent",
        color: "inherit",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* צד שמאל – לוגו + ניווט */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            LifeExtended
          </Typography>

          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/form" color="inherit">
            Form
          </Button>
          <Button component={Link} to="/api" color="inherit">
            API
          </Button>
        </Box>

        {/* צד ימין – Theme */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2">
            Theme: <strong>{mode}</strong>
          </Typography>
          <Button variant="outlined" onClick={() => dispatch(toggleTheme())}>
            Toggle Theme
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
