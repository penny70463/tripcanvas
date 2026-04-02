import { Place } from "@/lib/types";

type NearbyListProps = {
  places: Place[];
};

export function NearbyList({ places }: NearbyListProps) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-rose-500">Nearby</p>
          <h3 className="mt-1 text-2xl font-semibold text-slate-900">順路補給 / 附近可去</h3>
        </div>
        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">手動整理版</span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {places.map((place) => (
          <article key={place.id} className="rounded-2xl bg-slate-50 p-4">
            <h4 className="text-base font-semibold text-slate-900">{place.name}</h4>
            {place.description && <p className="mt-2 text-sm leading-6 text-slate-600">{place.description}</p>}
            {place.googleMapsUrl && <a href={place.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-medium text-sky-700 hover:text-sky-900">看地圖 →</a>}
          </article>
        ))}
      </div>
    </section>
  );
}
