// Add games 

const games = [
{ name: "Tiny Fishing", image: "/uploads/covers/tinyfishing.png", link: "https://www.hoodamath.com/mobile/games/hooda-tiny-fishing/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Snow Rider 3D", image: "/uploads/covers/snowrider3d.png", link: "https://www.hoodamath.com/mobile/games/snow-rider-3d/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Guess Word", image: "/uploads/covers/guessword.png", link: "https://www.hoodamath.com/mobile/games/guess-word/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Draw To Smash!", image: "/uploads/covers/drawsmash.png", link: "https://www.hoodamath.com/mobile/games/draw-to-smash/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Slice It All!", image: "/uploads/covers/sliceitall.png", link: "https://www.hoodamath.com/mobile/games/hooda-slice-it/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Rodha", image: "/uploads/covers/rodha.png", link: "https://www.hoodamath.com/mobile/games/rodha/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Swing Monkey", image: "/uploads/covers/swingmonkey.png", link: "https://www.hoodamath.com/mobile/games/swing-monkey/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "8 Ball Pool", image: "/uploads/covers/8ballpool.png", link: "https://www.hoodamath.com/mobile/games/8-ball-pool/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Wheelie Bike", image: "/uploads/covers/wheeliebike.png", link: "https://www.hoodamath.com/mobile/games/wheelie-bike/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Drift Hunters", image: "/uploads/covers/drifthunters.png", link: "https://www.hoodamath.com/mobile/games/drift-hunters/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Taxi Driver 3D", image: "/uploads/covers/taxidriver3d.png", link: "https://www.hoodamath.com/mobile/games/taxi-driver-3d/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life", image: "/uploads/covers/ducklife.png", link: "https://www.hoodamath.com/mobile/games/duck-life/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 2", image: "/uploads/covers/ducklife2.png", link: "https://www.hoodamath.com/mobile/games/duck-life-2-world-champion/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 3", image: "/uploads/covers/ducklife3.png", link: "https://www.hoodamath.com/mobile/games/duck-life-3-evolution/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 4", image: "/uploads/covers/ducklife4.png", link: "https://www.hoodamath.com/mobile/games/duck-life-4/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 6", image: "/uploads/covers/ducklife6.png", link: "https://www.hoodamath.com/mobile/games/duck-life-6-space/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "OvO", image: "/uploads/covers/ovo.png", link: "https://www.hoodamath.com/mobile/games/ovo/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Low's Adventure 3", image: "/uploads/covers/lowsadventure3.png", link: "https://www.hoodamath.com/mobile/games/lows-adventures-3/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Draw The Rest", image: "/uploads/covers/drawtherest.png", link: "https://www.hoodamath.com/mobile/games/draw-the-rest/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Opposite Day", image: "/uploads/covers/oppositeday.png", link: "https://www.hoodamath.com/mobile/games/opposite-day/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Resizer", image: "/uploads/covers/resizer.png", link: "https://www.hoodamath.com/mobile/games/resizer/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Level Devil", image: "/uploads/covers/leveldevil.png", link: "https://www.hoodamath.com/mobile/games/level-devil-trap-path/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Melody's Adventure", image: "/uploads/covers/melodysadventure.png", link: "https://www.hoodamath.com/mobile/games/melodys-adventure/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Whopper Clicker", image: "/uploads/covers/whopperclicker.png", link: "https://www.hoodamath.com/mobile/games/whopper-clicker/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Duck Clicker", image: "/uploads/covers/duckduckclicker.png", link: "https://www.hoodamath.com/mobile/games/duck-duck-clicker/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Duck Clicker 3D", image: "/uploads/covers/duckduckclicker3d.png", link: "https://www.hoodamath.com/mobile/games/duck-duck-clicker-3d/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Spacebar Clicker", image: "/uploads/covers/spacebarclicker.png", link: "https://www.hoodamath.com/mobile/games/spacebar-clicker/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Stack", image: "/uploads/covers/stack.png", link: "https://www.hoodamath.com/mobile/games/stack-game/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Capybara Clicker", image: "/uploads/covers/capybaraclicker.png", link: "https://www.hoodamath.com/mobile/games/capybara-clicker/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Candy Clicker", image: "/uploads/covers/candyclicker.png", link: "https://www.hoodamath.com/mobile/games/candy-clicker/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Candy Clicker 2", image: "/uploads/covers/candyclicker2.png", link: "https://www.hoodamath.com/mobile/games/candy-clicker-2/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "2048", image: "/uploads/covers/2048.png", link: "https://www.hoodamath.com/mobile/games/2048-game/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Block Blast!", image: "/uploads/covers/blockblast.png", link: "https://www.hoodamath.com/mobile/games/block-blast/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Find Me", image: "/uploads/covers/findme.png", link: "https://www.hoodamath.com/mobile/games/find-me/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Suika Game", image: "/uploads/covers/suika.png", link: "https://www.hoodamath.com/mobile/games/watermelon-game/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Thorn And Balloons", image: "/uploads/covers/thornandballoons.png", link: "https://www.hoodamath.com/mobile/games/thorn-and-balloons/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Icy Purple Head", image: "/uploads/covers/icypurplehead.png", link: "https://www.hoodamath.com/mobile/games/icy-purple-head-super-slide/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Icy Purple Head 2", image: "/uploads/covers/icypurplehead2.png", link: "https://www.hoodamath.com/mobile/games/icy-purple-head-2/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Icy Purple Head 3", image: "/uploads/covers/icypurplehead3.png", link: "https://www.hoodamath.com/mobile/games/icy-purple-head-3/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Are You Human?", image: "/uploads/covers/areyouhuman.png", link: "https://www.hoodamath.com/mobile/games/are-you-human/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Move The Pin", image: "/uploads/covers/movethepin.png", link: "https://www.hoodamath.com/mobile/games/move-the-pin/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Growmi", image: "/uploads/covers/growmi.png", link: "https://www.hoodamath.com/mobile/games/growmi/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Idle Breakout", image: "/uploads/covers/idlebreakout.png", link: "https://www.hoodamath.com/mobile/games/idle-breakout/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Rolly Vortex", image: "/uploads/covers/rollyvortex.png", link: "https://www.hoodamath.com/mobile/games/rolly-vortex/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Shortcut Race", image: "/uploads/covers/shortcutrace.png", link: "https://www.hoodamath.com/mobile/games/shortcut-race/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Slope", image: "/uploads/covers/slope.png", link: "https://www.hoodamath.com/mobile/games/rolling-ball-3d/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Electron Dash", image: "/uploads/covers/electrondash.png", link: "https://www.hoodamath.com/mobile/games/electron-dash/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Freehead Skate", image: "/uploads/covers/freeheadskate.png", link: "https://www.hoodamath.com/mobile/games/freehead-skate/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Burger Time", image: "/uploads/covers/burgertime.png", link: "https://www.hoodamath.com/mobile/games/burger-time/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Glitch", image: "/uploads/covers/glitch.png", link: "https://www.hoodamath.com/mobile/games/glitch/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Tunnel Rush", image: "/uploads/covers/tunnelrush.png", link: "https://www.hoodamath.com/mobile/games/tunnel-rush/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Flappy Bird", image: "/uploads/covers/flappybird.png", link: "https://www.hoodamath.com/mobile/games/flappy-bird/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Line Rider", image: "/uploads/covers/linerider.png", link: "https://linerider.com", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Basket Goal", image: "/uploads/covers/basketgoal.png", link: "https://www.hoodamath.com/mobile/games/basket-goal/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Touchdown Rush", image: "/uploads/covers/touchdownrush.png", link: "https://www.hoodamath.com/mobile/games/touchdown-rush/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Mini Golf", image: "/uploads/covers/minigolf.png", link: "https://www.hoodamath.com/mobile/games/mini-golf/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Solitaire", image: "/uploads/covers/solitaire.png", link: "https://www.hoodamath.com/mobile/games/freecell-solitaire/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Checkers", image: "/uploads/covers/checkers.png", link: "https://www.hoodamath.com/mobile/games/checkers/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Orange", image: "/uploads/covers/orange.png", link: "https://www.hoodamath.com/mobile/games/orange/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Head Soccer 2022", image: "/uploads/covers/headsoccer2022.png", link: "https://www.hoodamath.com/mobile/games/head-soccer-2022/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Fall Beans", image: "/uploads/covers/fallbeans.png", link: "https://www.hoodamath.com/mobile/games/fall-beans/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Ball Blast", image: "/uploads/covers/ballblast.png", link: "https://scratch.mit.edu/projects/472077983/embed", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Cookie Clicker", image: "/uploads/covers/cookieclicker.png", link: "https://www.hoodamath.com/mobile/games/cookie-clicker/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Falling Cubes", image: "/uploads/covers/fallingcubes.png", link: "https://www.hoodamath.com/mobile/games/falling-cubes/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Fancy Diver", image: "/uploads/covers/fancydiver.png", link: "https://www.hoodamath.com/mobile/games/fancy-diver/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Jelly Slice", image: "/uploads/covers/jellyslice.png", link: "https://www.hoodamath.com/mobile/games/jelly-slice/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Geometry Dash", image: "/uploads/covers/geometrydash.png", link: "https://www.hoodamath.com/mobile/games/geometry-dash/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Geometry Dash Subzero", image: "/uploads/covers/geometrydashsubzero.png", link: "https://www.hoodamath.com/mobile/games/geometry-dash-subzero/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Geometry Dash Meltdown", image: "/uploads/covers/geometrydashmeltdown.png", link: "https://www.hoodamath.com/mobile/games/geometry-dash-meltdown/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Planet Clicker", image: "/uploads/covers/planetclicker.png", link: "https://www.hoodamath.com/mobile/games/planet-clicker/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Retro Bowl", image: "/uploads/covers/retrobowl.png", link: "https://agamyacapital.com/uploads/5/5/6/7/5567194/custom_themes/230188292910318641/files/rb1.html", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Infinite Craft", image: "/uploads/covers/infinitecraft.png", link: "https://www.hoodamath.com/mobile/games/infinite-craft/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Piano Tiles", image: "/uploads/covers/pianotiles.png", link: "https://www.hoodamath.com/mobile/games/piano-tiles/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Helix Jump", image: "/uploads/covers/helixjump.png", link: "https://www.hoodamath.com/mobile/games/helix-jump/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Formula Rush", image: "/uploads/covers/formularush.png", link: "https://www.hoodamath.com/mobile/games/formula-rush/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Draw The Hill", image: "/uploads/covers/drawthehill.png", link: "https://www.hoodamath.com/mobile/games/draw-the-hill/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Dino Game", image: "/uploads/covers/dinogame.png", link: "https://www.hoodamath.com/mobile/games/dino-game/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Bike Hero", image: "/uploads/covers/bikehero.png", link: "https://www.hoodamath.com/mobile/games/bike-hero/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Retro Ping Pong", image: "/uploads/covers/retropingpong.png", link: "https://www.hoodamath.com/mobile/games/retro-ping-pong/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Dominoes", image: "/uploads/covers/dominoes.png", link: "https://www.hoodamath.com/mobile/games/dominoes/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Unscrew It", image: "/uploads/covers/unscrewit.png", link: "https://www.hoodamath.com/mobile/games/unscrew-it/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "House Painter", image: "/uploads/covers/housepainter.png", link: "https://www.hoodamath.com/mobile/games/house-painter/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Liquid Sort", image: "/uploads/covers/liquidsort.png", link: "https://www.hoodamath.com/mobile/games/liquid-sort/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Dark Room", image: "/uploads/covers/darkroom.png", link: "https://www.hoodamath.com/mobile/games/dark-room/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Coreball", image: "/uploads/covers/coreball.png", link: "https://www.hoodamath.com/mobile/games/coreball/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Drift Boss", image: "/uploads/covers/driftboss.png", link: "https://www.hoodamath.com/mobile/games/drift-boss/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Sky Speedster", image: "/uploads/covers/skyspeedster.png", link: "https://www.hoodamath.com/mobile/games/sky-speedster/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Car Rush", image: "/uploads/covers/carrush.png", link: "https://www.hoodamath.com/mobile/games/car-rush/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Climbable Arrow", image: "/uploads/covers/climbablearrow.png", link: "https://www.hoodamath.com/mobile/games/climbable-arrow/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false }

];


// Variable to toggle click count visibility
let showClickCounts = false;
let currentSortOption = 'favorites';  // Default sort option

// Toggle click counts visibility
function toggleClickCounts() {
      console.log("Toggle Click Counts triggered"); // Debugging line
  showClickCounts = !showClickCounts;
  const button = document.getElementById("toggleUsageData");
  button.textContent = showClickCounts ? "Hide Usage Data" : "Show Usage Data";
  displayGames(); // Re-render the games
}
function saveClickCountsToLocalStorage(gameLink) {
  // Save the game's link to sessionStorage
  console.log("Game link saved:", gameLink); // Debugging line
}


// Filter games based on search input
function filterGames() {
  const search = document.getElementById("search").value;
  displayGames(search);
}

// Save favorites to localStorage
function saveFavoritesToLocalStorage() {
  const favorites = games.reduce((acc, game) => {
    acc[game.name] = game.isFavorited;
    return acc;
  }, {});
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Load favorites from localStorage
function loadFavoritesFromLocalStorage() {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
  if (storedFavorites) {
    games.forEach(game => {
      if (storedFavorites[game.name] !== undefined) {
        game.isFavorited = storedFavorites[game.name];
      }
    });
  } else {
    // Set all games to non-favorited if no favorites are found in localStorage
    games.forEach(game => {
      game.isFavorited = false;
    });
  }
}

// Save click counts to localStorage
function saveClickCountsToLocalStorage() {
  const clickCounts = games.reduce((acc, game) => {
    acc[game.name] = game.clickCount;
    return acc;
  }, {});
  localStorage.setItem("clickCounts", JSON.stringify(clickCounts));
}

// Load click counts from localStorage
function loadClickCountsFromLocalStorage() {
  const storedClickCounts = JSON.parse(localStorage.getItem("clickCounts"));
  if (storedClickCounts) {
    games.forEach(game => {
      if (storedClickCounts[game.name] !== undefined) {
        game.clickCount = storedClickCounts[game.name];
      }
    });
  }
}

// Load favorites and click counts initially
loadFavoritesFromLocalStorage();
loadClickCountsFromLocalStorage();

// Handle sorting
function sortGames() {
  const sortDropdown = document.getElementById("sortOptions");
  if (!sortDropdown) return; // Check if sortDropdown exists
  
  currentSortOption = sortDropdown.value;
  console.log(`Sorting by: ${currentSortOption}`);
  displayGames(); // Re-render games with new sort option
}

// Function to display the games
function displayGames(filter = "") {
  const gameMenu = document.getElementById("gameMenu");
  const gameCount = document.getElementById("gameCount");
  gameMenu.innerHTML = ""; // Clear the menu

  // Sort games based on current sort option
  const filteredGames = games
    .filter(game => game.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (currentSortOption === "favorites") {
        if (a.isFavorited !== b.isFavorited) {
          return b.isFavorited - a.isFavorited; // Favorited games first
        }
      } else if (currentSortOption === "clickCount") {
        return b.clickCount - a.clickCount; // Sort by click count
      } else if (currentSortOption === "alphabetical") {
        return a.name.localeCompare(b.name); // Alphabetical sorting
      }
      return 0;
    });

  filteredGames.forEach(game => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    // Create the favorite icon (star)
    const favoriteIcon = document.createElement("div");
    favoriteIcon.classList.add("favorite-icon");
    favoriteIcon.innerHTML = game.isFavorited ? "★" : "☆"; // Filled or empty star
    favoriteIcon.title = game.isFavorited ? "Unfavorite" : "Favorite";
    favoriteIcon.style.cursor = "pointer";
    favoriteIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering other click events
      game.isFavorited = !game.isFavorited;
      saveFavoritesToLocalStorage(); // Save favorites after toggling
      displayGames(filter); // Re-render the games
    });

    // Create the click count display
    const clickCountElement = document.createElement("div");
    clickCountElement.classList.add("click-count");
    if (showClickCounts) {
      clickCountElement.textContent = `Your Clicks: ${game.clickCount}`;
      clickCountElement.style.display = "block";
    } else {
      clickCountElement.style.display = "none";
    }

    // Create the game link and image
    const gameLink = document.createElement("a");
    gameLink.href = game.path;
    const gameImage = document.createElement("img");
    gameImage.src = game.image;
    gameLink.appendChild(gameImage);

    // Apply blur effect and remove it after 4 seconds
    setTimeout(() => {
      gameImage.classList.add("loaded");
    }, 2000);

    // Create the game name
    const gameName = document.createElement("div");
    gameName.classList.add("game-name");
    gameName.textContent = game.name;
    gameLink.appendChild(gameName);

    // Add all elements to the gameDiv
    gameDiv.appendChild(favoriteIcon);
    gameDiv.appendChild(gameLink);
    gameDiv.appendChild(clickCountElement);

    // Increment click count and save game link and name when the gameDiv is clicked
    gameDiv.addEventListener("click", () => {
      game.clickCount++;
      localStorage.setItem('gameLink', game.link); // Save game link to localStorage
      localStorage.setItem('gameName', game.name); // Save game name to localStorage
      saveClickCountsToLocalStorage(); // Save updated click count
      displayGames(filter); // Re-render the games
    });

    // Append the gameDiv to the gameMenu
    gameMenu.appendChild(gameDiv);
  });

  // Update the game count text
  gameCount.textContent = `Games Loaded: ${filteredGames.length}`;
}

