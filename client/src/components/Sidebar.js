import React, { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = () => {
  const [term, setTerm] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
  }, [results]);

  const userSearchCity = async () => {
    if (!term) return;

    const res = await axios.get(`https://localhost:9000/cities/${term}`);
    if (res.data) {
      console.log(results);
      setResults(res.data);
    }
  };

  const listOfCities = () => {
    console.log(results);
    if (results) {
      return results.map((item) => {
        return (
          <div class="item">
            <div class="content">
              <a class="header text">{item}</a>
            </div>
            <div class="ui fitted divider"></div>
          </div>
        );
      });
    }
    return null;
  };
  return (
    <div class="sidebar_m">
      <div
        class="ui action input right"
        onChange={(e) => setTerm(e.target.value)}
      >
        <input type="text" placeholder="חפש עיר" />

        <button class="ui button" onClick={() => userSearchCity()}>
          חיפוש
        </button>
      </div>
      <div class="ui middle aligned divided list">{listOfCities()}</div>
    </div>
  );
};

export default Sidebar;
