// Supabase config
const supabaseUrl = 'https://jbekjmsruiadbhaydlbt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let games = [];
let showClickCounts = false;
let currentSortOption = 'favorites';

async function loadGamesFromSupabase() {
  showSkeletonLoader();
  const { data, error } = await supabase.from('games_menu').select('id, name, url, img_url');

  if (error) {
    console.error("Supabase error:", error.message);
    alert('Error loading games from Supabase');
    return;
  }

  console.log("Games data:", data);

  games = data.map(row => ({
    id: row.id,
    name: row.name,
    image: row.img_url,
    link: row.url,
    clickCount: 0,
    isFavorited: false,
    path: "/play",
    globalLikes: 0,
    globalClicks: 0,
  }));

  loadFavoritesFromLocalStorage();
  loadClickCountsFromLocalStorage();
  await fetchGlobalLikes();
  await fetchGlobalClicks();
  displayGamesWithSkeleton();
}

function toggleClickCounts() {
  showClickCounts = !showClickCounts;
  const button = document.getElementById("toggleUsageData");
  button.textContent = showClickCounts ? "Hide Usage Data" : "Show Usage Data";
  displayGames();
}

function filterGames() {
  const search = document.getElementById("search").value;
  displayGames(search);

  clearTimeout(typingTimeout);
  showLaunchingGame();
  typingTimeout = setTimeout(() => {
    resetToDefault();
  }, 1000);
}

function saveFavoritesToLocalStorage() {
  const favorites = games.reduce((acc, game) => {
    acc[game.name] = game.isFavorited;
    return acc;
  }, {});
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function loadFavoritesFromLocalStorage() {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
  if (storedFavorites) {
    games.forEach(game => {
      game.isFavorited = storedFavorites[game.name] || false;
    });
  }
}

function saveClickCountsToLocalStorage() {
  const clickCounts = games.reduce((acc, game) => {
    acc[game.name] = game.clickCount;
    return acc;
  }, {});
  localStorage.setItem("clickCounts", JSON.stringify(clickCounts));
}

function loadClickCountsFromLocalStorage() {
  const storedClickCounts = JSON.parse(localStorage.getItem("clickCounts"));
  if (storedClickCounts) {
    games.forEach(game => {
      game.clickCount = storedClickCounts[game.name] || 0;
    });
  }
}

function sortGames() {
  const sortDropdown = document.getElementById("sortOptions");
  if (!sortDropdown) return;
  currentSortOption = sortDropdown.value;
  displayGames();
}

function isGameLiked(game) {
  const likeKey = `liked_${game.link}`;
  return !!localStorage.getItem(likeKey);
}

function displayGames(filter = "") {
  const gameMenu = document.getElementById("gameMenu");
  const gameCount = document.getElementById("gameCount");
  const searchBar = document.getElementById("search");
  gameMenu.innerHTML = "";

  const filteredGames = games
    .filter(game => game.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      switch (currentSortOption) {
        case "favorites": return b.isFavorited - a.isFavorited;
        case "clickCount": return b.clickCount - a.clickCount;
        case "alphabetical": return a.name.localeCompare(b.name);
        case "liked": return isGameLiked(b) - isGameLiked(a);
        case "globalLikes": return (b.globalLikes || 0) - (a.globalLikes || 0);
        case "trending": return (b.globalClicks || 0) - (a.globalClicks || 0);
        default: return 0;
      }
    });

  filteredGames.forEach(game => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const favoriteIcon = document.createElement("div");
    favoriteIcon.classList.add("favorite-icon");
    favoriteIcon.innerHTML = game.isFavorited ? '<i class="fa-solid fa-heart-circle-check"></i>' : '<i class="fa-solid fa-heart-circle-plus"></i>';
    favoriteIcon.title = game.isFavorited ? "Unfavorite" : "Favorite";
    favoriteIcon.style.cursor = "pointer";
    favoriteIcon.addEventListener("click", e => {
      e.stopPropagation();
      game.isFavorited = !game.isFavorited;
      saveFavoritesToLocalStorage();
      displayGames(filter);
    });

    const clickCountElement = document.createElement("div");
    clickCountElement.classList.add("click-count");
    clickCountElement.textContent = `Your Clicks: ${game.clickCount}`;
    clickCountElement.style.display = showClickCounts ? "block" : "none";

    const gameLink = document.createElement("a");
    gameLink.href = game.path;
    const gameImage = document.createElement("img");
    gameImage.src = game.image;
    gameLink.appendChild(gameImage);

    setTimeout(() => {
      gameImage.classList.add("loaded");
    }, 2000);

    const gameName = document.createElement("div");
    gameName.classList.add("game-name");
    gameName.textContent = game.name;
    gameLink.appendChild(gameName);

    gameDiv.appendChild(favoriteIcon);
    gameDiv.appendChild(gameLink);
    gameDiv.appendChild(clickCountElement);

    gameDiv.addEventListener("click", () => {
      game.clickCount++;
      localStorage.setItem('gameLink', game.link);
      localStorage.setItem('gameName', game.name);
      localStorage.setItem('gameImage', game.image);
      saveClickCountsToLocalStorage();
      displayGames(filter);
    });

    gameMenu.appendChild(gameDiv);
  });

  if (gameCount) {
    gameCount.textContent = `${filteredGames.length} out of ${games.length} games were loaded.`;
  }
    if (gameCount) {
    searchBar.placeholder = `Search through ${games.length} games...`;
  }
}

function showSkeletonLoader() {
  const gameMenu = document.getElementById("gameMenu");
  gameMenu.innerHTML = "";
  for (let i = 0; i < 70; i++) {
    const skeletonGame = document.createElement("div");
    skeletonGame.classList.add("skeleton", "skeleton-game");
    gameMenu.appendChild(skeletonGame);
  }
}

function displayGamesWithSkeleton() {
  const searchBar = document.getElementById("search");
  const sortDropdown = document.getElementById("sortOptions");
  const gameCount = document.getElementById("gameCount");
  const welcomeText = document.getElementById("welcome");

  if (searchBar) searchBar.style.display = "none";
  if (sortDropdown) sortDropdown.style.display = "none";
  if (gameCount) gameCount.style.display = "none";
  if (welcomeText) welcomeText.style.display = "none";

  showSkeletonLoader();

  setTimeout(() => {
    displayGames();
    if (searchBar) searchBar.style.display = "inline-block";
    if (sortDropdown) sortDropdown.style.display = "inline-block";
    if (gameCount) gameCount.style.display = "block";
  }, 5000);
}

async function fetchGlobalLikes() {
  const { data, error } = await supabase.from('game_votes').select('game_id, likes');
  if (error) {
    console.error('Error fetching global likes:', error);
    return;
  }
  games.forEach(game => {
    const found = data.find(row => row.game_id === game.link || row.game_id === game.name);
    game.globalLikes = found ? found.likes : 0;
  });
}

async function fetchGlobalClicks() {
  const { data, error } = await supabase.from('game_votes').select('game_id, clicks');
  if (error) {
    console.error('Error fetching global clicks:', error);
    return;
  }
  games.forEach(game => {
    const found = data.find(row => row.game_id === game.link || row.game_id === game.name);
    game.globalClicks = found ? found.clicks : 0;
  });
}

// Initialize games on page load
window.addEventListener("load", loadGamesFromSupabase);

// Fix: Add event listeners for search and sort
window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const sortDropdown = document.getElementById("sortOptions");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      filterGames();
    });
  }

  if (sortDropdown) {
    sortDropdown.addEventListener("change", () => {
      sortGames();
    });
  }
});
