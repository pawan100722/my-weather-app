import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import '../styles/weather-component.css';

import { getWeatherInfo } from "../services/api-services.ts";
import sunIcon from '../icons/sun.svg';
import moonIcon from '../icons/moon-icon.svg';
import dateIcon from '../icons/date-icon.svg';
import locationIcon from '../icons/location-icon.svg';
import dateIconNight from '../icons/date-icon-night.svg';
import weatherIcon from '../icons/weather-icon.svg';
import weatherIconNight from '../icons/weather-icon-night.svg';
import { ForecastDTO } from "../dtos/data-dto.ts";
import locationIconNight from '../icons/location-icon-night.svg';
import humidityIconDay from '../icons/humidity-icon-day.svg';
import humidityIconNight from '../icons/humidity-icon-night.svg';
import windIconDay from '../icons/wind-icon-day.svg';
import windIconNight from '../icons/wind-icon-night.svg';
import cloudIconDay from '../icons/cloud-icon-day.svg';
import cloudIconNight from '../icons/cloud-icon-night.svg';
import { ForecastCarousel } from "./forecast-carousel.tsx";

const currentDate = new Date();

export const WeatherComponent = () => {
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [weatherData, setWeatherData] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    location: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    forecast:any;
  }>({ current: {}, location: {}, forecast:{} });
  const [weatherForecastData, setWeatherForecastData] = useState<ForecastDTO[]>(
    [
      {
        condition: { icon: '', text: '' },
        is_day: NaN,
        time: '',
        temp_c: NaN,
        wind_kph: NaN,
        humidity: NaN,
      },
    ]
  );

  const [todaysDate] = useState<string[]>(currentDate.toString().split(' ').slice(0,4));
  const [time,setTime] =useState<string>(currentDate.toString().split(' ')[4]);
  /**
   * When the component mounts, the the current location is set
   */
  

  useEffect(() => {
    setCurrentLocation();
    setInterval(()=>{
      setTime(new Date().toString().split(' ')[4])
    },1000)
  }, []);


  useEffect(() => {
    if (coordinates?.latitude) {
      fetchWeatherData();
    }
  }, [coordinates]);


  /**
   * It sets the coordinates for current location
   */
  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCoordinates({ latitude, longitude });
      },
      (error) => {
        toast.error(`Error getting location:${error?.message}`);
        // alert(`Error getting location:${error?.message}`);
        // console.error("Error getting location:", error?.code,error.message);
      }
    );
  };


  /**
   * fetches Weather data from API response and sets the states
   */
  const fetchWeatherData = async () => {
    try {
      const data = await getWeatherInfo({
        location: `${coordinates.latitude},${coordinates.longitude}`,
      });
      setWeatherData(data);
      setWeatherForecastData(data?.forecast?.forecastday[0]?.hour);
      setIsDataLoaded(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const { name, status } = err;
      const message = err?.response?.data?.error?.message || err?.message;
      const code = err?.response?.data?.error?.code || err?.code;
      console.error({ message, name, code, status });
    }
  };

  

  return !isDataLoaded ? (
    <h1>Data is loading</h1>
  ) : (
    <div
      className={`weather-component-container ${
        weatherData?.current?.is_day ? "day" : "night"
      }`}
    >
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
      <div className="mid-section-container">
        <div className="date-container">
          <div className="date-inner-container">
            <img
              src={weatherData?.current?.is_day ? dateIcon : dateIconNight}
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
            src={
              weatherData?.current?.is_day ? locationIcon : locationIconNight
            }
            alt="Location Icon"
            className="location-icon"
          />
          <h1 className="location-city">{weatherData?.location?.name}</h1>
          <h2 className="location-region">{weatherData?.location?.region}</h2>
        </div>
      </div>
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
      <ForecastCarousel weatherForecastData={weatherForecastData} isDay={weatherData?.current?.is_day}/>
    </div>
  );
};
