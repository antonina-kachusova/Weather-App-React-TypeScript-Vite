export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  weatherCode: number;
}

export interface ForecastDay {
  day: string;
  temp: number;
  weatherCode: number;
}

export interface UseWeatherReturn {
  weather: WeatherData | null;
  forecast: ForecastDay[];
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => Promise<void>;
}


