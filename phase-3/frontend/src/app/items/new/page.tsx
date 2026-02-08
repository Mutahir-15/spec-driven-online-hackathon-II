'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ItemForm } from '@/components/features/item-form';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function NewItemPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleCreateItem = async (data: { title: string; description?: string }) => {
    setError('');
    try {
      setIsLoading(true);
      await api.post('/items/', data);
      router.push('/'); // Redirect to list page
      router.refresh();
    } catch (error: any) {
      console.error('Failed to create item:', error);
      setError(error.message || 'Failed to create item');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Create New Item</h1>
        <Link href="/" className="text-sm text-zinc-500 hover:text-indigo-600 transition-colors">
          Cancel
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 sm:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start gap-2" role="alert">
             <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
            {error}
          </div>
        )}
        <ItemForm onSubmit={handleCreateItem} isLoading={isLoading} />
      </div>
    </div>
  );
}
