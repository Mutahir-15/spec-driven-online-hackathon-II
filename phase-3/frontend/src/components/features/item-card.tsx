'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '../ui/card';
import { Item } from '@/types';
import { api } from '@/lib/api';

import { Badge } from '../ui/badge';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const router = useRouter();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async (e: React.MouseEvent | React.ChangeEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setIsToggling(true);
      await api.patch(`/items/${item.id}`, {
        is_completed: !item.is_completed
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to toggle completion:', error);
      alert('Failed to update status');
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Link 
      href={`/items/${item.id}`} 
      className="block hover:no-underline group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl relative h-full"
    >
      <Card className={`hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer h-full flex flex-col group-hover:translate-y-[-2px] ${isToggling ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="flex flex-col gap-1 overflow-hidden">
            <h3 className={`text-lg font-semibold text-zinc-900 truncate group-hover:text-indigo-600 transition-colors ${item.is_completed ? 'line-through text-zinc-400' : ''}`}>
              {item.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <Badge 
                variant={
                  item.priority === 'High' ? 'danger' : 
                  item.priority === 'Medium' ? 'indigo' : 
                  'default'
                }
                className="text-[10px] uppercase tracking-wider"
              >
                {item.priority}
              </Badge>
              {item.is_recurring && (
                <Badge variant="outline" className="text-[10px] gap-1 bg-white">
                  <svg className="w-3 h-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {item.recurrence_pattern}
                </Badge>
              )}
              {item.tags?.map(tag => (
                <Badge key={tag.id} variant="outline" className="text-[10px] bg-zinc-50/50">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          <div 
            className="flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-zinc-300 rounded cursor-pointer transition-transform hover:scale-110"
              checked={item.is_completed}
              onChange={handleToggle}
              disabled={isToggling}
              aria-label={item.is_completed ? "Mark as incomplete" : "Mark as complete"}
            />
          </div>
        </div>
        
        {item.description && (
          <p className={`text-zinc-600 line-clamp-2 mb-4 text-sm leading-relaxed ${item.is_completed ? 'text-zinc-400' : ''}`}>
            {item.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
          <span className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${item.is_completed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-800'}`}>
            {item.is_completed ? 'Completed' : 'Pending'}
          </span>
          <span className="text-xs text-zinc-400 font-mono" aria-label={`Created on ${new Date(item.created_at).toLocaleDateString()}`}>
            {new Date(item.created_at).toLocaleDateString()}
          </span>
        </div>
      </Card>
    </Link>
  );
};
