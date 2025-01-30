// Add games 

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
  { name: "Drift Boss", image: "/uploads/covers/driftboss.png", link: "/storage/games/driftboss", clickCount: 0, isFavorited: false }
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
    gameLink.href = game.link;
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

    // Increment click count when the gameDiv is clicked
    gameDiv.addEventListener("click", () => {
      game.clickCount++;
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
