// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

import { fetchAllCountries } from "./services/countriesService.js";
import { initMap } from "./services/mapService.js";
import { loadFavorites, saveFavorites } from "./services/storageService.js";
import { calculateStats } from "./services/statsService.js";
import {showCountries} from "./components/countryList";
// import { initCountryModal, showCountryDetail } from "./components/countryDetailModal.js";
// import { renderStats } from "./components/statsPanel.js";

// Globale state
let allCountries = [];
let filteredCountries = [];
let favorites = [];

// DOM refs
const searchInput = document.querySelector("#search_input");
const regionSelect = document.querySelector("#region_filter");
const statusMessage = document.querySelector("#status_message");
const countriesCount = document.querySelector("#countries_count");
const favoritesPanel = document.querySelector("#favorites_panel");
const favoritesEmpty = document.querySelector("#favorites_empty");


async function loadCountries() {
    setStatus("Landen worden geladen...", "warning");
    try {
        allCountries = await fetchAllCountries();
        filteredCountries = allCountries;
        applyFilters();
        setStatus("Landen succesvol geladen.", "success");
    } catch (error) {
        console.error(error);
        setStatus("Fout bij het laden van landen. Probeer later opnieuw.", "danger");
    }
}

function setupFilterHandlers() {
    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }
    if (regionSelect) {
        regionSelect.addEventListener("change", applyFilters);
    }
}

function applyFilters() {
    const term = (searchInput?.value || "").trim().toLowerCase();
    const region = regionSelect?.value || "all";

    filteredCountries = allCountries.filter(country => {
        const name = country.name?.common?.toLowerCase() || "";
        const matchesName = name.includes(term);

        const matchesRegion =
            region === "all" || country.region === region;

        return matchesName && matchesRegion;
    });

    showCountries({
        countries: filteredCountries,
        favorites,
        onCountryClick: handleCountryClick,
        onFavoriteToggle: handleFavoriteToggleFromList
    });

    countriesCount.textContent = `${filteredCountries.length} landen`;
    updateStats();
}

function handleCountryClick(country) {
    showCountryDetail(country, isFavorite(country));
}

function handleFavoriteToggleFromList(country) {
    toggleFavorite(country);
}

function handleFavoriteToggleFromModal(country) {
    toggleFavorite(country);
}

function toggleFavorite(country) {
    if (!country || !country.cca3) return;

    const key = country.cca3;
    const index = favorites.findIndex(fav => fav.cca3 === key);

    if (index >= 0) {
        // Bestond al → verwijderen
        favorites.splice(index, 1);
    } else {
        // Nieuw favoriet object (minimaal name, region, cca3)
        favorites.push({
            cca3: key,
            name: country.name?.common || "Onbekend",
            region: country.region || "Onbekend",
            population: country.population ?? 0
        });
    }

    saveFavorites(favorites);
    renderFavorites();
    updateStats();
}

function isFavorite(country) {
    const key = country.cca3;
    return favorites.some(fav => fav.cca3 === key);
}

function renderFavorites() {
    if (!favoritesPanel) return;
    favoritesPanel.innerHTML = "";

    if (!favorites || favorites.length === 0) {
        favoritesEmpty.classList.remove("d-none");
        return;
    }

    favoritesEmpty.classList.add("d-none");

    favorites.forEach(fav => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.textContent = `${fav.name} (${fav.region})`;

        li.addEventListener("click", () => {
            const country = allCountries.find(c => c.cca3 === fav.cca3);
            if (country) {
                handleCountryClick(country);
            }
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

document.addEventListener("DOMContentLoaded", async () => {
    await loadCountries();
});

// document.addEventListener("DOMContentLoaded", async () => {
//     initMap();
//     initCountryModal(handleFavoriteToggleFromModal);
//     favorites = loadFavorites();
//     setupFilterHandlers();
//     renderFavorites();
//     updateStats();
// });