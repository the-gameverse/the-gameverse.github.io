import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://jbekjmsruiadbhaydlbt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY'
);

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
console.log('🔍 Loaded profile page for username:', username);

let profileIsPrivate = false;
let currentUserId = null;
let profileUserId = null;
let isFollowing = false;

const followBtn = document.getElementById('follow-btn');

async function getCurrentUserId() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.warn('⚠️ Error fetching current user:', error);
    return null;
  }
  console.log('👤 Current logged in user ID:', user?.id);
  return user?.id || null;
}

async function checkIfFollowing(followerId, followingId) {
  if (!followerId || !followingId) {
    console.log('⚠️ Missing IDs for follow check:', { followerId, followingId });
    return false;
  }
  const { data, error } = await supabase
    .from('follows')
    .select('*')
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
    .maybeSingle();

  if (error) {
    console.error('❌ Error checking follow status:', error);
    return false;
  }
  const following = !!data;
  console.log(`🔄 Follow check: follower ${followerId} following ${followingId}?`, following);
  return following;
}

async function updateFollowButton() {
  if (isFollowing) {
    followBtn.innerHTML = '<i class="fas fa-user-check"></i> Following';
    followBtn.style.background = 'rgba(0, 255, 128, 0.25)';
    followBtn.style.borderColor = 'rgba(0, 255, 128, 0.5)';
    console.log('✅ Follow button updated: Following');
  } else {
    followBtn.innerHTML = '<i class="fas fa-user-plus"></i> Follow';
    followBtn.style.background = 'rgba(138, 43, 226, 0.3)';
    followBtn.style.borderColor = 'rgba(138, 43, 226, 0.6)';
    console.log('✅ Follow button updated: Not following');
  }
}

async function updateFollowerCount() {
  if (!profileUserId) {
    console.warn('⚠️ No profile user ID to update follower count.');
    return;
  }
  const { count, error } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', profileUserId);

  if (error) {
    console.error('❌ Error fetching follower count:', error);
    return;
  }

  const followerText = `${count ?? 0} follower${count === 1 ? '' : 's'}`;
  document.getElementById('follower-count').textContent = followerText;
  console.log('👥 Follower count set to:', followerText);
}

async function toggleFollow() {
  if (!currentUserId || !profileUserId) {
    console.warn('⚠️ Cannot toggle follow — missing user IDs');
    return;
  }
  if (currentUserId === profileUserId) {
    console.log('ℹ️ User cannot follow themselves.');
    return;
  }

  if (isFollowing) {
    console.log('🚫 Unfollowing user:', profileUserId);
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', currentUserId)
      .eq('following_id', profileUserId);

    if (error) {
      console.error('❌ Error unfollowing:', error);
      return;
    }

    isFollowing = false;
  } else {
    console.log('➕ Following user:', profileUserId);
    const { error } = await supabase
      .from('follows')
      .insert({ follower_id: currentUserId, following_id: profileUserId });

    if (error) {
      console.error('❌ Error following:', error);
      return;
    }

    isFollowing = true;
  }

  updateFollowButton();
  updateFollowerCount();
}



