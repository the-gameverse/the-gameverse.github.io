// Add apps

const apps = [
    { name: "Discord", image: "/uploads/covers/discord.png", path: "/frog/ixl/hvtrs8%2F-dksaopd%2Ccmm-lmgkn", clickCount: 0, isFavorited: false },
  ];
  
  // Variable to toggle click count visibility
  let showClickCounts = false;
  let currentSortOption = 'favorites'; // Default sort option
  
  // Toggle click counts visibility
  function toggleClickCounts() {
    console.log("Toggle Click Counts triggered"); // Debugging line
    showClickCounts = !showClickCounts;
    const button = document.getElementById("toggleUsageData");
    button.textContent = showClickCounts ? "Hide Usage Data" : "Show Usage Data";
    displayApps(); // Re-render the apps
  }
  
  // Filter apps based on search input
  function filterApps() {
    const search = document.getElementById("search").value;
    displayApps(search);
  }
  
  // Save favorites to localStorage
  function saveFavoritesToLocalStorage() {
    const favorites = apps.reduce((acc, app) => {
      acc[app.name] = app.isFavorited;
      return acc;
    }, {});
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
  
  // Load favorites from localStorage
  function loadFavoritesFromLocalStorage() {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      apps.forEach(app => {
        if (storedFavorites[app.name] !== undefined) {
          app.isFavorited = storedFavorites[app.name];
        }
      });
    } else {
      // Set all apps to non-favorited if no favorites are found in localStorage
      apps.forEach(app => {
        app.isFavorited = false;
      });
    }
  }
  
  // Save click counts to localStorage
  function saveClickCountsToLocalStorage() {
    const clickCounts = apps.reduce((acc, app) => {
      acc[app.name] = app.clickCount;
      return acc;
    }, {});
    localStorage.setItem("clickCounts", JSON.stringify(clickCounts));
  }
  
  // Load click counts from localStorage
  function loadClickCountsFromLocalStorage() {
    const storedClickCounts = JSON.parse(localStorage.getItem("clickCounts"));
    if (storedClickCounts) {
      apps.forEach(app => {
        if (storedClickCounts[app.name] !== undefined) {
          app.clickCount = storedClickCounts[app.name];
        }
      });
    }
  }
  
  // Load favorites and click counts initially
  loadFavoritesFromLocalStorage();
  loadClickCountsFromLocalStorage();
  
  // Handle sorting
  function sortApps() {
    const sortDropdown = document.getElementById("sortOptions");
    if (!sortDropdown) return; // Check if sortDropdown exists
  
    currentSortOption = sortDropdown.value;
    console.log(`Sorting by: ${currentSortOption}`);
    displayApps(); // Re-render apps with new sort option
  }
  
  // Function to display the apps
  function displayApps(filter = "") {
    const appMenu = document.getElementById("appMenu");
    const appCount = document.getElementById("appCount");
    appMenu.innerHTML = ""; // Clear the menu
  
    // Sort apps based on current sort option
    const filteredApps = apps
      .filter(app => app.name.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => {
        if (currentSortOption === "favorites") {
          if (a.isFavorited !== b.isFavorited) {
            return b.isFavorited - a.isFavorited; // Favorited apps first
          }
        } else if (currentSortOption === "clickCount") {
          return b.clickCount - a.clickCount; // Sort by click count
        } else if (currentSortOption === "alphabetical") {
          return a.name.localeCompare(b.name); // Alphabetical sorting
        }
        return 0;
      });
  
    filteredApps.forEach(app => {
      const appDiv = document.createElement("div");
      appDiv.classList.add("app");
  
      // Create the favorite icon (star)
      const favoriteIcon = document.createElement("div");
      favoriteIcon.classList.add("favorite-icon");
      favoriteIcon.innerHTML = app.isFavorited ? "★" : "☆"; // Filled or empty star
      favoriteIcon.title = app.isFavorited ? "Unfavorite" : "Favorite";
      favoriteIcon.style.cursor = "pointer";
      favoriteIcon.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering other click events
        app.isFavorited = !app.isFavorited;
        saveFavoritesToLocalStorage(); // Save favorites after toggling
        displayApps(filter); // Re-render the apps
      });
  
      // Create the click count display
      const clickCountElement = document.createElement("div");
      clickCountElement.classList.add("click-count");
      if (showClickCounts) {
        clickCountElement.textContent = `Your Clicks: ${app.clickCount}`;
        clickCountElement.style.display = "block";
      } else {
        clickCountElement.style.display = "none";
      }
  
      // Create the app link and image
      const appLink = document.createElement("a");
      appLink.href = "#"; // Prevent default navigation
      const appImage = document.createElement("img");
      appImage.src = app.image;
      appLink.appendChild(appImage);
  
      // Apply blur effect and remove it after 4 seconds
      setTimeout(() => {
        appImage.classList.add("loaded");
      }, 2000);
  
      // Create the app name
      const appName = document.createElement("div");
      appName.classList.add("app-name");
      appName.textContent = app.name;
      appLink.appendChild(appName);
  
      // Add all elements to the appDiv
      appDiv.appendChild(favoriteIcon);
      appDiv.appendChild(appLink);
      appDiv.appendChild(clickCountElement);
  
      // Increment click count and save app path and name when the appDiv is clicked
      appDiv.addEventListener("click", () => {
        app.clickCount++;
        localStorage.setItem('launchPath', app.path); // Save app path to localStorage
        localStorage.setItem('appName', app.name); // Save app name to localStorage
        saveClickCountsToLocalStorage(); // Save updated click count
        window.location.href = "/launch.html"; // Redirect to the launch page
      });
  
      // Append the appDiv to the appMenu
      appMenu.appendChild(appDiv);
    });
  
    // Update the app count text
    appCount.textContent = `Apps Loaded: ${filteredApps.length}`;
  }
  
  // Call the function to display apps on load
  window.addEventListener('load', () => {
    displayApps();
  });