// G tag
// Create the <script> element for the Google tag (gtag.js)
var script1 = document.createElement('script');
script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-MKDF11ZW6N';
script1.async = true;

// Create the inline <script> for initializing gtag
var script2 = document.createElement('script');
script2.text = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-MKDF11ZW6N');
`;

// Find the <head> element and insert the scripts after it
var head = document.getElementsByTagName('head')[0];
head.appendChild(script1);
head.appendChild(script2);

// Usage Tracking
function trackUsage() {
    let startTime = Date.now();
    let totalUsage = parseInt(localStorage.getItem("totalUsage") || "0");
    let timeLimit = parseInt(localStorage.getItem("timeLimit") || "0");
    let limitAction = localStorage.getItem("limitAction") || "reminder"; // "lockout" or "reminder"

    function updateUsage() {
        let currentTime = Date.now();
        let elapsedTime = currentTime - startTime; // Time in milliseconds
        totalUsage += elapsedTime;
        localStorage.setItem("totalUsage", totalUsage);
        startTime = currentTime;

        if (timeLimit > 0 && totalUsage >= timeLimit * 60000) {
            if (limitAction === "lockout") {
                window.location.replace("/errors/timelimit");
            } else if (limitAction === "reminder") {
                setTimeout(() => {
                    window.location.replace("/errors/reminder");
                }, 300000); // 5-minute reminder delay
            }
        }
    }

    // Update usage time every second
    let usageInterval = setInterval(updateUsage, 1000);

    // Reset at midnight
    function resetAtMidnight() {
        let now = new Date();
        let midnight = new Date();
        midnight.setHours(24, 0, 0, 0);

        let timeUntilMidnight = midnight.getTime() - now.getTime();

        setTimeout(() => {
            localStorage.setItem("totalUsage", "0");
            alert("New day! Usage tracking has been reset.");
            resetAtMidnight(); // Schedule the next reset
        }, timeUntilMidnight);
    }

    resetAtMidnight();

    // Pause tracking when user leaves the page
    window.addEventListener("beforeunload", updateUsage);
}

// Start tracking usage on page load
trackUsage();

// Iframe controls for viewers
const iframe = document.getElementById('gameFrame');
const reloadButton = document.getElementById('reloadButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const homeButton = document.getElementById('homeButton');

reloadButton.addEventListener('click', () => {
    iframe.src = iframe.src;
});

fullscreenButton.addEventListener('click', () => {
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
});

homeButton.addEventListener('click', () => {
    const currentURL = window.location.href;

    if (currentURL.includes("/storage/tv")) {
        location.replace("/tv");
    } else if (currentURL.includes("/storage/games")) {
        location.replace("/games");
    } else if (currentURL.includes("/storage/music")) {
        location.replace("/music");
    } else {
        location.replace("/");
    }
});

/* Load iframe with anim */

// Store the original src of the iframe
const originalSrc = iframe.src;

// Function to redirect the iframe to a specific page
function redirectIframe(newSrc, delay) {
    iframe.src = "/storage/loading.html";

    setTimeout(() => {
        iframe.src = newSrc;
    }, delay);
}

// Redirect the iframe and reset after 4000 seconds (1000000 milliseconds)
redirectIframe(iframe.src, 4000);

/* Dynamic update fav */

// Function to change the favicon based on the last part of the URL
function changeFavicon() {
    const url = window.location.href;
    const lastPart = url.substring(url.lastIndexOf('/') + 1);

    const faviconMap = {
        'home': 'home.ico',
        'profile': 'profile.ico',
        'settings': 'settings.ico',
    };

    let favicon = document.querySelector("link[rel='icon']") || document.createElement('link');
    favicon.rel = 'icon';

    if (faviconMap[lastPart]) {
        favicon.href = faviconMap[lastPart];
    } else {
        favicon.href = `/uploads/covers/${lastPart}.png`;
    }

    if (!document.querySelector("link[rel='icon']")) {
        document.head.appendChild(favicon);
    }
}

// Run the function on page load
window.addEventListener('load', changeFavicon);

/* Title */

let pageTitle = document.title;

if (pageTitle.startsWith("GameVerse - ")) {
  document.title = pageTitle.slice("GameVerse - ".length);
}
if (pageTitle.startsWith("MusicVerse - ")) {
  document.title = pageTitle.slice("MusicVerse - ".length);
}
if (pageTitle.startsWith("WatchVerse - ")) {
  document.title = pageTitle.slice("WatchVerse - ".length);
}

window.onload = function() {
    var particlesDiv = document.createElement('div');
    particlesDiv.id = 'particles-js';
    document.body.appendChild(particlesDiv);

    var particlesJsScript = document.createElement('script');
    particlesJsScript.src = '/javascript/particles.js';
    document.body.appendChild(particlesJsScript);

    var particlesConfigScript = document.createElement('script');
    particlesConfigScript.src = '/javascript/particles-config.js';
    document.body.appendChild(particlesConfigScript);
};
