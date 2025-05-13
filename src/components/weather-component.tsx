import { useEffect, useState } from "react";
import '../styles/weather-component.css'
import { getWeatherInfo } from "../services/api-services.ts";
import sunIcon from '../icons/sun.svg';
import moonIcon from '../icons/moon-icon.svg';
import dateIcon from '../icons/date-icon.svg';
import dateIconNight from '../icons/date-icon-night.svg';
import weatherIcon from '../icons/weather-icon.svg';
import weatherIconNight from '../icons/weather-icon-night.svg';
import locationIcon from '../icons/location-icon.svg';
import locationIconNight from '../icons/location-icon-night.svg';
import humidityIconDay from '../icons/humidity-icon-day.svg';
import humidityIconNight from '../icons/humidity-icon-night.svg';
import windIconDay from '../icons/wind-icon-day.svg';
import windIconNight from '../icons/wind-icon-night.svg';
import cloudIconDay from '../icons/cloud-icon-day.svg';
import cloudIconNight from '../icons/cloud-icon-night.svg';

export const WeatherComponent = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [weatherData, setWeatherData] = useState<{
    current: any;
    location: any;
  }>({ current: {}, location: {} });
  const [isDay, setIsDay] = useState<boolean>(false)

  const [todaysDate] = useState<string[]>(new Date().toString().split(' ').slice(0,4))

  useEffect(() => {
    setCurrentLocation();
  }, []);

  useEffect(() => {
    if (coordinates?.latitude) {
      fetchLocationData();
    }
  }, [coordinates]);

  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCoordinates({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  const fetchLocationData = async () => {
    try {
      const data = await getWeatherInfo({
        location: `${coordinates.latitude},${coordinates.longitude}`,
      });
      setWeatherData(data);
      if(data?.current?.is_day===1){
        setIsDay(true)
      }else{
        setIsDay(false)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { name, status } = err;
      const message = err?.response?.data?.error?.message || err?.message;
      const code = err?.response?.data?.error?.code || err?.code;
      console.error({ message, name, code, status });
    }
  };

  return (
    <div className={`weather-component-container ${isDay ? "day" : "night"}`}>
      <div className="weather-header-container">
        <div className="weather-header-section-1">
          <img
            src={isDay ? sunIcon : moonIcon}
            alt="Weather Icon"
            className="icon"
          />
          <img src={isDay?weatherIcon:weatherIconNight} className="weather-icon" alt="Weather-Icon" />
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
      <div className="mid-section">
        <div className="date-container">
          <img src={isDay?dateIcon:dateIconNight} alt="Date Icon" className="date-icon" />
          <h1 className="date">
            {todaysDate[0]},&nbsp;{todaysDate[1]}&nbsp;{todaysDate[2]}&nbsp;
            {todaysDate[3]}
          </h1>
        </div>
        <div className="location-container">
          <img
            src={isDay?locationIcon:locationIconNight}
            alt="Location Icon"
            className="location-icon"
          />
          <h1 className="location-city">{weatherData?.location?.name}</h1>
          <h2 className="location-region">{weatherData?.location?.region}</h2>
        </div>
      </div>
      <div className="humidity-container">
        <img
          src={isDay ? humidityIconDay : humidityIconNight}
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
            src={isDay ? windIconDay : windIconNight}
            alt="Wind Icon"
            className="wind-icon"
          />
          <p className="wind">Wind {weatherData?.current?.wind_kph} km/h</p>
        </div>
        <div className="cloud-container">
          <img src={isDay?cloudIconDay:cloudIconNight} alt="Cloud Icon" className="cloud-icon" />
        <p className="cloud">Cloud {weatherData?.current?.cloud}</p>
        </div>
      </div>
    </div>
  );
};
