import React, { useState } from "react";
import "./styles/SearchBar.css";
import { Card } from "./Card";

const SearchBar = ({ onSearch, cities }) => {
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
      {cities.map((city, index) => {
        if (index === 0) {
          deptCity = city.name;
          return null; // Skip rendering for the first city
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


