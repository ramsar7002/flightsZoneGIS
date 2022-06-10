import React from "react";

import Menu from "./Menu";

const App = ({ Component }) => {
  return (
    <div>
      <div>
        <Menu />
        {Component}
      </div>
    </div>
  );
};

export default App;
