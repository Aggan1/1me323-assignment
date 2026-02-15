import { laggtill } from "./korg.js";

// Allt för produkterna (data och strukturen som för naven)
export const produkter = [
  {
    id: 1,
    name: "Comfort 550B",
    description: "En bekväm och stilren sneaker för vardagligt bruk.",
    price: 849,
    image: "img/sko1.jpg",
    category: "Sneakers",
    stock: 5
  },
  {
    id: 2,
    name: "Sportstreet Lows",
    description: "Modern sneaker med flexibel sula och bra grepp.",
    price: 1199,
    image: "img/sko2.jpg",
    category: "Sneakers",
    stock: 3
  },
  {
    id: 3,
    name: "SuperFly A11",
    description: "Tidlös lädersko för både arbete och fritid.",
    price: 1499,
    image: "img/sko3.jpg",
    category: "Läderskor",
    stock: 0
  },
  {
    id: 4,
    name: "Comfort 480A",
    description: "Perfekt för träning och löpning.",
    price: 1299,
    image: "img/sko4.jpg",
    category: "Sport",
    stock: 4
  },
  {
    id: 5,
    name: "StableSole U1",
    description: "Varm vinterkänga med extra grepp.",
    price: 1799,
    image: "img/sko5.jpg",
    category: "Kängor",
    stock: 2
  },
  {
    id: 6,
    name: "UltraTREX",
    description: "Lätt och bekväm promenadsko.",
    price: 899,
    image: "img/sko6.jpg",
    category: "Sneakers",
    stock: 6
  },
  {
    id: 7,
    name: "ComfortTREX",
    description: "Robust vandringssko för tuff terräng.",
    price: 1999,
    image: "img/sko7.jpg",
    category: "Vandring",
    stock: 3
  },
  {
    id: 8,
    name: "DailyMOVE A2",
    description: "Enkel och bekväm vardagssko.",
    price: 799,
    image: "img/sko8.jpg",
    category: "Vardag",
    stock: 5
  }
];

// Hämtar och skapar produkterna på sidan i containern
const container = document.getElementById("produkt-container");

if (container) {

  let html = "";

  produkter.forEach(function (produkt) {

    html += `
      <div class="produkt-kort">
        <img src="${produkt.image}" alt="${produkt.name}">
        <h3>${produkt.name}</h3>
        <p>${produkt.description}</p>
        <p><strong>${produkt.price} kr</strong></p>
        <p class="kategori">${produkt.category}</p>
        <p class="${produkt.stock > 0 ? 'finns' : 'slut'}">
        ${produkt.stock > 0 ? "I lager" : "Slut i lager"}</p>
        <button class="add-knapp">Lägg i kundvagn</button>
      </div>
    `;
  });

  container.innerHTML = html;

  const knappar = container.querySelectorAll(".add-knapp");

  knappar.forEach(function (knapp, index) {

    if (produkter[index].stock > 0) {

      knapp.addEventListener("click", function () {
        laggtill(produkter[index]);
      });

    } else {

      knapp.disabled = true;
      knapp.textContent = "Slut i lager";

    }

  });

}