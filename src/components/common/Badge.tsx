import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'brand' | 'lime';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'info',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full font-["Poppins"]';

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  const variantStyles = {
    success: 'bg-[#dcfce7] text-[#16A34A] border border-[#bbf7d0]',
    warning: 'bg-[#fef3c7] text-[#D97706] border border-[#fde68a]',
    error: 'bg-[#fee2e2] text-[#DC2626] border border-[#fecaca]',
    info: 'bg-[#e0f2fe] text-[#1C395C] border border-[#bae6fd]',
    brand: 'bg-[#fde2ce] text-[#812926] border border-[#fbd0b0]',
    lime: 'bg-[#b9ee8d] text-[#063b27] border border-[#9fd86e]',
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
};
