import React from "react";
import Sidebar from "./Sidebar";
import MapComp from "./MapComp";

const Main = (params) => {
  return (
    <div class="ui grid">
      <div class="four wide column sidebar_m">
        <Sidebar />
      </div>
      <div class="twelve wide column">
        <MapComp />
      </div>
    </div>
  );
};

export default Main;
