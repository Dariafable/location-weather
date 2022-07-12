import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=09236776fd672aacabe81d786ec40580`;
  
  const handleInput = ({target}) => {
    let newLocation = target.value;
    setLocation(newLocation);
  }

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
      .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        alert("City name entered incorrectly. Enter location name :)");
      });
      /* getLocation(); */
      setLocation('');
    }
  }

 /*  const getLocation = async () => {
    const { data } = await axios.get(url)
    setData(data)
    console.log(data)
  } */

  return (
    <div className='app'>

      <div className='search'>
        <input
          value={location}
          onChange={handleInput}
          onKeyPress={searchLocation}
          className='input'
          placeholder='Enter location'
          type='text'
         />
      </div>

      <div className='container'>
      
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
           {data.main ? <h1>{data.main.temp.toFixed()}&#176;</h1> : null} 
          </div>

          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div> {/* top */}

       {data.name !== undefined && (
        <div className='bottom'>
          <div className='feeling'>
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}&#176;</p> : null}
            <p>Feels like</p>
          </div>

          <div className='humidity'>
            {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>

          <div className='wind'>
            {data.main ? <p className='bold'>{data.wind.speed.toFixed()} m/s</p> : null}
            <p>Wind speed</p>
          </div>
        </div> 
        )}

      </div> {/* container */} 
    </div>
  );
}

export default App;
