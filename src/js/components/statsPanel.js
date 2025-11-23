export function renderStats(stats) {
    const panel = document.getElementById("stats_panel");
    if (!panel) return;

    const { totalCountries, averagePopulation, favoritesPopulation } = stats;

    const maxValue = Math.max(totalCountries, averagePopulation, favoritesPopulation, 1);
    const procent = v => (v / maxValue) * 100;

    panel.innerHTML = `
        <div class="col-md-4">
            <div class="card p-3 text-center">
                <small class="text-muted">Aantal landen</small>
                <h4 class="fw-bold">${totalCountries}</h4>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card p-3 text-center">
                <small class="text-muted">Gemiddelde populatie</small>
                <h4 class="fw-bold">${averagePopulation.toLocaleString()}</h4>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card p-3 text-center">
                <small class="text-muted">Totale populatie favorieten</small>
                <h4 class="fw-bold">${favoritesPopulation.toLocaleString()}</h4>
            </div>
        </div>

        <div class="col-md-4 text-center">
            <div class="card p-3">
                <div class="d-flex bar-chart-row" style="height: 120px;">
                    <div class="bar bg-primary" style="height: ${procent(totalCountries)}%;"></div>
                </div>
                <small class="text-muted">Aantal landen</small>
            </div>
        </div>

        <div class="col-md-4 text-center">
            <div class="card p-3">
                <div class="d-flex bar-chart-row" style="height: 120px;">
                    <div class="bar bg-success" style="height: ${procent(averagePopulation)}%;"></div>
                </div>
                <small class="text-muted">Gem. populatie</small>
            </div>
        </div>

        <div class="col-md-4 text-center">
            <div class="card p-3">
                <div class="d-flex bar-chart-row" style="height: 120px;">
                    <div class="bar bg-warning" style="height: ${procent(favoritesPopulation)}%;"></div>
                </div>
                <small class="text-muted">Populatie favorieten</small>
            </div>
        </div>
    `;
}
