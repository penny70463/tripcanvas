"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Place } from "@/lib/types";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type ClientMapProps = {
  center: [number, number];
  places: Place[];
};

function FitBounds({ places }: { places: Place[] }) {
  const map = useMap();

  useEffect(() => {
    if (!places.length) return;

    if (places.length === 1) {
      map.setView([places[0].lat, places[0].lng], 14);
      return;
    }

    const bounds = L.latLngBounds(places.map((place) => [place.lat, place.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 14 });
  }, [map, places]);

  return null;
}

export function ClientMap({ center, places }: ClientMapProps) {
  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom className="h-full min-h-[320px] w-full rounded-[28px] sm:min-h-[420px]">
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FitBounds places={places} />
      {places.map((place) => (
        <Marker key={place.id} position={[place.lat, place.lng]} icon={markerIcon}>
          <Popup>
            <div className="space-y-1">
              <p className="font-semibold">{place.name}</p>
              {place.description && <p>{place.description}</p>}
              {place.address && <p>{place.address}</p>}
              {place.googleMapsUrl && <a href={place.googleMapsUrl} target="_blank" rel="noreferrer">Google Maps</a>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
