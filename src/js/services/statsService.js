// FIXED: Using the reliable API endpoint (same as countriesService)
const EXCHANGE_API_BASE = "https://open.er-api.com/v6/latest/EUR";

export async function fetchRateToEuro(currencyCode) {
    try {
        if (!currencyCode || typeof currencyCode !== "string") return null;

        // The new API returns ALL rates relative to EUR.
        // We fetch the whole list and pick the one we need.
        const res = await fetch(EXCHANGE_API_BASE);
        if (!res.ok) return null;

        const data = await res.json();
        const rate = data?.rates?.[currencyCode];

        return typeof rate === "number" ? rate : null;
    } catch (err) {
        console.error("fetchRateToEuro() failed:", err);
        return null;
    }
}

export function calculateStats(countries, favorites) {
    const safeCountries = Array.isArray(countries) ? countries : [];
    const safeFavorites = Array.isArray(favorites) ? favorites : [];

    const totalCountries = safeCountries.length;

    const totalPopulation = safeCountries.reduce((sum, c) => {
        const pop = typeof c.population === "number" ? c.population : 0;
        return sum + pop;
    }, 0);

    const averagePopulation = totalCountries > 0
        ? Math.round(totalPopulation / totalCountries)
        : 0;

    const favoritesPopulation = safeFavorites.reduce((sum, c) => {
        const pop = typeof c.population === "number" ? c.population : 0;
        return sum + pop;
    }, 0);

    return {
        totalCountries,
        averagePopulation,
        favoritesPopulation
    };
}