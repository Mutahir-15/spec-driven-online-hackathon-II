'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, defaultValue = '' }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-xl leading-5 bg-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all shadow-sm hover:border-zinc-300"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search tasks"
      />
    </div>
  );
};
