export class Booking {
  constructor(house) {
    this.house = house;

    this.checkInInput = document.querySelector("#check-in");
    this.daysInput = document.querySelector("#days");
    this.breakfastInput = document.querySelector("#breakfast");
    this.ghostTourInput = document.querySelector("#ghost-tour");
    this.seanceInput = document.querySelector("#seance");
    this.discountCodeInput = document.querySelector("#discount-code");

    this.form = document.querySelector("#booking-form");
    this.totalPriceEl = document.querySelector("#total-price");
    this.nightsEl = document.querySelector("#booking-nights");
    this.extrasEl = document.querySelector("#booking-extras");
    this.discountEl = document.querySelector("#booking-discount");
    this.messageEl = document.querySelector("#booking-message");

    this.checkInInput.min = new Date().toISOString().split("T")[0];
  }

  // Räknar ut hela totalpriset
  calculateTotalPrice() {
    const days = Number(this.daysInput.value) || 1;
    let total = this.house.pricePerNight * days;

    if (this.breakfastInput.checked) {
      total += 100 * days;
    }

    if (this.ghostTourInput.checked) {
      total += 300;
    }

    if (this.seanceInput.checked) {
      total += 500;
    }

    if (this.discountCodeInput.value.trim().toUpperCase() === "SCARY20") {
      total *= 0.8;
    }

    return Math.round(total);
  }

  // Hämtar text för tillägg som valt
  getExtrasText() {
    const extras = [];

    if (this.breakfastInput.checked) {
      extras.push("Frukost");
    }

    if (this.ghostTourInput.checked) {
      extras.push("Spökvandring");
    }

    if (this.seanceInput.checked) {
      extras.push("Nattlig seans");
    }

    if (extras.length === 0) {
      return "Inga tillägg";
    }

    return extras.join(", ");
  }

  // Uppdaterar prisrutan
  updateDisplay() {
    const days = Number(this.daysInput.value) || 1;
    const total = this.calculateTotalPrice();
    const extrasText = this.getExtrasText();

    this.nightsEl.textContent = `${days} X ${this.house.pricePerNight} KR`;
    this.extrasEl.textContent = extrasText;

    if (this.discountCodeInput.value.trim().toUpperCase() === "SCARY20") {
      this.discountEl.textContent = "SCARY20 (20%)";
    } else {
      this.discountEl.textContent = "Ingen rabatt";
    }

    this.totalPriceEl.textContent = `${total} KR`;
  }

  // kollar-validerar bokningen
  validate() {
    const checkIn = this.checkInInput.value;
    const days = Number(this.daysInput.value);

    if (!checkIn) {
      return "Du måste välja ett incheckningsdatum.";
    }

    if (days < 1) {
      return "Antal dagar måste vara minst 1.";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(checkIn);

    if (selectedDate < today) {
      return "Incheckningsdatum kan inte vara tidigare än idag.";
    }

    return "";
  }

  // Visar bokningsbekräftelse
  showConfirmation() {
    const total = this.calculateTotalPrice();
    const extrasText = this.getExtrasText();

    this.messageEl.innerHTML = `
      <div class="success-message">
        <h3>Tack för din bokning!</h3>
        <p><strong>Hus:</strong> ${this.house.name}</p>
        <p><strong>Incheckning:</strong> ${this.checkInInput.value}</p>
        <p><strong>Antal dagar:</strong> ${this.daysInput.value}</p>
        <p><strong>Tillägg:</strong> ${extrasText}</p>
        <p><strong>Totalpris:</strong> ${total} KR</p>
        <p>Vi ser fram emot att välkomna dig till ${this.house.name}.</p>
      </div>
    `;
  }

  // Visar felmeddelande
  showError(errorMessage) {
    this.messageEl.innerHTML = `
      <div class="error-message">
        <p>${errorMessage}</p>
      </div>
    `;
  }

  // Kopplar lyssnaren för formuläret
  attachListeners() {
    this.form.addEventListener("input", () => {
      this.updateDisplay();
    });

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      const errorMessage = this.validate();

      if (errorMessage) {
        this.showError(errorMessage);
        return;
      }

      this.showConfirmation();
    });
  }
}