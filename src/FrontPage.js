import React, { useState } from 'react';
import './frontPage.css';
import WeatherInfo from './WeatherInfo'

const FrontPage = () => {
  return (
    <div className="frontPage">
      <p id="topText">Suomen lämpötilat</p>
      <WeatherInfo />
    </div>
  );
}

export default FrontPage;
