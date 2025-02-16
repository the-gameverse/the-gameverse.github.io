/**
 * Global constant for the image loading time (in milliseconds).
 * Adjust this value to change how long the blur effect lasts.
 * @constant {number}
 */
const LOADING_TIME = 2000;

/**
 * Array of game objects. Each object includes:
 * - name: The name of the game.
 * - image: The URL to the game's cover image.
 * - link: The URL to the game.
 * - clickCount: Number of times the game was clicked.
 * - isFavorited: Boolean indicating if the game is favorited.
 * @type {Array<Object>}
 */
const games = [
  { name: "Tiny Fishing", image: "/uploads/covers/tinyfishing.png", link: "/storage/games/tinyfishing", clickCount: 0, isFavorited: false },
  { name: "Snow Rider 3D", image: "/uploads/covers/snowrider3d.png", link: "/storage/games/snowrider3d", clickCount: 0, isFavorited: false },
  { name: "Guess Word", image: "/uploads/covers/guessword.png", link: "/storage/games/guessword", clickCount: 0, isFavorited: false },
  { name: "Draw To Smash!", image: "/uploads/covers/drawsmash.png", link: "/storage/games/drawsmash", clickCount: 0, isFavorited: false },
  { name: "Slice It All!", image: "/uploads/covers/sliceitall.png", link: "/storage/games/sliceitall", clickCount: 0, isFavorited: false },
  { name: "Rodha", image: "/uploads/covers/rodha.png", link: "/storage/games/rodha", clickCount: 0, isFavorited: false },
  { name: "Swing Monkey", image: "/uploads/covers/swingmonkey.png", link: "/storage/games/swingmonkey", clickCount: 0, isFavorited: false },
  { name: "8 Ball Pool", image: "/uploads/covers/8ballpool.png", link: "/storage/games/8ballpool", clickCount: 0, isFavorited: false },
  { name: "Wheelie Bike", image: "/uploads/covers/wheeliebike.png", link: "/storage/games/wheeliebike", clickCount: 0, isFavorited: false },
  { name: "Drift Hunters", image: "/uploads/covers/drifthunters.png", link: "/storage/games/drifthunters", clickCount: 0, isFavorited: false },
  { name: "Taxi Driver 3D", image: "/uploads/covers/taxidriver3d.png", link: "/storage/games/taxidriver3d", clickCount: 0, isFavorited: false },
  { name: "Duck Life", image: "/uploads/covers/ducklife.png", link: "/storage/games/ducklife", clickCount: 0, isFavorited: false },
  { name: "Duck Life 2", image: "/uploads/covers/ducklife2.png", link: "/storage/games/ducklife2", clickCount: 0, isFavorited: false },
  { name: "Duck Life 3", image: "/uploads/covers/ducklife3.png", link: "/storage/games/ducklife3", clickCount: 0, isFavorited: false },
  { name: "Duck Life 4", image: "/uploads/covers/ducklife4.png", link: "/storage/games/ducklife4", clickCount: 0, isFavorited: false },
  { name: "Duck Life 6", image: "/uploads/covers/ducklife6.png", link: "/storage/games/ducklife6", clickCount: 0, isFavorited: false },
  { name: "OvO", image: "/uploads/covers/ovo.png", link: "/storage/games/ovo", clickCount: 0, isFavorited: false },
  { name: "Low's Adventure 3", image: "/uploads/covers/lowsadventure3.png", link: "/storage/games/lowsadventure3", clickCount: 0, isFavorited: false },
  { name: "Draw The Rest", image: "/uploads/covers/drawtherest.png", link: "/storage/games/drawtherest", clickCount: 0, isFavorited: false },
  { name: "Opposite Day", image: "/uploads/covers/oppositeday.png", link: "/storage/games/oppositeday", clickCount: 0, isFavorited: false },
  { name: "Resizer", image: "/uploads/covers/resizer.png", link: "/storage/games/resizer", clickCount: 0, isFavorited: false },
  { name: "Level Devil", image: "/uploads/covers/leveldevil.png", link: "/storage/games/leveldevil", clickCount: 0, isFavorited: false },
  { name: "Melody's Adventure", image: "/uploads/covers/melodysadventure.png", link: "/storage/games/melodysadventure", clickCount: 0, isFavorited: false },
  { name: "Whopper Clicker", image: "/uploads/covers/whopperclicker.png", link: "/storage/games/whopperclicker", clickCount: 0, isFavorited: false },
  { name: "Duck Duck Clicker", image: "/uploads/covers/duckduckclicker.png", link: "/storage/games/duckduckclicker", clickCount: 0, isFavorited: false },
  { name: "Duck Duck Clicker 3D", image: "/uploads/covers/duckduckclicker3d.png", link: "/storage/games/duckduckclicker3d", clickCount: 0, isFavorited: false },
  { name: "Spacebar Clicker", image: "/uploads/covers/spacebarclicker.png", link: "/storage/games/spacebarclicker", clickCount: 0, isFavorited: false },
  { name: "Stack", image: "/uploads/covers/stack.png", link: "/storage/games/stack", clickCount: 0, isFavorited: false },
  { name: "Capybara Clicker", image: "/uploads/covers/capybaraclicker.png", link: "/storage/games/capybaraclicker", clickCount: 0, isFavorited: false },
  { name: "Candy Clicker", image: "/uploads/covers/candyclicker.png", link: "/storage/games/candyclicker", clickCount: 0, isFavorited: false },
  { name: "Candy Clicker 2", image: "/uploads/covers/candyclicker2.png", link: "/storage/games/candyclicker2", clickCount: 0, isFavorited: false },
  { name: "2048", image: "/uploads/covers/2048.png", link: "/storage/games/2048", clickCount: 0, isFavorited: false },
  { name: "Block Blast!", image: "/uploads/covers/blockblast.png", link: "/storage/games/blockblast", clickCount: 0, isFavorited: false },
  { name: "Find Me", image: "/uploads/covers/findme.png", link: "/storage/games/findme", clickCount: 0, isFavorited: false },
  { name: "Suika Game", image: "/uploads/covers/suika.png", link: "/storage/games/suika", clickCount: 0, isFavorited: false },
  { name: "Thorn And Balloons", image: "/uploads/covers/thornandballoons.png", link: "/storage/games/thornandballoons", clickCount: 0, isFavorited: false },
  { name: "Icy Purple Head", image: "/uploads/covers/icypurplehead.png", link: "/storage/games/icypurplehead", clickCount: 0, isFavorited: false },
  { name: "Icy Purple Head 2", image: "/uploads/covers/icypurplehead2.png", link: "/storage/games/icypurplehead2", clickCount: 0, isFavorited: false },
  { name: "Icy Purple Head 3", image: "/uploads/covers/icypurplehead3.png", link: "/storage/games/icypurplehead3", clickCount: 0, isFavorited: false },
  { name: "Are You Human?", image: "/uploads/covers/areyouhuman.png", link: "/storage/games/areyouhuman", clickCount: 0, isFavorited: false },
  { name: "Move The Pin", image: "/uploads/covers/movethepin.png", link: "/storage/games/movethepin", clickCount: 0, isFavorited: false },
  { name: "Growmi", image: "/uploads/covers/growmi.png", link: "/storage/games/growmi", clickCount: 0, isFavorited: false },
  { name: "Idle Breakout", image: "/uploads/covers/idlebreakout.png", link: "/storage/games/idlebreakout", clickCount: 0, isFavorited: false },
  { name: "Rolly Vortex", image: "/uploads/covers/rollyvortex.png", link: "/storage/games/rollyvortex", clickCount: 0, isFavorited: false },
  { name: "Shortcut Race", image: "/uploads/covers/shortcutrace.png", link: "/storage/games/shortcutrace", clickCount: 0, isFavorited: false },
  { name: "Slope", image: "/uploads/covers/slope.png", link: "/storage/games/slope", clickCount: 0, isFavorited: false },
  { name: "Electron Dash", image: "/uploads/covers/electrondash.png", link: "/storage/games/electrondash", clickCount: 0, isFavorited: false },
  { name: "Freehead Skate", image: "/uploads/covers/freeheadskate.png", link: "/storage/games/freeheadskate", clickCount: 0, isFavorited: false },
  { name: "Burger Time", image: "/uploads/covers/burgertime.png", link: "/storage/games/burgertime", clickCount: 0, isFavorited: false },
  { name: "Glitch", image: "/uploads/covers/glitch.png", link: "/storage/games/glitch", clickCount: 0, isFavorited: false },
  { name: "Tunnel Rush", image: "/uploads/covers/tunnelrush.png", link: "/storage/games/tunnelrush", clickCount: 0, isFavorited: false },
  { name: "Flappy Bird", image: "/uploads/covers/flappybird.png", link: "/storage/games/flappybird", clickCount: 0, isFavorited: false },
  { name: "Line Rider", image: "/uploads/covers/linerider.png", link: "/storage/games/linerider", clickCount: 0, isFavorited: false },
  { name: "Basket Goal", image: "/uploads/covers/basketgoal.png", link: "/storage/games/basketgoal", clickCount: 0, isFavorited: false },
  { name: "Touchdown Rush", image: "/uploads/covers/touchdownrush.png", link: "/storage/games/touchdownrush", clickCount: 0, isFavorited: false },
  { name: "Mini Golf", image: "/uploads/covers/minigolf.png", link: "/storage/games/minigolf", clickCount: 0, isFavorited: false },
  { name: "Solitaire", image: "/uploads/covers/solitaire.png", link: "/storage/games/solitaire", clickCount: 0, isFavorited: false },
  { name: "Checkers", image: "/uploads/covers/checkers.png", link: "/storage/games/checkers", clickCount: 0, isFavorited: false },
  { name: "Orange", image: "/uploads/covers/orange.png", link: "/storage/games/orange", clickCount: 0, isFavorited: false },
  { name: "Head Soccer 2022", image: "/uploads/covers/headsoccer2022.png", link: "/storage/games/headsoccer2022", clickCount: 0, isFavorited: false },
  { name: "Fall Beans", image: "/uploads/covers/fallbeans.png", link: "/storage/games/fallbeans", clickCount: 0, isFavorited: false },
  { name: "Ball Blast", image: "/uploads/covers/ballblast.png", link: "/storage/games/ballblast", clickCount: 0, isFavorited: false },
  { name: "Cookie Clicker", image: "/uploads/covers/cookieclicker.png", link: "/storage/games/cookieclicker", clickCount: 0, isFavorited: false },
  { name: "Falling Cubes", image: "/uploads/covers/fallingcubes.png", link: "/storage/games/fallingcubes", clickCount: 0, isFavorited: false },
  { name: "Fancy Diver", image: "/uploads/covers/fancydiver.png", link: "/storage/games/fancydiver", clickCount: 0, isFavorited: false },
  { name: "Jelly Slice", image: "/uploads/covers/jellyslice.png", link: "/storage/games/jellyslice", clickCount: 0, isFavorited: false },
  { name: "Geometry Dash", image: "/uploads/covers/geometrydash.png", link: "/storage/games/geometrydash", clickCount: 0, isFavorited: false },
  { name: "Geometry Dash Subzero", image: "/uploads/covers/geometrydashsubzero.png", link: "/storage/games/geometrydashsubzero", clickCount: 0, isFavorited: false },
  { name: "Geometry Dash Meltdown", image: "/uploads/covers/geometrydashmeltdown.png", link: "/storage/games/geometrydashmeltdown", clickCount: 0, isFavorited: false },
  { name: "Planet Clicker", image: "/uploads/covers/planetclicker.png", link: "/storage/games/planetclicker", clickCount: 0, isFavorited: false },
  { name: "Retro Bowl", image: "/uploads/covers/retrobowl.png", link: "/storage/games/retrobowl", clickCount: 0, isFavorited: false },
  { name: "Infinite Craft", image: "/uploads/covers/infinitecraft.png", link: "/storage/games/infinitecraft", clickCount: 0, isFavorited: false },
  { name: "Piano Tiles", image: "/uploads/covers/pianotiles.png", link: "/storage/games/pianotiles", clickCount: 0, isFavorited: false },
  { name: "Helix Jump", image: "/uploads/covers/helixjump.png", link: "/storage/games/helixjump", clickCount: 0, isFavorited: false },
  { name: "Formula Rush", image: "/uploads/covers/formularush.png", link: "/storage/games/formularush", clickCount: 0, isFavorited: false },
  { name: "Draw The Hill", image: "/uploads/covers/drawthehill.png", link: "/storage/games/drawthehill", clickCount: 0, isFavorited: false },
  { name: "Dino Game", image: "/uploads/covers/dinogame.png", link: "/storage/games/dinogame", clickCount: 0, isFavorited: false },
  { name: "Bike Hero", image: "/uploads/covers/bikehero.png", link: "/storage/games/bikehero", clickCount: 0, isFavorited: false },
  { name: "Retro Ping Pong", image: "/uploads/covers/retropingpong.png", link: "/storage/games/retropingpong", clickCount: 0, isFavorited: false },
  { name: "Dominoes", image: "/uploads/covers/dominoes.png", link: "/storage/games/dominoes", clickCount: 0, isFavorited: false },
  { name: "Unscrew It", image: "/uploads/covers/unscrewit.png", link: "/storage/games/unscrewit", clickCount: 0, isFavorited: false },
  { name: "House Painter", image: "/uploads/covers/housepainter.png", link: "/storage/games/housepainter", clickCount: 0, isFavorited: false },
  { name: "Liquid Sort", image: "/uploads/covers/liquidsort.png", link: "/storage/games/liquidsort", clickCount: 0, isFavorited: false },
  { name: "Dark Room", image: "/uploads/covers/darkroom.png", link: "/storage/games/darkroom", clickCount: 0, isFavorited: false },
  { name: "Coreball", image: "/uploads/covers/coreball.png", link: "/storage/games/coreball", clickCount: 0, isFavorited: false },
  { name: "Drift Boss", image: "/uploads/covers/driftboss.png", link: "/storage/games/driftboss", clickCount: 0, isFavorited: false },
  { name: "Sky Speedster", image: "/uploads/covers/skyspeedster.png", link: "/storage/games/skyspeedster", clickCount: 0, isFavorited: false },
  { name: "Car Rush", image: "/uploads/covers/carrush.png", link: "/storage/games/carrush", clickCount: 0, isFavorited: false },
  { name: "Climbable Arrow", image: "/uploads/covers/climbablearrow.png", link: "/storage/games/climbablearrow", clickCount: 0, isFavorited: false }
];

