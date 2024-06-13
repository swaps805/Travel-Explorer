import React, { useState } from "react";
import "./styles/SearchBar.css";
import { Card } from "./Card";

const SearchBar = ({ onSearch, cities, flightImg }) => {
  const [input, setInput] = useState("");
  let deptCity = "";

  const handleSearch = () => {
    onSearch(input); 
    console.log(input); // Call the passed in onSearch function with the current input value
  };

  return (
    <div className="wrapper">
      <div className="search-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="search-area"
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>
      {input && (
        <div className="flight-img-container">
          <img src={flightImg} alt="flight" className="flight-img" />
        </div>
      )}
      {cities.map((city, index) => {
        if (index === 0) {
          deptCity = city.name;
          return null; 
        } else {
          return (
            <Card key={index} start={deptCity} end={city.name} />
          );
        }
      })}
    </div>
  );
};

export default SearchBar;


