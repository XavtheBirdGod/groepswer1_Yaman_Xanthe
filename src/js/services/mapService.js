import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map;
let marker;

/**
 * Initialiseert de Leaflet-kaart in #country_map.
 */
export function initMap() {
    const mapContainer = document.querySelector("#country_map");
    if (!mapContainer) return;

    // Maak kaart + wereld view
    map = L.map(mapContainer).setView([20, 0], 2);

    // Voeg OpenStreetMap tiles toe
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap-bijdragers'
    }).addTo(map);
}

/**
 * Zoomt in op een bepaald land en toont een marker met naam.
 * @param {number} lat
 * @param {number} lng
 * @param {string} name
 */
export function focusCountry(lat, lng, name) {
    if (!map) return;

    if (typeof lat !== "number" || typeof lng !== "number") {
        console.warn("Ongeldige coördinaten voor focusCountry");
        return;
    }

    // Zoom in op het land
    map.setView([lat, lng], 5);

    // Oude marker verwijderen
    if (marker) {
        map.removeLayer(marker);
    }

    // Nieuwe marker
    marker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(name || "Onbekend land")
        .openPopup();
}