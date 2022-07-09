import React, { useState, useEffect, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import Popup from "react-leaflet-editable-popup";
import "../style.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import LocationMarker from "./LocationMarker";
const fillBlueOptions = { fillColor: "blue" };

const MapComp = (props) => {
  let position = [32.109333, 34.855499];

  const [locations, setLocations] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!locations) loadData();

    position = props.location || [32.109333, 34.855499];
    changePos();
  }, [props.location]);

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
    if (!locations) return;
    return locations.map((item) =>
      item.wkt.map((coor, i) => {
        if (i % 200 === 0) {
          return (
            <Marker
              key={coor[0]}
              position={[coor[0], coor[1]]}
              icon={
                new Icon({
                  iconUrl:
                    "https://icon-library.com/images/icon-markers/icon-markers-10.jpg",
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
        }
      })
    );
  };

  const changePos = () => {
    if (map) map.flyTo(position);
  };

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={true}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} />
      {/* {createMarkers()} */}

      {loadJson()}
    </MapContainer>
  );
};

export default MapComp;
