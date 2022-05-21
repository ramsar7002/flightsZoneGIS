import React from "react";
import Sidebar from "./Sidebar";
import MapComp from "./MapComp";

const Main = (params) => {
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

export default Main;
