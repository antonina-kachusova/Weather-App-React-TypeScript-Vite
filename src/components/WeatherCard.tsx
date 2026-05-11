import type { WeatherData } from '../types/weather.types';

interface WeatherCardProps {
  weather: WeatherData;
}

function getWeatherEmoji(code: number): string {
  if (code >= 200 && code < 300) return '⛈️';
  if (code >= 300 && code < 400) return '🌧️';
  if (code >= 500 && code < 600) return '🌧️';
  if (code >= 600 && code < 700) return '❄️';
  if (code >= 700 && code < 800) return '🌫️';
  if (code === 800) return '☀️';
  if (code === 801) return '🌤️';
  if (code === 802) return '⛅';
  if (code >= 803) return '☁️';
  return '🌡️';
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="weather-card">
      <h2 className="city-name">{weather.city}</h2>
      <p className="country">{weather.country}</p>

      <div className="temp-row">
        <span className="temp-big">{weather.temp}°C</span>
        <span className="weather-icon">{getWeatherEmoji(weather.weatherCode)}</span>
      </div>

      <p className="description">{weather.description}</p>

      <div className="metrics">
        <div className="metric">
          <div className="metric-label">Відчувається</div>
          <div className="metric-value">{weather.feelsLike}°C</div>
        </div>
        <div className="metric">
          <div className="metric-label">Вологість</div>
          <div className="metric-value">{weather.humidity}%</div>
        </div>
        <div className="metric">
          <div className="metric-label">Вітер</div>
          <div className="metric-value">{weather.windSpeed} м/с</div>
        </div>
      </div>
    </div>
  );
}
