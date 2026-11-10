"use client";

import dynamic from "next/dynamic";
import { useId, useState } from "react";
import { routeColors, sakuraPlans, type FlightLeg, type HopMode, type PlanDay, type RouteStep } from "@/data/sakura-plans";
import { dayPhotos, type DayPhoto } from "@/data/sakura-photos";
import type { MapLeg } from "@/components/sakura/sakura-map";

const SakuraMap = dynamic(() => import("@/components/sakura/sakura-map").then((mod) => mod.SakuraMap), {
  ssr: false,
  loading: () => <div className="flex h-[420px] items-center justify-center rounded-2xl bg-slate-100 text-sm text-slate-500">地圖載入中…</div>,
});

function FlightChart({ flights }: { flights: FlightLeg[] }) {
  const groups = [
    { title: "這頁用的班", items: flights.filter((leg) => leg.pick === "yes") },
    { title: "也可以", items: flights.filter((leg) => leg.pick === "maybe") },
    { title: "不排", items: flights.filter((leg) => leg.pick === "no") },
  ];
  return (
    <div className="space-y-4">
      {groups.map((group) =>
        group.items.length === 0 ? null : (
          <div key={group.title} className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-slate-500">{group.title}</p>
            {group.items.map((leg) => (
              <FlightRow key={`${leg.way}-${leg.airline}-${leg.depart}`} leg={leg} />
            ))}
          </div>
        ),
      )}
    </div>
  );
}

function FlightRow({ leg }: { leg: FlightLeg }) {
  return (
    <div className={`rounded-2xl px-4 py-3 ring-1 ${leg.pick === "no" ? "bg-slate-50 ring-slate-200" : "bg-white ring-slate-200"}`}>
      <p className="text-xs font-medium text-slate-500">
        {leg.way}程 · {leg.airline}
        {leg.code ? ` ${leg.code}` : ""}
      </p>
      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-4">
        <div>
          <p className="text-sm text-slate-600">{leg.from}</p>
          <p className="text-2xl font-semibold tracking-tight text-slate-950">{leg.depart}</p>
          <p className="text-xs text-slate-400">起飛 · 當地</p>
        </div>
        <div className="px-1 text-center">
          <p className="text-xs leading-5 text-slate-500">{leg.duration}</p>
          <p className="text-slate-300" aria-hidden="true">
            ——→
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600">{leg.to}</p>
          <p className={`font-semibold tracking-tight text-slate-950 ${leg.arrive.length > 5 ? "text-lg" : "text-2xl"}`}>{leg.arrive}</p>
          <p className="text-xs text-slate-400">降落 · 當地</p>
        </div>
      </div>
      {leg.note && <p className="mt-2 text-sm leading-6 text-slate-600">{leg.note}</p>}
    </div>
  );
}

