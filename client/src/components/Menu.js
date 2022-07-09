import React from "react";
import { Link } from "react-router-dom";

const menuItemClick = (e) => {
  if (e.target.classList.contains("item")) {
    console.log(e.target.classList);
    const menu = document.querySelectorAll(".item");
    menu.forEach((men) => {
      men.classList.remove("active");
    });
    e.target.classList.add("active");
  }
};

function Menu() {
  return (
    <div className="ui inverted segment main_menu">
      <div
        className="ui inverted secondary menu"
        onClick={(e) => menuItemClick(e)}
      >
        <Link className="active item" to="/">
          עמוד ראשי
        </Link>
        <Link className="active item" to="/usersignup">
          הרשמת משתמש
        </Link>
        {/* <Link className="item" to="/">
          Plans & prices{" "}
        </Link> */}
        <div className="item right">
          {/* <Link className="item right" to="/signin">
            Sign in
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
