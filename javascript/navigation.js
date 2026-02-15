export function createNavigation(assignments, navElement, currentPage) {

  let html = "";

  assignments.forEach(function (item) {

    let url = item.link;

    if (currentPage !== "start") {
      url = "../" + url;
    }

    const aktivKlass = item.id === currentPage ? "aktiv" : "";

    html += `
      <li>
        <a href="${url}" class="${aktivKlass}">
          ${item.title}
        </a>
      </li>
    `;
  });

  navElement.innerHTML = html;
}