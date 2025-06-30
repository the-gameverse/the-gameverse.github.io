// | XTXhXiXsX XfXiXlXeX XiXsX XnXoXtX XuXsXeXdX.X XAXlXlX XtXhXeX
// | XcXoXdXeX XtXhXaXtX XiXsX XhXeXrXeX
// | XhXaXsX XbXeXeXnX XcXoXpXiXeXdX XtXoX XtXhXeX XmXaXiXnX
// | XhXtXmXlX XfXiXlXeX X(XaXdXmXiXnX.XhXtXmXlX)X.X
// |
// | Thank you for your understanding!
// |
// | -TannerO (Co-Founder of starship)

// #region Overlay Screens
// Define Overlay Screens
const overlayScreens = {
  viewblogpost: `
              <img src="{blogpostimg}" alt="Blog Cover" class="viewingimg"/>
              <h2>{blogpostitle}</h2>
              <p>{blogpostcontent}</p>
            `,
  editblogpost: `
              <h2>{createoredit} Blog Post</h2>
              <form id="blogForm" data-coe='{createoredit}'>
                <label for="blogCover">Blog Cover Image:</label><br>
                <input type="file" id="blogCover" name="blogCover" accept="image/*" autocomplete="off"/><br><br>

                <label for="postTitle">Post Title:</label><br>
                <input type="text" id="postTitle" name="postTitle" autocomplete="off" required /><br><br>

                <label for="postContent">Content:</label><br>
               <textarea id="postContent" name="postContent"></textarea><br><br>

               <button type="submit">Submit</button><br>
             </form>
            {deleteButton}
            `,
  editgame: `
              <h2>{createoredit} Game</h2>
              <form id="gameForm" data-coe="{createoredit}">
                <label for="gameName">Game Name:</label>
                <input type="text" id="gameName" required />
                <label for="gameCover">Game Cover:</label>
                <input type="file" accept="image/*" id="gameCover" required />
                <label for="gameURL">Game URL:</label>
                <input id="gameURL" type="text" required />
                <button type="submit" id="gameSubmitBtn">Submit</button>
              </form>
              {deleteButton}
            `,
  addAdmin: `
              <h2>Add Admin</h2>
              <form id="addAdminForm">
                <label for="adminUsername">Username:</label>
                <input type="text" id="adminUsername" name="adminUsername" required />
                <label for="adminEmail">Email:</label>
                <input type="email" id="adminEmail" name="adminEmail" required />
                <label for="adminRole">Role:</label>
                <select id="adminRole" name="adminRole">
                  <option value="super">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="gameadd">Game Adder</option>
                  <option value="editor">Editor</option>
                </select>
                <button type="submit">Add Admin</button>
              </form>
            `,
};

// Supabase config
// const supabaseUrl = "https://jbekjmsruiadbhaydlbt.supabase.co";
// const supabaseKey =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// #region Game Functions
async function addGame(gameName, gameLink, gameCoverFile) {
  if (!gameName || !gameLink || !gameCoverFile) {
    alert("Please fill in all fields.");
    return;
  }

  // Step 1: Convert file to Base64
  const base64Image = await fileToBase64(gameCoverFile);

  // Step 2: Insert into Supabase
  const { data, error } = await supabase.from("games_menu").insert([
    {
      name: gameName,
      url: gameLink,
      img_url: base64Image, // Save as base64 string
    },
  ]);

  if (error) {
    console.error("❌ Supabase insert error:", error.message);
    alert("Game could not be added.");
    return;
  }

  console.log("✅ Game added to DB:", data);
  refreshGamesList();
}

async function deleteGame(gameId) {
  console.log(`Type of gameId: ${typeof gameId}, Value: ${gameId}`);
  const { error } = await supabase
    .from("games_menu")
    .delete()
    .eq("id", parseInt(gameId));

  if (error) {
    console.error("❌ Error deleting game:", error.message);
    alert("Failed to delete game.");
    return;
  }
}

