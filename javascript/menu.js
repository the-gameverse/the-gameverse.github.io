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
      localStorage.setItem('gameDesc', game.description);

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
async function loadMutualFriends() {
  console.log('🚀 Starting loadMutualFriends...');

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.warn('⚠️ Error fetching user:', userError);
  }
  if (!user) {
    console.log('🔒 No user logged in. Showing signup message.');
    document.getElementById('friends-list').innerHTML = `
      <div class="signup-box" style="padding:20px; text-align:center; border: 2px dashed #888; border-radius: 8px; color: white;">
        ✨ Sign up or log in to see what your friends are playing! ✨
      </div>
    `;
    return;
  }
  console.log(`👤 Logged in as user ID: ${user.id}`);

  // Step 1: Get mutual friend IDs
  const { data: followingRows, error: followingError } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', user.id);
  console.log('📥 Following rows fetched:', followingRows);

  const { data: followerRows, error: followerError } = await supabase
    .from('follows')
    .select('follower_id')
    .eq('following_id', user.id);
  console.log('📤 Follower rows fetched:', followerRows);

  if (followingError || followerError) {
    console.error('❌ Error loading follows:', followingError || followerError);
    document.getElementById('friends-list').innerHTML = "<p>Error loading friends.</p>";
    return;
  }

  const followingIds = (followingRows || []).map(row => row.following_id);
  const followerIds = (followerRows || []).map(row => row.follower_id);
  const mutualIds = followingIds.filter(id => followerIds.includes(id));

  console.log('🤝 Mutual friend IDs:', mutualIds);

  if (mutualIds.length === 0) {
    console.log('😶 No mutual friends found.');
    document.getElementById('friends-list').innerHTML = "<p>No mutual friends yet. When you follow someone who follows you back, they'll show up here!</p>";
    return;
  }

  // Step 2: Load profiles
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, last_active, current_game_id, online_status_visibility')
    .in('id', mutualIds);

  console.log('👥 Profiles fetched:', profiles);

  if (profilesError) {
    console.error('❌ Error loading profiles:', profilesError);
    document.getElementById('friends-list').innerHTML = "<p>Error loading profiles.</p>";
    return;
  }

  // Step 3: Sort profiles — active players first
  profiles.sort((a, b) => {
    const aPlaying = !!a.current_game_id;
    const bPlaying = !!b.current_game_id;
    return bPlaying - aPlaying;
  });
  console.log('📊 Profiles sorted with active players first.');

  const list = document.getElementById('friends-list');
  list.innerHTML = "";

  for (const friend of profiles) {
    console.log(`💡 Processing friend: ${friend.username} (${friend.id})`);

    // Check privacy setting
    let canView = false;
    const visibility = friend.online_status_visibility || 'everyone';

    const { data: viewerFollows } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', user.id)
      .eq('following_id', friend.id)
      .maybeSingle();

    const { data: friendFollowsViewer } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', friend.id)
      .eq('following_id', user.id)
      .maybeSingle();

    const isMutual = viewerFollows && friendFollowsViewer;

    if (visibility === 'everyone') canView = true;
    else if (visibility === 'mutual_follow' && isMutual) canView = true;
    else if (visibility === 'no_one') canView = false;

    console.log(`🔒 Privacy check for ${friend.username}: canView = ${canView}`);

    // Online status
    let isOnline = false;
    if (canView && friend.last_active) {
      const lastActive = new Date(friend.last_active.replace(' ', 'T') + 'Z');
      const minutesAgo = (Date.now() - lastActive.getTime()) / 60000;
      isOnline = minutesAgo >= 0 && minutesAgo < 5;
      console.log(`🟢 Online check for ${friend.username}: ${isOnline ? 'Online' : 'Offline'}`);
    }

    // Now playing
    let nowPlaying = null;
    if (canView && friend.current_game_id) {
      const { data: gameData, error: gameError } = await supabase
        .from('games_menu')
        .select('name')
        .eq('id', friend.current_game_id)
        .maybeSingle();

      if (gameError) {
        console.warn(`⚠️ Error fetching game for ${friend.username}:`, gameError);
      }

      if (gameData?.name) {
        nowPlaying = gameData.name;
      }
      console.log(`🎮 Now playing for ${friend.username}: ${nowPlaying || 'Nothing'}`);
    }

    // Render card
    const card = document.createElement('div');
    card.className = 'friend-card';
    card.innerHTML = `
      <img class="friend-avatar" src="${friend.avatar_url || '/uploads/branding/default-avatar.png'}" alt="${friend.username}">
      <div class="friend-info">
        <span class="friend-username">
          ${friend.username}
          ${isOnline ? `<span class="online-dot" style="background-color: purple;" title="Online"></span>` : ''}
        </span>
        ${nowPlaying ? `<span class="friend-nowplaying">Playing: ${nowPlaying}</span>` : ''}
      </div>
    `;
    list.appendChild(card);
    console.log(`✅ Rendered friend card for ${friend.username}`);
  }
  console.log('🎉 Finished loading mutual friends.');
}

window.addEventListener("DOMContentLoaded", loadMutualFriends);
