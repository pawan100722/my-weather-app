import '../styles/wind-details.css';
import { WindDetailsProps } from "../dtos/components-dto";

export const WindDetails = ({ data, isDay }: WindDetailsProps) => {
  const {
    windKPH,
    windDirection,
    atmosphericPressure,
    windChill,
    heatIndex,
    dewPoint,
    visibility,
    uv,
  } = data;

  return (
    <div
      className={`wind-details-container ${
        isDay ? "wind-details-container-day" : "wind-details-container-night"
      }`}
    >
      <div className="wind-details-item">
        Wind:<span>{windKPH} KM/H</span>
      </div>
      <div className="wind-details-item">
        Wind Direction:<span>{windDirection}</span>
      </div>
      <div className="wind-details-item">
        Pressure:<span>{atmosphericPressure}mb</span>
      </div>
      <div className="wind-details-item">
        Wind Chill:<span>{windChill}&deg;</span>
      </div>
      <div className="wind-details-item">
        Heat Index:<span>{heatIndex}&deg;</span>
      </div>
      <div className="wind-details-item">
        Dew:<span>{dewPoint}&deg;</span>
      </div>
      <div className="wind-details-item">
        Visibility:<span>{visibility} KM</span>
      </div>
      <div className="wind-details-item">
        UV Index:<span>{uv}</span>
      </div>
    </div>
  );
};
