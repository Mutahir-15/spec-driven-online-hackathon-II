'use client';

import React from 'react';
import { Priority } from '@/types';

interface FilterBarProps {
  completed: boolean | null;
  priority: Priority | null;
  onCompletedChange: (completed: boolean | null) => void;
  onPriorityChange: (priority: Priority | null) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  completed, 
  priority, 
  onCompletedChange, 
  onPriorityChange 
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider ml-1">Status</label>
        <select
          className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:border-zinc-300 transition-all"
          value={completed === null ? '' : completed.toString()}
          onChange={(e) => onCompletedChange(e.target.value === '' ? null : e.target.value === 'true')}
          aria-label="Filter by completion status"
        >
          <option value="">All Status</option>
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider ml-1">Priority</label>
        <select
          className="bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:border-zinc-300 transition-all"
          value={priority || ''}
          onChange={(e) => onPriorityChange(e.target.value === '' ? null : e.target.value as Priority)}
          aria-label="Filter by priority"
        >
          <option value="">All Priority</option>
          {Object.values(Priority).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
