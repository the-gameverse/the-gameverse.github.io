 // File: blogmenu.js
// -----------------
// This module fetches blog posts from Supabase and renders them
// using your existing CSS classes (.post, .left, .right, .post-name, etc.).
// It also implements search, sorting, and overlay functionality exactly as before.

// 1. Import Supabase client from CDN
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 2. Initialize Supabase (replace with your actual values)
const SUPABASE_URL = "https://jbekjmsruiadbhaydlbt.supabase.co";       // 🔁 Replace with your project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY"; // 🔁 Replace with your anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 3. Global state
let blogPosts = [];            // Will hold the array of posts fetched from Supabase
let currentSortOption = "age"; // Default sort: newest first

// 4. DOM elements
const blogPostMenu   = document.getElementById("blogPostMenu");
const blogPostCount  = document.getElementById("blogPostCount");
const searchInput    = document.getElementById("search");
const sortDropdown   = document.getElementById("sortOptions");

// 5. Fetch blog posts from Supabase and normalize them
async function fetchBlogPosts() {
  const { data, error } = await supabase
    .from("blog_menu")
    .select("title, image, date, content");

  if (error) {
    console.error("Error fetching blog posts:", error);
    blogPostMenu.innerHTML = `<p style="color: white; text-align: center;">Failed to load blog posts 😞</p>`;
    return;
  }

  // Normalize each row into the same shape your old static array used:
  // { title, image, date: { year, month, day }, content }
  blogPosts = data.map((row) => {
    // Assume "date" column in Supabase is a DATE or TIMESTAMP string
    const dt = new Date(row.date);
    return {
      title:   row.title,
      image:   row.image,
      date: {
        year:  dt.getUTCFullYear(),
        month: dt.getUTCMonth() + 1,
        day:   dt.getUTCDate(),
      },
      content: row.content,
    };
  });

  // After fetching, immediately render:
  displayBlogPosts();
}

// 6. Render / re-render the posts based on search & sort
function displayBlogPosts(filter = "") {
  // 6.1 Clear out the container
  blogPostMenu.innerHTML = "";

  // 6.2 Filter by title (case-insensitive)
  const filtered = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  );

  // 6.3 Sort according to currentSortOption
  filtered.sort((a, b) => {
    if (currentSortOption === "age") {
      // Newest first: convert to JS Date
      const dateA = new Date(a.date.year, a.date.month - 1, a.date.day);
      const dateB = new Date(b.date.year, b.date.month - 1, b.date.day);
      return dateB - dateA;
    } else if (currentSortOption === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // 6.4 Generate HTML for each post using YOUR CSS classes:
  //     <a class="post">
  //       <img class="left" src="..." />
  //       <div class="right">
  //         <div class="post-name">Title</div>
  //       </div>
  //     </a>
  filtered.forEach((post) => {
    const postContainer = document.createElement("a");
    postContainer.href = "javascript:void(0)";
    postContainer.classList.add("post");
    postContainer.addEventListener("click", () =>
      showOverlay({ title: post.title, content: post.content })
    );

    // -- Left side: image
    const postImage = document.createElement("img");
    postImage.src = post.image;
    postImage.classList.add("left");
    postContainer.appendChild(postImage);

    // -- Right side overlay with title
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right");

    const postName = document.createElement("div");
    postName.classList.add("post-name");
    postName.textContent = post.title;
    rightDiv.appendChild(postName);

    postContainer.appendChild(rightDiv);

    blogPostMenu.appendChild(postContainer);
  });

  // 6.5 Update count text
  blogPostCount.textContent = `Blog Posts Loaded: ${filtered.length}`;
}

// 7. Search handler (called by oninput in HTML)
window.filterBlogPosts = function () {
  const searchValue = searchInput.value;
  displayBlogPosts(searchValue);
};

// 8. Sort handler (called by onchange in HTML)
window.sortBlogPosts = function () {
  currentSortOption = sortDropdown.value;
  displayBlogPosts(searchInput.value);
};

// 9. Overlay functions
window.showOverlay = function (post) {
  const overlay = document.getElementById("overlay");
  const blogTitle    = document.getElementById("blogTitle");
  const blogContent  = document.getElementById("blogContent");

  blogTitle.textContent = post.title;
  blogContent.innerHTML = post.content;
  overlay.style.display = "flex";
  document.body.classList.add("overlay-open");
};

window.closeOverlay = function () {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  document.body.classList.remove("overlay-open");
};

// 10. Kick off the fetch on page load
window.addEventListener("DOMContentLoaded", fetchBlogPosts);
