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
          <a href="/music"><i class="fa fa-music fa-lg"></i></a>
          <a href="/tv"><i class="fa fa-television fa-lg"></i></a>
          <a href="/blog"><i class="fa fa-comment-alt fa-lg"></i></a>
                  <!-- Plus icon to toggle extra links -->
        <div class="plus-icon">
          <i class="fa fa-plus fa-lg"></i>
        </div>
        </div>

        <div id="extra-links" class="nav-links">
        <a href="https://github.com/starship-site"><i class="fa-brands fa-square-github fa-lg"></i></a>
          <a href="/settings"><i class="fa fa-gear fa-lg"></i></a>
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
  `;

  // Inject the navbar at the very top of the body
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);

  // Add event listener to toggle the visibility of extra links
  const plusIcon = document.querySelector('.plus-icon');
  const extraLinks = document.querySelector('.extra-links');

  if (plusIcon && extraLinks) {
    plusIcon.addEventListener('click', () => {
      if (extraLinks.style.display === 'none' || extraLinks.style.display === '') {
        extraLinks.style.display = 'flex'; // Show the extra links horizontally
        plusIcon.innerHTML = '<i class="fa fa-minus fa-lg"></i>'; // Change plus to minus
      } else {
        extraLinks.style.display = 'none';
        plusIcon.innerHTML = '<i class="fa fa-plus fa-lg"></i>'; // Change minus back to plus
      }
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

  // Detect if on play.html and show "Launching Game"
  if (window.location.pathname.includes('play')) {
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
  } else {
    resetToDefault();
  }
});
