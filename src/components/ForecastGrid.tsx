import type { ForecastDay } from '../types/weather.types';

interface ForecastGridProps {
  forecast: ForecastDay[];
}

function getWeatherEmoji(code: number): string {
  if (code >= 200 && code < 300) return '⛈️';
  if (code >= 300 && code < 600) return '🌧️';
  if (code >= 600 && code < 700) return '❄️';
  if (code >= 700 && code < 800) return '🌫️';
  if (code === 800) return '☀️';
  if (code === 801) return '🌤️';
  if (code === 802) return '⛅';
  if (code >= 803) return '☁️';
  return '🌡️';
}

export function ForecastGrid({ forecast }: ForecastGridProps) {
  return (
    <>
      <p className="section-title">Прогноз на 5 днів</p>
      <div className="forecast">
        {forecast.map((day: ForecastDay) => (
          <div key={day.day} className="forecast-day">
            <div className="forecast-day-name">{day.day}</div>
            <div className="forecast-icon">{getWeatherEmoji(day.weatherCode)}</div>
            <div className="forecast-temp">{day.temp}°C</div>
          </div>
        ))}
      </div>
    </>
  );
}
