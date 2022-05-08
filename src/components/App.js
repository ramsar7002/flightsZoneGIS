import React from "react";
import MapComp from "./MapComp";
import Sidebar from "./Sidebar";

const App = () => {
  return (
    <div class="ui grid">
      <div class="six wide column sidebar">
        <Sidebar />
      </div>
      <div class="ten wide column">
        <MapComp />
      </div>
    </div>
  );
};

export default App;
