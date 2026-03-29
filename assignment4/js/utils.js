export const scareLevels = {
    1: "Mysigt",
    2: "Lite läskigt",
    3: "Obehagligt",
    4: "Skräckinjagande",
    5: "Ren terror"
};

export function getScareLevelText(level) {
    return scareLevels[level];
}

// Hämtar alla hus
export async function loadHouses() {
    const response = await fetch("./data/houses.json");
    return response.json();
}