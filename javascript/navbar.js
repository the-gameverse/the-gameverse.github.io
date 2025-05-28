import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://jbekjmsruiadbhaydlbt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY'
);

document.addEventListener('DOMContentLoaded', async () => {
  // --- Navbar Insert ---
  const style = document.createElement('style');
  style.innerHTML = `
    .extra-links {
      display: none;
      gap: 10px;
    }
  `;
  document.head.appendChild(style);

  let username = 'Sign Up';
  let avatarUrl = '/uploads/branding/signup.png';

  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', user.id)
      .maybeSingle();

    if (!error && profile) {
      username = profile.username || 'User';
      // Add cache-busting query string
      avatarUrl = profile.avatar_url ? profile.avatar_url + '?t=' + Date.now() : avatarUrl;
    }
  }

  const navbarHTML = `
    <nav class="navbar">
      <div class="nav-left-bg">
        <a href="/index.html" class="logo">
          <img src="/uploads/branding/favicon.gif" alt="GameVerse Logo">
        </a>
        <div class="nav-links">
          <a href="/"><i class="fa fa-home fa-lg"></i></a>
          <a href="/games"><i class="fa fa-gamepad fa-lg"></i></a>
          <a href="/apps"><i class="fa fa-cube fa-lg"></i></a>
          <a href="/legal"><i class="fa fa-scale-balanced fa-lg"></i></a>
          <a href="/contact"><i class="fa fa-phone fa-lg"></i></a>
          <a href="/blog"><i class="fa fa-comment-alt fa-lg"></i></a>
          <a href="/settings"><i class="fa fa-gear fa-lg"></i></a>
          <div class="extra-links">
            <a href="https://github.com/starship-site"><i class="fa-brands fa-square-github fa-lg"></i></a>
            <a href="/reviews"><i class="fa fa-star fa-lg"></i></a>
            <a href="/share"><i class="fa-solid fa-share-nodes fa-lg"></i></a>
          </div>
        </div>
      </div>

      <div class="nav-center-bg">
        <div id="streak" class="streak-container">
          <span class="streak-text">🔥 0 Days</span>
        </div>
      </div>

      <div class="nav-right-bg">
        <a href="/auth.html" class="profile-link">
          <img src="${avatarUrl}" alt="${username}" class="profile-img">
          <span class="username">${username}</span>
        </a>
      </div>
    </nav>
    <br><br><br>
  `;

  document.body.insertAdjacentHTML('afterbegin', navbarHTML);

  // --- Dynamic Island Logic ---
  let typingTimeout;
  const dynamicIsland = document.querySelector('.nav-center-bg');
  let currentState = 'streak';

  function updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    let streakData = JSON.parse(localStorage.getItem('streak')) || { streak: 0, lastDate: null };

    if (streakData.lastDate) {
      const lastDate = new Date(streakData.lastDate);
      const differenceInDays = (new Date(today) - lastDate) / (1000 * 60 * 60 * 24);

      if (Math.floor(differenceInDays) === 1) {
        streakData.streak++;
      } else if (differenceInDays > 1) {
        streakData.streak = 1;
      }
    } else {
      streakData.streak = 1;
    }

    streakData.lastDate = today;
    localStorage.setItem('streak', JSON.stringify(streakData));

    return `🔥 ${streakData.streak} days`;
  }

  function showScreenTime() {
    const dataJSON = localStorage.getItem('screenTimeData');
    let seconds = 0;
    if (dataJSON) {
      try {
        const data = JSON.parse(dataJSON);
        seconds = data.secondsSpent || 0;
      } catch (e) {
        seconds = 0;
      }
    }

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    let formatted;
    if (h > 0) {
      formatted = `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    } else {
      formatted = `${m}:${s.toString().padStart(2, '0')}`;
    }

    dynamicIsland.innerHTML = `
      <div class="screen-time">
        ⏳ <b>${formatted}</b>
      </div>
    `;
    currentState = 'screen-time';
  }

  function showCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    dynamicIsland.innerHTML = `
      <div class="current-time">
       🕒 ${formattedTime}
      </div>
    `;
    currentState = 'current-time';
  }

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
    }, 5000);
  }

  function showCheckmarkAnimation() {
    dynamicIsland.classList.add('expanded-checkmark');
    dynamicIsland.innerHTML = `
      <div class="checkmark">✓</div>
    `;

    setTimeout(() => {
      dynamicIsland.classList.remove('expanded-checkmark');
      resetToDefault();
    }, 2000);
  }

  function resetToDefault() {
    const streak = updateStreak();
    dynamicIsland.innerHTML = `
      <div id="streak" class="streak-container">
        <span class="streak-text">${streak}</span>
      </div>
    `;
    currentState = 'streak';
  }

  let periodicIndex = 0;
  const periodicFunctions = [
    showScreenTime,
    showCurrentTime,
    resetToDefault
  ];

  function periodicUpdates() {
    periodicFunctions[periodicIndex % periodicFunctions.length]();
    periodicIndex++;
  }

  const searchBox = document.querySelector('#search');
  if (searchBox) {
    searchBox.addEventListener('input', () => {
      clearTimeout(typingTimeout);
      showLaunchingGame();
      typingTimeout = setTimeout(() => {
        resetToDefault();
      }, 2000);
    });
  }

  document.addEventListener('click', (event) => {
    const isLinkOrButton =
      event.target.closest('a') || event.target.closest('button');
    if (isLinkOrButton && !event.target.closest('.plus-icon')) {
      showCheckmarkAnimation();
    }
  });

  if (window.location.pathname.includes('play') || window.location.pathname.includes('games')) {
    showLaunchingGame();
  } else {
    resetToDefault();
    setInterval(periodicUpdates, 10000);
  }
});