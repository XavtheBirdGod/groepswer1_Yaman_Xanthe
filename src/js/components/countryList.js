export async function showCountries() {
    const card = document.getElementById("country_list");

    try {
        const name = await fetch("https://restcountries.com/v3.1/all?fields=name")
        const res = await fetch(`https://restcountries.com/v3.1/name/${name.common}`);
        if (!res.ok) throw new Error("Fout bij laden JSON");

        const data = await res.json();

        const countryList = data.map(c => {
            const image = c.flags.png;

            return `
                <div class="shadow rounded">
                    <div>
                        <img class="pt-2" src="${image}" alt="${c.flags.alt}" style="max-width: 100%">
                        <h3>${c.name.common}</h3>
                    </div>
                    <ul class="list-group list-decoration-none">
                    <li class="list-group-item">Regio: ${c.continents}</li>
                    <li class="list-group-item">Populatie: ${c.population}</l>
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
