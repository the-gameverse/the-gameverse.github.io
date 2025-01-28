// Add games 

const games = [
      { name: "Guitar Music", image: "/uploads/covers/guitar.png", link: "/storage/music/guitar", clickCount:0 },
      { name: "Lofi Beats", image: "/uploads/covers/lofi.png", link: "/storage/music/lofi", clickCount:0 },
      { name: "Piano Music", image: "/uploads/covers/piano.png", link: "/storage/music/piano", clickCount:0 }
    
    ];

  
// Game counter, display, search bar, and organization
  
  
    const gameMenu = document.getElementById("gameMenu");
    const searchBar = document.getElementById("searchBar");
    const gameCount = document.getElementById("gameCount");

    // Function to display games
    function displayGames(filter = "") {
      gameMenu.innerHTML = ""; // Clear the menu

      const filteredGames = games
        .filter(game => game.name.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical sorting

      filteredGames.forEach(game => {
        const gameDiv = document.createElement("div");
        gameDiv.classList.add("game");

        gameDiv.innerHTML = `
          <a href="${game.link}">
            <img src="${game.image}" alt="${game.name}">
            <div class="game-name">${game.name}</div>
          </a>
        `;

        gameMenu.appendChild(gameDiv);
      });

      // Update the game count
      gameCount.textContent = `Playlists Loaded: ${filteredGames.length}`;
    }

    // Event listener for search bar
    searchBar.addEventListener("input", (e) => {
      displayGames(e.target.value);
    });

    // Initial display of games
    displayGames();