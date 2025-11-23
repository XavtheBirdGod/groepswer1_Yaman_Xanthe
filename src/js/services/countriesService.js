const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,latlng,languages,cca3";
const CURRENCY_API_URL  = "https://open.er-api.com/v6/latest/EUR";

export async function fetchAllCountries() {
    try {
        const [resCountries, resRates] = await Promise.all([
            fetch(COUNTRIES_API_URL),
            fetch(CURRENCY_API_URL)
        ]);

        if (!resCountries.ok) throw new Error("REST Countries API error");
        if (!resRates.ok) throw new Error("Currency API error");

        const countries = await resCountries.json();
        const rateData  = await resRates.json();

        countries.forEach(country => {
            const currencyCode = Object.keys(country.currencies ?? {})[0] || null;
            country.exchangeRate = currencyCode ? rateData.rates[currencyCode] : null;
        });

        return countries;

    } catch (e) {
        console.error("fetchAllCountries() failed:", e);
        throw e;
    }
}