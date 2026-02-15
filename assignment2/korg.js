// Bara så kundvagnens array är tom
let korg = [];

// Hämta sparad korg från localStorage genom json
const sparadKorg = localStorage.getItem("korg");

if (sparadKorg) {
  korg = JSON.parse(sparadKorg);
}

// Hämta element
const kundvagn = document.getElementById("kundvagn");
const totalElement = document.getElementById("summa");
const emptyKorgKnapp = document.getElementById("empty-korgen");


// kundvagns funktionen
function getKorg() {

  if (kundvagn === null) {
    return;
  }

  let html = "";
  let total = 0;

  if (korg.length === 0) {
    html = "<p>Kundvagnen är tom</p>";
  }

  for (let i = 0; i < korg.length; i++) {

    const item = korg[i];
    const summa = item.produkt.price * item.antal;
    total += summa;

    html += `
      <div class="korg-item">
        <p>${item.produkt.name}</p>
        <p>${item.antal} st</p>
        <p>${summa} kr</p>
      </div>
    `;
  }

  kundvagn.innerHTML = html;
  totalElement.textContent = "Totalt: " + total + " kr";
}

// Lägg till i kundvagns funtkionen
export function laggtill(produkt) {

  let finns = false;

  for (let i = 0; i < korg.length; i++) {

    if (korg[i].produkt.id === produkt.id) {

      // Kontrollera så att inte lagersaldot överskrids
      if (korg[i].antal < produkt.stock) {
        korg[i].antal++;
      } else {
        alert("Det finns inte fler i lager.");
      }

      finns = true;
    }
  }

  // Om produkten inte finns
  if (finns === false) {

    if (produkt.stock > 0) {

      korg.push({
        produkt: produkt,
        antal: 1
      });

    } else {
      alert("Produkten är slut i lager.");
    }
  }

  // Sparar ändringen i localstorage så det finns kvar samt uppdaterar själva kundvagns visningen
  sparaKorg();
  getKorg();
}

// Tömma kundvagnen
if (emptyKorgKnapp) {
  emptyKorgKnapp.addEventListener("click", function () {
    korg = [];
    sparaKorg();
    getKorg();
  });
}

// Spara i localstorage med json så arrayen konverteras
function sparaKorg() {
  localStorage.setItem("korg", JSON.stringify(korg));
}

getKorg();