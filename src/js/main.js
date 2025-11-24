// Import CSS (handled by Vite)
import "../scss/styles.scss";
import * as bootstrap from "bootstrap";

import { fetchAllCountries } from "./services/countriesService.js";
import { initMap } from "./services/mapService.js";
import { loadFavorites, saveFavorites } from "./services/storageService.js";
import { calculateStats } from "./services/statsService.js";
import { renderCountryList } from "./components/countryList.js";
import { initCountryModal, showCountryDetail } from "./components/countryDetailModal.js";
import { renderStats } from "./components/statsPanel.js";

// Global State
let allCountries = [];
let filteredCountries = [];
let favorites = [];

// DOM Elements
const searchInput = document.getElementById("search_input");
const regionSelect = document.getElementById("region_filter");
const statusMessage = document.getElementById("status_message");
const countriesCount = document.getElementById("countries_count");
const favoritesPanel = document.getElementById("favorites_panel");
const favoritesEmpty = document.getElementById("favorites_empty");

document.addEventListener("DOMContentLoaded", async () => {
    initMap();
    initCountryModal(handleFavoriteToggle);

    favorites = loadFavorites();

    setupFilterHandlers();

    await loadCountries();

    renderFavoritesList();
    updateStats();
});

async function loadCountries() {
    setStatus("Landen worden geladen...", "warning");
    try {
        allCountries = await fetchAllCountries();
        filteredCountries = [...allCountries];
        applyFilters();
        setStatus("Landen succesvol geladen.", "success");
    } catch (error) {
        console.error(error);
        setStatus("Fout bij het laden van landen.", "danger");
    }
}

function setupFilterHandlers() {
    if (searchInput) searchInput.addEventListener("input", applyFilters);
    if (regionSelect) regionSelect.addEventListener("change", applyFilters);
}

function applyFilters() {
    const term = (searchInput?.value || "").trim().toLowerCase();
    const region = regionSelect?.value || "all";

    filteredCountries = allCountries.filter(country => {
        const name = country.name?.common?.toLowerCase() || "";
        const matchesName = name.includes(term);
        const matchesRegion = region === "all" || country.region === region;
        return matchesName && matchesRegion;
    });

    renderCountryList({
        countries: filteredCountries,
        favorites,
        onCountryClick: handleCountryClick,
        onFavoriteToggle: handleFavoriteToggle
    });

    if (countriesCount) countriesCount.textContent = `${filteredCountries.length} landen`;
    updateStats();
}

function handleCountryClick(country) {
    const isFav = isFavorite(country);
    showCountryDetail(country, isFav);
}

function handleFavoriteToggle(country) {
    if (!country || !country.cca3) return;

    const key = country.cca3;
    const index = favorites.findIndex(fav => fav.cca3 === key);

    if (index >= 0) {
        // Remove
        favorites.splice(index, 1);
    } else {
        // Add (store only necessary data to save space)
        favorites.push({
            cca3: key,
            name: country.name?.common || "Unknown",
            region: country.region || "Unknown",
            population: country.population ?? 0
        });
    }

    saveFavorites(favorites);
    renderFavoritesList();
    applyFilters();

}

function isFavorite(country) {
    return favorites.some(fav => fav.cca3 === country.cca3);
}

function renderFavoritesList() {
    if (!favoritesPanel) return;
    favoritesPanel.innerHTML = "";

    if (!favorites || favorites.length === 0) {
        favoritesEmpty?.classList.remove("d-none");
        return;
    }

    favoritesEmpty?.classList.add("d-none");

    favorites.forEach(fav => {
        const li = document.createElement("li");
        li.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center cursor-pointer";
        li.style.cursor = "pointer";
        li.innerHTML = `<span>${fav.name}</span> <span class="badge bg-secondary rounded-pill">${fav.region}</span>`;

        li.addEventListener("click", () => {
            const country = allCountries.find(c => c.cca3 === fav.cca3);
            if (country) handleCountryClick(country);
        });

        favoritesPanel.appendChild(li);
    });
}

function updateStats() {
    const stats = calculateStats(filteredCountries, favorites);
    renderStats(stats);
}

function setStatus(message, type = "secondary") {
    if (!statusMessage) return;
    statusMessage.textContent = message;
    statusMessage.className = `alert alert-${type} mb-0 py-2`;
}