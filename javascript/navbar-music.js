// Dynamically add the navbar
document.getElementById("navbar").innerHTML = `
  <div class="navbar">
    <div class="navbar-left">
      <a href="/index.html">
        <img src="/uploads/branding/favicon-music.png" alt="Site Logo" width="10%" height="10%">
      </a>
      <a href="/index.html" class="gradient-blue">MusicVerse</a>
    </div>
    <div class="navbar-right">
      <div class="navmusic">
        <a href="/"><i class="fa fa-home fa-lg"></i></a>
        <a href="/games"><i class="fa fa-gamepad fa-lg"></i></a>
        <a href="/music"><i class="fa fa-music fa-lg"></i></a>
        <a href="/tv"><i class="fa fa-television fa-lg"></i></a>
        <a href="/reviews"><i class="fa fa-star fa-lg"></i></a>
        <a href="/contact"><i class="fa fa-envelope fa-lg"></i></a>
        <a href="/share"><i class="fa fa-share-square fa-lg"></i></a>
      </div>
    </div>
  </div>
`;