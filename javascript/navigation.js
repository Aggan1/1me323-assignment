export function createNavigation(assignments, navElement, currentPage) {

  let html = "";

  assignments.forEach(item => {

    const aktivKlass = item.id === currentPage ? "aktiv" : "";

    html += `
      <li>
        <a href="${item.link}" class="${aktivKlass}">
          ${item.title}
        </a>
      </li>
    `;
  });

  navElement.innerHTML = html;
}