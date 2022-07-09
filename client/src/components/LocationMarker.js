import React, { useState } from "react";
import { useMapEvent } from "react-leaflet/hooks";
import { Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvent("click", (e) => {
    setPosition(e.latlng);
    map.flyTo([e.latlng.lat, e.latlng.lng], map.getZoom());
  });

  return position === null ? null : (
    <Marker
      position={position}
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    >
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;