async function refreshGamesList() {
  // Clear the current games list
  const gamesList = document.querySelector(".gamedisplay");
  gamesList.innerHTML = "";

  const { data, error } = await supabase
    .from("games_menu")
    .select("id, name, url, img_url");

  data.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";
    gameCard.dataset.url = game.url;
    gameCard.dataset.id = game.id;
    gameCard.innerHTML = `
      <img
                class="game-thumbnail"
                src="${game.img_url}"
                alt="Game Thumbnail"
              />
              <div class="game-meta-row">
                <div class="game-info">
                  <h4 class="game-title">${game.name}</h4>
                </div>
                <button class="edit-btn" title="Edit">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
    `;
    gamesList.appendChild(gameCard);
    // Manually trigger your existing click handler here
    gameCard.addEventListener("click", (e) => {
      window._editingGameId = game.id;

      const name = gameCard.querySelector(".game-title").textContent;
      const gameUrl = gameCard.dataset.url;

      const html = overlayScreens.editgame
        .replaceAll("{createoredit}", "Edit")
        .replace(
          "{deleteButton}",
          `<button id="deleteGameBtn" style="margin-top: 20px; background: #dc2626; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">Delete Game</button>`
        );
      openOverlay1(html);

      setTimeout(() => {
        document.getElementById("gameName").value = name;
        document.getElementById("gameURL").value = gameUrl;
      }, 50);
    });
  });
}

function safeRefreshGamesList() {
  const gamesList = document.querySelector(".gamedisplay");
  if (!gamesList) {
    console.warn("Waiting for .gamedisplay to appear...");
    requestAnimationFrame(safeRefreshGamesList);
    return;
  }
  refreshGamesList();
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result); // full base64 string: data:image/png;base64,...
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// #region Blog Functions
// Blog Post Functions
async function refreshBlogPosts() {
  const container = document.querySelector(".blogposts");
  if (!container) return;

  container.innerHTML = ""; // clear previous posts

  const { data: posts, error } = await supabase
    .from("blog_menu")
    .select("id, title, content, image");

  if (error) {
    console.error("❌ Failed to load blog posts:", error.message);
    container.innerHTML =
      "<p>Error loading blog posts, look at console for more details</p>";
    return;
  }

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.dataset.id = post.id;

    card.innerHTML = `
      <img class="post-thumbnail" src="${post.image}" alt="Blog cover" />
      <div class="post-info">
        <h4 class="post-title">${post.title}</h4>
        <button class="edit-btn" title="Edit">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
      <p class="markdown-preview" data-markdown="${post.content.replace(
        /"/g,
        "&quot;"
      )}" hidden></p>
    `;

    container.appendChild(card);
  });
  document.querySelectorAll(".post-card").forEach((card) => {
    card.addEventListener("click", async (e) => {
      // Ignore clicks on the edit button
      if (e.target.closest(".edit-btn")) return;

      const postId = card.dataset.id;
      if (!postId) return;

      // Fetch full post from Supabase
      const { data: post, error } = await supabase
        .from("blog_menu")
        .select("title, content, image")
        .eq("id", postId)
        .single();

      if (error || !post) {
        alert("Failed to load blog post.");
        console.error(error);
        return;
      }

      // Render using your overlay template
      const html = overlayScreens.viewblogpost
        .replace("{blogpostimg}", post.image)
        .replace("{blogpostitle}", post.title)
        .replace("{blogpostcontent}", marked.parse(post.content));

      openOverlay1(html);
    });
  });
  document.querySelectorAll(".post-card .edit-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation(); // Prevents triggering the view overlay

      const post = btn.closest(".post-card");
      const postId = post.dataset.id;

      const { data, error } = await supabase
        .from("blog_menu")
        .select("title, content, image")
        .eq("id", postId)
        .single();

      if (error || !data) {
        alert("Failed to load blog post.");
        console.error(error);
        return;
      }

      const html = overlayScreens.editblogpost
        .replaceAll("{createoredit}", "Edit")
        .replace(
          "{deleteButton}",
          `<button id="deleteBlogPostBtn" style="margin-top: 20px; background: #dc2626; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">Delete Post</button>`
        );

      openOverlay1(html);
      window._editingBlogId = postId;

      setTimeout(() => {
        document.getElementById("postTitle").value = data.title;
        easyMDE.value(data.content);
        // Note: can't prefill file input for image
      }, 50);
    });
  });
}
window.addEventListener("DOMContentLoaded", () => {
  safeRefreshGamesList();
  refreshBlogPosts();
  refreshAdminList();
});

