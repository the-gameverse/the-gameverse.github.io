document.addEventListener('DOMContentLoaded', () => {
  // Inject the CSS for horizontal layout of extra links
  const style = document.createElement('style');
  style.innerHTML = `
    .extra-links {
      display: flex;
      gap: 10px; /* Adjust space between the icons */
      /*flex-wrap: nowrap; Prevent wrapping */
    }

    .extra-links a {
      /* display: inline-block;*/
    }

    #searchResults {
      display: none; /* Hidden by default */
      position: absolute;
      top: 70px; /* Adjust based on your navbar */
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      max-height: 300px;
      overflow-y: auto;
      background-color: #111;
      border: 1px solid #8A2BE2;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(138, 43, 226, 0.8);
      z-index: 1000;
      padding: 10px;
    }

    #searchResults div {
      padding: 10px;
      border-bottom: 1px solid #666;
      color: white;
      cursor: pointer;
    }

    #searchResults div:hover {
      background-color: rgba(138, 43, 226, 0.4); /* Highlight on hover */
      color: black;
    }

    .nav-search {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      transition: flex 0.4s ease, margin 0.4s ease;
    }

    .nav-search input {
      width: 0;
      padding: 8px 15px;
      border: 2px solid #8A2BE2;
      border-radius: 25px;
      outline: none;
      background-color: rgba(20, 20, 20, 0.8);
      color: white;
      font-size: 1rem;
      transition: width 0.4s ease, padding 0.4s ease;
      opacity: 0;
    }

    .nav-search input:focus {
      width: 300px; /* Expand width */
      padding: 8px 20px;
      opacity: 1;
      margin: 0 10px; /* Push back other navbar parts */
    }

    .nav-search input::placeholder {
      color: #aaa;
      transition: color 0.3s ease;
    }

    .nav-search input:focus::placeholder {
      color: transparent;
    }
  `;
  document.head.appendChild(style);

  // Check for a logged-in user in localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const user = loggedInUser || { username: 'Guest', photo: '/uploads/branding/favicon.png' };

  // Construct the navbar HTML
  const navbarHTML = `
    <nav class="navbar">
      <!-- Left section: Logo and navigation links -->
      <div class="nav-left-bg">
        <a href="/index.html" class="logo">
          <img src="/uploads/branding/favicon.gif" alt="GameVerse Logo">
        </a>
        <div class="nav-links">
          <a href="/"><i class="fa fa-home fa-lg"></i></a>
          <a href="/games"><i class="fa fa-gamepad fa-lg"></i></a>
          <a href="/music"><i class="fa fa-music fa-lg"></i></a>
          <a href="/tv"><i class="fa fa-television fa-lg"></i></a>
          <a href="/blog"><i class="fa fa-comment-alt fa-lg"></i></a>
          <a href="https://github.com/starship-site"><i class="fa-brands fa-square-github fa-lg"></i></a>
        </div>
      </div>

      <!-- Center section: Search bar -->
      <div class="nav-search">
        <input type="text" id="gameSearchInput" placeholder="Search games..." />
      </div>

      <!-- Right section: Profile information -->
      <div class="nav-right-bg">
        <a href="/editprofile.html" class="profile-link">
          <img src="${user.photo}" alt="${user.username}" class="profile-img">
          <span class="username">${user.username}</span>
          <img height="20px" width="20px" src="/uploads/images/profile-verified.png" alt="This is a verified GameVerse profile" title="This is a verified profile">
        </a>
      </div>
    </nav>`;
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);

  // Add event listener to toggle the visibility of extra links
  const plusIcon = document.querySelector('.plus-icon');
  const extraLinks = document.querySelector('.extra-links');
  plusIcon.addEventListener('click', () => {
    if (extraLinks.style.display === 'none') {
      extraLinks.style.display = 'flex'; // Show the extra links horizontally
      plusIcon.innerHTML = '<i class="fa fa-minus fa-lg"></i>'; // Change plus to minus
    } else {
      extraLinks.style.display = 'none';
      plusIcon.innerHTML = '<i class="fa fa-plus fa-lg"></i>'; // Change minus back to plus
    }
  });

  // Search bar functionality
  const gameSearchInput = document.getElementById('gameSearchInput');
  const searchResultsContainer = document.createElement('div');
  searchResultsContainer.id = 'searchResults';
  document.body.appendChild(searchResultsContainer);

  // Handle search input
  gameSearchInput.addEventListener('input', (e) => {
    const searchQuery = e.target.value.toLowerCase();
    updateSearchResults(searchQuery);
  });

  // Close results when clicking outside
  document.addEventListener('click', (e) => {
    if (!gameSearchInput.contains(e.target) && !searchResultsContainer.contains(e.target)) {
      searchResultsContainer.style.display = 'none';
    }
  });

  // Function to update search results dynamically
  function updateSearchResults(query) {
    const results = window.games.filter((game) =>
      game.name.toLowerCase().includes(query)
    );

    // Clear previous results
    searchResultsContainer.innerHTML = '';

    // Exit if no query or no results
    if (!query || results.length === 0) {
      searchResultsContainer.style.display = 'none';
      return;
    }

    searchResultsContainer.style.display = 'block';

    // Render results
    results.forEach((game) => {
      const resultItem = document.createElement('div');
      resultItem.textContent = game.name;
      resultItem.addEventListener('click', () => {
        window.location.href = game.link; // Redirect to the game link
      });

      searchResultsContainer.appendChild(resultItem);
    });
  }
});
