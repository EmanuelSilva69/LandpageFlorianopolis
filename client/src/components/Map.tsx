import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";

interface LatLng {
  lat: number;
  lng: number;
}

export interface MapLocation {
  lat: number;
  lng: number;
  title: string;
  description?: string;
}

interface MapViewProps {
  className?: string;
  initialCenter?: LatLng;
  initialZoom?: number;
  locations?: MapLocation[];
  onMapReady?: (map: LeafletMap) => void;
}

export function MapView({
  className,
  initialCenter = { lat: -27.591, lng: -48.5525 },
  initialZoom = 15,
  locations = [],
  onMapReady,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;

    const init = async () => {
      if (!mapContainer.current) {
        return;
      }

      try {
        const L = await import("leaflet");
        if (disposed || !mapContainer.current) {
          return;
        }

        const map = L.map(mapContainer.current, {
          zoomControl: true,
          scrollWheelZoom: false,
        }).setView([initialCenter.lat, initialCenter.lng], initialZoom);

        map.zoomControl.setPosition("bottomright");

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);

        const brandBlueIcon = L.divIcon({
          className: "",
          html: `<div style="width:36px;height:36px;border-radius:50% 50% 50% 0;background:#004065;border:3px solid #fff;box-shadow:0 4px 14px rgba(0,64,101,.45);transform:rotate(-45deg);"></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -38],
        });

        locations.forEach((location) => {
          const marker = L.marker([location.lat, location.lng], {
            icon: brandBlueIcon,
          }).addTo(map);

          if (location.title || location.description) {
            const popup = `<strong style="color:#004065">${location.title}</strong>${
              location.description ? `<br><small>${location.description}</small>` : ""
            }`;
            marker.bindPopup(popup, { maxWidth: 180, className: "brand-map-popup" });
          }
        });

        if (locations.length > 1) {
          const points = locations.map((location) => [location.lat, location.lng] as [number, number]);
          L.polyline(points, {
            color: "#2f6f93",
            weight: 2,
            opacity: 0.4,
            dashArray: "5 7",
          }).addTo(map);
        }

        mapRef.current = map;
        onMapReady?.(map);
      } catch (error) {
        if (!disposed) {
          const message = error instanceof Error ? error.message : "Falha ao inicializar mapa.";
          setLoadError(message);
        }
      }
    };

    init();

    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [initialCenter.lat, initialCenter.lng, initialZoom, locations, onMapReady]);

  if (loadError) {
    return (
      <div
        className={cn(
          "w-full h-[500px] rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center px-6 text-center",
          className,
        )}
      >
        Nao foi possivel carregar o mapa.
      </div>
    );
  }

  return <div ref={mapContainer} className={cn("w-full h-[500px]", className)} />;
}
