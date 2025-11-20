const STORAGE_KEY = "world-explorer-favorites";

/**
 * Lees favorieten uit localStorage.
 * @returns {Array} lijst van favoriete landen (of lege array)
 */
export function loadFavorites() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        console.error("loadFavorites() parse error:", err);
        return [];
    }
}

/**
 * Schrijf favorieten naar localStorage.
 * @param {Array} favorites
 */
export function saveFavorites(favorites) {
    try {
        const json = JSON.stringify(favorites);
        localStorage.setItem(STORAGE_KEY, json);
    } catch (err) {
        console.error("saveFavorites() failed:", err);
    }
}