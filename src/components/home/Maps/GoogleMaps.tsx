import { useEffect, useRef } from "react";

const DEFAULT_CENTER = { lat: -15.8916202, lng: -52.2618826 };
const DEFAULT_ZOOM = 11;

export const GoogleMaps = ({
  locations,
  useClusters = true,
  mapId,
  className,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  useClusters?: boolean;
  mapId?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Display the map
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center: locations[0],
        zoom: DEFAULT_ZOOM,
        mapId,
      });
    }
  }, [ref, mapId, locations, useClusters]);

  return (
    <div
      className={className}
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
