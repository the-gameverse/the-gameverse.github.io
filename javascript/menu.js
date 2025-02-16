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
  { name: "Tiny Fishing", image: "/uploads/covers/tinyfishing.png", link: "/storage/games/tinyfishing", gameLink: "https://example.com" clickCount: 0, isFavorited: false },

 ];

/**
 * Saves the game link to sessionStorage.
 * @param {string} gameLink - The link of the game.
 */
function saveGameLinkToSessionStorage(gameLink) {
  sessionStorage.setItem("gameLink", gameLink);
  console.log("Game link saved to sessionStorage:", gameLink);
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

    // Create image for the game.
    const gameImage = document.createElement("img");
    gameImage.src = game.image;
    gameImage.alt = game.name;

    // Create name for the game.
    const gameName = document.createElement("h3");
    gameName.textContent = game.name;

    // Create the button that will save the game link to sessionStorage.
    const gameLinkButton = document.createElement("button");
    gameLinkButton.textContent = "Play Game";
    
    // Add event listener to save the game link to sessionStorage when clicked.
    gameLinkButton.addEventListener("click", function() {
      saveGameLinkToSessionStorage(game.link);
    });

    // Append elements to the game div.
    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gameDiv.appendChild(gameLinkButton);

    // Append game div to the game menu.
    gameMenu.appendChild(gameDiv);
  });

  // Update the game count display.
  gameCount.textContent = `Total Games: ${filteredGames.length}`;
}
// Call displayGames initially with no filter.
window.onload = function() {
  displayGames();
};

