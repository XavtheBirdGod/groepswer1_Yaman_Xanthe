import { clearElement } from "../utils/dom.js";

export function renderStats(stats = {}) {
    const panel = document.getElementById("stats_panel");
    if (!panel) return;

    clearElement(panel);

    const {
        totalCountries = 0,
        averagePopulation = 0,
        favoritesPopulation = 0
    } = stats;

    const clamp = v => Math.max(0, Math.min(100, Math.round(v)));

    const pctCountries = clamp((totalCountries / 250) * 100);
    const pctAverage = clamp((averagePopulation / 100_000_000) * 100);
    const pctFavorites = clamp((favoritesPopulation / 100_000_000) * 100);

    const statCard = (label, value) => `
        <div class="col-md-4">
            <div class="card p-3 text-center h-100">
                <small class="text-muted">${label}</small>
                <h4 class="fw-bold">${value}</h4>
            </div>
        </div>
    `;

    const barCard = (label, percent, color) => `
        <div class="col-md-4 text-center mt-3">
            <div class="card p-3 h-100">
                <div class="bar-chart-row"
                    style="height:120px; display:flex; align-items:flex-end; justify-content:center;">
                    <div class="bar ${color}" style="width:40px; height:${percent}%;"></div>
                </div>
                <small class="text-muted mt-2">${label}</small>
            </div>
        </div>
    `;

    panel.innerHTML = [
        statCard("Aantal landen", totalCountries),
        statCard("Gemiddelde populatie", averagePopulation.toLocaleString("nl-BE")),
        statCard("Totale populatie favorieten", favoritesPopulation.toLocaleString("nl-BE")),

        barCard("Aantal landen", pctCountries, "bg-primary"),
        barCard("Gem. populatie", pctAverage, "bg-success"),
        barCard("Populatie favorieten", pctFavorites, "bg-warning")
    ].join("");
}
