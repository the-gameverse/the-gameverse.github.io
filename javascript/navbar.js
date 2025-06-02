import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://jbekjmsruiadbhaydlbt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY'
);



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
<meta name="viewport" content="width=device-width, initial-scale=1">

  <div class="navbar-container">
    <div class="nav-center-bg">
      <div id="streak" class="streak-container">
        <span class="streak-text">🔥 0 Days</span>
      </div>
    </div>
    <nav class="navbar">
      <div class="nav-links">
        <a href="/"><i class="fa fa-home fa-lg"></i></a>
        <a href="/games"><i class="fa fa-gamepad fa-lg"></i></a>
        <a href="/apps"><i class="fa fa-cube fa-lg"></i></a>
        <a href="/reviews"><i class="fa fa-star fa-lg"></i></a>
        </div>
        <a href="/index.html" class="logo">
        <img src="/uploads/branding/favicon.png" alt="GameVerse Logo">
      </a>
      <div class="nav-links">
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
    </nav>
    <div class="nav-right-bg">
      <a href="/auth.html" class="profile-link">
        <img src="${avatarUrl}" alt="${username}" class="profile-img">
        <span class="username">${username}</span>
      </a>
    </div>
  </div>

  <!-- Place this at the very top of your <body> -->
<div class="unsupported-message" id="unsupported-message" >
 <strong>starship isn't supported on this device</strong>
  <p>
    After careful consideration, we decided to cancel support for mobile devices due to display and usability issues.<br>
    Please use a desktop, laptop, or tablet to access starship.<br><br>
    Thank you for your understanding!
  </p>
</div>
`;

  document.body.insertAdjacentHTML('afterbegin', navbarHTML);

// Show or hide the unsupported message based on device width
const unsupportedMsg = document.getElementById('unsupported-message');
if (window.innerWidth <= 500) {
  unsupportedMsg.style.display = 'flex';
} else if (unsupportedMsg) {
  unsupportedMsg.remove();
}

// Set scrollbar width variable after navbar is in DOM
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}
function updateScrollbarWidth() {
  document.documentElement.style.setProperty('--scrollbar-width', getScrollbarWidth() + 'px');
}
updateScrollbarWidth();
window.addEventListener('resize', updateScrollbarWidth);

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

  function resetToDefault() {
    const streak = updateStreak();
    dynamicIsland.innerHTML = `
      <div id="streak" class="streak-container">
        <span class="streak-text">${streak}</span>
      </div>
    `;
    currentState = 'streak';
  }

  async function showWeather() {
  dynamicIsland.innerHTML = `<div class="weather">🌦️ Loading weather...</div>`;
  currentState = 'weather';

  // Get user's location
  if (!navigator.geolocation) {
    dynamicIsland.innerHTML = `<div class="weather">🌦️ Location not supported.</div>`;
    return;
  }

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    // Fetch weather from Open-Meteo
    try {
      const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`);
      const data = await resp.json();
      if (data.current_weather) {
        const temp = Math.round(data.current_weather.temperature);
        const icon = getWeatherIcon(data.current_weather.weathercode);
        dynamicIsland.innerHTML = `
          <div class="weather">
            ${icon} <b>${temp}°F</b>
          </div>
        `;
      } else {
        dynamicIsland.innerHTML = `<div class="weather">🌦️ Weather unavailable.</div>`;
      }
    } catch {
      dynamicIsland.innerHTML = `<div class="weather">🌦️ Weather error.</div>`;
    }
  }, () => {
    dynamicIsland.innerHTML = `<div class="weather">🌦️ Location denied.</div>`;
  });
}

// Simple weather icon mapping
function getWeatherIcon(code) {
  if ([0].includes(code)) return "☀️";
  if ([1, 2, 3].includes(code)) return "⛅";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code)) return "🌦️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌡️";
}

  let periodicIndex = 0;
  const periodicFunctions = [
    showScreenTime,
    showCurrentTime,
    showWeather,
    resetToDefault
  ];

  function periodicUpdates() {
    periodicFunctions[periodicIndex % periodicFunctions.length]();
    periodicIndex++;
  }

  // On page load, show streak and start rotation
  resetToDefault();
  setInterval(periodicUpdates, 10000);
