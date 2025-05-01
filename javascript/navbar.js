document.addEventListener('DOMContentLoaded', () => {
  // Inject the CSS for horizontal layout of extra links
  const style = document.createElement('style');
  style.innerHTML = `
    .extra-links {
      display: flex;
      gap: 10px;  Adjust space between the icons 
      /*flex-wrap: nowrap; Prevent wrapping */
    }
    
    .extra-links a {
     /* display: inline-block;*/
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
        <a class="special" href="/reviews"><i class="fa fa-star fa-lg"></i></a>
        <a href="https://github.com/starship-site"><i class="fa-brands fa-square-github fa-lg"></i></a>
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

  plusIcon.addEventListener('click', () => {
    if (extraLinks.style.display === 'none') {
      extraLinks.style.display = 'flex'; // Show the extra links horizontally
      plusIcon.innerHTML = '<i class="fa fa-minus fa-lg"></i>'; // Change plus to minus
    } else {
      extraLinks.style.display = 'none';
      plusIcon.innerHTML = '<i class="fa fa-plus fa-lg"></i>'; // Change minus back to plus
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Get today's date
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  // Retrieve streak data from localStorage
  let streakData = JSON.parse(localStorage.getItem('streak')) || { streak: 0, lastDate: null };

  // Check if the user visited yesterday
  if (streakData.lastDate) {
    const lastDate = new Date(streakData.lastDate);
    const differenceInDays = (new Date(today) - lastDate) / (1000 * 60 * 60 * 24);

    if (differenceInDays === 1) {
      // Increment streak if they logged in consecutively
      streakData.streak++;
    } else if (differenceInDays > 1) {
      // Reset streak if they missed a day
      streakData.streak = 1; // Restart the streak
    }
  } else {
    // First-time visit, initialize streak
    streakData.streak = 1;
  }

  // Update the lastDate to today
  streakData.lastDate = today;

  // Save updated streak data to localStorage
  localStorage.setItem('streak', JSON.stringify(streakData));

  // Update the streak display in the navbar
  updateStreakDisplay(streakData.streak);
});

// Function to update the streak display
function updateStreakDisplay(streak) {
  const streakElement = document.querySelector('#streak .streak-text');
  if (streakElement) {
    if (streak > 0) {
      streakElement.innerHTML = `🔥 ${streak} days`;
      document.querySelector('#streak').classList.add('active-streak');
    } else {
      streakElement.innerHTML = `🧯 Streak Lost`;
      document.querySelector('#streak').classList.remove('active-streak');
    }
  }
}




 
