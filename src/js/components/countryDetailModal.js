import * as bootstrap from "bootstrap";
import { focusCountry } from "../services/mapService.js";

let bootstrapModal = null;

// DOM refs
let modalEl, modalLabel, modalFlag, modalDetails, modalCurrencyInfo, favoriteBtn, modalAlert;
let onFavoriteToggle = null;

export function initCountryModal(favToggleCallback) {
    onFavoriteToggle = favToggleCallback;

    modalEl = document.getElementById("country_modal");
    modalLabel = document.getElementById("country_modal_label");
    modalFlag = document.getElementById("country_flag");
    modalDetails = document.getElementById("country_details");
    modalCurrencyInfo = document.getElementById("currency_info");
    favoriteBtn = document.getElementById("favorite_toggle_btn");
    modalAlert = document.getElementById("country_modal_alert");

    if (modalEl) {
        bootstrapModal = new bootstrap.Modal(modalEl);
    }

    // Event listener voor de favoriet-knop in de modal
    if (favoriteBtn) {
        favoriteBtn.addEventListener("click", () => {
            // Roep de callback aan als die bestaat
            if (typeof onFavoriteToggle === "function") {
                // Let op: je moet het huidige land hier kunnen doorgeven
                // Tip: sla het huidige land op in een variabele buiten deze functie scope
                // of haal het op uit de UI state.
            }
        });
    }
}

export async function showCountryDetail(country, favorite = false) {
    if (!country) return;

    // TODO: Student B
    // 1. Vul de statische data in:
    //    - Modal titel (country.name.common)
    //    - Vlag (src en alt)
    //    - Details lijst (Hoofdstad, Regio, Populatie, Talen)

    // 2. Kaart logica:
    //    - Haal lat/lng op uit country.latlng.
    //    - Als coördinaten geldig zijn: roep focusCountry(lat, lng, naam) aan en verberg de alert.
    //    - Als coördinaten ontbreken: toon de alert (#country_modal_alert) en verberg de kaart eventueel.

    // 3. Valuta Info:
    //    - (Let op: De wisselkoers zit al in het object 'country.exchangeRate' dankzij Student A).
    //    - Controleer welke currency code het land gebruikt.
    //    - Toon de koers in #currency_info (bijv: "1 EUR = ...").
    //    - Als er geen koers is, toon een melding "Wisselkoers niet beschikbaar".

    // 4. Update de favoriet-knop:
    //    - Pas de tekst en styling (btn-warning vs btn-outline-warning) aan op basis van de 'favorite' boolean.

    bootstrapModal?.show();
}