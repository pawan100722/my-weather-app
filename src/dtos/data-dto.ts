export interface ForecastDTO {
    condition: { icon: string, text: string },
    is_day: number,
    time: string,
    temp_c: number,
    wind_kph: number,
    humidity: number,
}
