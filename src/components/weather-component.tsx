import { useEffect, useState } from "react";
import '../styles/weather-component.css'
import { getWeatherInfo } from "../services/api-services.ts";
import dateIcon from '../icons/date-icon.svg';
import weatherIcon from '../icons/weather-icon.svg';
import locationIcon from '../icons/location-icon.svg';

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
      if(data?.current?.isDay){
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
    <div className={`weather-component-container ${isDay?'day':'night'}`}>
      <div className="weather-header-container">
        <div className="weather-header-section-1">
          <img
            src={weatherData?.current?.condition?.icon}
            alt="Weather Icon"
            className="icon"
          />
          <img src={weatherIcon} className="weather-icon" alt="Weather-Icon" />
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
          <img src={dateIcon} alt="Date Icon" className="date-icon" />
          <h1 className="date">
            {todaysDate[0]},&nbsp;{todaysDate[1]}&nbsp;{todaysDate[2]}&nbsp;
            {todaysDate[3]}
          </h1>
        </div>
        <div className="location-container">
          <img
            src={locationIcon}
            alt="Location Icon"
            className="location-icon"
          />
          <h1 className="location-city">{weatherData?.location?.name}</h1>
          <h2 className="location-region">{weatherData?.location?.region}</h2>
        </div>
      </div>
      <div className="humidity-container">
        <h3 className="humidity">
          Humidity is {weatherData?.current?.humidity}
        </h3>
        &nbsp;
      </div>

      <div className="other-details-container">
        <p className="wind">Wind {weatherData?.current?.wind_kph} km/h</p>
        <p className="cloud">Cloud {weatherData?.current?.cloud}</p>
      </div>
    </div>
  );
};
