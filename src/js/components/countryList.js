import { clearElement, createElement } from "../utils/dom.js";

export function renderCountryList({ countries, favorites, onCountryClick, onFavoriteToggle }) {
    const container = document.querySelector("#country_list");
    if (!container) return;

    clearElement(container);

    // TODO: Student B
    // 1. Controleer of de lijst 'countries' leeg is.
    //    - Zo ja: toon een melding (bijv. "Geen landen gevonden").

    // 2. Loop over alle landen in de 'countries' array.

    // 3. Voor elk land:
    //    - Maak de HTML-structuur voor een kaart (gebruik createElement en Bootstrap classes).
    //    - Toon de Vlag, Naam, Regio en Populatie.
    //    - Controleer of het land in 'favorites' zit om de knopstijl te bepalen (wel/niet favoriet).

    // 4. Voeg event listeners toe:
    //    - Klik op "Details" -> roep onCountryClick(country) aan.
    //    - Klik op "Favoriet" -> roep onFavoriteToggle(country) aan.

    // 5. Voeg de kaart toe aan de container.

    console.log("renderCountryList aangeroepen met:", countries.length, "landen");
}