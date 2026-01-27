import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import BasicForm from "./components/BasicForm";
import ResearchFeed from "./components/ResearchFeed";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeBodyClass from "./components/ThemeBodyClass";
import { UserProvider } from "./context/UserContext";
import "./main.css";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        {/* theme side-effect גלובלי */}
        <ThemeBodyClass />

        <div className="app-shell">
          <Navbar />

          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<BasicForm />} />
              <Route path="/api" element={<ResearchFeed />} />
              <Route path="*" element={<h1>404 – Page not found</h1>} />
            </Routes>
          </main>

          <Footer />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
