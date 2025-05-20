import { useEffect, useState } from "react";
import '../styles/weather-midsection.css';
import dateIcon from "../icons/date-icon.svg";
import locationIcon from "../icons/location-icon.svg";
import dateIconNight from "../icons/date-icon-night.svg";
import locationIconNight from "../icons/location-icon-night.svg";
import { MidSectionComponentPropDTO } from "../dtos/components-dto";

const currentDate = new Date();

export const WeatherMidSectionComponent = ({ isDay, locationName,regionName }: MidSectionComponentPropDTO) => {

  const [todaysDate] = useState<string[]>(
    currentDate.toString().split(" ").slice(0, 4)
  );
  const [time, setTime] = useState<string>(
    currentDate.toString().split(" ")[4]
  );

  useEffect(()=>{
    setInterval(() => {
      setTime(new Date().toString().split(" ")[4]);
    }, 1000);
  },[])

  return (
    <div className="mid-section-container">
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
