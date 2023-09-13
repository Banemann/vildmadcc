// Define a variable to store the selected filter option
let selectedFilter = "all";

// Get the filter form and the filteredResults div
const filterForm = document.getElementById("filterForm");
const filteredResults = document.getElementById("filteredResults");

// Add an event listener to the form to handle filtering
filterForm.addEventListener("submit", function (e) {
  e.preventDefault();
  selectedFilter = document.getElementById("mushroomType").value;
  filterSvampe();
});

// Fetch and filter the mushrooms initially
fetch(
  "https://hgxphlvxhzinnokdclkh.supabase.co/rest/v1/Data?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhneHBobHZ4aHppbm5va2RjbGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5OTAyMDcsImV4cCI6MjAwOTU2NjIwN30.rxRj6VAFxUXkCNfe8DMj0SidSXcKpBTLtSL9CAElxMU"
)
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data)) {
      showSvampe(data);
      filterSvampe();
    } else {
      console.error("Data is not an array:", data);
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// Function to filter and display mushrooms based on the selected filter
function filterSvampe() {
  const mushrooms = document.querySelectorAll(".svamp");
  mushrooms.forEach((svamp) => {
    const isEatable = svamp.dataset.isEatable === "true";
    if (
      selectedFilter === "all" ||
      (selectedFilter === "eatable" && isEatable) ||
      (selectedFilter === "noneatable" && !isEatable)
    ) {
      svamp.style.display = "block";
    } else {
      svamp.style.display = "none";
    }
  });
}

function showSvampe(svampe) {
  svampe.forEach(showSvamp);
}

function showSvamp(svamp) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);

  copy.querySelector("h2").textContent = svamp.id;
  copy.querySelector(".title_").textContent = svamp.title;
  copy.querySelector(".kategori_").textContent = svamp.categories_name;
  copy.querySelector(".opskrift").textContent = svamp.Opskrift;

  copy.querySelector(
    ".description"
  ).textContent = `Kan findes i ${svamp.sankelandskaber_title}`;

  copy.querySelector(".spiselig").textContent = svamp.isEatable
    ? "Svampen er spiselig"
    : "Svampen er ikke spiselig, hold øje!";

  copy.querySelector("img").src = svamp.profile_image_src;

  // Store the isEatable value as a data attribute for filtering
  copy.querySelector(".svamp").dataset.isEatable = svamp.isEatable;

  const parent = document.querySelector(".grid");
  parent.appendChild(copy);
}

// Function to handle clicking on a svamp element
function handleClick(event) {
  const svamp = event.target.closest(".svamp");
  if (svamp) {
    const title = svamp.querySelector(".title_").textContent;
    const description = svamp.querySelector(".description").textContent;
    const opskrift = svamp.querySelector(".opskrift").textContent;

    // Display an alert with the mushroom's title and description
    alert(
      `Mushroom Title: ${title}\nDescription: ${description}\nOpskrift: ${opskrift}`
    );
  }
}

// Add a click event listener to a common ancestor of .svamp elements
const grid = document.querySelector(".grid");
grid.addEventListener("click", handleClick);
