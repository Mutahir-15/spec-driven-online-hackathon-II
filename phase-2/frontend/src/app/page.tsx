'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ItemCard } from '@/components/features/item-card';
import { SearchBar } from '@/components/features/search-bar';
import { FilterBar } from '@/components/features/filter-bar';
import { SortDropdown } from '@/components/features/sort-dropdown';
import { api } from '@/lib/api';
import { Item, Priority } from '@/types';

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Search, Filter, Sort State
  const [search, setSearch] = useState('');
  const [completed, setCompleted] = useState<boolean | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Build query string
      const params = new URLSearchParams();
      if (search) params.append('q', search);
      if (completed !== null) params.append('completed', completed.toString());
      if (priority) params.append('priority', priority);
      if (sortBy) params.append('sort_by', sortBy);
      
      const queryString = params.toString();
      const endpoint = `/items/${queryString ? `?${queryString}` : ''}`;
      
      const data = await api.get<Item[]>(endpoint);
      setItems(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load items');
    } finally {
      setIsLoading(false);
    }
  }, [search, completed, priority, sortBy]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const clearFilters = () => {
    setSearch('');
    setCompleted(null);
    setPriority(null);
    setSortBy(null);
  };

  const isFiltering = search || completed !== null || priority || sortBy;

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 mt-1">Manage your items and tasks.</p>
        </div>
        <Link href="/items/new">
          <Button className="shadow-lg hover:shadow-xl transition-shadow w-full md:w-auto text-base py-2.5 px-6">
            Create New Item
          </Button>
        </Link>
      </div>

      <div className="bg-zinc-50/50 p-6 rounded-2xl border border-zinc-200 mb-10 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
          <div className="w-full lg:flex-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider ml-1 mb-1.5 block">Search</label>
            <SearchBar onSearch={setSearch} defaultValue={search} />
          </div>
          
          <div className="flex flex-wrap items-end gap-6">
            <FilterBar 
              completed={completed} 
              priority={priority} 
              onCompletedChange={setCompleted} 
              onPriorityChange={setPriority} 
            />
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
            
            {isFiltering && (
              <button 
                onClick={clearFilters}
                className="text-sm font-medium text-zinc-400 hover:text-indigo-600 transition-colors pb-2"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-zinc-600 mb-6">{error}</p>
          <Button onClick={fetchItems}>Try Again</Button>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-zinc-300 shadow-sm">
          <div className="mx-auto h-16 w-16 text-zinc-300 mb-6">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-zinc-900">
            {isFiltering ? 'No matching items found' : 'Your list is empty'}
          </h3>
          <p className="mt-2 text-zinc-500 max-w-xs mx-auto">
            {isFiltering 
              ? 'Try adjusting your search or filters to find what you are looking for.' 
              : 'Get started by creating your very first task or item.'}
          </p>
          <div className="mt-8">
            {isFiltering ? (
              <Button variant="secondary" onClick={clearFilters}>Clear all filters</Button>
            ) : (
              <Link href="/items/new">
                <Button variant="primary">Create first item</Button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}