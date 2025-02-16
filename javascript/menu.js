// Add games 

const games = [
{ name: "Tiny Fishing", image: "/uploads/covers/tinyfishing.png", link: "https://www.w3schools.com/howto/default.asp", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Snow Rider 3D", image: "/uploads/covers/snowrider3d.png", link: "/storage/games/snowrider3d", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Guess Word", image: "/uploads/covers/guessword.png", link: "/storage/games/guessword", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Draw To Smash!", image: "/uploads/covers/drawsmash.png", link: "/storage/games/drawsmash", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Slice It All!", image: "/uploads/covers/sliceitall.png", link: "/storage/games/sliceitall", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Rodha", image: "/uploads/covers/rodha.png", link: "/storage/games/rodha", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Swing Monkey", image: "/uploads/covers/swingmonkey.png", link: "/storage/games/swingmonkey", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "8 Ball Pool", image: "/uploads/covers/8ballpool.png", link: "/storage/games/8ballpool", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Wheelie Bike", image: "/uploads/covers/wheeliebike.png", link: "/storage/games/wheeliebike", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Drift Hunters", image: "/uploads/covers/drifthunters.png", link: "/storage/games/drifthunters", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Taxi Driver 3D", image: "/uploads/covers/taxidriver3d.png", link: "/storage/games/taxidriver3d", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life", image: "/uploads/covers/ducklife.png", link: "/storage/games/ducklife", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 2", image: "/uploads/covers/ducklife2.png", link: "/storage/games/ducklife2", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 3", image: "/uploads/covers/ducklife3.png", link: "/storage/games/ducklife3", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 4", image: "/uploads/covers/ducklife4.png", link: "/storage/games/ducklife4", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 6", image: "/uploads/covers/ducklife6.png", link: "/storage/games/ducklife6", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "OvO", image: "/uploads/covers/ovo.png", link: "/storage/games/ovo", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Low's Adventure 3", image: "/uploads/covers/lowsadventure3.png", link: "/storage/games/lowsadventure3", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Draw The Rest", image: "/uploads/covers/drawtherest.png", link: "/storage/games/drawtherest", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Opposite Day", image: "/uploads/covers/oppositeday.png", link: "/storage/games/oppositeday", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Resizer", image: "/uploads/covers/resizer.png", link: "/storage/games/resizer", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Level Devil", image: "/uploads/covers/leveldevil.png", link: "/storage/games/leveldevil", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Melody's Adventure", image: "/uploads/covers/melodysadventure.png", link: "/storage/games/melodysadventure", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Whopper Clicker", image: "/uploads/covers/whopperclicker.png", link: "/storage/games/whopperclicker", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Duck Clicker", image: "/uploads/covers/duckduckclicker.png", link: "/storage/games/duckduckclicker", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Duck Clicker 3D", image: "/uploads/covers/duckduckclicker3d.png", link: "/storage/games/duckduckclicker3d", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Spacebar Clicker", image: "/uploads/covers/spacebarclicker.png", link: "/storage/games/spacebarclicker", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Stack", image: "/uploads/covers/stack.png", link: "/storage/games/stack", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Capybara Clicker", image: "/uploads/covers/capybaraclicker.png", link: "/storage/games/capybaraclicker", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Candy Clicker", image: "/uploads/covers/candyclicker.png", link: "/storage/games/candyclicker", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Candy Clicker 2", image: "/uploads/covers/candyclicker2.png", link: "/storage/games/candyclicker2", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "2048", image: "/uploads/covers/2048.png", link: "/storage/games/2048", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Block Blast!", image: "/uploads/covers/blockblast.png", link: "/storage/games/blockblast", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Find Me", image: "/uploads/covers/findme.png", link: "/storage/games/findme", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Suika Game", image: "/uploads/covers/suika.png", link: "/storage/games/suika", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Thorn And Balloons", image: "/uploads/covers/thornandballoons.png", link: "/storage/games/thornandballoons", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Icy Purple Head", image: "/uploads/covers/icypurplehead.png", link: "/storage/games/icypurplehead", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Icy Purple Head 2", image: "/uploads/covers/icypurplehead2.png", link: "/storage/games/icypurplehead2", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Icy Purple Head 3", image: "/uploads/covers/icypurplehead3.png", link: "/storage/games/icypurplehead3", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Are You Human?", image: "/uploads/covers/areyouhuman.png", link: "/storage/games/areyouhuman", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Move The Pin", image: "/uploads/covers/movethepin.png", link: "/storage/games/movethepin", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Growmi", image: "/uploads/covers/growmi.png", link: "/storage/games/growmi", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Idle Breakout", image: "/uploads/covers/idlebreakout.png", link: "/storage/games/idlebreakout", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Rolly Vortex", image: "/uploads/covers/rollyvortex.png", link: "/storage/games/rollyvortex", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Shortcut Race", image: "/uploads/covers/shortcutrace.png", link: "/storage/games/shortcutrace", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Slope", image: "/uploads/covers/slope.png", link: "/storage/games/slope", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Electron Dash", image: "/uploads/covers/electrondash.png", link: "/storage/games/electrondash", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Freehead Skate", image: "/uploads/covers/freeheadskate.png", link: "/storage/games/freeheadskate", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Burger Time", image: "/uploads/covers/burgertime.png", link: "/storage/games/burgertime", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Glitch", image: "/uploads/covers/glitch.png", link: "/storage/games/glitch", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Tunnel Rush", image: "/uploads/covers/tunnelrush.png", link: "/storage/games/tunnelrush", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Flappy Bird", image: "/uploads/covers/flappybird.png", link: "/storage/games/flappybird", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Line Rider", image: "/uploads/covers/linerider.png", link: "/storage/games/linerider", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Basket Goal", image: "/uploads/covers/basketgoal.png", link: "/storage/games/basketgoal", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Touchdown Rush", image: "/uploads/covers/touchdownrush.png", link: "/storage/games/touchdownrush", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Mini Golf", image: "/uploads/covers/minigolf.png", link: "/storage/games/minigolf", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Solitaire", image: "/uploads/covers/solitaire.png", link: "/storage/games/solitaire", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Checkers", image: "/uploads/covers/checkers.png", link: "/storage/games/checkers", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Orange", image: "/uploads/covers/orange.png", link: "/storage/games/orange", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Head Soccer 2022", image: "/uploads/covers/headsoccer2022.png", link: "/storage/games/headsoccer2022", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Fall Beans", image: "/uploads/covers/fallbeans.png", link: "/storage/games/fallbeans", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Ball Blast", image: "/uploads/covers/ballblast.png", link: "/storage/games/ballblast", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Cookie Clicker", image: "/uploads/covers/cookieclicker.png", link: "/storage/games/cookieclicker", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Falling Cubes", image: "/uploads/covers/fallingcubes.png", link: "/storage/games/fallingcubes", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Fancy Diver", image: "/uploads/covers/fancydiver.png", link: "/storage/games/fancydiver", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Jelly Slice", image: "/uploads/covers/jellyslice.png", link: "/storage/games/jellyslice", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Geometry Dash", image: "/uploads/covers/geometrydash.png", link: "/storage/games/geometrydash", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Geometry Dash Subzero", image: "/uploads/covers/geometrydashsubzero.png", link: "/storage/games/geometrydashsubzero", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Geometry Dash Meltdown", image: "/uploads/covers/geometrydashmeltdown.png", link: "/storage/games/geometrydashmeltdown", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Planet Clicker", image: "/uploads/covers/planetclicker.png", link: "/storage/games/planetclicker", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Retro Bowl", image: "/uploads/covers/retrobowl.png", link: "/storage/games/retrobowl", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Infinite Craft", image: "/uploads/covers/infinitecraft.png", link: "/storage/games/infinitecraft", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Piano Tiles", image: "/uploads/covers/pianotiles.png", link: "/storage/games/pianotiles", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Helix Jump", image: "/uploads/covers/helixjump.png", link: "/storage/games/helixjump", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Formula Rush", image: "/uploads/covers/formularush.png", link: "/storage/games/formularush", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Draw The Hill", image: "/uploads/covers/drawthehill.png", link: "/storage/games/drawthehill", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Dino Game", image: "/uploads/covers/dinogame.png", link: "/storage/games/dinogame", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Bike Hero", image: "/uploads/covers/bikehero.png", link: "/storage/games/bikehero", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Retro Ping Pong", image: "/uploads/covers/retropingpong.png", link: "/storage/games/retropingpong", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Dominoes", image: "/uploads/covers/dominoes.png", link: "/storage/games/dominoes", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Unscrew It", image: "/uploads/covers/unscrewit.png", link: "/storage/games/unscrewit", path: "/play", clickCount: 0, isFavorited: false },
{ name: "House Painter", image: "/uploads/covers/housepainter.png", link: "/storage/games/housepainter", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Liquid Sort", image: "/uploads/covers/liquidsort.png", link: "/storage/games/liquidsort", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Dark Room", image: "/uploads/covers/darkroom.png", link: "/storage/games/darkroom", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Coreball", image: "/uploads/covers/coreball.png", link: "/storage/games/coreball", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Drift Boss", image: "/uploads/covers/driftboss.png", link: "/storage/games/driftboss", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Sky Speedster", image: "/uploads/covers/skyspeedster.png", link: "/storage/games/skyspeedster", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Car Rush", image: "/uploads/covers/carrush.png", link: "/storage/games/carrush", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Climbable Arrow", image: "/uploads/covers/climbablearrow.png", link: "/storage/games/climbablearrow", path: "/play", clickCount: 0, isFavorited: false }

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
  const gameMenu = document.getElementById("gameMenu"); // Ensure you have an element with id 'gameMenu'
  const gameCount = document.getElementById("gameCount"); // Ensure you have an element with id 'gameCount'
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
          console.log("Click count shown:", game.clickCount); // Debugging line
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

    // Create the game name
    const gameName = document.createElement("div");
    gameName.classList.add("game-name");
    gameName.textContent = game.name;
    gameLink.appendChild(gameName);

    // Add all elements to the gameDiv
    gameDiv.appendChild(favoriteIcon);
    gameDiv.appendChild(gameLink);
    gameDiv.appendChild(clickCountElement);

  // Increment click count and save game link when the gameDiv is clicked
gameDiv.addEventListener("click", () => {
    game.clickCount++;
    localStorage.setItem('gameLink', game.link); // Save game link to localStorage
    saveClickCountsToLocalStorage(); // Save updated click count
    displayGames(filter); // Re-render the games
});

    // Append the gameDiv to the gameMenu
    gameMenu.appendChild(gameDiv);
  });

  // Update the game count text
  gameCount.textContent = `Games Loaded: ${filteredGames.length}`;
}

// Initial display of games
displayGames();
