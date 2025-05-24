import '../styles/air-quality.css';
import { AirQualityPropsDTO } from "../dtos/components-dto";

export const AirQuality=({isDay,data}: AirQualityPropsDTO)=>{
  const {co, no2,o3,so2,pm2_5,pm10} = data

  return (
    <div
      className={`${
        isDay ? "air-quality-container-day" : "air-quality-container-night"
      } air-quality-container`}
    >
      <div className="air-quality-heading">Air Quality</div>
      <div className="air-quality-data">
        <p>Carbon Monoxide: <span>{co}</span></p>
        <p>Nitrogen Dioxide:<span>{no2}</span></p>
        <p>Ozone:<span>{o3}</span></p>
        <p>Sulphur Dioxide:<span>{so2}</span></p>
        <p>Particulate Matter &#60;2.5 µm:<span>{pm2_5}</span></p>
        <p>Particulate Matter &#60;10 µm:<span>{pm10}</span></p>
        <p>U.S. EPA Air Quality Index:<span>{data['us-epa-index']}</span></p>
        <p>UK DEFRA Air Quality Index:<span>{data['gb-defra-index']}</span></p>
      </div>
    </div>
  );
}