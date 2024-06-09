
import React, { useState } from "react";
import {ComposableMap, ZoomableGroup, Geographies, Geography, Graticule, Line, Marker} from "react-simple-maps";
import "./Map.css";
import CityData from "./CityData";

// const geoUrl = 
//   "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";
const Map = () => {
  const [position, setPosition] = useState({ coordinates: [0,0], zoom: 1})
  const handleMove = (pos) => {setPosition(pos)}

  return (
    <div className="map-container">
      <ComposableMap
        projection="geoEqualEarth"
        width={800} // handles the width of the map, beyond which map begins to get cut
        height={500}
        projectionConfig={{
          scale: 147,
          center: [0,0],
          rotate: [-10, 0, 0],
        }}
      >
        <ZoomableGroup zoom = {position.zoom} center = {position.coor} onMoveEnd = {handleMove}>
            <Graticule stroke="grey" />
            <Geographies
              geography='/world.json'     
            //   dont need public/ to access
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
                {CityData.map((city, index) => {
                      return (
                        <Line
                          key={index}
                          from={[8.682127,50.110924 ]} // (log, lat) of Frankfurt
                          to={[...city.geoCoord].reverse()} //geoCoord (lat,long) so revrse it
                          stroke="#FF5533"
                          strokeWidth={2}
                          strokeLinecap="round"
                        />
                      );
                })}
                {CityData.map((city, index) => {
                      return (
                        <Marker coordinates={[...city.geoCoord].reverse()}>
                          <circle r={4} fill="blue" />
                        </Marker>
                      );
                })}


        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;

