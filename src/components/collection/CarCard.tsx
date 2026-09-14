import React from 'react';
import { CarItem } from '../../types';

interface CarCardProps {
  key?: string;
  car: CarItem;
  onClick: (car: CarItem) => void;
}

export function CarCard({ car, onClick }: CarCardProps) {
  // Dynamically adjust font size for longer car names
  const isLongName = car.name.length > 14;

  return (
    <button
      type="button"
      onClick={() => onClick(car)}
      className="group flex flex-col text-left bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1.5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700 active:bg-zinc-50 dark:active:bg-zinc-800/50 w-full overflow-hidden"
    >
      {/* Car Image / Missing Slot */}
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800/80 mb-1.5 flex items-center justify-center">
        {car.image && !car.image.includes('unsplash') ? (
          <img
            src={car.image}
            alt={car.name}
            loading="lazy"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-800/60 p-2 text-center">
            <span className="text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Missing Car
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-between w-full min-w-0">
        <div>
          {/* Rarity Tag: text only */}
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-normal block leading-none mb-1">
            {car.rarity}
          </span>

          {/* Car Name: dynamic font size & multi-line wrapping */}
          <h3
            className={`font-medium text-zinc-900 dark:text-zinc-100 line-clamp-2 break-words leading-tight ${
              isLongName ? 'text-[10px]' : 'text-[11px]'
            }`}
            title={car.name}
          >
            {car.name}
          </h3>
        </div>

        {/* Specs & Date Spotted */}
        <div className="mt-1 pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
          <div className="text-[9px] text-zinc-500 dark:text-zinc-400 leading-tight">
            <span>{car.horsepower} HP</span>
            <span className="mx-1 text-zinc-300 dark:text-zinc-600">•</span>
            <span>{car.topSpeed} mph</span>
          </div>
          <div className="text-[8px] text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
            {car.dateSpotted}
          </div>
        </div>
      </div>
    </button>
  );
}
