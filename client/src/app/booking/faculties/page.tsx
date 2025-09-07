"use client";

import { useMemo, useState } from "react";

type ParkingArea = {
  id: string;
  name: string;
  totalSlots: number;
  occupiedSlots: number[];
};

export default function ParkingBookingPage() {
  const [selectedAreaId, setSelectedAreaId] = useState<string>("A");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const areas: ParkingArea[] = useMemo(
    () => [
      { id: "A", name: "Area A", totalSlots: 20, occupiedSlots: [2, 5, 6, 11, 18] },
      { id: "B", name: "Area B", totalSlots: 16, occupiedSlots: [1, 4, 7, 10, 12, 15] },
      { id: "C", name: "Area C", totalSlots: 24, occupiedSlots: [3, 8, 9, 13, 20, 21, 22] },
    ],
    []
  );

  const selectedArea = areas.find((a) => a.id === selectedAreaId)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleNumber || !date || !time || !selectedSlot) {
      alert("Please fill vehicle number, date, time and select a slot.");
      return;
    }
    alert(
      `Booked: ${vehicleNumber} in ${selectedArea.name} - Slot ${selectedSlot} on ${date} at ${time}`
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Parking Booking</h1>
      <p className="text-slate-600 mb-8">Reserve a parking slot. Transportation details are not required.</p>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Number</label>
            <input value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} type="text" placeholder="e.g., MH 15 AB 1234" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Owner Name (optional)</label>
            <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} type="text" placeholder="Your name" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
            <input value={time} onChange={(e) => setTime(e.target.value)} type="time" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">Parking Area</label>
            <select value={selectedAreaId} onChange={(e) => { setSelectedAreaId(e.target.value); setSelectedSlot(null); }} className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              {areas.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Available slots shown below. Occupied are disabled.</span>
              <span className="text-sm text-slate-600">{selectedArea.totalSlots - selectedArea.occupiedSlots.length} / {selectedArea.totalSlots} available</span>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
              {Array.from({ length: selectedArea.totalSlots }, (_, i) => i + 1).map((slot) => {
                const isOccupied = selectedArea.occupiedSlots.includes(slot);
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isOccupied}
                    onClick={() => setSelectedSlot(slot)}
                    className={
                      `h-10 rounded-md border text-sm ` +
                      (isOccupied
                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                        : isSelected
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 border-slate-300 hover:border-emerald-400 hover:text-emerald-700")
                    }
                    aria-pressed={isSelected}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add notes" className="w-full min-h-[96px] rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="reset" onClick={() => { setSelectedSlot(null); setVehicleNumber(""); setOwnerName(""); setDate(""); setTime(""); setNotes(""); }} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50">Clear</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Book Slot</button>
        </div>
      </form>
    </div>
  );
}


