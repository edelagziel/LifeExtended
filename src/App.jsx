import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Home from "./components/Home";
import BasicForm from "./components/BasicForm";
import ResearchFeed from "./components/ResearchFeed";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import "./main.css";


function App() {
  // ⬅️ Redux הוא מקור האמת ל-theme
  const mode = useSelector((state) => state.theme.mode);

  // ⬅️ אפקט גלובלי: מחיל theme על כל האפליקציה
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
  }, [mode]);

  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<BasicForm />} />
          <Route path="/api" element={<ResearchFeed />} />
          <Route path="*" element={<h1>404 – Page not found</h1>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
