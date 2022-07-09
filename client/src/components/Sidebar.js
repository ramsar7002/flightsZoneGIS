import React, { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = (props) => {
  const [term, setTerm] = useState(null);
  const [results, setResults] = useState([]);
  const [cityName, setCityName] = useState(null);

  useEffect(() => {}, [results, term]);

  const userSearchCity = async () => {
    if (!term) return;

    const res = await axios.get(`https://localhost:9000/cities/${term}`);
    if (res.data) {
      setResults(res.data);
    }
  };

  const cityClicked = async (e) => {
    if (!e.target.textContent) return;
    setCityName(e.target.textContent);

    const data = await axios.get(
      `https://www.openstreetmap.org/geocoder/search_osm_nominatim?query=${e.target.textContent}`
    );
    let positionLat = data.data.search("data-lat=") + "data-lat=".length + 1;
    let positionlon = data.data.search("data-lon=") + "data-lat=".length + 1;

    props.setLocation([
      Number(data.data.slice(positionLat, positionLat + 7)),
      Number(data.data.slice(positionlon, positionlon + 7)),
    ]);
  };

  const onTermChange = (e) => {
    setTerm(e.target.value);
    if (!e.target.value) setResults([]);
  };

  const listOfCities = () => {
    if (results) {
      return results.map((item) => {
        return (
          <div className="item" key={item}>
            <div className="content">
              <a className="header text" onClick={(e) => cityClicked(e)}>
                {item}
              </a>
            </div>
            <div className="ui fitted divider"></div>
          </div>
        );
      });
    }
    return null;
  };
  return (
    <div className="sidebar_m">
      <div className="ui action input right" onChange={(e) => onTermChange(e)}>
        <input type="text" placeholder="חפש עיר" />

        <button className="ui button" onClick={() => userSearchCity()}>
          חיפוש
        </button>
      </div>
      <div className="ui middle aligned divided list">{listOfCities()}</div>
    </div>
  );
};

export default Sidebar;
