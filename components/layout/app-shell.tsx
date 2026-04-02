"use client";

import { useMemo, useState } from "react";
import { Trip } from "@/lib/types";
import { TripSidebar } from "@/components/sidebar/trip-sidebar";
import { DayDetail } from "@/components/trip/day-detail";
import { NearbyList } from "@/components/trip/nearby-list";
import { TripMap } from "@/components/map/trip-map";

type AppShellProps = {
  trip: Trip;
};

export function AppShell({ trip }: AppShellProps) {
  const [selectedDayId, setSelectedDayId] = useState(trip.days[0]?.id ?? "");

  const selectedDay = useMemo(() => trip.days.find((day) => day.id === selectedDayId) ?? trip.days[0], [selectedDayId, trip.days]);
  const mapPlaces = selectedDay ? selectedDay.places.concat(selectedDay.nearby) : [trip.lodging];
  const center: [number, number] = selectedDay
    ? [selectedDay.places[0]?.lat ?? trip.lodging.lat, selectedDay.places[0]?.lng ?? trip.lodging.lng]
    : [trip.lodging.lat, trip.lodging.lng];

  if (!selectedDay) return null;

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[340px_minmax(0,1fr)] xl:px-6">
      <TripSidebar trip={trip} selectedDayId={selectedDay.id} onSelectDay={setSelectedDayId} />
      <main className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
        <div className="space-y-6">
          <DayDetail day={selectedDay} />
          <NearbyList places={selectedDay.nearby} />
        </div>
        <section className="min-w-0 rounded-[32px] border border-white/70 bg-white/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="mb-4 flex items-center justify-between px-2 pt-2">
            <div>
              <p className="text-sm font-medium text-emerald-600">Map</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-900">今日動線地圖</h3>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{mapPlaces.length} markers</span>
          </div>
          <TripMap places={mapPlaces} center={center} />
        </section>
      </main>
    </div>
  );
}
