import React from 'react';
import './frontPage.css';
import WeatherInfo from './WeatherInfo'

const FrontPage = () => {
  return (
    <div className="frontPage">
      <p>Top10 kaupunkien sää</p>
      <WeatherInfo />
    </div>
  );
}

export default FrontPage;
