import React from "react";
import Sidebar from "./Sidebar";
import MapComp from "./MapComp";

const Main = (params) => {
  return (
    <div className="ui grid">
      <div className="four wide column sidebar_m">
        <Sidebar />
      </div>
      <div className="twelve wide column">
        <MapComp />
      </div>
    </div>
  );
};

export default Main;
