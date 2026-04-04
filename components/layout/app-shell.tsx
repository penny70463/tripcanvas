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
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const selectedDay = useMemo(() => trip.days.find((day) => day.id === selectedDayId) ?? trip.days[0], [selectedDayId, trip.days]);
  const mapPlaces = selectedDay ? selectedDay.places.concat(selectedDay.nearby) : [trip.lodging];
  const center: [number, number] = selectedDay
    ? [selectedDay.places[0]?.lat ?? trip.lodging.lat, selectedDay.places[0]?.lng ?? trip.lodging.lng]
    : [trip.lodging.lat, trip.lodging.lng];

  if (!selectedDay) return null;

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1600px] gap-6 px-4 py-6 pb-24 lg:grid-cols-[340px_minmax(0,1fr)] lg:pb-6 xl:px-6">

      {/* Mobile Backdrop */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileDrawerOpen(false)}
        />
      )}

      {/* Sidebar Wrapper: Fixed Drawer on Mobile / Static Grid Item on Desktop */}
      <div
        className={`fixed inset-x-0 top-2 z-50 transition-transform duration-300 ease-in-out lg:static lg:translate-y-0 ${isMobileDrawerOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div className="h-full p-4 lg:p-0">
          <TripSidebar
            trip={trip}
            selectedDayId={selectedDay.id}
            onSelectDay={(id) => {
              setSelectedDayId(id);
              setIsMobileDrawerOpen(false);
            }}
          />
        </div>
      </div>

      <main className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
        <div className="space-y-6">
          <DayDetail day={selectedDay} />
          <NearbyList places={selectedDay.nearby} />
        </div>
        <section className="flex flex-col min-w-0 rounded-[32px] border border-white/70 bg-white/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="mb-4 flex shrink-0 items-center justify-between px-2 pt-2">
            <div>
              <p className="text-sm font-medium text-emerald-600">Map</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-900">今日動線地圖</h3>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{mapPlaces.length} markers</span>
          </div>
          <div className="flex-1 min-h-0">
            <TripMap places={mapPlaces} center={center} />
          </div>
        </section>
      </main>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => setIsMobileDrawerOpen(true)}
        className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-medium text-white shadow-xl ring-1 ring-white/10 transition-transform hover:scale-105 active:scale-95 lg:hidden"
      >
        <span>📅</span>
        <span>選擇行程 ({selectedDay?.dateLabel})</span>
      </button>

    </div>
  );
}
