import { loadHouses, getScareLevelText } from "./utils.js";

const housesContainer = document.querySelector("#houses-container");
const maxPriceInput = document.querySelector("#max-price");
const maxPriceText = document.querySelector("#max-price-value");
const scareLevelInput = document.querySelector("#scare-level");
const scareLevelText = document.querySelector("#scare-level-value");
const ghostTypeSelect = document.querySelector("#ghost-type");
const wifiInput = document.querySelector("#wifi");
const message = document.querySelector("#message");

let houses = [];

initIndex();

// Startar översiktssidan
async function initIndex() {
    try {
        houses = await loadHouses();

        showGhostTypes(houses);
        showHouses(houses);

        maxPriceText.textContent = "Inget valt";
        scareLevelText.textContent = "Inget valt";

        maxPriceInput.addEventListener("input", updateMaxPrice);
        scareLevelInput.addEventListener("input", updateScareLevel);
        ghostTypeSelect.addEventListener("change", filterHouses);
        wifiInput.addEventListener("change", filterHouses);

    } catch (error) {
        message.innerHTML = `<p class="error-message">Något gick fel när husen skulle laddas.</p>`;
        console.error(error);
    }
}

// Lägger in alla spöktyper i en select
function showGhostTypes(houses) {
    const types = new Set();

    houses.forEach(function (house) {
        house.ghostTypes.forEach(function (type) {
            types.add(type);
        });
    });

    types.forEach(function (type) {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        ghostTypeSelect.appendChild(option);
    });
}

// Visar alla husen på sidan
function showHouses(housesToShow) {
    housesContainer.innerHTML = "";

    housesToShow.forEach(function (house) {
        const scareText = getScareLevelText(house.scareLevel);

        const card = document.createElement("div");
        card.classList.add("house");

        card.innerHTML = `
      <img src="./images/${house.image}" alt="${house.name}">
      <h3>${house.name}</h3>
      <p><strong>Plats:</strong> ${house.location}</p>
      <p><strong>Pris:</strong> ${house.pricePerNight} kr / natt</p>
      <p><strong>Skräcknivå:</strong> ${scareText}</p>
      <a href="house.html?id=${house.id}">Läs mer och boka</a>
    `;

        housesContainer.appendChild(card);
    });
}

// Uppdaterar maxpriset i slidern
function updateMaxPrice() {
    if (Number(maxPriceInput.value) === 0) {
        maxPriceText.textContent = "Inget valt";
    } else {
        maxPriceText.textContent = `${maxPriceInput.value} kr`;
    }

    filterHouses();
}

// Skräcknivå slidern
function updateScareLevel() {
    if (Number(scareLevelInput.value) === 0) {
        scareLevelText.textContent = "Inget valt";
    } else {
        scareLevelText.textContent = getScareLevelText(Number(scareLevelInput.value));
    }

    filterHouses();
}

// Filtrerar husen beroende på val
function filterHouses() {
    const maxPrice = Number(maxPriceInput.value);
    const minScare = Number(scareLevelInput.value);
    const selectedType = ghostTypeSelect.value;
    const wifiOnly = wifiInput.checked;

    const filtered = houses.filter(function (house) {
        if (maxPrice !== 0 && house.pricePerNight > maxPrice) return false;
        if (minScare !== 0 && house.scareLevel < minScare) return false;
        if (selectedType !== "all" && !house.ghostTypes.includes(selectedType)) return false;
        if (wifiOnly && !house.hasWifi) return false;

        return true;
    });

    if (filtered.length === 0) {
        message.innerHTML = `<p class="error-message">Inga hus matchar din filtrering.</p>`;
    } else {
        message.innerHTML = "";
    }

    showHouses(filtered);
}