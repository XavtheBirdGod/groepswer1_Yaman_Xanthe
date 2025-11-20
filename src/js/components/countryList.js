import { fetchAllCountries } from "../services/countriesService";

export async function showCountries() {
    const card = document.getElementById("country_list");

    try {
        // Wait for countries from your service
        const countries = await fetchAllCountries();

        // Map countries → HTML
        const countryList = countries.map(c => {
            return `
                <div class="shadow rounded">
                    <div>
                        <img class="pt-2" src="${c.flags.png}" alt="${c.flags.alt}" style="max-width: 100%">
                        <h3>${c.name.common}</h3>
                    </div>
                    <ul class="list-group list-decoration-none">
                        <li class="list-group-item">Regio: ${c.region}</li>
                        <li class="list-group-item">Populatie: ${c.population.toLocaleString()}</li>
                    </ul>
                    <div class="mt-2 mb-2 d-flex justify-content-between">
                        <button class="btn btn-primary">Details</button>
                        <button class="btn btn-outline-warning">&#9734; Favoriet</button>
                    </div>
                </div>
            `;
        });

        card.innerHTML = countryList.join("");

    } catch (err) {
        card.innerText = "❌ Kon JSON niet laden";
        console.error(err);
    }
}
