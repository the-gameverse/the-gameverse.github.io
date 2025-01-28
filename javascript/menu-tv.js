// Add games 

const games = [
      { name: "Phineas And Ferb", image: "/uploads/covers/phineasandferb.png", link: "/storage/tv/phineasandferb", clickCount:0 },
      { name: "Gravity Falls", image: "/uploads/covers/gravityfalls.png", link: "/storage/tv/gravityfalls", clickCount:0 },
      { name: "The Amazing World Of Gumball", image: "/uploads/covers/theamazingworldofgumball.png", link: "/storage/tv/theamazingworldofgumball", clickCount:0 },
      { name: "Bluey", image: "/uploads/covers/bluey.png", link: "/storage/tv/bluey", clickCount:0 }
    
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
      gameCount.textContent = `Shows Loaded: ${filteredGames.length}`;
    }

    // Event listener for search bar
    searchBar.addEventListener("input", (e) => {
      displayGames(e.target.value);
    });

    // Initial display of games
    displayGames();