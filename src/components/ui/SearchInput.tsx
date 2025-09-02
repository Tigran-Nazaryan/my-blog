'use client';

import { useState } from 'react';
import { Input, Button } from 'antd';

interface SearchInputProps {
  onSearch: (query: string) => void;
  onReset?: () => void;
}

export default function SearchInput({ onSearch, onReset }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleReset = () => {
    setSearchQuery('');
    if (onReset) {
      onReset();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <Input
        placeholder="Search posts by title, content or author"
        value={searchQuery}
        onChange={(e) => {
          if (e.target.value) {
            setSearchQuery(e.target.value)
          } else {
            handleReset()
          }
        }}
        onKeyDown={handleKeyDown}
        allowClear
        style={{ maxWidth: 400 }}
      />
      <Button type="primary" onClick={handleSearch}>
        Search
      </Button>
      {onReset && (
        <Button onClick={handleReset}>
          Reset
        </Button>
      )}
    </div>
  );
}
