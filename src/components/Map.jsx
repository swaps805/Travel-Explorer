import React, { useState } from "react";
import { ComposableMap, ZoomableGroup, Geographies, Geography, Graticule, Line, Marker } from "react-simple-maps";
import "./styles/Map.css";


const Map = ({ cities }) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const handleMove = (pos) => {
    setPosition(pos);
  };

  let startCoord = [];

  return (
    <div className="map-container">
      <ComposableMap
        projection="geoEqualEarth"
        width={800} // handles the width of the map, beyond which map begins to get cut
        height={500}
        projectionConfig={{
          scale: 147,
          center: [0, 0],
          rotate: [-10, 0, 0],
        }}
      >
        <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMove}>
          <Graticule stroke="grey" />
          <Geographies
            geography='/world.json' // don't need public/ to access
            fill="grey" // country color
            stroke="white" // country border color
            strokeWidth={0.5}
          >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {cities.map((city, index) => {
            if (index === 0) {
              startCoord = [...city.coord].reverse();
              return null;
            } else {
              return (
                <Line
                  key={index}
                  from={startCoord} // (long, lat) of the first city
                  to={[...city.coord].reverse()} // geoCoord (lat, long) so reverse it
                  stroke="#FF5533"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              );
            }
          })}
          {cities.map((city, index) => (
            <Marker key={index} coordinates={[...city.coord].reverse()}>
              <circle r={4} fill="blue" />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