// Function to get random games
function getRandomGames(num) {
  const shuffled = games.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

// Function to display random games
function displayRandomGames() {
  const randomGames = getRandomGames(8); // Change the number to the desired count of random games
  const randomGameContainer = document.getElementById('randomGameContainer');
  randomGameContainer.innerHTML = ''; // Clear previous content

  randomGames.forEach(game => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    // Create the favorite icon (star)
    const favoriteIcon = document.createElement("div");
    favoriteIcon.classList.add("favorite-icon");
    favoriteIcon.innerHTML = game.isFavorited ? "★" : "☆"; // Filled or empty star
    favoriteIcon.title = game.isFavorited ? "Unfavorite" : "Favorite";
    favoriteIcon.style.cursor = "pointer";
    favoriteIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering other click events
      game.isFavorited = !game.isFavorited;
      saveFavoritesToLocalStorage(); // Save favorites after toggling
      displayRandomGames(); // Re-render the games
    });

    // Create the click count display
    const clickCountElement = document.createElement("div");
    clickCountElement.classList.add("click-count");
    clickCountElement.textContent = `Your Clicks: ${game.clickCount}`;

    // Create the game link and image
    const gameLink = document.createElement("a");
    gameLink.href = game.path;
    const gameImage = document.createElement("img");
    gameImage.src = game.image;
    gameLink.appendChild(gameImage);

    // Apply blur effect and remove it after 4 seconds
    setTimeout(() => {
      gameImage.classList.add("loaded");
    }, 2000);

    // Create the game name
    const gameName = document.createElement("div");
    gameName.classList.add("game-name");
    gameName.textContent = game.name;
    gameLink.appendChild(gameName);

    // Add all elements to the gameDiv
    gameDiv.appendChild(favoriteIcon);
    gameDiv.appendChild(gameLink);
    gameDiv.appendChild(clickCountElement);

    // Append the gameDiv to the randomGameContainer
    randomGameContainer.appendChild(gameDiv);
  });
}

// Call the function to display random games on load
window.addEventListener('load', displayRandomGames);

// Call the function to display random games on load
window.addEventListener('load', displayRandomGames);

// Initial display of games
displayGames();
