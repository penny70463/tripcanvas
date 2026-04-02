import dynamic from "next/dynamic";
import { Place } from "@/lib/types";

const ClientMap = dynamic(() => import("@/components/map/client-map").then((mod) => mod.ClientMap), {
  ssr: false,
  loading: () => <div className="flex h-full min-h-[420px] items-center justify-center rounded-[28px] bg-slate-100 text-sm text-slate-500">地圖載入中…</div>,
});

type TripMapProps = {
  places: Place[];
  center: [number, number];
};

export function TripMap({ places, center }: TripMapProps) {
  return <ClientMap places={places} center={center} />;
}
