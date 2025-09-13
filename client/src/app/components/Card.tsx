import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable Card component with Tailwind CSS styling
 * Provides consistent card styling across all role interfaces
 */
export default function Card({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'md',
  shadow = 'md' 
}: CardProps) {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  const baseClasses = 'professional-card rounded-lg border border-gray-200';
  const hoverClasses = hover ? 'hover:shadow-lg hover:border-gray-300 transition-all duration-300' : '';
  const paddingClass = paddingClasses[padding];
  const shadowClass = shadowClasses[shadow];

  return (
    <div className={`${baseClasses} ${paddingClass} ${shadowClass} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
