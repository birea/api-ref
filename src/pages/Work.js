import React, { useEffect } from 'react';
const location = "London";
const Work = () => {
  useEffect(() => {
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
  }, [])
  return (
    <div>
      dfdf
    </div>
  )
}

export default Work;