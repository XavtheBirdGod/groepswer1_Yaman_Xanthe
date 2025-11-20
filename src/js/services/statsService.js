const EXCHANGE_API_BASE = "https://api.exchangerate.host/latest";

/**
 * Haal wisselkoers op van EUR naar currencyCode.
 * @param {string} currencyCode bijv. "USD"
 * @returns {Promise<number|null>} wisselkoers of null bij fout
 */
export async function fetchRateToEuro(currencyCode) {
    try {
        if (!currencyCode || typeof currencyCode !== "string") return null;

        const url = `${EXCHANGE_API_BASE}?base=EUR&symbols=${currencyCode}`;
        const res = await fetch(url);
        if (!res.ok) return null;

        const data = await res.json();
        const rate = data?.rates?.[currencyCode];

        return typeof rate === "number" ? rate : null;
    } catch (err) {
        console.error("fetchRateToEuro() failed:", err);
        return null;
    }
}

/**
 * Bereken statistieken op basis van gefilterde landen en favorieten.
 * @param {Array} countries huidige gefilterde landen
 * @param {Array} favorites lijst van favorieten
 */
export function calculateStats(countries, favorites) {
    const safeCountries = Array.isArray(countries) ? countries : [];
    const safeFavorites = Array.isArray(favorites) ? favorites : [];

    const totalCountries = safeCountries.length;

    const totalPopulation = safeCountries.reduce((sum, c) => {
        const pop = typeof c.population === "number" ? c.population : 0;
        return sum + pop;
    }, 0);

    const averagePopulation =
        totalCountries > 0 ? Math.round(totalPopulation / totalCountries) : 0;

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