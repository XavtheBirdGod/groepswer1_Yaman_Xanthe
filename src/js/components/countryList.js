import { clearElement, createElement } from "../utils/dom.js";

export function renderCountryList({ countries, favorites, onCountryClick, onFavoriteToggle }) {
    const container = document.querySelector("#country_list");
    if (!container) return;

    clearElement(container);

    if (!countries?.length) {
        container.appendChild(
            createElement(
                "div",
                "col-12 alert alert-light border text-center mb-0",
                "Geen landen gevonden voor deze filter."
            )
        );
        return;
    }

    const favoriteSet = new Set(favorites?.map(f => f.cca3));

    countries.forEach(country => {
        const {
            cca3,
            name: { common: name = "Onbekend" } = {},
            region = "Onbekend",
            population,
            flags = {}
        } = country;

        const isFav = favoriteSet.has(cca3);
        const populationText =
            typeof population === "number"
                ? population.toLocaleString("nl-BE")
                : "Onbekend";

        const flagUrl = flags.png || flags.svg || "";
        const flagAlt = flags.alt || `Vlag van ${name}`;

        const col = createElement("div", "col");
        const card = createElement("div", "card h-100 shadow-sm border-0");
        const body = createElement("div", "card-body d-flex flex-column");

        if (flagUrl) {
            const img = createElement("img", "img-fluid border rounded");
            img.src = flagUrl;
            img.alt = flagAlt;

            const imgWrap = createElement("div", "mb-2 text-center");
            imgWrap.appendChild(img);
            body.appendChild(imgWrap);
        }

        body.appendChild(createElement("h5", "card-title mb-1", name));
        body.appendChild(
            createElement(
                "p",
                "card-text small text-muted mb-2",
                `${region} • ${populationText} inwoners`
            )
        );


        const btnRow = createElement("div", "d-flex gap-2 mt-auto");

        const detailsBtn = createButton(
            "btn btn-sm btn-primary flex-grow-1",
            "Details",
            () => onCountryClick?.(country)
        );

        const favBtn = createButton(
            `btn btn-sm ${isFav ? "btn-warning" : "btn-outline-warning"}`,
            isFav ? "★ Favoriet" : "☆ Favoriet",
            (e) => {
                e.stopPropagation();
                onFavoriteToggle?.(country);
            }
        );

        btnRow.append(detailsBtn, favBtn);

        body.appendChild(btnRow);
        card.appendChild(body);
        col.appendChild(card);
        container.appendChild(col);
    });
}

function createButton(classes, text, handler) {
    const btn = createElement("button", classes, text);
    btn.type = "button";
    btn.addEventListener("click", handler);
    return btn;
}
