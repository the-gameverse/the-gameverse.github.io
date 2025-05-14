document.addEventListener('DOMContentLoaded', () => {
  // Inject the CSS for horizontal layout of extra links
  const style = document.createElement('style');
  style.innerHTML = `
    .extra-links {
      display: none; /* Initially hidden */
      gap: 10px; /* Adjust space between the icons */
    }
    
    .extra-links a {
      /* Display inline block if needed */
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
          <a href="/apps"><i class="fa fa-cube fa-lg"></i></a>
          <a href="/legal"><i class="fa fa-scale-balanced fa-lg"></i></a>
          <a href="/blog"><i class="fa fa-comment-alt fa-lg"></i></a>
          <a href="/settings"><i class="fa fa-gear fa-lg"></i></a>
        </div>

        <div id="nav-links" class="extra-links">
          <a href="https://github.com/starship-site"><i class="fa-brands fa-square-github fa-lg"></i></a>
          <a href="/reviews"><i class="fa fa-star fa-lg"></i></a>
          <a href="/share"><i class="fa-solid fa-share-nodes fa-lg"></i></a>
        </div>
      </div>

      <!-- Center section: Streak display -->
      <div class="nav-center-bg">
        <div id="streak" class="streak-container">
          <span class="streak-text">🔥 0 Days</span>
        </div>
      </div>

      <!-- Right section: Profile information -->
      <div class="nav-right-bg">
        <a href="/editprofile.html" class="profile-link">
          <img src="${user.photo}" alt="${user.username}" class="profile-img">
          <span class="username">${user.username}</span>
        </a>
      </div>
    </nav>
    <br>
    <br>
    <br>
  `;

  // Inject the navbar at the very top of the body
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  
  let typingTimeout; // Variable to track the typing timeout

  // Detect typing in the search box to trigger game-launching animation
  const searchBox = document.querySelector('#search');
  if (searchBox) {
    searchBox.addEventListener('input', () => {
      clearTimeout(typingTimeout); // Clear the previous timeout

      showLaunchingGame(); // Trigger the game-launching animation

      // Set a timeout to reset the dynamic island back to the streak display
      typingTimeout = setTimeout(() => {
        resetToDefault(); // Reset to the normal streak display
      }, 2000); // Adjust the delay period as needed (e.g., 2000ms = 2 seconds)
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const dynamicIsland = document.querySelector('.nav-center-bg');
  const streakElement = `
    <div id="streak" class="streak-container">
      <span class="streak-text">🔥 0 Days</span>
    </div>
  `;

  let currentState = 'streak';

  // Function to update the streak display
  function updateStreak() {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    let streakData = JSON.parse(localStorage.getItem('streak')) || { streak: 0, lastDate: null };

    if (streakData.lastDate) {
      const lastDate = new Date(streakData.lastDate);
      const differenceInDays = (new Date(today) - lastDate) / (1000 * 60 * 60 * 24);

      if (differenceInDays === 1) {
        streakData.streak++;
      } else if (differenceInDays > 1) {
        streakData.streak = 1; // Reset streak
      }
    } else {
      streakData.streak = 1; // Initialize streak
    }

    streakData.lastDate = today; // Update lastDate
    localStorage.setItem('streak', JSON.stringify(streakData));

    return `🔥 ${streakData.streak} days`;
  }

  // Function to show "view counter"
  function showViewCounter(views) {
    dynamicIsland.innerHTML = `
      <div class="view-counter">
        👀 ${views} Views
      </div>
    `;
    currentState = 'view-counter';
  }

  // Function to show "5-star rating"
  function showFiveStarRating() {
    dynamicIsland.innerHTML = `
      <div class="five-star-rating">
        <p>★★★★★</p> 5 Stars
      </div>
    `;
    currentState = 'five-star-rating';
  }

  // Function to show "launching game"
  function showLaunchingGame() {
    dynamicIsland.classList.add('expanded');
    dynamicIsland.innerHTML = `
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    currentState = 'launching-game';

    setTimeout(() => {
      dynamicIsland.classList.remove('expanded');
      resetToDefault();
    }, 5000); // 5 seconds
  }

  // Function to show checkmark animation
  function showCheckmarkAnimation() {
    dynamicIsland.classList.add('expanded-checkmark');
    dynamicIsland.innerHTML = `
      <div class="checkmark">✓</div>
    `;

    // Remove the expanded-checkmark class and reset after 2 seconds
    setTimeout(() => {
      dynamicIsland.classList.remove('expanded-checkmark');
      resetToDefault();
    }, 2000); // Adjust duration as needed
  }

  // Reset to default streak
  function resetToDefault() {
    const streak = updateStreak();
    dynamicIsland.innerHTML = `
      <div id="streak" class="streak-container">
        <span class="streak-text">${streak}</span>
      </div>
    `;
    currentState = 'streak';
  }

  // Periodically change the center section's content
  function periodicUpdates() {
    if (currentState === 'streak') {
      const randomValue = Math.random();
      if (randomValue < 0.2) {
        showViewCounter(Math.floor(Math.random() * 1000)); // 20% chance for view counter
      } else if (randomValue < 0.4) {
        showFiveStarRating(); // 20% chance for 5-star rating
      } else {
        resetToDefault(); // 60% chance to reset to streak
      }
    } else {
      resetToDefault();
    }
  }

  // Add event listener for all clickable elements (buttons, links, etc.)
  document.addEventListener('click', (event) => {
    const isLinkOrButton =
      event.target.closest('a') || event.target.closest('button');

    // Avoid triggering the checkmark animation for the "plus icon" toggle
    if (isLinkOrButton && !event.target.closest('.plus-icon')) {
      showCheckmarkAnimation();
    }
  });

// Detect if on play.html or games.html and show "Launching Game"
if (window.location.pathname.includes('play') || window.location.pathname.includes('games')) {
    showLaunchingGame();
} else {
    resetToDefault();
    setInterval(periodicUpdates, 10000); // Update every 10 seconds
  }
});
