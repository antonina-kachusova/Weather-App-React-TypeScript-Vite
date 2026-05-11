import { useState, type KeyboardEvent } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState<string>('Kyiv');

  const handleSearch = (): void => {
    onSearch(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-row">
      <input
        type="text"
        placeholder="Введи місто..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Пошук...' : 'Пошук'}
      </button>
    </div>
  );
}
