import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import BasicForm from "./components/BasicForm";
import ResearchFeed from "./components/ResearchFeed";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<BasicForm />} />
        <Route path="/api" element={<ResearchFeed />} />
        <Route path="*" element={<h1>404 – Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
