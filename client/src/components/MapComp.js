import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import Popup from "react-leaflet-editable-popup";
import "../style.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import LocationMarker from "./LocationMarker";
const fillBlueOptions = { fillColor: "blue" };
// const blackOptions = { color: "black" };
// const limeOptions = { color: "lime" };
// const purpleOptions = { color: "purple" };
// const redOptions = { color: "red" };

const MapComp = () => {
  const position = [32.109333, 35.295499];

  const [locations, setLocations] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetch("https://localhost:9000")
      .then((res) => res.json())
      .then((data) => {
        data.locations.map((item) => {
          item.wkt = item.wkt.map((coords) => {
            let arr = [];
            arr.push(coords[1]);
            arr.push(coords[0]);
            return arr;
          });
        });
        setLocations(data.locations);
      });
  };

  const loadJson = () => {
    return locations?.map((item) => (
      <Polygon
        key={item.wkt.toString()}
        pathOptions={fillBlueOptions}
        positions={item.wkt}
      />
    ));
  };

  const createMarkers = () => {
    return locations?.map((item) =>
      item.wkt.map((coor, i) => {
        if (i % 200 === 0) {
          return (
            <Marker
              key={coor[0]}
              position={[coor[0], coor[1]]}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [20, 35],
                  iconAnchor: [25, 25],
                  shadowSize: [0, 0],
                })
              }
            >
              <Popup>
                {item.description.length > 5 ? item.description : "location"}
              </Popup>
            </Marker>
          );
        } else {
          return <div></div>;
        }
      })
    );
  };

  return (
    <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      {/* {createMarkers()} */}

      {loadJson()}
    </MapContainer>
  );
};

export default MapComp;
