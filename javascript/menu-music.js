// Add music playlists

const playlists = [
    { name: "Guitar Music", image: "/uploads/covers/guitar.png", link: "/storage/music/guitar", clickCount: 0, isFavorited: false },
    { name: "Lofi Beats", image: "/uploads/covers/lofi.png", link: "/storage/music/lofi", clickCount: 0, isFavorited: false },
    { name: "Piano Music", image: "/uploads/covers/piano.png", link: "/storage/music/piano", clickCount: 0, isFavorited: false }
];

// Variable to toggle click count visibility
let showClickCounts = false;
let currentSortOption = 'alphabetical';  // Default sort option

// Toggle click counts visibility
function toggleClickCounts() {
    console.log("Toggle Click Counts triggered"); // Debugging line
    showClickCounts = !showClickCounts;
    const button = document.getElementById("toggleUsageData");
    button.textContent = showClickCounts ? "Hide Usage Data" : "Show Usage Data";
    displayPlaylists(); // Re-render the playlists
}

// Filter playlists based on search input
function filterPlaylists() {
    const search = document.getElementById("searchBar").value;
    displayPlaylists(search);
}

// Save favorites to localStorage
function saveFavoritesToLocalStorage() {
    const favorites = playlists.reduce((acc, playlist) => {
        acc[playlist.name] = playlist.isFavorited;
        return acc;
    }, {});
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Load favorites from localStorage
function loadFavoritesFromLocalStorage() {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
        playlists.forEach(playlist => {
            if (storedFavorites[playlist.name] !== undefined) {
                playlist.isFavorited = storedFavorites[playlist.name];
            }
        });
    } else {
        // Set all playlists to non-favorited if no favorites are found in localStorage
        playlists.forEach(playlist => {
            playlist.isFavorited = false;
        });
    }
}

// Save click counts to localStorage
function saveClickCountsToLocalStorage() {
    const clickCounts = playlists.reduce((acc, playlist) => {
        acc[playlist.name] = playlist.clickCount;
        return acc;
    }, {});
    localStorage.setItem("musicClickCounts", JSON.stringify(clickCounts));
}

// Load click counts from localStorage
function loadClickCountsFromLocalStorage() {
    const storedClickCounts = JSON.parse(localStorage.getItem("musicClickCounts"));
    if (storedClickCounts) {
        playlists.forEach(playlist => {
            if (storedClickCounts[playlist.name] !== undefined) {
                playlist.clickCount = storedClickCounts[playlist.name];
            }
        });
    }
}

// Load favorites and click counts initially
loadFavoritesFromLocalStorage();
loadClickCountsFromLocalStorage();

// Handle sorting
function sortPlaylists() {
    const sortDropdown = document.getElementById("sortOptions");
    if (!sortDropdown) return; // Check if sortDropdown exists
    
    currentSortOption = sortDropdown.value;
    console.log(`Sorting by: ${currentSortOption}`);
    displayPlaylists(); // Re-render playlists with new sort option
}

// Function to display the playlists
function displayPlaylists(filter = "") {
    const playlistMenu = document.getElementById("playlistMenu");
    const playlistCount = document.getElementById("playlistCount");
    playlistMenu.innerHTML = ""; // Clear the menu

    // Sort playlists based on current sort option
    const filteredPlaylists = playlists
        .filter(playlist => playlist.name.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => {
            if (currentSortOption === "clickCount") {
                return b.clickCount - a.clickCount; // Sort by click count
            } else if (currentSortOption === "alphabetical") {
                return a.name.localeCompare(b.name); // Alphabetical sorting
            }
            return 0;
        });

    filteredPlaylists.forEach(playlist => {
        const playlistDiv = document.createElement("div");
        playlistDiv.classList.add("playlist");

        // Create the favorite icon (star)
        const favoriteIcon = document.createElement("div");
        favoriteIcon.classList.add("favorite-icon");
        favoriteIcon.innerHTML = playlist.isFavorited ? "★" : "☆"; // Filled or empty star
        favoriteIcon.title = playlist.isFavorited ? "Unfavorite" : "Favorite";
        favoriteIcon.style.cursor = "pointer";
        favoriteIcon.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering other click events
            playlist.isFavorited = !playlist.isFavorited;
            saveFavoritesToLocalStorage(); // Save favorites after toggling
            displayPlaylists(filter); // Re-render the playlists
        });

        // Create the click count display
        const clickCountElement = document.createElement("div");
        clickCountElement.classList.add("click-count");
        if (showClickCounts) {
            clickCountElement.textContent = `Your Clicks: ${playlist.clickCount}`;
            clickCountElement.style.display = "block";
        } else {
            clickCountElement.style.display = "none";
        }

        // Create the playlist link and image
        const playlistLink = document.createElement("a");
        playlistLink.href = "/listen";
        const playlistImage = document.createElement("img");
        playlistImage.src = playlist.image;
        playlistLink.appendChild(playlistImage);

        // Create the playlist name
        const playlistName = document.createElement("div");
        playlistName.classList.add("playlist-name");
        playlistName.textContent = playlist.name;
        playlistLink.appendChild(playlistName);

        // Add all elements to the playlistDiv
        playlistDiv.appendChild(favoriteIcon);
        playlistDiv.appendChild(playlistLink);
        playlistDiv.appendChild(clickCountElement);

        // Increment click count and save playlist link and name when the playlistDiv is clicked
        playlistDiv.addEventListener("click", () => {
            playlist.clickCount++;
            localStorage.setItem('playlistLink', playlist.link); // Save playlist link to localStorage
            localStorage.setItem('playlistName', playlist.name); // Save playlist name to localStorage
            saveClickCountsToLocalStorage(); // Save updated click count
            displayPlaylists(filter); // Re-render the playlists
            window.location.href = "/listen"; // Redirect to /listen
        });

        // Append the playlistDiv to the playlistMenu
        playlistMenu.appendChild(playlistDiv);
    });

    // Update the playlist count text
    playlistCount.textContent = `Playlists Loaded: ${filteredPlaylists.length}`;
}

// Initial display of playlists
displayPlaylists();