// #endregion
// #region Admin Functions
// Admin Functions
async function refreshAdminList() {
  console.log("Starting Refresh...");
  const tableBody = document.getElementById("adminList");
  if (!tableBody) return;
  console.log("Found table body:", tableBody);

  tableBody.innerHTML = ""; // Clear out old/fake entries

  const { data: admins, error } = await supabase
    .from("adminpanel_access")
    .select("user_uid, avatar, username, email, role");

  if (error) {
    console.error("❌ Failed to fetch admins:", error.message);
    tableBody.innerHTML = `<tr><td colspan="5">Error loading admins</td></tr>`;
    return;
  }
  console.log("Fetched admins:", admins);

  admins.forEach((admin) => {
    const row = document.createElement("tr");

    // Change Role display
    if (admin.role === "super") {
      admin.role = "Super Admin";
    } else if (admin.role === "admin") {
      admin.role = "Admin";
    } else if (admin.role === "gameadd") {
      admin.role = "Game +";
    } else if (admin.role === "editor") {
      admin.role = "Editor";
    } else {
      alert("Invalid role selected.");
      return;
    }

    row.innerHTML = `
      <td>
        <img
          src="${admin.avatar}"
          alt="${admin.username}'s avatar"
          style="width: 36px; height: 36px; border-radius: 999px; object-fit: cover;"
        />
      </td>
      <td>${admin.username}</td>
      <td>${admin.email}</td>
      <td>${admin.role}</td>
      <td>
        <button class="remove-btn" data-id="${admin.user_uid}" title="Remove admin">✖</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  // Hook up remove buttons
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const adminId = btn.dataset.id;
      const confirmDelete = confirm(
        "Are you sure you want to remove this admin?"
      );
      if (!confirmDelete) return;

      const { error } = await supabase
        .from("adminpanel_access")
        .delete()
        .eq("user_uid", adminId);

      if (error) {
        alert("❌ Failed to remove admin.");
        console.error(error);
        return;
      }

      alert("✅ Admin removed.");
      refreshAdminList();
    });
  });
}

//#region Restrictions
document.addEventListener("DOMContentLoaded", () => {
  const admincontainer = document.querySelector(".admincontainer");
  const blog = document.querySelector(".blog");
  const games = document.querySelector(".games");
  const admin = document.querySelector(".admins");

  async function checkRole() {
    const { data, error } = await supabaseClient
      .from("adminpanel_access")
      .select("username, role");

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || !data) return;

    const matched = data.find(
      (entry) => entry.username === loggedInUser.username
    );
    console.log("Matched user:", matched);
    console.log(games, admin, blog);

    if (matched) {
      if (matched.role === "editor") {
        console.log("User is an editor, hiding admin features");
        // Remove elements from their parent
        games.remove();
        admin.remove();
      } else if (matched.role === "gameadd") {
        console.log("User is a game adder, hiding admin features");
        blog.remove()
        admin.remove();
      } else if (matched.role === "admin") {
        console.log("User is an admin, hiding admin features");
        // Remove elements from their parent
        admin.remove();
      } else if (matched.role === "super") {
        console.log("User is a super admin, showing all features");
      } else {
        console.warn("Unknown role:", matched.role);
      }
    }
  }

  checkRole();
});
