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
import { AirQuality } from "./air-quality.tsx";
import { WindDetails } from "./wind-details.tsx";


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

  const [isDay, setIsDay] = useState<number>(0)

  
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
      setIsDay(data?.current?.is_day);
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
    <div className={`weather-component-container ${isDay ? "day" : "night"}`}>
      <TopSection
        isDay={isDay}
        currentConditionText={weatherData?.current?.condition?.text}
        currentFeelsLike={weatherData?.current?.feelslike_c}
        currentTemperature={weatherData?.current?.temp_c}
      />
      <div className="info-container">
        <WeatherMidSectionComponent
          isDay={isDay}
          locationName={weatherData?.location?.name}
          regionName={weatherData?.location?.region}
        />
        <OtherDetailsComponent
          isDay={isDay}
          humidity={weatherData?.current?.humidity}
          windKPH={weatherData?.current?.wind_kph}
          cloud={weatherData?.current?.cloud}
        />
        <AirQuality isDay={isDay} data={weatherData?.current?.air_quality} />
      </div>
      <div className="bottom-container">
        <WindDetails
          isDay={isDay}
          data={{
            windKPH: weatherData?.current?.wind_kph,
            windDirection: weatherData?.current?.wind_dir,
            atmosphericPressure: weatherData?.current?.pressure_mb,
            windChill: weatherData?.current?.windchill_c,
            heatIndex: weatherData?.current?.heatindex_c,
            dewPoint: weatherData?.current?.dewpoint_c,
            visibility: weatherData?.current?.vis_km,
            uv: weatherData?.current?.uv,
          }}
        />
        <ForecastCarousel
          weatherForecastData={weatherForecastData}
          isDay={isDay}
        />
      </div>
    </div>
  );
};
