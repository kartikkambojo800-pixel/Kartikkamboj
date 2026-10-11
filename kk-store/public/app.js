(() => {
  const search = document.getElementById("gameSearch");
  const cards = [...document.querySelectorAll(".game-card")];
  const filters = [...document.querySelectorAll(".category")];
  const noResults = document.getElementById("noResults");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  let activeCategory = "all";

  function updateGames() {
    const query = (search.value || "").trim().toLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const title = (card.dataset.title || "").toLowerCase();
      const categories = (card.dataset.category || "").toLowerCase().split(" ");
      const matchesText = title.includes(query);
      const matchesCategory = activeCategory === "all" || categories.includes(activeCategory);
      const visible = matchesText && matchesCategory;
      card.hidden = !visible;
      if (visible) shown++;
    });
    noResults.hidden = shown !== 0;
  }

  search.addEventListener("input", updateGames);
  filters.forEach(button => button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filters.forEach(item => item.classList.toggle("active", item === button));
    updateGames();
  }));

  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
})();
