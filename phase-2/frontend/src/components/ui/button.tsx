import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', disabled, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out shadow-sm";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500 active:bg-indigo-800",
    secondary: "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 focus-visible:ring-zinc-500 hover:border-zinc-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 active:bg-red-800",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    />
  );
};
