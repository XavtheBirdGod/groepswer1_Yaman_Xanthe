import { clearElement, createElement } from "../utils/dom.js";

/**
 * Render de lijst van landen in #country_list.
 *
 * @param {Object} config
 * @param {Array}  config.countries
 * @param {Array}  config.favorites
 * @param {Function} config.onCountryClick   (country) => void
 * @param {Function} config.onFavoriteToggle (country) => void
 */
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

        // Vlag
        if (flagUrl) {
            const imgWrap = createElement("div", "mb-2 text-center");
            const img = document.createElement("img");
            img.src = flagUrl;
            img.alt = flagAlt;
            img.className = "img-fluid border rounded";
            imgWrap.appendChild(img);
            body.appendChild(imgWrap);
        }

        // Naam
        const titleEl = createElement("h5", "card-title mb-1", name);
        body.appendChild(titleEl);

        // Regio + populatie
        const metaEl = createElement(
            "p",
            "card-text small text-muted mb-2",
            `${region} • ${population} inwoners`
        );
        body.appendChild(metaEl);

        // Knoppen onderaan
        const btnRow = createElement("div", "d-flex gap-2 mt-auto");

        const detailsBtn = createElement(
            "button",
            "btn btn-sm btn-primary flex-grow-1",
            "Details"
        );
        detailsBtn.type = "button";
        detailsBtn.addEventListener("click", () => {
            onCountryClick?.(country);
        });

        const favBtn = createElement(
            "button",
            "btn btn-sm " + (isFav ? "btn-warning" : "btn-outline-warning"),
            isFav ? "★ Favoriet" : "☆ Favoriet"
        );
        favBtn.type = "button";
        favBtn.addEventListener("click", () => {
            onFavoriteToggle?.(country);
        });

        btnRow.appendChild(detailsBtn);
        btnRow.appendChild(favBtn);

        body.appendChild(btnRow);
        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
    });
}