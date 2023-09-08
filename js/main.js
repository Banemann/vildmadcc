fetch("https://hgxphlvxhzinnokdclkh.supabase.co/rest/v1/Data?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhneHBobHZ4aHppbm5va2RjbGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5OTAyMDcsImV4cCI6MjAwOTU2NjIwN30.rxRj6VAFxUXkCNfe8DMj0SidSXcKpBTLtSL9CAElxMU")
.then(res=>res.json())
.then(showHeroes)


function showSvampe(svampe) {
svampe.forEach(showSvamp);
}

function showSvamp(svamp) {
const template = document.querySelector("template").content;
const copy = template.cloneNode(true);

copy.querySelector("h2").textContent = svamp.title;
copy.querySelector("p span.isEvil").textContent = hero.isEvil;
copy.querySelector("p.powers").textContent = hero.powers;
copy.querySelector("p.weaknesses").textContent = hero.weaknesses;
copy.querySelector("img").src = svamp.profile_image/src;
const parent = document.querySelector(".grid");
parent.appendChild(copy);
}