"use client";

import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { HopMode, MapStop } from "@/data/sakura-plans";

const homeIcon = L.divIcon({
  className: "sakura-pin",
  html: '<div style="background:#0f172a;color:#fff;border-radius:999px;padding:4px 8px;font-size:12px;font-weight:700;line-height:1.2;white-space:nowrap">住宿</div>',
  iconSize: [48, 22],
  iconAnchor: [24, 22],
});

export type MapLeg = {
  mode: HopMode;
  from: [number, number];
  to: [number, number];
  via: [number, number][];
  label: string;
};

type RouteLine = {
  id: string;
  label: string;
  color: string;
  legs: MapLeg[];
};

type SakuraMapProps = {
  lodging: MapStop;
  routes: RouteLine[];
  activeId: string | null;
};

const lineCache = new Map<string, [number, number][]>();

function osrmProfile(mode: HopMode) {
  if (mode === "walk") return "foot";
  if (mode === "taxi" || mode === "bus" || mode === "tram" || mode === "subway") return "driving";
  return null;
}

async function legLine(leg: MapLeg): Promise<[number, number][]> {
  const profile = osrmProfile(leg.mode);
  const anchors = [leg.from, ...leg.via, leg.to];
  if (!profile) return anchors;
  const key = `${profile}:${anchors.map((point) => point.map((n) => n.toFixed(5)).join(",")).join(";")}`;
  const cached = lineCache.get(key);
  if (cached) return cached;
  const path = anchors.map((point) => `${point[1]},${point[0]}`).join(";");
  const response = await fetch(`https://router.project-osrm.org/route/v1/${profile}/${path}?overview=full&geometries=geojson`);
  if (!response.ok) return anchors;
  const data = (await response.json()) as { routes?: { distance?: number; geometry?: { coordinates?: [number, number][] } }[] };
  const route = data.routes?.[0];
  const coordinates = route?.geometry?.coordinates;
  if (!coordinates?.length) return anchors;
  const line = coordinates.map(([lng, lat]) => [lat, lng] as [number, number]);
  lineCache.set(key, line);
  return line;
}

function FitTo({ points }: { points: [number, number][] }) {
  const map = useMap();
  const key = points.map((point) => `${point[0].toFixed(4)},${point[1].toFixed(4)}`).join(";");
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 14);
      return;
    }
    map.fitBounds(L.latLngBounds(points), { padding: [32, 32], maxZoom: 15 });
    // key 變了才重算範圍，避免每次 render 把使用者拖過的地圖拉回去。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, key]);
  return null;
}

export function SakuraMap({ lodging, routes, activeId }: SakuraMapProps) {
  const visible = activeId ? routes.filter((route) => route.id === activeId) : routes;
  const signature = visible
    .map((route) => `${route.id}:${route.legs.map((leg) => `${leg.mode}:${leg.from.join(",")}:${leg.via.join(";")}:${leg.to.join(",")}`).join("|")}`)
    .join("||");
  const [lines, setLines] = useState<Record<string, [number, number][][]>>({});

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const next: Record<string, [number, number][][]> = {};
      await Promise.all(
        visible.map(async (route) => {
          next[route.id] = await Promise.all(route.legs.map((leg) => legLine(leg)));
        }),
      );
      if (!cancelled) setLines(next);
    };
    void load();
    return () => {
      cancelled = true;
    };
    // signature 已涵蓋路線內容。visible 每次 render 都是新陣列。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  const fitPoints: [number, number][] = [[lodging.lat, lodging.lng]];
  visible.forEach((route) => {
    const drawn = lines[route.id];
    if (drawn) drawn.forEach((line) => line.forEach((point) => fitPoints.push(point)));
    else route.legs.forEach((leg) => fitPoints.push(leg.from, leg.to));
  });

  return (
    <MapContainer center={[lodging.lat, lodging.lng]} zoom={14} scrollWheelZoom className="h-[420px] w-full rounded-2xl">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FitTo points={fitPoints} />
      {visible.map((route) =>
        (lines[route.id] ?? route.legs.map((leg) => (osrmProfile(leg.mode) ? [] : [leg.from, ...leg.via, leg.to]))).map((line, index) =>
          line.length > 1 ? (
            <Polyline key={`${route.id}-${index}`} positions={line} pathOptions={{ color: route.color, weight: activeId ? 5 : 4, opacity: 0.9 }} />
          ) : null,
        ),
      )}
      {visible.flatMap((route) =>
        route.legs.map((leg, index) => (
          <CircleMarker key={`${route.id}-to-${index}`} center={leg.to} radius={6} pathOptions={{ color: route.color, fillColor: "#ffffff", fillOpacity: 1, weight: 3 }}>
            <Popup>
              <span className="font-semibold">{route.label}</span>
              <br />
              {leg.label}
            </Popup>
          </CircleMarker>
        )),
      )}
      <Marker position={[lodging.lat, lodging.lng]} icon={homeIcon} zIndexOffset={800}>
        <Popup>{lodging.name}</Popup>
      </Marker>
    </MapContainer>
  );
}
