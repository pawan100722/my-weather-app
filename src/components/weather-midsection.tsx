import "../styles/weather-midsection.css";
import locationIcon from "../icons/location-icon.svg";
import locationIconNight from "../icons/location-icon-night.svg";
import { MidSectionComponentPropDTO } from "../dtos/components-dto";

export const WeatherMidSectionComponent = ({
  isDay,
  locationName,
  regionName,
}: MidSectionComponentPropDTO) => {
  return (
    <div className="mid-section-container">
      <div className="location-container">
        <img
          src={isDay ? locationIcon : locationIconNight}
          alt="Location Icon"
          className="location-icon"
        />
        <h1 className="location-city">{locationName}</h1>
        <h2 className="location-region">{regionName}</h2>
      </div>
    </div>
  );
};