async function loadProfile() {
  if (!username) {
    console.warn('⚠️ No username found in query params');
    return;
  }

  console.log('⏳ Fetching profile data for', username);

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) {
    console.error('❌ Error loading profile:', error);
    document.getElementById('profile-username').textContent = 'User not found';
    document.getElementById('profile-bio').textContent = '';
    return;
  }

  console.log('✅ Profile data loaded:', data);
  profileUserId = data.id;

  // 🖼️ Set profile pic
  const profilePic = document.getElementById('profile-pic');
  if (profilePic && data.avatar_url) {
    profilePic.src = data.avatar_url;
  }

  // 📝 Set username + bio
  const usernameEl = document.getElementById('profile-username');
  usernameEl.textContent = '@' + data.username;

  const bioEl = document.getElementById('profile-bio');
  bioEl.textContent = data.bio || '';

  // 🏅 Badges
  if (Array.isArray(data.badges)) {
    data.badges.forEach((badge) => {
      const badgeImg = document.createElement('img');
      badgeImg.className = 'badge-icon';
      badgeImg.alt = badge;
      badgeImg.src = `/uploads/badges/${badge}.png`;
      usernameEl.appendChild(badgeImg);
    });
  }

  // 🔒 Handle private profile
  if (data.private && currentUserId !== data.id) {
    profileIsPrivate = true;
    console.log('🔒 Profile is private — hiding info');

    profilePic.style.filter = 'blur(8px)';
    bioEl.textContent = 'This profile is private.';

    followBtn.disabled = true;
    followBtn.style.opacity = '0.5';
    followBtn.style.cursor = 'not-allowed';
    followBtn.innerHTML = '<i class="fas fa-lock"></i> Private Profile';

    document.getElementById('follower-count').textContent = '';

    document.getElementById('online-indicator').style.display = 'none';
    document.getElementById('current-game-card').style.display = 'none';

    return;
  }

  // ✅ Update follower count
  await updateFollowerCount();

  // 🟢 Online status logic
  const onlineDot = document.getElementById('online-indicator');
  const visibility = data.online_status_visibility || 'everyone';

  const viewerFollowsProfile = await checkIfFollowing(currentUserId, data.id);
  const profileFollowsViewer = await checkIfFollowing(data.id, currentUserId);

  const canShowStatus = (() => {
    if (visibility === 'no_one') return false;
    if (visibility === 'everyone') return true;
    if (visibility === 'mutual_follow') return viewerFollowsProfile && profileFollowsViewer;
    return false;
  })();

  if (!canShowStatus) {
    onlineDot.style.display = 'none';
    document.getElementById('current-game-card').style.display = 'none';
    return;
  }

  if (data.last_active) {
    // Convert "YYYY-MM-DD HH:mm:ss.SSS" to "YYYY-MM-DDTHH:mm:ss.SSSZ" (Z = UTC)
    const isoString = data.last_active.replace(' ', 'T') + 'Z';
    const lastActiveDate = new Date(isoString);
    const now = Date.now();
    const minutesAgo = (now - lastActiveDate.getTime()) / 60000;

    console.log(
      `🕒 User last active ${minutesAgo.toFixed(2)} minutes ago. Should be online?`,
      (!isNaN(minutesAgo) && minutesAgo < 5 && minutesAgo >= 0) ? "Yes" : "No"
    );

    if (minutesAgo < 0) {
      console.warn(`⚠️ last_active is in the future (${minutesAgo.toFixed(2)} min). Treating as offline.`);
      onlineDot.title = `⚪ Offline (invalid activity time)`;
      onlineDot.classList.add('offline');
      onlineDot.style.display = 'inline-block';
    } else if (!isNaN(minutesAgo) && minutesAgo < 5) {
      onlineDot.title = '🟢 Online';
      onlineDot.classList.remove('offline');
      onlineDot.style.display = 'inline-block';
    } else {
      onlineDot.title = `⚪ Last seen ${Math.floor(minutesAgo)} min ago`;
      onlineDot.classList.add('offline');
      onlineDot.style.display = 'inline-block';
    }
  } else {
    console.warn('⚠️ No last_active timestamp found for profile');
    onlineDot.title = `⚪ Offline (no activity recorded)`;
    onlineDot.classList.add('offline');
    onlineDot.style.display = 'inline-block';
  }
}




(async () => {
  currentUserId = await getCurrentUserId();

  await loadProfile();
  await loadProfileGame();

  if (!currentUserId || currentUserId === profileUserId) {
    followBtn.style.display = 'none';
    return;
  }

  isFollowing = await checkIfFollowing(currentUserId, profileUserId);
  updateFollowButton();
  followBtn.addEventListener('click', toggleFollow);
})();


// 🔗 Share button logic
const shareBtn = document.getElementById('share-profile-btn');
const shareStatus = document.getElementById('share-status');

shareBtn?.addEventListener('click', async () => {
  const url = window.location.href;

  try {
    await navigator.clipboard.writeText(url);
    shareStatus.textContent = '🔗 Link copied!';
    shareStatus.style.color = '#4caf50';
    console.log("✅ Copied current profile URL:", url);
  } catch (err) {
    shareStatus.textContent = '❌ Failed to copy';
    shareStatus.style.color = '#f44336';
    console.error("❌ Failed to copy profile URL:", err);
  }

  setTimeout(() => {
    shareStatus.textContent = '';
  }, 4000);
});
  async function loadCurrentGame(gameId) {
    if (!gameId) {
      console.log("🎮 No current game ID — hiding game card.");
      document.getElementById('current-game-card').style.display = 'none';
      return;
    }

    console.log(`🎮 Fetching game with ID: ${gameId}`);

    const { data: game, error } = await supabase
      .from('games_menu')
      .select('name, description, img_url')
      .eq('id', gameId)
      .maybeSingle();

    if (error || !game) {
      console.warn("⚠️ Failed to load game or no game found:", error);
      document.getElementById('current-game-card').style.display = 'none';
      return;
    }

    console.log("✅ Loaded game:", game);

    document.getElementById('current-game-name').textContent = game.name;
    document.getElementById('current-game-desc').textContent = game.description;
    document.getElementById('current-game-img').src = game.img_url;
    document.getElementById('current-game-card').style.display = 'block';
  }

async function loadProfileGame() {
    if (profileIsPrivate) {
    console.log('🔒 Profile is private — skipping game card load.');
    document.getElementById('current-game-card').style.display = 'none';
    return;
  }

  if (!profileUserId) {
    console.log('🎮 No profile user ID, hiding game card.');
    document.getElementById('current-game-card').style.display = 'none';
    return;
  }

  // Fetch current_game_id for profileUserId
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('current_game_id')
    .eq('id', profileUserId)
    .single();

  if (error || !profile) {
    console.warn('⚠️ Could not fetch profile game:', error);
    document.getElementById('current-game-card').style.display = 'none';
    return;
  }

  console.log('👾 Current game ID for profile:', profile.current_game_id);
  await loadCurrentGame(profile.current_game_id);
}
