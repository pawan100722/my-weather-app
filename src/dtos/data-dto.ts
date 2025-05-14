export interface WeatherDTO {
  current: any,
  location: any,
  forecast: any,
}

export interface ForecastDTO {
    condition: { icon: string, text: string },
    is_day: number,
    time: string,
    temp_c: number,
    wind_kph: number,
    humidity: number,
}
