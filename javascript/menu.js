// Supabase config
const supabaseUrl = 'https://jbekjmsruiadbhaydlbt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY';  // Don't change this line
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let games = [];
let showClickCounts = false;
let currentSortOption = 'favorites';
let typingTimeout;

// CARD TEMPLATE FOR EACH GAME
function getCardHTML(game) {
  return `
<div class="card game-card">
  <div class="card-body">
    <div class="favorite-icon">
      ${game.isFavorited ? '<i class="fa-solid fa-heart-circle-check"></i>' : '<i class="fa-solid fa-heart-circle-plus"></i>'}
    </div>
    <div class="card-content">
      <div class="card-image">
        <img src="${game.image}" alt="${game.name}" />
      </div>
      <div class="card-text-content">
        <h5 class="card-title">${game.name}</h5>
        <p style="display:none;" class="card-text">${game.description || ''}</p>
        <div class="card-stats">
          <div class="stat"><i class="fa fa-clock"></i> ${game.globalClicks || 0} plays</div>
          <div class="stat"><i class="fa fa-thumbs-up"></i> ${game.globalLikes || 0} likes</div>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

async function loadGamesFromSupabase() {
  showSkeletonLoader();
  const { data, error } = await supabase.from('games_menu').select('id, name, url, img_url, description');
  if (error) {
    console.error("Supabase error:", error.message);
    alert('Error loading games from Supabase');
    return;
  }
  games = data.map(row => ({
    id: row.id,
    name: row.name,
    image: row.img_url,
    link: row.url,
    description: row.description,
    clickCount: 0,
    isFavorited: false,
    path: "/play",
    globalLikes: 0,
    globalClicks: 0,
  }));
  await loadFavoritesFromSupabase();

  loadClickCountsFromLocalStorage();
  await fetchGlobalLikes();
  await fetchGlobalClicks();
  displayGamesWithSkeleton();
}

function toggleClickCounts() {
  showClickCounts = !showClickCounts;
  document.getElementById("toggleUsageData").textContent = showClickCounts ? "Hide Usage Data" : "Show Usage Data";
  displayGames();
}

function filterGames() {
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    const search = document.getElementById("search").value;
    showSkeletonLoader();

    setTimeout(() => {
      displayGames(search);
    }, 1000);
  }, 300);
}

async function saveFavoritesToSupabase() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const favs = games.filter(g => g.isFavorited).map(g => g.id);
  const { error } = await supabase
    .from('profiles')
    .update({ favorites: favs })
    .eq('id', user.id);

  if (error) console.error("Error saving favorites:", error.message);
}

async function loadFavoritesFromSupabase() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('favorites')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error("Error loading favorites:", error.message);
    return;
  }

  // Normalize IDs to strings for consistent comparison
  const favIds = (profile?.favorites || []).map(id => String(id));
  games.forEach(g => {
    g.isFavorited = favIds.includes(String(g.id));
  });
}

function saveClickCountsToLocalStorage() {
  const counts = {};
  games.forEach(g => counts[g.name] = g.clickCount);
  localStorage.setItem("clickCounts", JSON.stringify(counts));
}

function loadClickCountsFromLocalStorage() {
  const stored = JSON.parse(localStorage.getItem("clickCounts") || "{}");
  games.forEach(g => g.clickCount = stored[g.name] || 0);
}

function sortGames() {
  const sel = document.getElementById("sortOptions");
  currentSortOption = sel ? sel.value : 'favorites';
  displayGames();
}

function isGameLiked(game) {
  return !!localStorage.getItem(`liked_${game.link}`);
}

function displayGames(filter = "") {
  const menu = document.getElementById("gameMenu");
  const countEl = document.getElementById("gameCount");
  const searchBar = document.getElementById("search");
  menu.innerHTML = "";

  const filtered = games
    .filter(g => g.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      switch (currentSortOption) {
        case "favorites":   return (b.isFavorited === a.isFavorited) ? 0 : b.isFavorited ? 1 : -1;
        case "clickCount":  return b.clickCount - a.clickCount;
        case "alphabetical":return a.name.localeCompare(b.name);
        case "liked":       return isGameLiked(b) - isGameLiked(a);
        case "globalLikes": return (b.globalLikes||0) - (a.globalLikes||0);
        case "trending":    return (b.globalClicks||0) - (a.globalClicks||0);
        default:            return 0;
      }
    });

  filtered.forEach(game => {
    const wrapper = document.createElement("div");
    wrapper.className = "game-container";
    wrapper.innerHTML = getCardHTML(game);

    const favEl = wrapper.querySelector('.favorite-icon');
    favEl.addEventListener('click', async e => {
      e.stopPropagation();

      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        showNotification("Favorites Error", {
          body: "You need to be signed in to use favorites. Create an account or log in <a href='/auth'>here</a>.",
          sound: true,
          duration: 10000,
        });
        return;
      }

      // Toggle favorite
      game.isFavorited = !game.isFavorited;

      // Save to Supabase
      await saveFavoritesToSupabase();

      // Refresh UI
      displayGames(filter);
    });

    wrapper.addEventListener('click', () => {
      game.clickCount++;
      saveClickCountsToLocalStorage();

      localStorage.setItem('gameImage', game.image);
      localStorage.setItem('gameName', game.name);
      localStorage.setItem('gameLink', game.link);

      displayGames(filter);
      window.location.href = game.path;
    });

    menu.appendChild(wrapper);
  });

  if (countEl) countEl.textContent = `${filtered.length} of ${games.length} games loaded.`;
  if (searchBar) searchBar.placeholder = `Search ${games.length} games...`;
}

function showSkeletonLoader() {
  const menu = document.getElementById("gameMenu");
  menu.innerHTML = "";
  for (let i = 0; i < 90; i++) {
    const s = document.createElement("div");
    s.className = "skeleton skeleton-game";
    menu.appendChild(s);
  }
}

async function displayGamesWithSkeleton() {
  const ids = ["search", "sortOptions", "gameCount", "card"];

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  showSkeletonLoader();

  setTimeout(async () => {
    await loadFavoritesFromSupabase();
    displayGames();
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = id === 'card' ? 'block' : 'inline-block';
    });
  }, 500);
}

async function fetchGlobalLikes() {
  const { data } = await supabase.from('game_votes').select('game_id, likes');
  data.forEach(r => {
    const g = games.find(x => x.link === r.game_id || x.name === r.game_id);
    if (g) g.globalLikes = r.likes;
  });
}

async function fetchGlobalClicks() {
  const { data } = await supabase.from('game_votes').select('game_id, clicks');
  data.forEach(r => {
    const g = games.find(x => x.link === r.game_id || x.name === r.game_id);
    if (g) g.globalClicks = r.clicks;
  });
}

window.addEventListener("load", loadGamesFromSupabase);
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search")?.addEventListener("input", filterGames);
  document.getElementById("sortOptions")?.addEventListener("change", sortGames);
});
