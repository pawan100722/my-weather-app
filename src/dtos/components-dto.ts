import { ForecastDTO, WeatherDTO } from "./data-dto";

export interface ForecastCarouselPropDTO {
  weatherForecastData:ForecastDTO[];
  isDay:boolean;
}

export interface MidSectionComponentPropDTO{
  weatherData: WeatherDTO,
}

export interface OtherDetailsComponentPropDTO{
  weatherData: WeatherDTO,
}

export interface TopSectionPropDTO{
  weatherData: WeatherDTO,
}