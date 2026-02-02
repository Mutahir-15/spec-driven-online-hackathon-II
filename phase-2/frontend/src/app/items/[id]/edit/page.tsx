'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ItemForm } from '@/components/features/item-form';
import { api, ApiError } from '@/lib/api';
import { Item } from '@/types';
import Link from 'next/link';

export default function EditItemPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveError, setSaveError] = useState('');

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
      setError(err.message || 'Failed to load item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateItem = async (data: { title: string; description?: string; is_completed?: boolean }) => {
    setSaveError('');
    try {
      setIsSaving(true);
      await api.patch(`/items/${id}`, data);
      router.push(`/items/${id}`);
      router.refresh();
    } catch (err: any) {
      console.error('Failed to update item:', err);
      setSaveError(err.message || 'Failed to update item');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 rounded-xl border border-red-200 text-center shadow-sm">
        <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-600 mb-4">{error || 'Item not found'}</p>
        <button onClick={() => router.push('/')} className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
          Return to List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Edit Item</h1>
        <Link href={`/items/${id}`} className="text-sm text-zinc-500 hover:text-indigo-600 transition-colors">
          Cancel
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 sm:p-8">
        {saveError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2" role="alert">
            <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
            {saveError}
          </div>
        )}
        <ItemForm 
          initialValues={item} 
          onSubmit={handleUpdateItem} 
          isLoading={isSaving} 
        />
      </div>
    </div>
  );
}
