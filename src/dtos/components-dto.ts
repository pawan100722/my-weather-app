import { ForecastDTO } from "./data-dto";

export interface ForecastCarouselPropDTO {
  weatherForecastData:ForecastDTO[];
  isDay:boolean;
}

export interface MidSectionComponentPropDTO {
  isDay:number;
  locationName:string;
  regionName:string;
}

export interface OtherDetailsComponentPropDTO {
  isDay:number;
  humidity:number;
  windKPH:number;
  cloud:number;
}

export interface TopSectionPropDTO {
  isDay: number,
  currentConditionText:string,
  currentFeelsLike:number,
  currentTemperature:number
}