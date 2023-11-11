import React, { useState } from 'react'
import axios from 'axios'
import thunderstorm from './assets/thunderstorm.gif';
import cloudy from './assets/cloudy.gif';
import drizzle from './assets/drizzle.gif';
import rain from './assets/rain.gif';
import snow from './assets/snow.gif';
import clear from './assets/clear.gif';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=278a7b5bd2718c4e4ee88a3556b2604f`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clouds':
        return `url(${cloudy})`;
      case 'Thunderstorm':
        return `url(${thunderstorm})`;
      case 'Drizzle':
        return `url(${drizzle})`;  
      case 'Rain':
        return `url(${rain})`;  
      case 'Snow':
        return `url(${snow})`;    
      case 'Clear':
        return `url(${clear})`; 
      default:
        return `url(${cloudy})`; // Provide a default image if the condition is not matched
    }
  };

  return (
    <div className="app" style={{ backgroundImage: getBackgroundImage(data.weather ? data.weather[0].main : ''),opacity:1}}>     
    <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          // onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : <h1>Welcome To Weather App!</h1>}
          </div>
          <div className="description">
  {data.weather ? (
    <div>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
      />
      <p>{data.weather[0].main}</p>
    </div>
  ) : null}
</div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;