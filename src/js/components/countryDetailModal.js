import * as bootstrap from "bootstrap"; // FIXED: Explicit import needed!
import { focusCountry } from "../services/mapService.js";
import { fetchRateToEuro } from "../services/statsService.js";

let bootstrapModal = null;
let currentCountry = null;
let onFavoriteToggle = null;

// DOM refs
let modalEl, modalLabel, modalFlag, modalDetails, modalCurrencyInfo, favoriteBtn, modalAlert;

export function initCountryModal(favToggleCallback) {
    onFavoriteToggle = typeof favToggleCallback === "function" ? favToggleCallback : null;

    modalEl = document.getElementById("country_modal");
    modalLabel = document.getElementById("country_modal_label");
    modalFlag = document.getElementById("country_flag");
    modalDetails = document.getElementById("country_details");
    modalCurrencyInfo = document.getElementById("currency_info");
    favoriteBtn = document.getElementById("favorite_toggle_btn");
    modalAlert = document.getElementById("country_modal_alert");

    if (!modalEl) return;

    // Create Bootstrap modal instance
    try {
        bootstrapModal = new bootstrap.Modal(modalEl);
    } catch (e) {
        console.warn("Bootstrap Modal creation failed:", e);
    }

    // Favorite button listener
    if (favoriteBtn) {
        favoriteBtn.addEventListener("click", () => {
            if (!currentCountry) return;
            onFavoriteToggle?.(currentCountry);

            // Optimistic UI update
            const isNowFav = favoriteBtn.classList.contains("btn-outline-warning");
            updateFavoriteButton(!isNowFav); // Toggle visual state immediately
        });
    }

    // Clear alerts on hide
    modalEl.addEventListener("hidden.bs.modal", () => {
        if (modalAlert) {
            modalAlert.classList.add("d-none");
            modalAlert.textContent = "";
        }
    });
}

export async function showCountryDetail(country, favorite = false) {
    if (!country) return;
    currentCountry = country;

    // 1. Basic Details
    if (modalLabel) modalLabel.textContent = country.name?.common || "Unknown";
    if (modalFlag) {
        modalFlag.src = country.flags?.png || country.flags?.svg || "";
        modalFlag.alt = country.flags?.alt || "Flag";
    }

    if (modalDetails) {
        modalDetails.innerHTML = "";
        const addRow = (label, value) => {
            modalDetails.innerHTML += `
                <dt class="col-5 small text-muted">${label}</dt>
                <dd class="col-7 mb-2">${value}</dd>
            `;
        };

        const capital = country.capital?.join(", ") || "Unknown";
        const pop = country.population?.toLocaleString() || "Unknown";
        const region = country.region || "Unknown";
        const langs = country.languages ? Object.values(country.languages).join(", ") : "Unknown";

        addRow("Hoofdstad", capital);
        addRow("Populatie", pop);
        addRow("Regio", region);
        addRow("Talen", langs);
    }

    // 2. Map Focus
    const latlng = country.latlng;
    if (Array.isArray(latlng) && latlng.length >= 2) {
        focusCountry(latlng[0], latlng[1], country.name?.common);
        modalAlert?.classList.add("d-none");
    } else {
        if (modalAlert) {
            modalAlert.textContent = "Locatiegegevens niet beschikbaar.";
            modalAlert.classList.remove("d-none");
        }
    }

    // 3. Currency
    if (modalCurrencyInfo) {
        modalCurrencyInfo.textContent = "Wisselkoers ophalen...";

        const currencies = country.currencies ?? {};
        const code = Object.keys(currencies)[0];

        if (code) {
            // Use pre-fetched rate if available, otherwise fetch new
            let rate = country.exchangeRate;
            if (typeof rate !== "number") {
                rate = await fetchRateToEuro(code);
            }

            if (rate) {
                modalCurrencyInfo.innerHTML = `<strong>1 EUR = ${Number(rate).toFixed(2)} ${code}</strong> <br><small class='text-muted'>(${currencies[code]?.name || code})</small>`;
            } else {
                modalCurrencyInfo.textContent = "Wisselkoers niet beschikbaar.";
            }
        } else {
            modalCurrencyInfo.textContent = "Geen valuta bekend.";
        }
    }

    // 4. Update Button State
    updateFavoriteButton(favorite);

    bootstrapModal?.show();
}

function updateFavoriteButton(isFav) {
    if (!favoriteBtn) return;
    if (isFav) {
        favoriteBtn.classList.replace("btn-outline-warning", "btn-warning");
        favoriteBtn.textContent = "★ Verwijderen uit favorieten";
    } else {
        favoriteBtn.classList.replace("btn-warning", "btn-outline-warning");
        favoriteBtn.textContent = "☆ Toevoegen aan favorieten";
    }
}