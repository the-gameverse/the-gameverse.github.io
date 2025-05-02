// Updated CSS
style.innerHTML = `
  .extra-links {
    display: none; /* Initially hidden */
    gap: 10px; /* Adjust space between the icons */
  }

  /*.extra-links a, .nav-links a {
    color: inherit;
    text-decoration: none;
    padding: 10px; /* Match the padding of navbar links */
    display: inline-block; /* Ensure consistent layout */
  }*/

  #plus-icon {
    cursor: pointer;
  }
`;

// Updated Navbar HTML
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
        <!-- Updated Plus icon -->
        <a id="plus-icon"><i class="fa fa-plus fa-lg"></i></a>
      </div>

      <div id="nav-links" class="extra-links">
        <a href="https://github.com/starship-site"><i class="fa-brands fa-square-github fa-lg"></i></a>
        <a href="/settings"><i class="fa fa-gear fa-lg"></i></a>
        <a href="/reviews"><i class="fa fa-star fa-lg"></i></a>
        <a href="/share"><i class="fa-solid fa-share-nodes fa-lg"></i></a>
      </div>
    </div>
    ...
  </nav>
`;

// Updated Event Listener
const plusIcon = document.querySelector('#plus-icon');
const extraLinks = document.querySelector('.extra-links');

if (plusIcon && extraLinks) {
  plusIcon.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    event.stopPropagation(); // Prevent triggering other click listeners
    if (extraLinks.style.display === 'none' || extraLinks.style.display === '') {
      extraLinks.style.display = 'flex'; // Show the extra links horizontally
      plusIcon.innerHTML = '<i class="fa fa-minus fa-lg"></i>'; // Change plus to minus
    } else {
      extraLinks.style.display = 'none';
      plusIcon.innerHTML = '<i class="fa fa-plus fa-lg"></i>'; // Change minus back to plus
    }
  });
}
