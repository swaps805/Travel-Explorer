import React, { useState } from "react";
import "./SearchBar.css";
import  {Card}  from "./Card";
import flightData  from "./FlightData";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [flights, setFlights] = useState([]);

  

  const handleSearch = () => {

    const searchResults = flightData.filter(
      (flight) => flight.flightName.toLowerCase() === input.toLocaleLowerCase()
    );
    setFlights(searchResults);

    
  };

  return (
    <div className="wrapper">
      <div className="search-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(String(e.target.value))}
          className="search-area"
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>
      {flights.map((flight, index) => (
        <Card key={index} start={flight.start} end={flight.end} />
      ))}
    </div>
  );
};
