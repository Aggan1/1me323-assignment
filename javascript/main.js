import { assignments } from "./assignments.js";
import { createNavigation } from "./navigation.js";

const navlist = document.getElementById("navlist");
const kortContainer = document.getElementById("uppgifts-kort");


let aktuellSida = "start";

if (window.location.pathname.includes("assignment1")) {
  aktuellSida = "assignment1";
}

if (window.location.pathname.includes("assignment2")) {
  aktuellSida = "assignment2";
}

if (navlist) {
  createNavigation(assignments, navlist, aktuellSida);
}

if (kortContainer && aktuellSida === "start") {

  let kortHTML = "";

  assignments.forEach(item => {

    if (item.id === "start") return;

    kortHTML += `
      <article class="card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="${item.link}">Öppna uppgift</a>
      </article>
    `;
  });

  kortContainer.innerHTML = kortHTML;
}