import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "../style.css";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const position = [32.109333, 35.295499];

const multiPolygon = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
  [
    [35.0487371, 31.2371326],
    [35.0207567, 31.2408933],
    [34.9893439, 31.2340795],
    [34.9785279, 31.2307332],
    [34.9694294, 31.2256246],
    [34.9617053, 31.2191946],
    [34.9594754, 31.2071857],
    [34.9730367, 31.1531416],
    [35.0078892, 31.1591904],
    [35.0510671, 31.1632352],
    [35.0757094, 31.1696214],
    [35.0768143, 31.1817235],
    [35.0744857, 31.1941194],
    [35.0686074, 31.2058273],
    [35.0613543, 31.216654],
    [35.0601954, 31.2253522],
    [35.057663, 31.2331695],
    [35.0537151, 31.2358851],
    [35.0487371, 31.2371326],
  ],
];

const fillBlueOptions = { fillColor: "blue" };
const blackOptions = { color: "black" };
const limeOptions = { color: "lime" };
const purpleOptions = { color: "purple" };
const redOptions = { color: "red" };

const MapComp = () => {
  const [locations, setLocations] = useState();

  useEffect(() => {
    const loadData = async () => {
      await fetch("http://localhost:3001")
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
    <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
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
