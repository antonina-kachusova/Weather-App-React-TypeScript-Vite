import { useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastGrid } from './components/ForecastGrid';
import './App.css';

function App() {
  const { weather, forecast, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather('Kyiv');
  }, [fetchWeather]);

  return (
    <div className="app">
      <SearchBar onSearch={fetchWeather} loading={loading} />

      {loading && <p className="loading">Завантаження...</p>}
      {error && <p className="error">{error}. Спробуй англійською.</p>}

      {weather && !loading && (
        <>
          <WeatherCard weather={weather} />
          <ForecastGrid forecast={forecast} />
        </>
      )}
    </div>
  );
}

export default App;
