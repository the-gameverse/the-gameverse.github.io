// Add blog posts

const blogPosts = [
  {
    title: "Welcome to the GameVerse Blog! 🎉",
    image: "../uploads/covers/blog/newblog.png",
    date: { year: 2025, month: 2, day: 5 },
    content:
      "<h1>Welcome to the GameVerse Blog! 🎉</h1>Hey GameVerse fans! 🚀<br><br> We’re super excited to introduce <strong>the official GameVerse Blog</strong>—a place where we’ll be sharing updates, gaming tips, and everything in between! Whether you’re here for unblocked games, music, or videos, this blog is your go-to spot for all things GameVerse.  <h4>Why Start a Blog?</h4>  We wanted to create a space where we can <strong>connect with you</strong>, share what’s new, and talk about the awesome things happening behind the scenes. This blog will keep you updated on new features, upcoming games, site improvements, and even some fun surprises along the way. 👀  <h4>What to Expect</h4>  Here’s what you can look forward to: <br> 🎮 <strong>Game Highlights</strong> – Reviews, recommendations, and updates on the best games available on GameVerse. <br> 🎧 <strong>Music & Videos</strong> – Discover cool tracks and videos you can enjoy while at school. <br> 🛠️ <strong>Site Updates</strong> – Sneak peeks at upcoming features, bug fixes, and improvements. <br> 🔥 <strong>Community Engagement</strong> – Polls, Q&A, and opportunities to have your voice heard!  <h4>Stay Tuned!</h4>  This is just the beginning, and we can’t wait to share more with you.<br>If you have any suggestions for blog topics or features you’d love to see on GameVerse, drop a comment or reach out!  Until next time, keep gaming and stay awesome! 🎮✨ <br><br><br> <strong>— The GameVerse Team</strong>",
  },
  {
    title: "GameVerse February Updates 🚀",
    image: "../uploads/covers/blog/feburaryupdates.png",
    date: { year: 2025, month: 2, day: 6 },
    content:
      "<h2>Hey GameVerse community!</h2> 🎮<br><br> February is here, and we’ve got some exciting updates planned to make GameVerse even better! Here’s what we’re working on this month: <h4>🎯 Achievements Page</h4> We’re adding a brand-new <strong>Achievements Page</strong> where you can track milestones, unlock badges, and see your progress across the site. Whether it’s playing a certain number of games, watching videos, or exploring new features, you’ll soon be able to <strong>earn and show off your achievements!</strong> <h4>⏳ Screen Time Limits</h4> We want to help balance fun and productivity, so we’re introducing <strong>Screen Time Limits</strong>. This feature will help set boundaries to prevent overuse, ensuring a <strong>healthy and responsible</strong> gaming experience. <h4>🚫 IP Block List</h4> To keep GameVerse safe and accessible, we’re implementing an <strong>IP Block List</strong> to monitor and prevent any misuse. This will help us <strong>protect the community</strong> and ensure a smooth experience for everyone. <h4>More Updates Coming Soon!</h4> These are just the highlights for February, but we’re always working behind the scenes to improve GameVerse. Got suggestions? Drop us a message—we’d love to hear from you!<br><br> Stay tuned for more updates, and as always, <strong>keep gaming and stay awesome! 🎮✨</strong> <br><br><br> <strong>— The GameVerse Team</strong>",
  },
  // Add more blog posts above this comment
  // Example of a blog post:
  // {
  //   title: "Test Post #5", Put title here
  //   image: "../uploads/covers/blog/test.jfif", 300x150px
  //   date: { year: 2025, month: 1, day: 31 }, Put the date in this format
  //   content: "Hello Everyone, this is test post #5", Put content here
  // },
];

// Variable to toggle click count visibility
let currentSortOption = "age"; // Default sort option

// Filter games based on search input
function filterBlogPosts() {
  const search = document.getElementById("search").value;
  displayBlogPosts(search);
}

// Handle sorting
function sortBlogPosts() {
  const sortDropdown = document.getElementById("sortOptions");
  if (!sortDropdown) return; // Check if sortDropdown exists

  currentSortOption = sortDropdown.value;
  console.log(`Sorting by: ${currentSortOption}`);
  displayGames(); // Re-render games with new sort option
}

// Function to display the games
function displayBlogPosts(filter = "") {
  const blogPostMenu = document.getElementById("blogPostMenu"); // Ensure you have an element with id 'gameMenu'
  const blogPostCount = document.getElementById("blogPostCount"); // Ensure you have an element with id 'gameCount'
  blogPostMenu.innerHTML = ""; // Clear the menu

  // Sort games based on current sort option
  const filteredBlogPosts = blogPosts
    .filter((post) => post.title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (currentSortOption === "age") {
        // Create Date objects. Remember that JavaScript months are 0-indexed (January is 0)
        const dateA = new Date(a.date.year, a.date.month - 1, a.date.day);
        const dateB = new Date(b.date.year, b.date.month - 1, b.date.day);

        // For descending order (newest first), subtract dateB from dateA
        return dateB - dateA;
      } else if (currentSortOption === "alphabetical") {
        return a.title.localeCompare(b.title); // Alphabetical sorting
      }
      return 0;
    });

  filteredBlogPosts.forEach((post) => {
    const postContainer = document.createElement("a");
    postContainer.addEventListener("click", () =>
      showOverlay({ title: post.title, content: post.content })
    );
    postContainer.classList.add("post");

    const postImage = document.createElement("img");
    postImage.src = post.image;
    postImage.classList.add("left");
    postContainer.appendChild(postImage);

    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right");

    // Create the game name
    const postName = document.createElement("div");
    postName.classList.add("post-name");
    postName.textContent = post.title;
    rightDiv.appendChild(postName);

    postContainer.appendChild(rightDiv);

    // Append the gameDiv to the gameMenu
    blogPostMenu.appendChild(postContainer);
  });

  // Update the game count text
  blogPostCount.textContent = `Blog Posts Loaded: ${filteredBlogPosts.length}`;
}

function showOverlay(content) {
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("blogContent").innerHTML = "<br><br><br><br><br><br>" + content.content + "<br><br><br>";
  document.body.classList.add("overlay-open");
}

function closeOverlay() {
  document.getElementById("overlay").style.display = "none";
  document.body.classList.remove("overlay-open");
}

// Initial display of games
displayBlogPosts();
