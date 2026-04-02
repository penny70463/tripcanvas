import { TripDay } from "@/lib/types";
import { categoryColorMap, categoryLabelMap } from "@/lib/utils";

type DayDetailProps = {
  day: TripDay;
};

export function DayDetail({ day }: DayDetailProps) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-sky-600">{day.dateLabel}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{day.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{day.summary}</p>
        </div>
        {day.routeGoogleMapsUrl && (
          <a href={day.routeGoogleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
            Google Maps 路線
          </a>
        )}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">交通方式</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{day.transit}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">提醒</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
            {day.notes.map((note) => (
              <li key={note} className="flex gap-2"><span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-sky-500" /><span>{note}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">當日重點地點</h3>
          <span className="text-sm text-slate-500">{day.places.length} places</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {day.places.map((place) => (
            <article key={place.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${categoryColorMap[place.category]}`}>{categoryLabelMap[place.category]}</span>
              <h4 className="mt-3 text-base font-semibold text-slate-900">{place.name}</h4>
              {place.description && <p className="mt-2 text-sm leading-6 text-slate-600">{place.description}</p>}
              {place.address && <p className="mt-2 text-sm leading-6 text-slate-500">{place.address}</p>}
              {place.googleMapsUrl && <a href={place.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-medium text-sky-700 hover:text-sky-900">在 Google Maps 開啟 →</a>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
