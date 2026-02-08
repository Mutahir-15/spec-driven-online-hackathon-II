'use client';

import React from 'react';

interface SortDropdownProps {
  sortBy: string | null;
  onSortChange: (sortBy: string | null) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider ml-1">Sort By</label>
      <select
        className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:border-zinc-300 transition-all"
        value={sortBy || ''}
        onChange={(e) => onSortChange(e.target.value === '' ? null : e.target.value)}
        aria-label="Sort tasks by"
      >
        <option value="">Latest</option>
        <option value="due_date">Due Date</option>
        <option value="priority">Priority</option>
        <option value="title">Alphabetical</option>
      </select>
    </div>
  );
};
