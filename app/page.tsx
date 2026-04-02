import { AppShell } from "@/components/layout/app-shell";
import { kobeFamilyTrip } from "@/data/trips/kobe-family-trip";

export default function Home() {
  return <AppShell trip={kobeFamilyTrip} />;
}
