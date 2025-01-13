import React from "react";
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import locJson from "./geodistance_response.json";

const MapComponent = () => {
  const data = {
    data: locJson,
  };

  const processPolygons = (areas) => {
    return areas.map((area) => {
      // Sort locations by sequence
      const sortedLocations = [...area.location].sort(
        (a, b) => a.sequence - b.sequence
      );

      // Convert to format needed by Leaflet
      const positions = sortedLocations.map((loc) => [
        loc.latitude,
        loc.longitude,
      ]);
      // Close the polygon by adding the first point again
      positions.push(positions[0]);

      return {
        positions,
        name: area.areaName,
        id: area.areaId,
      };
    });
  };

  const polygons = processPolygons(data.data);

  // Calculate center point from first polygon's first point
  const center = polygons[0] ? polygons[0].positions[0] : [-7.45309, 112.7123];

  return (
    <div className="w-full h-96" style={{ width: "100vw", height: "100vh" }}>
      <MapContainer
        center={center}
        zoom={16}
        className="w-full h-full"
        style={{ width: "100vw", height: "100vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {polygons.map((polygon, index) => (
          <Polygon
            key={polygon.id}
            positions={polygon.positions}
            pathOptions={{
              color: "blue",
              fillColor: "blue",
              fillOpacity: 0.2,
              weight: 2,
            }}
          >
            <Tooltip sticky>{polygon.name}</Tooltip>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
