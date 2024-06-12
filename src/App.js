import React, { useState } from "react";
import './App.css';
import SearchBar from "./components/SearchBar";
import Carousel from "./components/Carousel"; 
import Map from "./components/Map"; 
import {  doc, getDoc } from "firebase/firestore";
import db from "./firebase"; 
const App = () => {
  // const [flights, setFlights] = useState([]);
  const [cities, setCities] = useState([]);
  const [flightImg, setflightImg] = useState("");

  const handleSearch = async (input) => {
    try {
      console.log("Searching for flight:", input);
      const docAirline = doc(db, "Airline", input);
      const docSnap = await getDoc(docAirline);
      const flightInfo = docSnap.data();

      // console.log(docSnap.data());
      setflightImg(flightInfo.img); 
      const cityList = [flightInfo.start, ...flightInfo.end];
      console.log(cityList);

      const cityInfo = [];
      for (const city of cityList) {
        const docCity = doc(db, "City", city);
        const docCitySnap = await getDoc(docCity);
        cityInfo.push(docCitySnap.data());
      }
      console.log(cityInfo);
      setCities(cityInfo);

    } catch (error) {
      console.error("Error fetching flights or cities: ", error);
    }
  };


  return (
    <div className="main-container">
      <div className='top-container'>   
        <SearchBar onSearch={handleSearch} cities={cities} flightImg={flightImg} />
        <Carousel cities={cities} />
      </div>
      <Map cities={cities} />
    </div>
  );
}

export default App;
