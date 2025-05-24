import { ForecastDTO } from "./data-dto";

export interface ForecastCarouselPropDTO {
  weatherForecastData: ForecastDTO[];
  isDay: number;
}

export interface MidSectionComponentPropDTO {
  isDay: number;
  locationName: string;
  regionName: string;
}

export interface OtherDetailsComponentPropDTO {
  isDay: number;
  humidity: number;
  windKPH: number;
  cloud: number;
}

export interface TopSectionPropDTO {
  isDay: number;
  currentConditionText: string;
  currentFeelsLike: number;
  currentTemperature: number;
}

export interface AirQualityPropsDTO {
  isDay:number;
  data: {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    'us-epa-index': number;
    'gb-defra-index': number;
  };
}
