const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,latlng,languages,currencies,cca3";

/**
 * Haalt alle landen op via de REST Countries API.
 * @returns {Promise<Array>} array van landen
 */
export async function fetchAllCountries() {
    try {
        const res = await fetch(COUNTRIES_API_URL);

        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        // REST Countries returns an array, but we guard against trash responses anyway
        if (!Array.isArray(data)) {
            throw new Error("API returned iets dat geen array is");
        }

        return data;
    } catch (err) {
        console.error("fetchAllCountries() failed:", err);
        throw err;
    }
}