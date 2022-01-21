
import './App.css';
import { useState } from 'react';

function App() {
  const [place, setPlace]= useState('New York');
  const [placeInfo, setPlaceInfo]= useState({});

  const handleFetch = () => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=e9d170ae7d5d43479d2122029222101&q=${place}&days=1&aqi=no&alerts=no`)
      .then(response => response.json())
      .then(data =>
      setPlaceInfo({
        name: data.location.name,
        country: data.location.country,
        degree: {
          current: data.current.temp_c,
          high: data.forecast.forecastday[0].day.maxtemp_c,
          low: data.forecast.forecastday[0].day.mintemp_c,
        },
        condition: data.current.condition.text
      })
    );
  };
  console.log(placeInfo);
  return (
    <div className="App">
      <div className="search-input">
        <input type="text" value={place} onChange={(e)=> setPlace(e.target.value)}/>
        <button onClick={handleFetch}> Check Weather </button>
      </div>
      <div className="weather-container">
        <div className="top-part">
          <h1> {placeInfo.degree.current}  </h1>
        </div>
        <div className="condition-high-low">
          <h1> {placeInfo.condition} </h1>
          <h1> {placeInfo.degree.high} </h1>
          <h1> {placeInfo.degree.low} </h1>
        </div>
      </div>
      <h2> {placeInfo.name}, {placeInfo.country} </h2>
    </div>
  );
}

export default App;
