import { clearElement, createElement } from "../utils/dom.js";

export function renderStats(stats = {}) {
    const panel = document.getElementById("stats_panel");
    if (!panel) return;

    clearElement(panel);

    // TODO: Student B
    // 1. Haal de waarden uit het stats object:
    //    - totalCountries
    //    - averagePopulation
    //    - favoritesPopulation

    // 2. Maak drie "kaarten" (Cards) aan om deze cijfers te tonen.
    //    - Tip: Gebruik Bootstrap grid columns (col-md-4).

    // 3. Maak de eenvoudige Bar Chart:
    //    - Bereken de hoogte/breedte van de balken (bijv. in % ten opzichte van een maximum).
    //    - Maak 3 balken (divs) die visueel de verhouding tussen de cijfers tonen.
    //    - Gebruik de CSS classes uit styles.scss (.bar-chart-row, .bar).

    console.log("Statistieken renderen:", stats);
}