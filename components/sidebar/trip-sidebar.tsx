import { Trip } from "@/lib/types";

type TripSidebarProps = {
  trip: Trip;
  selectedDayId: string;
  onSelectDay: (dayId: string) => void;
};

export function TripSidebar({ trip, selectedDayId, onSelectDay }: TripSidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col gap-6 rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur xl:max-w-sm">
      <div className="space-y-3">
        <p className="text-sm font-medium text-sky-600">tripcanvas</p>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{trip.title}</h1>
          <p className="mt-2 text-sm text-slate-600">{trip.dateRange} · {trip.destination}</p>
        </div>
        <p className="text-sm leading-6 text-slate-600">{trip.overview}</p>
      </div>

      <section className="rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">住宿</p>
        <h2 className="mt-2 text-base font-semibold text-slate-900">{trip.lodging.name}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">{trip.lodging.address}</p>
        {trip.lodging.googleMapsUrl && (
          <a href={trip.lodging.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-medium text-sky-700 hover:text-sky-900">
            看住宿位置 →
          </a>
        )}
      </section>

      <section className="min-h-0 flex-1 overflow-hidden">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">每日行程</h3>
          <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">{trip.days.length} days</span>
        </div>
        <div className="flex max-h-[55vh] flex-col gap-3 overflow-y-auto pr-1">
          {trip.days.map((day, index) => {
            const active = day.id === selectedDayId;
            return (
              <button
                key={day.id}
                onClick={() => onSelectDay(day.id)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  active ? "border-sky-200 bg-sky-50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Day {index + 1}</p>
                    <h4 className="mt-1 text-base font-semibold text-slate-900">{day.dateLabel}</h4>
                  </div>
                  {active && <span className="rounded-full bg-sky-600 px-2 py-1 text-[11px] font-semibold text-white">Selected</span>}
                </div>
                <p className="mt-2 text-sm font-medium text-slate-800">{day.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{day.summary}</p>
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
