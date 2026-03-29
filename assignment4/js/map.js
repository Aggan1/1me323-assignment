// Visar karta och info
export async function initMap(house) {
  const mapElement = document.querySelector("#map");

  if (!mapElement) {
    return;
  }

  try {
    const lat = house.coordinates.lat;
    const lng = house.coordinates.lng;

    const map = L.map("map").setView([lat, lng], 8);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`<strong>${house.name}</strong><br>${house.location}`)
      .openPopup();

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );

    if (!response.ok) {
      throw new Error("Kunde inte hämta ortsinfo.");
    }

    const data = await response.json();

    const infoBox = document.createElement("div");
    infoBox.classList.add("map-info");

    const country = data.address?.country ?? "Okänt land";
    const county = data.address?.county ?? "Okänt område";
    const state = data.address?.state ?? "Okänd region";
    const village = data.address?.village ?? data.address?.town ?? data.address?.city ?? "Okänd ort";

    infoBox.innerHTML = `
      <p><strong>Ort:</strong> ${village}</p>
      <p><strong>Område:</strong> ${county}</p>
      <p><strong>Region:</strong> ${state}</p>
      <p><strong>Land:</strong> ${country}</p>
    `;

    mapElement.insertAdjacentElement("afterend", infoBox);
  } catch (error) {
    mapElement.insertAdjacentHTML(
      "afterend",
      `<p class="error-message">Kunde inte visa kartan eller ortsinformationen.</p>`
    );
    console.error(error);
  }
}