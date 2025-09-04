"use client";

import { useState } from "react";

type Slot = {
  name: string;
  occupied: number;
  capacity: number;
};

function ParkingGraph({ slots }: { slots: Slot[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {slots.map((slot) => {
        const percent = Math.min(100, Math.round((slot.occupied / slot.capacity) * 100));
        return (
          <div key={slot.name} className="border rounded p-4">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="font-medium">{slot.name}</span>
              <span>
                {slot.occupied}/{slot.capacity}
              </span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded">
              <div
                className="h-3 rounded bg-green-600"
                style={{ width: `${percent}%` }}
                aria-label={`${slot.name} occupancy ${percent}%`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [slots, setSlots] = useState<Slot[]>([
    { name: "Slot A", occupied: 5, capacity: 20 },
    { name: "Slot B", occupied: 12, capacity: 20 },
    { name: "Slot C", occupied: 18, capacity: 20 },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Parking Overview</h1>
      <ParkingGraph slots={slots} />

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Adjust occupancy (for demo)</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {slots.map((s, idx) => (
            <div key={s.name} className="flex items-center gap-2">
              <span className="w-16 text-sm">{s.name}</span>
              <input
                type="number"
                min={0}
                max={20}
                value={s.occupied}
                onChange={(e) => {
                  const value = Math.max(0, Math.min(20, Number(e.target.value)));
                  setSlots((prev) => {
                    const next = [...prev];
                    next[idx] = { ...next[idx], occupied: value };
                    return next;
                  });
                }}
                className="w-24 border rounded px-2 py-1 text-sm"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
