// Supabase config
const supabaseUrl = "https://jbekjmsruiadbhaydlbt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function addGame(gameName, gameLink, gameImage) {
  console.log("#1");
  if (!gameName || !gameLink || !gameImage) {
    alert("Please fill in all fields.");
    return;
  }

  console.log("#2");

  const { data, error } = await supabase.from("games_menu").insert([
    {
      name: `${gameName}`,
      url: `${gameLink}`,
      img_url: `${gameImage}`,
      // include `id` only if you're not using auto-generated ids
    },
  ]);

  console.log("#3");

  if (error) {
    console.error("Error adding game:", error.message);
    alert("Error adding game, check the console for details");
    return;
  }

  console.log("#4");
  console.log("Game added successfully:", data);
  refreshGamesList();

}

async function refreshGamesList() {
  // Clear the current games list
  const gamesList = document.querySelector(".gamedisplay");
  gamesList.innerHTML = "";

  const { data, error } = await supabase
    .from("games_menu")
    .select("id, name, url, img_url");

  data.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";
    gameCard.dataset.url = game.url;
    gameCard.innerHTML = `
      <img
                class="game-thumbnail"
                src="${game.img_url}"
                alt="Game Thumbnail"
              />
              <div class="game-meta-row">
                <div class="game-info">
                  <h4 class="game-title">${game.name}</h4>
                </div>
                <button class="edit-btn" title="Edit">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
    `;
    gamesList.appendChild(gameCard);
    // Manually trigger your existing click handler here
    gameCard.addEventListener("click", (e) => {
      if (e.target.closest(".edit-btn")) return;

      const name = gameCard.querySelector(".game-title").textContent;
      const gameUrl = gameCard.dataset.url;

      const html = overlayScreens.editgame.replace("{createoredit}", "Edit");
      openOverlay(html);

      setTimeout(() => {
        document.getElementById("gameName").value = name;
        document.getElementById("gameURL").value = gameUrl;
      }, 50);
    });
  });
}

function safeRefreshGamesList() {
  const gamesList = document.querySelector(".gamedisplay");
  if (!gamesList) {
    console.warn("Waiting for .gamedisplay to appear...");
    requestAnimationFrame(safeRefreshGamesList);
    return;
  }
  refreshGamesList();
}

// Call this once everything else is visually ready
safeRefreshGamesList();
