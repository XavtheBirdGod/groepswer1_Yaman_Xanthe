import { clearElement } from "../utils/dom.js";

export function renderStats(stats = {}) {
    const panel = document.getElementById("stats_panel");
    if (!panel) return;

    panel.innerHTML = "";

    const {
        totalCountries = 0,
        averagePopulation = 0,
        favoritesPopulation = 0
    } = stats;

    const clampPercent = v => Math.max(0, Math.min(100, Math.round(v)));

    const pctCountries = clampPercent((totalCountries / 250) * 100);
    const pctAverage = clampPercent((averagePopulation / 100_000_000) * 100);
    const pctFavorites = clampPercent((favoritesPopulation / 100_000_000) * 100);

    panel.innerHTML = `
        <div class="col-md-4">
            <div class="card p-3 text-center h-100">
                <small class="text-muted">Aantal landen</small>
                <h4 class="fw-bold">${totalCountries}</h4>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card p-3 text-center h-100">
                <small class="text-muted">Gemiddelde populatie</small>
                <h4 class="fw-bold">${averagePopulation.toLocaleString("nl-BE")}</h4>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card p-3 text-center h-100">
                <small class="text-muted">Totale populatie favorieten</small>
                <h4 class="fw-bold">${favoritesPopulation.toLocaleString("nl-BE")}</h4>
            </div>
        </div>

        <div class="col-md-4 text-center mt-3">
            <div class="card p-3 h-100">
                <div class="bar-chart-row" style="height: 120px; display:flex; align-items:flex-end; justify-content:center;">
                    <div class="bar bg-primary" style="width: 40px; height: ${pctCountries}%;"></div>
                </div>
                <small class="text-muted mt-2">Aantal landen</small>
            </div>
        </div>

        <div class="col-md-4 text-center mt-3">
            <div class="card p-3 h-100">
                <div class="bar-chart-row" style="height: 120px; display:flex; align-items:flex-end; justify-content:center;">
                    <div class="bar bg-success" style="width: 40px; height: ${pctAverage}%;"></div>
                </div>
                <small class="text-muted mt-2">Gem. populatie</small>
            </div>
        </div>

        <div class="col-md-4 text-center mt-3">
            <div class="card p-3 h-100">
                <div class="bar-chart-row" style="height: 120px; display:flex; align-items:flex-end; justify-content:center;">
                    <div class="bar bg-warning" style="width: 40px; height: ${pctFavorites}%;"></div>
                </div>
                <small class="text-muted mt-2">Populatie favorieten</small>
            </div>
        </div>
    `;
}