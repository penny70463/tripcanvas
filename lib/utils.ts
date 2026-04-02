import { PlaceCategory } from "@/lib/types";

export const categoryLabelMap: Record<PlaceCategory, string> = {
  lodging: "住宿",
  airport: "機場",
  station: "車站",
  attraction: "景點",
  ticket: "票券",
  nearby: "附近",
};

export const categoryColorMap: Record<PlaceCategory, string> = {
  lodging: "bg-sky-100 text-sky-700",
  airport: "bg-slate-100 text-slate-700",
  station: "bg-violet-100 text-violet-700",
  attraction: "bg-emerald-100 text-emerald-700",
  ticket: "bg-amber-100 text-amber-700",
  nearby: "bg-rose-100 text-rose-700",
};
