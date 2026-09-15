import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cyan' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md font-["Poppins"]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#812926] text-white hover:bg-white hover:text-[#1c395c] hover:border-[#1c395c] border border-transparent focus:ring-[#812926] shadow-sm',
    secondary: 'bg-[#1c395c] text-white hover:bg-[#13273f] border border-transparent focus:ring-[#1c395c]',
    cyan: 'bg-[#41bed0] text-[#1c395c] font-semibold hover:bg-[#34a7b8] border border-transparent focus:ring-[#41bed0]',
    outline: 'border border-[#812926] text-[#812926] bg-transparent hover:bg-[#812926] hover:text-white focus:ring-[#812926]',
    ghost: 'text-[#212020] hover:bg-[#e5e5e5] bg-transparent focus:ring-[#c1c1c1]',
    danger: 'bg-[#DC2626] text-white hover:bg-[#b91c1c] border border-transparent focus:ring-[#DC2626]',
    success: 'bg-[#16A34A] text-white hover:bg-[#15803d] border border-transparent focus:ring-[#16A34A]',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};
