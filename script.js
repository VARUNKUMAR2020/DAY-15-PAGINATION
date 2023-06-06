const itemsPerPage = 10;
let currentPage = 1;

function generatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationElement = document.getElementById("pagination");

  // Clear previous pagination links
  paginationElement.innerHTML = "";

  // Previous page link
  const prevLink = document.createElement("a");
  prevLink.href = "#";
  prevLink.textContent = "Previous";
  prevLink.classList.add("page-link");
  if (currentPage === 1) {
    prevLink.classList.add("disabled");
  } else {
    prevLink.addEventListener("click", () => {
      navigateToPage(currentPage - 1);
    });
  }
  paginationElement.appendChild(prevLink);

  // Page links
  for (let page = 1; page <= totalPages; page++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = page;
    pageLink.classList.add("page-link");
    if (page === currentPage) {
      pageLink.classList.add("active");
    } else {
      pageLink.addEventListener("click", () => {
        navigateToPage(page);
      });
    }
    paginationElement.appendChild(pageLink);
  }

  // Next page link
  const nextLink = document.createElement("a");
  nextLink.href = "#";
  nextLink.textContent = "Next";
  nextLink.classList.add("page-link");
  if (currentPage === totalPages) {
    nextLink.classList.add("disabled");
  } else {
    nextLink.addEventListener("click", () => {
      navigateToPage(currentPage + 1);
    });
  }
  paginationElement.appendChild(nextLink);
}

function navigateToPage(page) {
  currentPage = page;
  displayData();
}

function displayData() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataElement = document.getElementById("data");
  dataElement.innerHTML = "";

  fetch("list.json")
    .then((response) => response.json())
    .then((data) => {
      const pageData = data.slice(startIndex, endIndex);
      pageData.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.textContent = `ID: ${item.id}--> Name: ${item.name}--> Email: ${item.email}`;
        dataElement.appendChild(itemElement);
      });

      generatePagination(data.length);
    })
    .catch((error) => console.log(error));
}
displayData();