function DayPhotos({ photos }: { photos: DayPhoto[] }) {
  return (
    <div className={`mt-3 grid gap-2 ${photos.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
      {photos.map((photo) => (
        <figure key={photo.src}>
          <img src={photo.src} alt={photo.alt} loading="lazy" className="h-32 w-full rounded-xl object-cover sm:h-40" />
          <figcaption className="mt-1 text-xs text-slate-500">
            <a href={photo.href} target="_blank" rel="noreferrer" className="hover:text-slate-800">
              {photo.alt}
            </a>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function mapsUrl(from: RouteStep, to: RouteStep, mode: HopMode) {
  const travel = mode === "walk" ? "walking" : mode === "taxi" ? "driving" : "transit";
  return `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lng}&destination=${to.lat},${to.lng}&travelmode=${travel}`;
}

function RouteDiagram({ steps }: { steps: RouteStep[] }) {
  const hasSide = steps.some((step) => step.part === "side");
  return (
    <div className="mt-4">
      {hasSide && <p className="mb-2 text-xs font-medium text-slate-500">主行程</p>}
      <ol>
        {steps.map((step, index) => {
          const next = steps[index + 1];
          const href =
            step.lat != null && next?.lat != null && next.hop && next.hop.mode !== "flight"
              ? mapsUrl(step, next, next.hop.mode)
              : null;
          const opensSide = next?.part === "side" && step.part !== "side";
          return (
            <li key={`${step.label}-${index}`} className="flex gap-3">
              <div className="flex w-2 flex-col items-center">
                <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-slate-900" />
                {next && <span className="mt-1 w-px flex-1 bg-slate-200" />}
              </div>
              <div className={next ? "min-w-0 flex-1 pb-1" : "min-w-0 flex-1"}>
                <p className="text-sm font-medium leading-6 text-slate-950">{step.label}</p>
                {opensSide && <p className="mt-3 text-xs font-medium text-slate-500">副行程 · 午睡後約 16:00 出門，可不去</p>}
                {next?.hop &&
                  (href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="inline-flex py-1.5 text-xs font-medium text-sky-800 hover:text-sky-950">
                      {next.hop.text}
                      <span className="ml-1.5 font-normal">地圖</span>
                    </a>
                  ) : (
                    <p className="py-1.5 text-xs leading-5 text-slate-500">{next.hop.text}</p>
                  ))}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function legsOf(day: PlanDay): MapLeg[] {
  const legs: MapLeg[] = [];
  for (let index = 1; index < day.steps.length; index += 1) {
    const prev = day.steps[index - 1];
    const step = day.steps[index];
    if (prev.lat == null || prev.lng == null || step.lat == null || step.lng == null || !step.hop) continue;
    if (step.hop.onMap === false || step.hop.mode === "flight") continue;
    legs.push({
      mode: step.hop.mode,
      from: [prev.lat, prev.lng],
      to: [step.lat, step.lng],
      via: step.hop.via ?? [],
      label: step.label,
    });
  }
  return legs;
}

export function PlanBoard() {
  const baseId = useId();
  const [planId, setPlanId] = useState(sakuraPlans[0].id);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [dateIds, setDateIds] = useState<Record<string, string>>(() =>
    Object.fromEntries(sakuraPlans.map((plan) => [plan.id, plan.dates[0].id])),
  );

  const selectDay = (index: number) => {
    setActiveDay(index);
    document.getElementById(`${baseId}-day-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const backToPicker = () => {
    document.getElementById(`${baseId}-day-picker`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const plan = sakuraPlans.find((item) => item.id === planId) ?? sakuraPlans[0];
  const date = plan.dates.find((item) => item.id === dateIds[plan.id]) ?? plan.dates[0];
  const routes = plan.days.flatMap((day, index) => {
    const legs = legsOf(day);
    return legs.length ? [{ id: String(index), label: `Day ${index + 1} · ${date.dayLabels[index]}`, color: routeColors[index], legs }] : [];
  });
  const activeRouteId = activeDay !== null && routes.some((route) => route.id === String(activeDay)) ? String(activeDay) : null;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-sky-700">2027 賞櫻 · 六人 · 七天</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">2027 日本櫻花慢活巡禮 · 城市四選一</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          兩位 60 歲以上、三位年輕人、一位要午睡的小孩。每天約 8:30–9:00 出門，上午是主行程，在主要景點附近午餐，約 14:30–15:00 回住宿午睡。午睡後約 16:00 的副行程是小景點或購物，可以不去。巴士單程不超過 30 分鐘，其餘搭電車。下面四座的日期都對上花期，出發前一天和回來後一天都是台灣上班日。
        </p>
      </header>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="賞櫻方案">
        {sakuraPlans.map((item) => {
          const selected = item.id === plan.id;
          return (
            <button
              key={item.id}
              id={`${baseId}-${item.id}-tab`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-${item.id}-panel`}
              onClick={() => {
                setPlanId(item.id);
                setActiveDay(null);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                selected ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {item.city}
            </button>
          );
        })}
      </div>

      <section id={`${baseId}-${plan.id}-panel`} role="tabpanel" aria-labelledby={`${baseId}-${plan.id}-tab`} className="mt-4 space-y-6">
        <div className="rounded-[28px] bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-7">
          <p className="text-sm font-medium text-sky-700">{plan.fit}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{plan.city}</h2>

          {plan.dates.length > 1 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {plan.dates.map((item) => {
                const selected = item.id === date.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDateIds((current) => ({ ...current, [plan.id]: item.id }))}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                      selected ? "bg-sky-700 text-white" : "bg-sky-50 text-sky-800 hover:bg-sky-100"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="mt-3 text-sm font-semibold text-slate-900">{date.label}</p>
          )}
          <p className="mt-3 text-sm leading-6 text-slate-600">{date.detail}</p>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">{plan.intro}</p>
        </div>

        <section className="rounded-[28px] bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-7">
          <h3 className="text-lg font-semibold text-slate-950">班機</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">時間是當地時間。日本比台灣快 1 小時。</p>
          <div className="mt-4">
            <FlightChart flights={plan.flights} />
          </div>
        </section>

        <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <h3 className="text-sm font-semibold tracking-wide text-amber-900">出發前要先接受的條件</h3>
          <ul className="mt-3 space-y-2">
            {plan.conditions.map((condition) => (
              <li key={condition} className="text-sm leading-6 text-amber-950">
                {condition}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[28px] bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">住宿與每日路線</h3>
            </div>
            <button type="button" onClick={() => setActiveDay(null)} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
              看全部
            </button>
          </div>
          <div id={`${baseId}-day-picker`} className="mt-4 flex scroll-mt-4 flex-wrap gap-2">
            {plan.days.map((day, index) => (
              <button
                key={date.dayLabels[index]}
                type="button"
                onClick={() => selectDay(index)}
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${activeDay === index ? "text-white" : "bg-slate-50 text-slate-700"}`}
                style={activeDay === index ? { backgroundColor: routeColors[index] } : undefined}
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeDay === index ? "#fff" : routeColors[index] }} />
                Day {index + 1} · {date.dayLabels[index]}
                {day.onMap ? "" : " · 城外"}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <SakuraMap key={plan.id} lodging={plan.lodgingPoint} routes={routes} activeId={activeRouteId} />
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-7">
          <h3 className="text-lg font-semibold text-slate-950">七天</h3>
          <div className="mt-4 space-y-4">
            {plan.days.map((day, index) => {
              const selected = activeDay === index;
              return (
                <article
                  key={day.title}
                  id={`${baseId}-day-${index}`}
                  className="scroll-mt-4 rounded-2xl border border-slate-200 bg-white p-4"
                  style={selected ? { borderColor: routeColors[index], backgroundColor: `${routeColors[index]}12` } : undefined}
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: routeColors[index] }} />
                      Day {index + 1} · {date.dayLabels[index]}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base font-semibold text-slate-950">{day.title}</h4>
                      {day.highlight && (
                        <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-0.5 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-600/20">
                          {day.highlight}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs font-medium text-slate-500">{day.depart}</p>
                    {day.admission && (
                      <p className="mt-1 inline-block rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-900 ring-1 ring-inset ring-amber-600/20">
                        🎟️ {day.admission}
                      </p>
                    )}
                    <p className="mt-2 text-sm leading-6 text-slate-700">{day.body}</p>
                  </div>
                  <DayPhotos photos={dayPhotos[plan.id][index]} />
                  <p className="mt-3 text-xs font-semibold tracking-wide text-slate-500">當天路程 · 時間是預估</p>
                  <RouteDiagram steps={day.steps} />
                  {day.mapNote && <p className="mt-3 text-sm leading-6 text-slate-500">{day.mapNote}</p>}
                  <button type="button" onClick={backToPicker} className="mt-3 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200">
                    ↑ 回到日期選擇
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-7">
          <h3 className="text-lg font-semibold text-slate-950">六人一戶</h3>
          <h4 className="mt-2 text-base font-medium text-slate-800">{plan.stay.name}</h4>
          <ul className="mt-4 space-y-2">
            {plan.stay.facts.map((fact) => (
              <li key={fact} className="text-sm leading-6 text-slate-700">
                {fact}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-6 text-slate-600">{plan.stay.caution}</p>
          {plan.stay.link && (
            <a href={plan.stay.link.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900">
              {plan.stay.link.label}
            </a>
          )}
        </section>

        <section className="rounded-[28px] bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-950">預算</h3>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{plan.budget.total}</p>
              <p className="text-sm text-slate-500">{plan.budget.each}</p>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-4 font-medium">項目</th>
                  <th className="py-2 pr-4 font-medium">六人</th>
                  <th className="py-2 font-medium">估算方式</th>
                </tr>
              </thead>
              <tbody>
                {plan.budget.rows.map((row) => (
                  <tr key={row.item} className="border-b border-slate-100 align-top">
                    <th className="py-3 pr-4 font-medium text-slate-900">{row.item}</th>
                    <td className="whitespace-nowrap py-3 pr-4 text-slate-800">{row.amount}</td>
                    <td className="py-3 leading-6 text-slate-600">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">{plan.budget.note}</p>
        </section>
      </section>
    </div>
  );
}
