const STORAGE_KEY = "world-explorer-favorites";

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

export function saveFavorites(favorites) {
    try {
        const json = JSON.stringify(favorites);
        localStorage.setItem(STORAGE_KEY, json);
    } catch (err) {
        console.error("saveFavorites() failed:", err);
    }
}