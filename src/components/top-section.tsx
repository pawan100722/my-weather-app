import '../styles/top-section.css';
import sunIcon from "../icons/sun.svg";
import moonIcon from "../icons/moon-icon.svg";
import weatherIcon from "../icons/weather-icon.svg";
import weatherIconNight from "../icons/weather-icon-night.svg";
import { TopSectionPropDTO } from '../dtos/components-dto';

export const TopSection = ({ weatherData }:TopSectionPropDTO) => {
  return (
    <div className="weather-top-section-container">
      <div className="weather-top-section-1">
        <img
          src={weatherData?.current?.is_day ? sunIcon : moonIcon}
          alt="Weather Icon"
          className="icon"
        />
        <img
          src={weatherData?.current?.is_day ? weatherIcon : weatherIconNight}
          className="weather-icon"
          alt="Weather-Icon"
        />
        <p className="weather-clearance">
          {weatherData?.current?.condition?.text}
        </p>
      </div>
      <div className="temperature-container">
        <h1 className="temperature">{weatherData?.current?.temp_c}&deg; C</h1>
        <h3 className="feels-like">
          Feels Like {weatherData?.current?.feelslike_c}
        </h3>
      </div>
    </div>
  );
};
