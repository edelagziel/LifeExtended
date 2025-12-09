import React from "react";
import axios from "axios";
import Home from "./components/Home";
import BasicForm from "./components/BasicForm";
import ResearchFeed from "./components/ResearchFeed";
function App()
{
  return(
    <>
        <h1>lifeextended</h1>
        <ResearchFeed />
    </>
  );
}

export default App;
