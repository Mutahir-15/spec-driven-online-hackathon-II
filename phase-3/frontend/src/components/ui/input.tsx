import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...props }) => {
  const inputId = id || props.name || Math.random().toString(36).substr(2, 9);
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="w-full">
      {label && <label htmlFor={inputId} className="block text-sm font-medium text-zinc-700 mb-1.5">{label}</label>}
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:bg-zinc-50 disabled:text-zinc-500 ${error ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : 'border-zinc-300 text-zinc-900 placeholder-zinc-400 hover:border-zinc-400'} ${className}`}
        {...props}
      />
      {error && <p id={errorId} className="mt-1 text-sm text-red-600 animate-pulse" role="alert">{error}</p>}
    </div>
  );
};
