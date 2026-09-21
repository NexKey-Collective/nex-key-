import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getMapLocations } from "../../services/api";

export default function DealsMap({
  deals,
  onSelect,
  selected,
  location,
  onLocationChange,
  hideSearch = false,
}) {
  const container = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(new Map());
  const selectRef = useRef(onSelect);
  const [coordinates, setCoordinates] = useState({});
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [tileError, setTileError] = useState(false);
  const mapped = useMemo(
    () => deals.filter((deal) => coordinates[deal.id]),
    [deals, coordinates],
  );
  selectRef.current = onSelect;

  useEffect(() => {
    const controller = new AbortController();
    let timer;
    const load = async () => {
      try {
        const data = await getMapLocations(controller.signal);
        if (controller.signal.aborted) return;
        setCoordinates(data.locations || {});
        setPending(data.pending);
        setError(
          data.error ||
            (data.geocodingEnabled === false &&
            !Object.keys(data.locations || {}).length
              ? "Address lookup is not enabled on the server."
              : ""),
        );
        if (data.pending) timer = setTimeout(load, 3000);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
          setPending(false);
        }
      }
    };
    load();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [retry]);

  useEffect(() => {
    const map = L.map(container.current, {
      zoomControl: false,
      scrollWheelZoom: true,
    }).setView([38.5, -97.5], 4);
    mapRef.current = map;
    L.control.zoom({ position: "topright" }).addTo(map);
    const tiles = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      },
    ).addTo(map);
    tiles.on("tileerror", () => setTileError(true));
    tiles.on("tileload", () => setTileError(false));
    const resize = new ResizeObserver(() => map.invalidateSize());
    resize.observe(container.current);
    return () => {
      resize.disconnect();
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const layer = L.layerGroup().addTo(map);
    markersRef.current.clear();
    mapped.forEach((deal) => {
      const { latitude, longitude } = coordinates[deal.id];
      const label = document.createElement("span");
      label.className = "bd-live-pin-label";
      label.textContent = deal.price;
      const marker = L.marker([latitude, longitude], {
        icon: L.divIcon({
          className: "bd-live-pin",
          html: label,
          iconSize: [100, 32],
          iconAnchor: [50, 32],
        }),
        title: `${deal.address} — Entry fee ${deal.price}`,
        keyboard: true,
      }).addTo(layer);
      const popup = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = deal.address;
      const city = document.createElement("p");
      city.textContent = deal.city;
      const price = document.createElement("p");
      price.textContent = `Entry fee: ${deal.price}`;
      const link = document.createElement("a");
      link.href = `/deals/${encodeURIComponent(deal.id)}`;
      link.textContent = "View property →";
      popup.append(title, city, price, link);
      marker.bindPopup(popup);
      marker.on("click", () => selectRef.current(deal.id));
      markersRef.current.set(deal.id, marker);
    });
    return () => {
      map.removeLayer(layer);
      markersRef.current.clear();
    };
  }, [mapped, coordinates]);

  // Refocus when filters change, or once when the first geocoding batch arrives.
  // Further background batches must not interrupt the user's map navigation.
  const hasLocations = mapped.length > 0;
  const fitRef = useRef(null);
  fitRef.current = () => {
    const points = mapped.map((d) => [
      coordinates[d.id].latitude,
      coordinates[d.id].longitude,
    ]);
    if (points.length)
      mapRef.current?.fitBounds(points, {
        padding: [65, 65],
        maxZoom: 14,
        animate: false,
      });
  };
  const dealIds = deals
    .map((d) => d.id)
    .sort()
    .join(",");
  useEffect(() => {
    fitRef.current?.();
  }, [dealIds, hasLocations]);
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      marker.getElement()?.classList.toggle("is-selected", id === selected);
      marker.setZIndexOffset(id === selected ? 1000 : 0);
    });
  }, [selected, mapped]);

  return (
    <section className="bd-map bd-live-map" aria-label="Property locations map">
      <div className="bd-leaflet" ref={container} />
      {!hideSearch && (
        <label className="bd-search bd-map-search">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="7.5" />
            <path d="m16 16 5 5" />
          </svg>
          <input
            type="search"
            aria-label="Filter map by ZIP code, city, area, or state"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="ZIP, city, area, or state"
          />
        </label>
      )}
      <button
        className="bd-fit-map"
        onClick={() => fitRef.current?.()}
        disabled={!mapped.length}
      >
        Show all pins
      </button>
      <div className="bd-live-map-status" role="status">
        {tileError ? (
          "Map tiles could not load. Check your connection."
        ) : error ? (
          <>
            {error}{" "}
            <button
              onClick={() => {
                setPending(true);
                setError("");
                setRetry((n) => n + 1);
              }}
            >
              Retry
            </button>
          </>
        ) : pending ? (
          `Locating properties… ${mapped.length} of ${deals.length} on map`
        ) : (
          `${mapped.length} of ${deals.length} properties on map${mapped.length < deals.length ? " · Other addresses could not be located" : ""}`
        )}
      </div>
    </section>
  );
}
