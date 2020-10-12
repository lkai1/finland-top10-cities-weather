import React from 'react';
import './frontPage.css';
import WeatherInfo from './WeatherInfo'

const FrontPage = () => {
  return (
    <div className="frontPage">
      <p id="topText">Top10 kaupunkien sää</p>
      <WeatherInfo />
    </div>
  );
}

export default FrontPage;
