import { useEffect, useState } from "react";
import "../styles/forecast-carousel.css";
import { ForecastDTO } from "../dtos/data-dto";
import { ForecastCarouselPropDTO } from "../dtos/components-dto";
import leftArrowIconDay from "../icons/arrow-left-circle-day-icon.svg";
import leftArrowIconNight from "../icons/arrow-left-circle-night-icon.svg";
import rightArrowIconDay from "../icons/arrow-right-circle-day-icon.svg";
import rightArrowIconNight from "../icons/arrow-right-circle-night-icon.svg";

export const ForecastCarousel = ({
  weatherForecastData,
  isDay,
}: ForecastCarouselPropDTO) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [autoNextId, setAutoNextId] = useState<number>(NaN);
  const [hasUserClicked, setHasUserClicked] = useState<boolean>(false);


  /**
   * used to auto move the carousel
   */
  useEffect(() => {
    const id = setInterval(() => {
      next();
      setAutoNextId(id);
    }, 2500);

    return () => {
       clearInterval(id);
    };
  },[]);

   /**
    * If user clicks the next or prev button the carousel
    * Then this effect stops it from auto move
    */
   useEffect(()=>{
    if(hasUserClicked){
    console.log('Clearing interval,Auto next id:', autoNextId)
    clearInterval(autoNextId);}
   },[hasUserClicked])

  const handleCarouselNext = () => {
    setHasUserClicked(true)
    next();
  };

  const handleCarouselPrev = () => {
    setHasUserClicked(true);
    prev();
  };

  const next=()=>{
    setSelectedIndex((prev) =>
      prev === weatherForecastData.length ? 0 : prev + 1
    );
  }

  const prev=()=>{
    setSelectedIndex((prev) =>
      prev === 0 ? weatherForecastData.length : prev - 1
    );
  }

  return (
    <div className="forecast-main-container">
      <p className="forecast-title">Forecast for the day!</p>
      <div className="forecast-carousel-main-container">
        <img
          src={isDay ? leftArrowIconDay : leftArrowIconNight}
          alt=""
          className="carousel-icon"
          onClick={handleCarouselPrev}
        />
        <div className="forecast-carousel-container">
          {weatherForecastData?.map((data: ForecastDTO, indx: number) => {
            return (
              <div
                className={`forecast-card ${
                  data?.is_day ? "forecast-day" : "forecast-night"
                }`}
                key={`${indx}-${data.condition.icon}`}
                style={{ transform: `translate(-${selectedIndex * 100}%)` }}
              >
                <img
                  src={data?.condition?.icon}
                  alt="Forecast ICON"
                  className="forecast-icon"
                />
                <p className="forecast-time">{data?.time.split(" ")[1]}</p>
                <p className="forecast-text">{data?.condition?.text}</p>
                <p className="forecast-temperature">{data?.temp_c}&deg;</p>
                <p className="forecast-wind">Wind:{data?.wind_kph} km/h</p>
                <p className="forecast-humidity">Humidity:{data?.humidity}</p>
              </div>
            );
          })}
        </div>
        <img
          src={isDay ? rightArrowIconDay : rightArrowIconNight}
          alt=""
          className="carousel-icon"
          onClick={handleCarouselNext}
        />
      </div>
    </div>
  );
};
