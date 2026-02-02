import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Priority, Tag, RecurrencePattern } from '@/types';
import { api } from '@/lib/api';
import { Badge } from '../ui/badge';

interface ItemFormProps {
  onSubmit: (data: { 
    title: string; 
    description?: string; 
    is_completed?: boolean;
    priority?: Priority;
    due_date?: string;
    due_time?: string;
    tag_ids?: number[];
    is_recurring?: boolean;
    recurrence_pattern?: RecurrencePattern;
  }) => void;
  initialValues?: {
    title: string;
    description?: string;
    is_completed: boolean;
    priority: Priority;
    due_date?: string;
    due_time?: string;
    tags?: Tag[];
    is_recurring: boolean;
    recurrence_pattern?: RecurrencePattern;
  };
  isLoading?: boolean;
}

export const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, initialValues, isLoading }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [isCompleted, setIsCompleted] = useState(initialValues?.is_completed || false);
  const [priority, setPriority] = useState<Priority>(initialValues?.priority || Priority.MEDIUM);
  const [dueDate, setDueDate] = useState(initialValues?.due_date || '');
  const [dueTime, setDueTime] = useState(initialValues?.due_time || '');
  const [isRecurring, setIsRecurring] = useState(initialValues?.is_recurring || false);
  const [recurrencePattern, setRecurrencePattern] = useState<RecurrencePattern>(
    initialValues?.recurrence_pattern || RecurrencePattern.DAILY
  );
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    initialValues?.tags?.map(t => t.id) || []
  );
  
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const tags = await api.get<Tag[]>('/tags/');
      setAvailableTags(tags);
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  };

  const handleToggleTag = (tagId: number) => {
    setSelectedTagIds(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId) 
        : [...prev, tagId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    onSubmit({ 
      title, 
      description, 
      is_completed: isCompleted,
      priority,
      due_date: dueDate || undefined,
      due_time: dueTime || undefined,
      tag_ids: selectedTagIds,
      is_recurring: isRecurring,
      recurrence_pattern: isRecurring ? recurrencePattern : undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter item title"
        error={error}
        disabled={isLoading}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="w-full">
          <label className="block text-sm font-medium text-zinc-700 mb-1.5">Priority</label>
          <select
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:bg-zinc-50 text-zinc-900 bg-white hover:border-zinc-400"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            disabled={isLoading}
          >
            {Object.values(Priority).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <Input
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={isLoading}
        />

        <Input
          label="Due Time"
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
        <div className="flex items-center">
          <input
            id="is_recurring"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300 rounded cursor-pointer"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            disabled={isLoading}
          />
          <label htmlFor="is_recurring" className="ml-3 block text-sm font-medium text-zinc-700 cursor-pointer">
            Recurring Task
          </label>
        </div>

        {isRecurring && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-zinc-700 whitespace-nowrap">Pattern:</label>
            <select
              className="flex-1 bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 transition-all"
              value={recurrencePattern}
              onChange={(e) => setRecurrencePattern(e.target.value as RecurrencePattern)}
              disabled={isLoading}
            >
              {Object.values(RecurrencePattern).map((pattern) => (
                <option key={pattern} value={pattern}>{pattern}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Tags</label>
        <div className="flex flex-wrap gap-2 p-3 border border-zinc-300 rounded-lg bg-zinc-50/50">
          {availableTags.length === 0 && (
            <p className="text-sm text-zinc-400 italic">No tags available</p>
          )}
          {availableTags.map(tag => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleToggleTag(tag.id)}
              className={`transition-all ${selectedTagIds.includes(tag.id) ? 'opacity-100 scale-105' : 'opacity-50 grayscale hover:opacity-75'}`}
            >
              <Badge variant="indigo">{tag.name}</Badge>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Description (Optional)</label>
        <textarea
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:bg-zinc-50 text-zinc-900 placeholder-zinc-400 hover:border-zinc-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          rows={4}
          disabled={isLoading}
        />
      </div>
      
      {initialValues && (
        <div className="flex items-center p-4 bg-zinc-50 rounded-lg border border-zinc-100">
          <input
            id="is_completed"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300 rounded cursor-pointer"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
            disabled={isLoading}
          />
          <label htmlFor="is_completed" className="ml-3 block text-sm font-medium text-zinc-700 cursor-pointer">
            Mark as completed
          </label>
        </div>
      )}

      <div className="pt-2">
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? 'Saving...' : initialValues ? 'Update Item' : 'Create Item'}
        </Button>
      </div>
    </form>
  );
};
