import humidityIconDay from "../icons/humidity-icon-day.svg";
import humidityIconNight from "../icons/humidity-icon-night.svg";
import windIconDay from "../icons/wind-icon-day.svg";
import windIconNight from "../icons/wind-icon-night.svg";
import cloudIconDay from "../icons/cloud-icon-day.svg";
import cloudIconNight from "../icons/cloud-icon-night.svg";
import { OtherDetailsComponentPropDTO } from "../dtos/components-dto";
import '../styles/other-detail.css';

export const OtherDetailsComponent = ({ isDay, humidity, windKPH, cloud }:OtherDetailsComponentPropDTO) => {
  return (
    <div className="other-details-main-container">
      <div className="humidity-container">
        <img
          src={
            isDay ? humidityIconDay : humidityIconNight
          }
          alt="Humidity Icon"
          className="humidity-icon"
        />
        <h3 className="humidity">
          Humidity is {humidity}
        </h3>
        &nbsp;
      </div>

      <div className="other-details-container">
        <div className="wind-container">
          <img
            src={isDay ? windIconDay : windIconNight}
            alt="Wind Icon"
            className="wind-icon"
          />
          <p className="wind">Wind {windKPH} km/h</p>
        </div>
        <div className="cloud-container">
          <img
            src={isDay ? cloudIconDay : cloudIconNight}
            alt="Cloud Icon"
            className="cloud-icon"
          />
          <p className="cloud">Cloud {cloud}</p>
        </div>
      </div>
    </div>
  );
};
