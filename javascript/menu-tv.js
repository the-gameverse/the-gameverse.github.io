// Add shows

const shows = [
  { name: "Phineas And Ferb", image: "/uploads/covers/phineasandferb.png", link: "/storage/tv/phineasandferb", clickCount: 0, isFavorited: false },
  { name: "Gravity Falls", image: "/uploads/covers/gravityfalls.png", link: "/storage/tv/gravityfalls", clickCount: 0, isFavorited: false },
  { name: "The Amazing World Of Gumball", image: "/uploads/covers/theamazingworldofgumball.png", link: "/storage/tv/theamazingworldofgumball", clickCount: 0, isFavorited: false },
  { name: "Bluey", image: "/uploads/covers/bluey.png", link: "/storage/tv/bluey", clickCount: 0, isFavorited: false }
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
  displayShows(); // Re-render the shows
}

// Filter shows based on search input
function filterShows() {
  const search = document.getElementById("search").value;
  displayShows(search);
}

// Save favorites to localStorage
function saveFavoritesToLocalStorage() {
  const favorites = shows.reduce((acc, show) => {
    acc[show.name] = show.isFavorited;
    return acc;
  }, {});
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Load favorites from localStorage
function loadFavoritesFromLocalStorage() {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
  if (storedFavorites) {
    shows.forEach(show => {
      if (storedFavorites[show.name] !== undefined) {
        show.isFavorited = storedFavorites[show.name];
      }
    });
  } else {
    // Set all shows to non-favorited if no favorites are found in localStorage
    shows.forEach(show => {
      show.isFavorited = false;
    });
  }
}

// Save click counts to localStorage
function saveClickCountsToLocalStorage() {
  const clickCounts = shows.reduce((acc, show) => {
    acc[show.name] = show.clickCount;
    return acc;
  }, {});
  localStorage.setItem("clickCounts", JSON.stringify(clickCounts));
}

// Load click counts from localStorage
function loadClickCountsFromLocalStorage() {
  const storedClickCounts = JSON.parse(localStorage.getItem("clickCounts"));
  if (storedClickCounts) {
    shows.forEach(show => {
      if (storedClickCounts[show.name] !== undefined) {
        show.clickCount = storedClickCounts[show.name];
      }
    });
  }
}

// Load favorites and click counts initially
loadFavoritesFromLocalStorage();
loadClickCountsFromLocalStorage();

// Handle sorting
function sortShows() {
  const sortDropdown = document.getElementById("sortOptions");
  if (!sortDropdown) return; // Check if sortDropdown exists

  currentSortOption = sortDropdown.value;
  console.log(`Sorting by: ${currentSortOption}`);
  displayShows(); // Re-render shows with new sort option
}

// Function to display the shows
function displayShows(filter = "") {
  const showMenu = document.getElementById("showMenu");
  const showCount = document.getElementById("showCount");
  showMenu.innerHTML = ""; // Clear the menu

  // Sort shows based on current sort option
  const filteredShows = shows
    .filter(show => show.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (currentSortOption === "favorites") {
        if (a.isFavorited !== b.isFavorited) {
          return b.isFavorited - a.isFavorited; // Favorited shows first
        }
      } else if (currentSortOption === "clickCount") {
        return b.clickCount - a.clickCount; // Sort by click count
      } else if (currentSortOption === "alphabetical") {
        return a.name.localeCompare(b.name); // Alphabetical sorting
      }
      return 0;
    });

  filteredShows.forEach(show => {
    const showDiv = document.createElement("div");
    showDiv.classList.add("show");

    // Create the favorite icon (star)
    const favoriteIcon = document.createElement("div");
    favoriteIcon.classList.add("favorite-icon");
    favoriteIcon.innerHTML = show.isFavorited ? "★" : "☆"; // Filled or empty star
    favoriteIcon.title = show.isFavorited ? "Unfavorite" : "Favorite";
    favoriteIcon.style.cursor = "pointer";
    favoriteIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering other click events
      show.isFavorited = !show.isFavorited;
      saveFavoritesToLocalStorage(); // Save favorites after toggling
      displayShows(filter); // Re-render the shows
    });

    // Create the click count display
    const clickCountElement = document.createElement("div");
    clickCountElement.classList.add("click-count");
    if (showClickCounts) {
      clickCountElement.textContent = `Your Clicks: ${show.clickCount}`;
      clickCountElement.style.display = "block";
    } else {
      clickCountElement.style.display = "none";
    }

    // Create the show link and image
    const showLink = document.createElement("a");
    showLink.href = show.path;
    const showImage = document.createElement("img");
    showImage.src = show.image;
    showLink.appendChild(showImage);

    // Apply blur effect and remove it after 4 seconds
    setTimeout(() => {
      showImage.classList.add("loaded");
    }, 2000);

    // Create the show name
    const showName = document.createElement("div");
    showName.classList.add("show-name");
    showName.textContent = show.name;
    showLink.appendChild(showName);

    // Add all elements to the showDiv
    showDiv.appendChild(favoriteIcon);
    showDiv.appendChild(showLink);
    showDiv.appendChild(clickCountElement);

    // Increment click count and save show link and name when the showDiv is clicked
    showDiv.addEventListener("click", () => {
      show.clickCount++;
      localStorage.setItem('watchLink', show.link); // Save show link to localStorage
      localStorage.setItem('showName', show.name); // Save show name to localStorage
      saveClickCountsToLocalStorage(); // Save updated click count
      displayShows(filter); // Re-render the shows
    });

    // Append the showDiv to the showMenu
    showMenu.appendChild(showDiv);
  });

  // Update the show count text
  showCount.textContent = `Shows Loaded: ${filteredShows.length}`;
}

// Function to get random shows
function getRandomShows(num) {
  const shuffled = shows.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

// Function to display random shows
function displayRandomShows() {
  const randomShows = getRandomShows(7); // Change the number to the desired count of random shows
  const randomShowContainer = document.getElementById('randomShowContainer');
  randomShowContainer.innerHTML = ''; // Clear previous content

  randomShows.forEach(show => {
    const showDiv = document.createElement("div");
    showDiv.classList.add("show");

    // Create the show link and image
    const showLink = document.createElement("a");
    showLink.href = "#"; // Use '#' to prevent default link behavior
    const showImage = document.createElement("img");
    showImage.src = show.image;
    showLink.appendChild(showImage);

    // Create the show name
    const showName = document.createElement("div");
    showName.classList.add("show-name");
    showName.textContent = show.name;
    showLink.appendChild(showName);

    // Add click event listener to redirect iframe
    showLink.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      redirectIframe(show.link, show.name); // Call the redirect function with the show link and name
      localStorage.setItem('watchLink', show.link); // Save show link to localStorage
      localStorage.setItem('showName', show.name); // Save show name to localStorage
    });

    // Add all elements to the showDiv
    showDiv.appendChild(showLink);

    // Append the showDiv to the randomShowContainer
    randomShowContainer.appendChild(showDiv);
  });
}

// Call the function to display random shows on load
window.addEventListener('load', displayRandomShows);

// Initial display of shows
displayShows();
