import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useNavbar } from "./useNavbar";

function Navbar() {
  const { mode, isProfileFilled, onToggleTheme } = useNavbar();

  return (
    <AppBar
      position="static"
      sx={{
        borderBottom: "1px solid",
        borderColor: "var(--border)",
        bgcolor: "transparent",
        color: "inherit",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* שמאל – מיתוג + ניווט */}
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
        {/* ימין – תצוגת מצב פרופיל ועיצוב */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 1,
          }}
        >
          <Typography variant="body2">
            Theme: <strong>{mode}</strong>
          </Typography>

          {!isProfileFilled && (
            <Typography variant="caption" color="error">
              Please complete your profile
            </Typography>
          )}

          {isProfileFilled && (
            <Typography variant="caption" color="success.main">
              Thank you for completing your profile
            </Typography>
          )}

          <Button variant="outlined" onClick={onToggleTheme}>
            Toggle Theme
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
