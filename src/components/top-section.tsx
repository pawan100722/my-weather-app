import '../styles/top-section.css';
import sunIcon from "../icons/sun.svg";
import moonIcon from "../icons/moon-icon.svg";
import weatherIcon from "../icons/weather-icon.svg";
import weatherIconNight from "../icons/weather-icon-night.svg";
import { TopSectionPropDTO } from '../dtos/components-dto';

export const TopSection = ({ isDay, currentConditionText, currentFeelsLike, currentTemperature}:TopSectionPropDTO) => {
  return (
    <div className="weather-top-section-container">
      <div className="weather-top-section-1">
        <img
          src={ isDay? sunIcon : moonIcon}
          alt="Weather Icon"
          className="icon"
        />
        <img
          src={isDay ? weatherIcon : weatherIconNight}
          className="weather-icon"
          alt="Weather-Icon"
        />
        <p className="weather-clearance">
          {currentConditionText}
        </p>
      </div>
      <div className="temperature-container">
        <h1 className="temperature">{currentTemperature}&deg; C</h1>
        <h3 className="feels-like">
          Feels Like {currentFeelsLike}
        </h3>
      </div>
    </div>
  );
};
