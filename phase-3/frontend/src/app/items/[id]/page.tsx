'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { api, ApiError } from '@/lib/api';
import { Item } from '@/types';

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchItem(id);
    }
  }, [id]);

  const fetchItem = async (itemId: string) => {
    try {
      setIsLoading(true);
      const data = await api.get<Item>(`/items/${itemId}`);
      setItem(data);
    } catch (err: any) {
      if (err instanceof ApiError && err.status === 404) {
        setIsNotFound(true);
      } else {
        setError(err.message || 'Failed to load item');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      await api.delete(`/items/${id}`);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Failed to delete item');
      setIsDeleting(false);
    }
  };

  const handleToggle = async () => {
    if (!item) return;
    try {
      setIsLoading(true);
      const updated = await api.patch<Item>(`/items/${id}`, {
        is_completed: !item.is_completed
      });
      setItem(updated);
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !item) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-12 text-center bg-white rounded-xl shadow-sm border border-zinc-200">
        <div className="mx-auto h-12 w-12 text-zinc-400 mb-4">
           <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">Item Not Found</h2>
        <p className="text-zinc-600 mb-8">The item you are looking for does not exist or has been removed.</p>
        <Link href="/">
          <Button>Back to List</Button>
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 text-center bg-red-50 rounded-xl border border-red-200">
        <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => fetchItem(id)} variant="secondary">Try Again</Button>
        <div className="mt-4">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">Back to List</Link>
        </div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className={`max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden transition-opacity ${isLoading ? 'opacity-50' : ''}`}>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <h1 className={`text-3xl font-bold text-zinc-900 tracking-tight break-all ${item.is_completed ? 'line-through text-zinc-400' : ''}`}>
            {item.title}
          </h1>
          <div className="flex gap-2">
            <span className={`flex-shrink-0 px-3 py-1 text-sm font-medium rounded-full ${item.is_completed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-800'}`}>
              {item.is_completed ? 'Completed' : 'Pending'}
            </span>
            <span className={`flex-shrink-0 px-3 py-1 text-sm font-medium rounded-full ${
              item.priority === 'High' ? 'bg-red-100 text-red-700' :
              item.priority === 'Medium' ? 'bg-indigo-100 text-indigo-700' :
              'bg-zinc-100 text-zinc-700'
            }`}>
              {item.priority} Priority
            </span>
          </div>
        </div>
        
        {item.due_date && (
          <div className="mb-6 flex items-center gap-2 text-zinc-600 bg-zinc-50 p-3 rounded-lg border border-zinc-100 w-fit">
            <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium text-sm">Due: {new Date(item.due_date).toLocaleDateString()}</span>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Description</h3>
          <p className={`text-zinc-700 whitespace-pre-wrap leading-relaxed text-lg ${item.is_completed ? 'text-zinc-400' : ''}`}>
            {item.description || 'No description provided.'}
          </p>
        </div>

        <div className="border-t border-zinc-100 pt-6 flex flex-col sm:flex-row justify-between text-sm text-zinc-500 font-mono">
          <p>Created: {new Date(item.created_at).toLocaleString()}</p>
          <p>Last Updated: {new Date(item.updated_at).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="bg-zinc-50 px-8 py-4 border-t border-zinc-200 flex justify-between items-center">
        <Link href="/">
          <Button variant="secondary" disabled={isDeleting || isLoading}>Back</Button>
        </Link>
        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            onClick={handleToggle} 
            disabled={isDeleting || isLoading}
          >
            {item.is_completed ? 'Mark Incomplete' : 'Mark Complete'}
          </Button>
          <Link href={`/items/${item.id}/edit`}>
            <Button disabled={isDeleting || isLoading}>Edit</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting || isLoading}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
}
