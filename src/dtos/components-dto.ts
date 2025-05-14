import { ForecastDTO } from "./data-dto";

export interface ForecastCarouselPropDTO {
  weatherForecastData:ForecastDTO[];
  isDay:boolean;
}