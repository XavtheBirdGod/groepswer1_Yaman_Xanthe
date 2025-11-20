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