// Haalt landen op + hangt per land een exchangeRate naar EUR
const COUNTRIES_API_URL =
    "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,latlng,languages,cca3,currencies";

const CURRENCY_API_URL = "https://open.er-api.com/v6/latest/EUR";


/**
 * Haalt alle landen op via de REST Countries API
 * en voegt per land (optioneel) een exchangeRate toe
 * op basis van de eerste valuta in country.currencies.
 *
 * @returns {Promise<Array>} array van landen
 */


export async function fetchAllCountries() {
    try {
        const [resCountries, resRates] = await Promise.all([
            fetch(COUNTRIES_API_URL),
            fetch(CURRENCY_API_URL)
        ]);

        if (!resCountries.ok) {
            throw new Error(`REST Countries API error: ${resCountries.status} ${resCountries.statusText}`);
        }
        if (!resRates.ok) {
            throw new Error(`Currency API error: ${resRates.status} ${resRates.statusText}`);
        }

        const countries = await resCountries.json();
        const rateData  = await resRates.json();
        const rates     = rateData?.rates || {};

        if (!Array.isArray(countries)) {
            throw new Error("REST Countries returned geen array");
        }

        // Per land: probeer eerste currency-code op te halen en plak er een rate bij

        countries.forEach(country => {
            const currencies = country.currencies ?? {};
            const currencyCodes = Object.keys(currencies);

            const currencyCode = currencyCodes.length > 0 ? currencyCodes[0] : null;
            const rate = (currencyCode && typeof rates[currencyCode] === "number")
                ? rates[currencyCode]
                : null;

            country.exchangeRate = rate;
        });

        // Currency debug!!

        // console.log("DEBUG countries sample:", countries.slice(0, 5).map(c => ({
        //     name: c.name?.common,
        //     currencies: c.currencies,
        //     exchangeRate: c.exchangeRate
        // })));

        return countries;

    } catch (e) {
        console.error("fetchAllCountries() failed:", e);
        throw e;
    }
}