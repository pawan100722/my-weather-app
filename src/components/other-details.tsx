import humidityIconDay from "../icons/humidity-icon-day.svg";
import humidityIconNight from "../icons/humidity-icon-night.svg";
import windIconDay from "../icons/wind-icon-day.svg";
import windIconNight from "../icons/wind-icon-night.svg";
import cloudIconDay from "../icons/cloud-icon-day.svg";
import cloudIconNight from "../icons/cloud-icon-night.svg";
import { OtherDetailsComponentPropDTO } from "../dtos/components-dto";
import '../styles/other-detail.css';

export const OtherDetailsComponent = ({ weatherData }:OtherDetailsComponentPropDTO) => {
  return (
    <div className="other-details-main-container">
      <div className="humidity-container">
        <img
          src={
            weatherData?.current?.is_day ? humidityIconDay : humidityIconNight
          }
          alt="Humidity Icon"
          className="humidity-icon"
        />
        <h3 className="humidity">
          Humidity is {weatherData?.current?.humidity}
        </h3>
        &nbsp;
      </div>

      <div className="other-details-container">
        <div className="wind-container">
          <img
            src={weatherData?.current?.is_day ? windIconDay : windIconNight}
            alt="Wind Icon"
            className="wind-icon"
          />
          <p className="wind">Wind {weatherData?.current?.wind_kph} km/h</p>
        </div>
        <div className="cloud-container">
          <img
            src={weatherData?.current?.is_day ? cloudIconDay : cloudIconNight}
            alt="Cloud Icon"
            className="cloud-icon"
          />
          <p className="cloud">Cloud {weatherData?.current?.cloud}</p>
        </div>
      </div>
    </div>
  );
};
