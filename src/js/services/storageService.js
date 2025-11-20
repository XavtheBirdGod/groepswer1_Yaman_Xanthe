const STORAGE_KEY = "world-explorer-favorites";

/**
 * Lees favorieten uit localStorage.
 * @returns {Array} lijst van favoriete landen (of lege array)
 */
export function loadFavorites() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        // niks opgeslagen → lege array
        if (!raw) return [];

        const parsed = JSON.parse(raw);

        // als data bullshit is → veilige fallback
        return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        console.error("loadFavorites() parse error:", err);
        return [];
    }
}