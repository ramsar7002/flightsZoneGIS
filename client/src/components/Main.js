import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MapComp from "./MapComp";

const Main = (params) => {
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState([]);
  return (
    <div className="ui grid">
      <div className="four wide column sidebar_m">
        <Sidebar setResults={setResults} setLocation={setLocation} />
      </div>
      <div className="twelve wide column">
        <MapComp results={results} location={location} />
      </div>
    </div>
  );
};

export default Main;
