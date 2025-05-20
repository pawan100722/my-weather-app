import { useEffect, useState } from 'react';
import '../styles/top-section.css';
import sunIcon from "../icons/sun.svg";
import moonIcon from "../icons/moon-icon.svg";
import dateIcon from "../icons/date-icon.svg";
import weatherIcon from "../icons/weather-icon.svg";
import dateIconNight from "../icons/date-icon-night.svg";
import weatherIconNight from "../icons/weather-icon-night.svg";
import { TopSectionPropDTO } from '../dtos/components-dto';

const currentDate = new Date();


export const TopSection = ({ isDay, currentConditionText, currentFeelsLike, currentTemperature}:TopSectionPropDTO) => {

  const [time, setTime] = useState<string>(
    currentDate.toString().split(" ")[4]
  );

  const [todaysDate] = useState<string[]>(
    currentDate.toString().split(" ").slice(0, 4)
  );

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toString().split(" ")[4]);
    }, 1000);
  }, []);


  return (
    <div className="weather-top-section-container">
      <div className="weather-top-section-1">
        <img
          src={isDay ? sunIcon : moonIcon}
          alt="Weather Icon"
          className="icon"
        />
        <img
          src={isDay ? weatherIcon : weatherIconNight}
          className="weather-icon"
          alt="Weather-Icon"
        />
        <p className="weather-clearance">{currentConditionText}</p>
      </div>
      <div className="temperature-container">
        <h1 className="temperature">{currentTemperature}&deg; C</h1>
        <h3 className="feels-like">Feels Like {currentFeelsLike}</h3>
      </div>

      <div className="date-container">
        <div className="date-inner-container">
          <img
            src={isDay ? dateIcon : dateIconNight}
            alt="Date Icon"
            className="date-icon"
          />
          <h1 className="date">
            {todaysDate[0]},&nbsp;{todaysDate[2]}&nbsp;{todaysDate[1]}&nbsp;
            {todaysDate[3]}
          </h1>
        </div>
        <h2 className="time">{time}</h2>
      </div>
    </div>
  );
};
