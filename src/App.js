import './App.css';
import React from 'react';
import { SearchBar } from './components/SearchBar';
import Carousel  from './components/Carousel';
import Map from './components/Map';

function App() {
  return (
    <div className="main-container">
      <div className='top-container'>   
        <SearchBar />
        <Carousel />
      </div>
      <Map/>
    </div>
  );
}

export default App;
