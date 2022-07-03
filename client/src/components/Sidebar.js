import React from "react";

const Sidebar = () => {
  return (
    <div class="sidebar">
      <div class="ui action input">
        <input type="text" placeholder="Enter location" />
        <button class="ui button">Search</button>
      </div>
    </div>
  );
};

export default Sidebar;
