document.addEventListener('DOMContentLoaded', () => { // Ensure DOM is loaded before executing the script
  // Log the logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const user = loggedInUser || { username: 'Guest', photo: '/uploads/branding/favicon.png' }; // Default to guest if no user is logged in

  // Render navbar with user info
  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.innerHTML = `
      <div class="navbar">
        <div class="navbar-left">
          <a href="/index.html"><img src="/uploads/branding/favicon-watch.png" alt="Logo" width="10%" height="10%"></a>
          <a href="/index.html" class="gradient-green">WatchVerse</a>
        </div>
        <div class="navbar-right">
          ${user.username !== 'Guest' ? `
            <div class="user-info">
            <a class="user-info" style=color:white href=/editprofile>
              <img src="${user.photo}" alt="${user.username}" class="profile-img">
              <span class="gradient-red">${user.username}</span></a><img height=30px width=30px src=/uploads/images/profile-verified.png alt='This is a verified GameVerse profile' title='This is a verified GameVerse profile'>
            </div>
          ` : '<a class="gradient-red" href="/editprofile.html" style="color:white;">Create Profile <i class="fa fa-user"></i></a>'}
          <div class="divider"></div>
          <div class="navwatch">
            <a href="/"><i class="fa fa-home fa-lg"></i></a>
            <a href="/games"><i class="fa fa-gamepad fa-lg"></i></a>
            <a href="/music"><i class="fa fa-music fa-lg"></i></a>
            <a href="/tv"><i class="fa fa-television fa-lg"></i></a>
            <a href="/blog"><i class="fa fa-comment-alt fa-lg"></i></a>
            <a href="/reviews"><i class="fa fa-star fa-lg"></i></a>
            <a href="/contact"><i class="fa fa-envelope fa-lg"></i></a>
            <a href="/share"><i class="fa fa-share-square fa-lg"></i></a>
            <a href="/personalization"><i class="fa-solid fa-paintbrush fa-lg"></i></a>
            <a href="/screentime"><i class="fa-solid fa-hourglass-end fa-lg"></i></a>
            <div class="divider"></div>
            <a href="https://github.com/the-gameverse"><i class="fa-solid fa-hourglass-end fa-lg"></i></a>
          </div>
        </div>
      </div>
    `;
  }
  const style = document.createElement('style');
  style.innerHTML = `
    .user-info { display: flex; align-items: center; gap: 10px; }
    .user-info:hover { color:white; }
    .profile-img { width: 30px; height: 30px; border-radius: 50%; border: 2px solid #FA1228;}
    .divider { border-left: 1px solid #fff; height: 30px; margin: 0 15px; }
  `;
  document.head.appendChild(style);
});
