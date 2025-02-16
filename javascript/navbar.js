document.addEventListener('DOMContentLoaded', () => {
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
          <a href="/share"><i class="fa fa-share-square fa-lg"></i></a>
          <a href="/contact"><i class="fa fa-envelope fa-lg"></i></a>
          <a href="/reviews"><i class="fa fa-star fa-lg"></i></a>
          <a href="/personalization"><i class="fa-solid fa-paintbrush fa-lg"></i></a>
          <a href="/screentime"><i class="fa-solid fa-hourglass-end fa-lg"></i></a>
          </div>
        </div>
      </div>
      <!-- Right section: Profile information -->
      <div class="nav-right-bg">
        <a href="/editprofile.html" class="profile-link">
          <img src="${user.photo}" alt="${user.username}" class="profile-img">
          <span class="username">${user.username}</span><img height=30px width=30px src="/uploads/images/profile-verified.png" alt="This is a verified GameVerse profile" title="This is a verified GameVerse profile">
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
      extraLinks.style.display = 'block';
      plusIcon.innerHTML = '<i class="fa fa-minus fa-lg"></i>'; // Change plus to minus
    } else {
      extraLinks.style.display = 'none';
      plusIcon.innerHTML = '<i class="fa fa-plus fa-lg"></i>'; // Change minus back to plus
    }
  });
});
