// Add games 

const games = [
   { name: "2048", image: "/uploads/covers/2048.png", link: "/storage/games/2048", iframeLink: "https://www.hoodamath.com/mobile/games/2048-game/game.html?nocheckorient=1", clickCount: 0, isFavorited: false }
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
                return b.isFavorited - a.isFavorited;
            } else if (currentSortOption === "clicks") {
                return b.clickCount - a.clickCount;
            }
            return 0; // Default sort
        });

    // Display games
    filteredGames.forEach(game => {
        const gameElement = document.createElement("div");
        gameElement.className = "game-item";
        gameElement.innerHTML = `
            <img src="${game.image}" alt="${game.name}" onclick="saveGameAndRedirect('${game.name}')">
            <h3>${game.name}</h3>
        `;
        gameMenu.appendChild(gameElement);
    });

    // Update the count of displayed games
    gameCount.textContent = `${filteredGames.length} games available`;
}

// Function to save game details and redirect to /play
function saveGameAndRedirect(gameName) {
    const game = games.find(g => g.name === gameName);
    if (game) {
        sessionStorage.setItem("gameDetails", JSON.stringify({
            name: game.name,
            iframeLink: game.iframeLink
        }));
        window.location.href = "/play";
    }
}

// Handle game page (/play)
function loadGameFromSession() {
    const gameDetails = JSON.parse(sessionStorage.getItem("gameDetails"));
    if (gameDetails) {
        document.getElementById("gameTitle").textContent = gameDetails.name;
        document.getElementById("gameIframe").src = gameDetails.iframeLink;
    }
}

// Load the game details on /play
if (window.location.pathname === "/play") {
    loadGameFromSession();
}
