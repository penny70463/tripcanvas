export type PlaceCategory =
  | "lodging"
  | "airport"
  | "station"
  | "attraction"
  | "ticket"
  | "nearby";

export type Place = {
  id: string;
  name: string;
  address?: string;
  lat: number;
  lng: number;
  category: PlaceCategory;
  description?: string;
  googleMapsUrl?: string;
};

export type TripDay = {
  id: string;
  dateLabel: string;
  title: string;
  summary: string;
  transit: string;
  notes: string[];
  routeGoogleMapsUrl?: string;
  places: Place[];
  nearby: Place[];
};

export type Trip = {
  id: string;
  title: string;
  dateRange: string;
  destination: string;
  lodging: Place;
  overview: string;
  days: TripDay[];
};
