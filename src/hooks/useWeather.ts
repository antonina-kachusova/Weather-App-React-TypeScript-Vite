import { useCallback, useState } from 'react';
import type { WeatherData, ForecastDay, UseWeatherReturn } from '../types/weather.types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const DAY_NAMES = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

interface OpenWeatherCurrentResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    id: number;
    description: string;
  }>;
}

interface OpenWeatherForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    id: number;
  }>;
}

interface OpenWeatherForecastResponse {
  list: OpenWeatherForecastItem[];
}

function getDayName(timestamp: number): string {
  return DAY_NAMES[new Date(timestamp * 1000).getDay()];
}

export function useWeather(): UseWeatherReturn {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string): Promise<void> => {
    if (!city.trim()) return;

    if (!API_KEY) {
      setError('API ключ не знайдено');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [currentRes, forecastRes] = await Promise.all([
        fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ua`),
        fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ua`),
      ]);

      if (currentRes.status === 401 || forecastRes.status === 401) {
        throw new Error('Невірний або неактивний API ключ');
      }

      if (currentRes.status === 404 || forecastRes.status === 404) {
        throw new Error('Місто не знайдено');
      }

      if (!currentRes.ok || !forecastRes.ok) {
        throw new Error('Помилка при отриманні даних про погоду');
      }

      const currentData = (await currentRes.json()) as OpenWeatherCurrentResponse;
      const forecastData = (await forecastRes.json()) as OpenWeatherForecastResponse;

      const weatherResult: WeatherData = {
        city: currentData.name,
        country: currentData.sys.country,
        temp: Math.round(currentData.main.temp),
        feelsLike: Math.round(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed),
        description: currentData.weather[0].description,
        weatherCode: currentData.weather[0].id,
      };

      const dailyMap: Record<string, ForecastDay> = {};

      forecastData.list.forEach((item) => {
        const day = getDayName(item.dt);

        if (!dailyMap[day]) {
          dailyMap[day] = {
            day,
            temp: Math.round(item.main.temp),
            weatherCode: item.weather[0].id,
          };
        }
      });

      setWeather(weatherResult);
      setForecast(Object.values(dailyMap).slice(0, 5));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Щось пішло не так');
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, forecast, loading, error, fetchWeather };
}
