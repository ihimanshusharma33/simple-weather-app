import React, { useEffect }  from 'react'
import './style.css'
import { useState } from 'react'


const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null); // State to store fetched data
  const [error, setError] = useState('not null'); // State to store fetch error


  //method to fetch data from api
  const handleSearchClick = () => {
    // Construct the API URL based on the location input
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=0eb47e28304641b3ba1151157231704&q=${location}`;

    // Perform the fetch when the button is clicked
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setWeatherData()
        setLocation();
        setError(null);
      });
  };

    //method to search data
    const handleChange = (event) => {
      setLocation(event.target.value);
    };
    
  useEffect(()=>{
    if (weatherData) {
      setError('not error');
    }
},[weatherData])
const img =weatherData?weatherData.current.condition.icon:'';


  return (
    <div>
      <div className="container-sm  mt-4 wid-7">
        <div className='d-flex justify-content-center'>
          <div className="d-flex" role="search">
            <input
              type="text"
              placeholder='Search Location'
              value={location}
              onChange={handleChange}
            />
            <i className="fa-sharp fa-solid fa-magnifying-glass" onClick={handleSearchClick}></i>
          </div>
        </div>
        <div className='d-flex justify-content-center'>{
       error===null?<h3>404 No Data found</h3>: <img className='img-1' src={img} alt='weather img' />}

          {/* <img className='img-1' src={img} alt='weather img' /> */}
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <label>{ weatherData?weatherData.current.condition.text:'' }</label>
        </div>
        <div className='d-flex justify-content-around mt-4 mb-2'>
          <div>
            <label>Wind Speed:&nbsp; {
            weatherData?weatherData.current.wind_mph:''
            } km/h</label>
          </div>
          <div>
            <label>Feels like :&nbsp; {  weatherData?weatherData.current.feelslike_c:''} °C</label>
          </div>
        </div>
        <div className='d-flex justify-content-around mt-4 mb-2'>
          <div className='mr-2'>
            <label>Humidity :&nbsp;  {weatherData?weatherData.current.humidity:''}  g.m<sup>-3 </sup></label>
          </div>
          <div>
            <label>Visbility :&nbsp;{  weatherData?weatherData.current.vis_km:''} km</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather;
