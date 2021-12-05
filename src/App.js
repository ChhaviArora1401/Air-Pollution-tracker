import React, { useState } from 'react';
import axios from 'axios';
const api = {
  key: "13b9f54c92fb40ccb6f94b7d55c0c1d8",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [aqi, setAqi] = useState(0);

  const search = evt => {
    if (evt.key === "Enter") {
        axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(res => {
          setWeather(res.data);
        })
        axios.get(`https://api.waqi.info/feed/${query}/?token=9a87cad6f4be8e8355c464bb0b3904e751436013`).then(res => {
          setAqi(res.data.data.aqi);
          console.log(res)
        })
        setQuery('') ;
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp-aqi">
              <div className="temp">
              <span>{Math.round(weather.main.temp)}°c</span>
              <h6>TEMP</h6>
              </div>
              <div className="aqi">
              <span>
                {aqi === "-" ? "NA" : aqi}
              </span>
              <h6>AQI</h6>
              </div>
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            <div className="weather">
              <span className="aqi-level">
                  Air Quality - {
                    aqi >= 0 && aqi <= 50 
                      ? "Good" 
                      : (aqi > 50 && aqi < 100) 
                        ? "Moderate" 
                        : aqi > 100 && aqi <= 200 
                          ? "Unhealthy" 
                          : aqi > 200 && aqi <= 300 
                            ? "Very Unhealty" 
                            : aqi > 300 
                              ?"Hazardous"
                              : "NA"
                  }</span>
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
