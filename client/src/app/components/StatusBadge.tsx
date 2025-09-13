import React from 'react';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'free' | 'occupied' | 'reserved';
  className?: string;
}

/**
 * Status badge component with color-coded status indicators
 * Uses Tailwind CSS for consistent status styling
 */
export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
      case 'free':
        return 'status-success';
      case 'inactive':
      case 'rejected':
      case 'occupied':
        return 'status-error';
      case 'pending':
      case 'reserved':
        return 'status-warning';
      default:
        return 'status-info';
    }
  };

  const baseClasses = 'professional-badge';
  const statusClasses = getStatusClasses(status);

  return (
    <span className={`${baseClasses} ${statusClasses} ${className}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
