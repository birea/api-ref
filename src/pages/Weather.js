import React, { useState } from 'react';

const Weather = () => {
  const [location, setLocation] = useState(null)

  const getWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <div>
      <h3> GithubSearch </h3> 
      <div>
        <input type = "text" onInput = {(e) => setLocation(e.target.value)} /> 
      </div> 
      <div >
        <button onClick = {getWeather} > Get Weather </button>
      </div>
    </div>
  )
}

export default Weather;