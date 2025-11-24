import { clearElement, createElement } from "../utils/dom.js";

export function renderCountryList({ countries, favorites, onCountryClick, onFavoriteToggle }) {
    const container = document.querySelector("#country_list");
    if (!container) return;

    clearElement(container);

    if (!countries || countries.length === 0) {
        const empty = createElement(
            "div",
            "col-12 alert alert-light border text-center mb-0",
            "Geen landen gevonden voor deze filter."
        );
        container.appendChild(empty);
        return;
    }

    // Create a Set for faster lookup
    const favoriteSet = new Set((favorites ?? []).map(f => f.cca3));

    countries.forEach(country => {
        const col = createElement("div", "col");
        const card = createElement("div", "card h-100 shadow-sm border-0");
        const body = createElement("div", "card-body d-flex flex-column");

        const name = country.name?.common || "Onbekend";
        const region = country.region || "Onbekend";
        const population = typeof country.population === "number"
            ? country.population.toLocaleString("nl-BE")
            : "Onbekend";

        const flagUrl = country.flags?.png || country.flags?.svg || "";
        const flagAlt = country.flags?.alt || `Vlag van ${name}`;
        const isFav = favoriteSet.has(country.cca3);

        // 1. Vlag
        if (flagUrl) {
            const imgWrap = createElement("div", "mb-2 text-center");
            const img = document.createElement("img");
            img.src = flagUrl;
            img.alt = flagAlt;
            img.className = "img-fluid border rounded";
            // Student B styling preservation:
            imgWrap.appendChild(img);
            body.appendChild(imgWrap);
        }

        // 2. Naam
        const titleEl = createElement("h5", "card-title mb-1", name);
        body.appendChild(titleEl);

        // 3. Regio + populatie
        const metaEl = createElement(
            "p",
            "card-text small text-muted mb-2",
            `${region} • ${population} inwoners`
        );
        body.appendChild(metaEl);

        // 4. Knoppen onderaan
        const btnRow = createElement("div", "d-flex gap-2 mt-auto");

        const detailsBtn = createElement(
            "button",
            "btn btn-sm btn-primary flex-grow-1",
            "Details"
        );
        detailsBtn.type = "button";
        detailsBtn.addEventListener("click", () => {
            if (onCountryClick) onCountryClick(country);
        });

        const favBtn = createElement(
            "button",
            "btn btn-sm " + (isFav ? "btn-warning" : "btn-outline-warning"),
            isFav ? "★ Favoriet" : "☆ Favoriet"
        );
        favBtn.type = "button";
        favBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent card click issues
            if (onFavoriteToggle) onFavoriteToggle(country);
        });

        btnRow.appendChild(detailsBtn);
        btnRow.appendChild(favBtn);

        body.appendChild(btnRow);
        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
    });
}