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
          <img src="/uploads/branding/favicon.png" alt="GameVerse Logo">
        </a>
        <div class="nav-links">
          <a href="/"><i class="fa fa-home fa-lg"></i></a>
          <a href="/games"><i class="fa fa-gamepad fa-lg"></i></a>
          <a href="/music"><i class="fa fa-music fa-lg"></i></a>
          <a href="/tv"><i class="fa fa-television fa-lg"></i></a>
          <a href="/blog"><i class="fa fa-comment-alt fa-lg"></i></a>
          
          <a href="https://github.com/the-gameverse"><i class="fa-brands fa-square-github fa-lg"></i></a>

          <!-- Plus icon link to show extra links -->
          <a href="javascript:void(0);" class="plus-icon"><i class="fa fa-plus fa-lg"></i></a>

          <!-- Hidden extra links -->
          <div class="extra-links" style="display: none;">
          <a href="/settings"><i class="fa-solid fa-gear fa-lg"></i></a>
          <a href="/reviews"><i class="fa fa-star fa-lg"></i></a>
            <a href="/share"><i class="fa fa-share-square fa-lg"></i></a>
            <a href="/contact"><i class="fa fa-envelope fa-lg"></i></a>
            
            <!--<a onClick="alert('Attempting to resume your last played game.')" href="/play" ><i class="fa-solid fa-play fa-lg"></i></a>
            <a disabled style="opacity:50%" href="/translate"><i class="fa-solid fa-language fa-lg"></i></a>-->
            
          </div>
        </div>
      </div>
      <!-- Right section: Profile information -->
      <div class="nav-right-bg">
        <a href="/editprofile.html" class="profile-link">
          <img src="${user.photo}" alt="${user.username}" class="profile-img">
          <span class="username">${user.username}</span><img height="20px" width="20px" src="/uploads/images/profile-verified.png" alt="This is a verified GameVerse profile" title="This is a verified GameVerse profile">
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




// Function to inject the popup and the styles dynamically
function injectPopup() {
  // CSS for the popup (using JavaScript to inject styles)
  const style = document.createElement('style');
  style.innerHTML = `
    /* Popup overlay */
    #starship-update-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    #starship-update-popup-overlay.active {
      opacity: 1;
    }

    /* Popup box styling */
    #starship-update-popup {
      background-color: #121212;
      padding: 20px 30px;
      max-width: 400px;
      width: 100%;
      border-radius: 10px;
      text-align: center;
      color: white;
      box-shadow: 0 0 20px rgba(174, 84, 255, 0.5);
    }

    #starship-update-popup h2 {
      font-family: Bebas Neue, sans-serif;
      font-size: 30px;
      color: #ae54ff;
    }

    #starship-update-popup p {
      font-family: Inter, sans-serif;
      font-size: 16px;
      color: white;
      margin-bottom: 20px;
    }

    #starship-update-popup button {
      padding: 10px 20px;
      background-color: #ae54ff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    #starship-update-popup button:hover {
      background-color: #953fff;
      box-shadow: 0 0 10px rgba(174, 84, 255, 0.6);
    }
  `;
  document.head.appendChild(style);

  // Create overlay and popup elements
  const overlay = document.createElement('div');
  overlay.id = 'starship-update-popup-overlay';
  
  const popup = document.createElement('div');
  popup.id = 'starship-update-popup';

  // Add the content to the popup
  popup.innerHTML = `
    <h2>Important Updates</h2>
    <p>We're currently making a lot of changes to the site over the rest of the school year, and throughout the summer, to bring you a brand new experience next school year!</p>
    <p>Things may be broken, moved around, or even non-existent during this time. Also, you might lose access to the website at any moment as links are changing.</p>
    <button id="close-popup">Got it, thanks!</button>
  `;

  // Append the popup to the overlay
  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // Add active class to make the popup visible
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);

  // Close the popup when the "Got it, thanks!" button is clicked
  document.getElementById('close-popup').addEventListener('click', () => {
    overlay.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(overlay); // Remove the popup from DOM after it fades out
    }, 300); // Match fade-out transition duration
  });
}

// Show popup when the page loads
window.addEventListener('load', injectPopup);

 
