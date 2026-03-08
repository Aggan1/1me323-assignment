// Klass för en match mellan två spelare
export class Match {

  #playerA;
  #playerB;
  #winner;
  #matchElement;

  constructor(a, b) {
    this.#playerA = a;
    this.#playerB = b;
    this.#winner = null;
    this.#matchElement = null;
  }

  get playerA() {
    return this.#playerA;
  }

  get playerB() {
    return this.#playerB;
  }

  get winner() {
    return this.#winner;
  }

  get isPlayed() {
    return this.#winner !== null;
  }

  // Simulerar matchen och avgör vinnaren
  simuleraMatch() {

    if (this.isPlayed) return this.#winner;

    const skillA = this.#playerA.skillLevel ?? 4;
    const skillB = this.#playerB.skillLevel ?? 4;

    const chanceA = skillA / (skillA + skillB);
    const random = Math.random();

    if (random < chanceA) {
      this.#winner = this.#playerA;
    } else {
      this.#winner = this.#playerB;
    }

    this.#updateMatch();

    return this.#winner;
  }

  // Skapar HTML för matchen
  createMatch() {

    const matchElement = document.createElement("div");
    matchElement.classList.add("match");

    const skillA = this.#playerA.skillLevel ?? 4;
    const skillB = this.#playerB.skillLevel ?? 4;

    const catchA = this.#playerA.catchphrase ?? "Ingen catchphrase";
    const catchB = this.#playerB.catchphrase ?? "Ingen catchphrase";

    matchElement.innerHTML = `
    <div class="player player-a">
      <p><strong>${this.#playerA.name}</strong></p>
      <p>Skill: ${skillA}</p>
      <p>${catchA}</p>
    </div>

    <div class="vs">VS</div>

    <div class="player player-b">
      <p><strong>${this.#playerB.name}</strong></p>
      <p>Skill: ${skillB}</p>
      <p>${catchB}</p>
    </div>
  `;

    this.#matchElement = matchElement;
    this.#updateMatch();

    return matchElement;
  }

  // Uppdaterar matchen (när den spelats)
  #updateMatch() {

    if (!this.#matchElement) return;

    const playerAElement = this.#matchElement.querySelector(".player-a");
    const playerBElement = this.#matchElement.querySelector(".player-b");

    playerAElement.classList.remove("vinnare", "forlorare");
    playerBElement.classList.remove("vinnare", "forlorare");

    if (!this.isPlayed) return;

    const winnerIsA = this.#winner === this.#playerA;

    if (winnerIsA) {
      playerAElement.classList.add("vinnare");
      playerBElement.classList.add("forlorare");
    } else {
      playerBElement.classList.add("vinnare");
      playerAElement.classList.add("forlorare");
    }
  }
}