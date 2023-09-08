fetch(
  "https://hgxphlvxhzinnokdclkh.supabase.co/rest/v1/Data?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhneHBobHZ4aHppbm5va2RjbGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5OTAyMDcsImV4cCI6MjAwOTU2NjIwN30.rxRj6VAFxUXkCNfe8DMj0SidSXcKpBTLtSL9CAElxMU"
)
  .then((res) => res.json())
  .then(showSvampe);

function showSvampe(svampe) {
  svampe.forEach(showSvamp);
}

function showSvamp(svamp) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);

  copy.querySelector("h2").textContent = svamp.id;
  copy.querySelector(".title_").textContent = svamp.title;
  copy.querySelector(".kategori_").textContent = svamp.categories_name;
  //copy.querySelector(".season_0").textContent = svamp.season_0;
  copy.querySelector("img").src = svamp.profile_image_src;
  const parent = document.querySelector(".grid");
  parent.appendChild(copy);
}
