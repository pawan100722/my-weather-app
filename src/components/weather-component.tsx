import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import '../styles/weather-component.css';
import { getWeatherInfo } from "../services/api-services.ts";
import { ForecastDTO } from "../dtos/data-dto.ts";

import { ForecastCarousel } from "./forecast-carousel.tsx";
import { WeatherMidSectionComponent } from "./weather-midsection.tsx";
import { OtherDetailsComponent } from "./other-details.tsx";
import { TopSection } from "./top-section.tsx";
import { Loading } from "./loading.tsx";


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

  
  /**
   * When the component mounts, the the current location is set
   */
  
  useEffect(() => {
    setCurrentLocation();
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
    <Loading />
  ) : (
    <div
      className={`weather-component-container ${
        weatherData?.current?.is_day ? "day" : "night"
      }`}
    >
      <TopSection
        isDay={weatherData?.current?.is_day}
        currentConditionText={weatherData?.current?.condition?.tex}
        currentFeelsLike={weatherData?.current?.feelslike_c}
        currentTemperature={weatherData?.current?.temp_c}
      />
      <WeatherMidSectionComponent
        isDay={weatherData?.current?.is_day}
        locationName={weatherData?.location?.name}
        regionName={weatherData?.location?.region}
      />
      <OtherDetailsComponent
        isDay={weatherData?.current?.is_day}
        humidity={weatherData?.current?.humidity}
        windKPH={weatherData?.current?.wind_kph}
        cloud={weatherData?.current?.cloud}
      />
      <ForecastCarousel
        weatherForecastData={weatherForecastData}
        isDay={weatherData?.current?.is_day}
      />
    </div>
  );
};
