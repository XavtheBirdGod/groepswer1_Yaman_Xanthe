const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,latlng,languages,cca3,currencies";
const CURRENCY_API_URL = "https://open.er-api.com/v6/latest/EUR";

export async function fetchAllCountries() {
    try {
        // Fetch countries and currency rates in parallel
        const [resCountries, resRates] = await Promise.all([
            fetch(COUNTRIES_API_URL),
            fetch(CURRENCY_API_URL)
        ]);

        if (!resCountries.ok) {
            throw new Error(`REST Countries API error: ${resCountries.status}`);
        }

        // We don't throw immediately for rates, to allow the app to work even if rates fail
        let rates = {};
        if (resRates.ok) {
            const rateData = await resRates.json();
            rates = rateData?.rates || {};
        } else {
            console.warn("Currency API failed in initial fetch; continuing without rates.");
        }

        const countries = await resCountries.json();

        if (!Array.isArray(countries)) {
            throw new Error("REST Countries returned invalid data (not an array)");
        }

        // Attach an initial exchange rate to each country if possible
        countries.forEach(country => {
            const currencies = country.currencies ?? {};
            const currencyCodes = Object.keys(currencies);
            const currencyCode = currencyCodes.length > 0 ? currencyCodes[0] : null;

            // Map the rate if we have it
            country.exchangeRate = (currencyCode && typeof rates[currencyCode] === "number")
                ? rates[currencyCode]
                : null;
        });

        return countries;

    } catch (e) {
        console.error("fetchAllCountries() failed:", e);
        throw e;
    }
}