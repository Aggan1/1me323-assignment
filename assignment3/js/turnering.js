import { loadContestants } from "./api.js";
import { Match } from "./match.js";

let currentMatches = [];
let contestants = [];
let bracketDel;
let simuleraKnapp;
let startaOmKnapp;

export async function initTurnering() {
  bracketDel = document.querySelector("#bracket");
  simuleraKnapp = document.querySelector("#simulera");
  startaOmKnapp = document.querySelector("#starta-om");

  contestants = await loadContestants();

  simuleraKnapp.addEventListener("click", simulera);
  startaOmKnapp.addEventListener("click", startaOm);

  currentMatches = createRound(contestants, "Kvartsfinal");
}

// Skapar en ny runda
function createRound(players, roundName) {
  const roundEl = document.createElement("div");
  roundEl.classList.add("round");

  const rubrik = document.createElement("h4");
  rubrik.textContent = roundName;
  roundEl.appendChild(rubrik);

  const matches = [];

  for (let i = 0; i < players.length; i += 2) {
    const match = new Match(players[i], players[i + 1]);

    matches.push(match);
    roundEl.appendChild(match.createMatch());
  }

  bracketDel.appendChild(roundEl);

  simuleraKnapp.textContent = `Simulera ${roundName.toLowerCase()}`;

  return matches;
}

// Simulerar rundan (matcherna)
function simulera() {
  currentMatches.forEach(function (match) {
    if (!match.isPlayed) {
      match.simuleraMatch();
    }
  });

  const winners = currentMatches.map(function (match) {
    return match.winner;
  });

  if (winners.length > 1) {
    const roundName = winners.length === 2 ? "Final" : "Semifinal";
    currentMatches = createRound(winners, roundName);
  } else {
    simuleraKnapp.style.display = "none";
  }
}

// Startar om turneringen
function startaOm() {
  bracketDel.innerHTML = "";
  simuleraKnapp.style.display = "inline-block";

  currentMatches = createRound(contestants, "Kvartsfinal");
}