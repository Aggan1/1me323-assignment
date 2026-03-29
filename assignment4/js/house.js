import { loadHouses, getScareLevelText } from "./utils.js";
import { Booking } from "./booking.js";
import { initMap } from "./map.js";

const errorSection = document.querySelector("#error-section");
const houseDetails = document.querySelector("#house-details");

initHouse();

// Startar själva hus sidan
async function initHouse() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const houses = await loadHouses();
    const house = houses.find(function (h) {
      return h.id === id;
    });

    if (!house) {
      showError("Huset kunde inte hittas.");
      return;
    }

    renderHouse(house);

    const booking = new Booking(house);
    booking.attachListeners();
    booking.updateDisplay();

    initMap(house);

  } catch (error) {
    showError("Ett fel uppstod när huset skulle laddas.");
    console.error(error);
  }
}

// Visar huset som man valt och infon som visas
function renderHouse(house) {
  const scareText = getScareLevelText(house.scareLevel);

  houseDetails.innerHTML = `
    <article class="house-detail">
      <img src="./images/${house.image}" alt="${house.name}">
      <h2>${house.name}</h2>
      <p><strong>Plats:</strong> ${house.location}</p>
      <p><strong>Pris:</strong> ${house.pricePerNight} kr / natt</p>
      <p><strong>Skräcknivå:</strong> ${scareText}</p>
      <p><strong>Spöktyper:</strong> ${house.ghostTypes.join(", ")}</p>
      <p><strong>WiFi:</strong> ${house.hasWifi ? "Ja" : "Nej"}</p>
      <p>${house.description}</p>
    </article>
  `;
}

// Visar fel vid problem
function showError(text) {
  errorSection.innerHTML = `
    <div class="error-message">
      <p>${text}</p>
      <a href="index.html">Tillbaka</a>
    </div>
  `;
}