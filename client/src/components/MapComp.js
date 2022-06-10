import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "../style.css";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const position = [32.109333, 35.295499];

const fillBlueOptions = { fillColor: "blue" };
const blackOptions = { color: "black" };
const limeOptions = { color: "lime" };
const purpleOptions = { color: "purple" };
const redOptions = { color: "red" };

const MapComp = () => {
  const [locations, setLocations] = useState();

  useEffect(() => {
    const loadData = async () => {
      await fetch("https://localhost:9000")
        .then((res) => res.json())
        .then((data) => {
          setLocations(data.locations);
        });
    };
    loadData();
  }, []);

  const loadJson = () => {
    return locations?.map((item) => (
      <Polygon pathOptions={fillBlueOptions} positions={item.wkt} />
    ));
  };

  return (
    <MapContainer center={position} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[position[0], position[1]]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [20, 35],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      {loadJson()}
    </MapContainer>
  );
};

export default MapComp;