/**
 * Flag indicating whether to display the click counts.
 * @type {boolean}
 */
let showClickCounts = false;

/**
 * Current sorting option.
 * Options: 'favorites', 'clickCount', or 'alphabetical'.
 * @type {string}
 */
let currentSortOption = 'favorites';

/**
 * Toggles the visibility of the click count data.
 * Also updates the button text and re-renders the game menu.
 */
function toggleClickCounts() {
  console.log("Toggle Click Counts triggered");
  showClickCounts = !showClickCounts;
  const button = document.getElementById("toggleUsageData");
  button.textContent = showClickCounts ? "Hide Usage Data" : "Show Usage Data";
  displayGames();
}

/**
 * Reads the search input and re-renders the game menu based on the filter.
 */
function filterGames() {
  const search = document.getElementById("search").value;
  displayGames(search);
}

/**
 * Saves the favorite status for each game to localStorage.
 */
function saveFavoritesToLocalStorage() {
  const favorites = games.reduce((acc, game) => {
    acc[game.name] = game.isFavorited;
    return acc;
  }, {});
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

/**
 * Loads favorite statuses from localStorage and updates the games array.
 * If no favorites are stored, all games are set as not favorited.
 */
function loadFavoritesFromLocalStorage() {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
  if (storedFavorites) {
    games.forEach(game => {
      if (storedFavorites[game.name] !== undefined) {
        game.isFavorited = storedFavorites[game.name];
      }
    });
  } else {
    games.forEach(game => {
      game.isFavorited = false;
    });
  }
}

/**
 * Saves the click count for each game to localStorage.
 */
function saveClickCountsToLocalStorage() {
  const clickCounts = games.reduce((acc, game) => {
    acc[game.name] = game.clickCount;
    return acc;
  }, {});
  localStorage.setItem("clickCounts", JSON.stringify(clickCounts));
}

/**
 * Loads click counts from localStorage and updates the games array.
 */
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

// Load favorites and click counts on initialization.
loadFavoritesFromLocalStorage();
loadClickCountsFromLocalStorage();

/**
 * Reads the selected sorting option and re-renders the game menu accordingly.
 */
function sortGames() {
  const sortDropdown = document.getElementById("sortOptions");
  if (!sortDropdown) return;
  currentSortOption = sortDropdown.value;
  console.log(`Sorting by: ${currentSortOption}`);
  displayGames();
}

/**
 * Renders the game menu.
 * @param {string} [filter=""] - Optional search filter string.
 */
function displayGames(filter = "") {
  const gameMenu = document.getElementById("gameMenu");
  const gameCount = document.getElementById("gameCount");
  gameMenu.innerHTML = ""; // Clear the current menu

  // Filter and sort the games based on current settings.
  const filteredGames = games
    .filter(game => game.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (currentSortOption === "favorites") {
        if (a.isFavorited !== b.isFavorited) {
          return b.isFavorited - a.isFavorited;
        }
      } else if (currentSortOption === "clickCount") {
        return b.clickCount - a.clickCount;
      } else if (currentSortOption === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  // Loop through each filtered game and create its DOM elements.
  filteredGames.forEach(game => {
    // Create container for the game.
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    // Favorite icon (star).
    const favoriteIcon = document.createElement("div");
    favoriteIcon.classList.add("favorite-icon");
    favoriteIcon.innerHTML = game.isFavorited ? "★" : "☆";
    favoriteIcon.title = game.isFavorited ? "Unfavorite" : "Favorite";
    favoriteIcon.style.cursor = "pointer";
    favoriteIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      game.isFavorited = !game.isFavorited;
      saveFavoritesToLocalStorage();
      displayGames(filter);
    });

    // Click count element.
    const clickCountElement = document.createElement("div");
    clickCountElement.classList.add("click-count");
    if (showClickCounts) {
      console.log("Click count shown:", game.clickCount);
      clickCountElement.textContent = `Your Clicks: ${game.clickCount}`;
      clickCountElement.style.display = "block";
    } else {
      clickCountElement.style.display = "none";
    }

    // Game link and image.
    const gameLink = document.createElement("a");
    gameLink.href = game.link;
    const gameImage = document.createElement("img");
    gameImage.src = game.image;

    // Apply the loading blur effect and remove it after LOADING_TIME.
    gameImage.classList.add("loading-image");
    setTimeout(() => {
      gameImage.classList.remove("loading-image");
    }, LOADING_TIME);

    gameLink.appendChild(gameImage);

    // Game name element.
    const gameName = document.createElement("div");
    gameName.classList.add("game-name");
    gameName.textContent = game.name;
    gameLink.appendChild(gameName);

    // Append the favorite icon, game link, and click count to the container.
    gameDiv.appendChild(favoriteIcon);
    gameDiv.appendChild(gameLink);
    gameDiv.appendChild(clickCountElement);

    // Increment click count when the game container is clicked.
    gameDiv.addEventListener("click", () => {
      game.clickCount++;
      saveClickCountsToLocalStorage();
      displayGames(filter);
    });

    // Append the game container to the main game menu.
    gameMenu.appendChild(gameDiv);
  });

  // Update the game count display.
  gameCount.textContent = `Games Loaded: ${filteredGames.length}`;
}

// Initial rendering of the game menu.
displayGames();
