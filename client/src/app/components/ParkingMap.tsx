import React from 'react';

export interface ParkingSlot {
  id: string;
  status: 'free' | 'occupied' | 'reserved';
  position: { x: number; y: number };
  zone: string;
}

interface ParkingMapProps {
  slots: ParkingSlot[];
  className?: string;
  onSlotClick?: (slotId: string) => void;
}

/**
 * SVG-based parking map component with status indicators
 * Uses Tailwind CSS for styling with color-coded slot statuses
 */
export default function ParkingMap({ slots, className = '', onSlotClick }: ParkingMapProps) {
  const getSlotColor = (status: string) => {
    switch (status) {
      case 'free':
        return 'fill-green-500';
      case 'occupied':
        return 'fill-red-500';
      case 'reserved':
        return 'fill-yellow-500';
      default:
        return 'fill-gray-300';
    }
  };

  const getSlotStroke = (status: string) => {
    switch (status) {
      case 'free':
        return 'stroke-green-600';
      case 'occupied':
        return 'stroke-red-600';
      case 'reserved':
        return 'stroke-yellow-600';
      default:
        return 'stroke-gray-400';
    }
  };

  return (
    <div className={`w-full h-64 border border-gray-300 rounded-lg professional-card ${className}`}>
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Parking lot background */}
        <rect
          x="20"
          y="20"
          width="360"
          height="160"
          fill="white"
          stroke="#3b82f6"
          strokeWidth="2"
          rx="8"
        />
        
        {/* Main road */}
        <rect
          x="20"
          y="100"
          width="360"
          height="20"
          fill="#f1f5f9"
          stroke="#3b82f6"
          strokeWidth="1"
        />
        
        {/* Zone labels */}
        <text x="30" y="35" className="text-xs font-semibold fill-blue-600">
          Zone A
        </text>
        <text x="30" y="185" className="text-xs font-semibold fill-blue-600">
          Zone B
        </text>
        
        {/* Parking slots */}
        {slots.map((slot) => (
          <g key={slot.id}>
            <rect
              x={slot.position.x}
              y={slot.position.y}
              width="25"
              height="15"
              className={`${getSlotColor(slot.status)} ${getSlotStroke(slot.status)} stroke-2 cursor-pointer hover:opacity-80 transition-opacity`}
              onClick={() => onSlotClick?.(slot.id)}
              aria-label={`Parking slot ${slot.id} - ${slot.status}`}
            />
            <text
              x={slot.position.x + 12.5}
              y={slot.position.y + 10}
              className="text-xs font-bold fill-white text-center"
              textAnchor="middle"
            >
              {slot.id}
            </text>
          </g>
        ))}
        
        {/* Legend */}
        <g transform="translate(300, 30)">
          <rect x="0" y="0" width="80" height="60" fill="white" stroke="#3b82f6" rx="4" />
          <text x="40" y="15" className="text-xs font-semibold fill-blue-600" textAnchor="middle">
            Legend
          </text>
          <rect x="5" y="20" width="12" height="8" className="fill-green-500 stroke-green-600 stroke-1" />
          <text x="20" y="27" className="text-xs fill-gray-700">Free</text>
          <rect x="5" y="32" width="12" height="8" className="fill-red-500 stroke-red-600 stroke-1" />
          <text x="20" y="39" className="text-xs fill-gray-700">Occupied</text>
          <rect x="5" y="44" width="12" height="8" className="fill-yellow-500 stroke-yellow-600 stroke-1" />
          <text x="20" y="51" className="text-xs fill-gray-700">Reserved</text>
        </g>
      </svg>
    </div>
  );
}
