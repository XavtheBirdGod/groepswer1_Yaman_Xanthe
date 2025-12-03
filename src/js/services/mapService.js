import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map;
let marker;

export function initMap() {
    const mapContainer = document.querySelector("#country_map");
    if (!mapContainer) return;

    map = L.map(mapContainer).setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

export function invalidateMapSize() {
    if (map) {
        map.invalidateSize();
    }
}

export function focusCountry(lat, lng, name) {
    if (!map) return;

    if (typeof lat !== "number" || typeof lng !== "number") {
        console.warn("Invalid coordinates for focusCountry");
        return;
    }

    map.setView([lat, lng], 5);

    if (marker) {
        map.removeLayer(marker);
    }

    // Add new marker
    marker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(name || "Unknown Location")
        .openPopup();
}