import React, { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = () => {
  const [term, setTerm] = useState(null);
  const [results, setResults] = useState([]);
  const [cityName, setCityName] = useState(null);

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

  const cityClicked = async (e) => {
    // https://www.openstreetmap.org/geocoder/search_osm_nominatim?query=תל אביב
    setCityName(e.target.textContent);
    const data = await axios.get(
      `https://www.openstreetmap.org/geocoder/search_osm_nominatim?query=${cityName}`
    );
    let positionLat = data.data.search("data-lat=") + "data-lat=".length + 1;
    let positionlon = data.data.search("data-lon=") + "data-lat=".length + 1;
    console.log(data.data.slice(positionLat, positionLat + 7));
    console.log(data.data.slice(positionlon, positionlon + 7));
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
      <div
        className="ui action input right"
        onChange={(e) => setTerm(e.target.value)}
      >
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
