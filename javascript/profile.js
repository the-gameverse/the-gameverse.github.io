import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://jbekjmsruiadbhaydlbt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY'
);

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
console.log('🔍 Loaded profile page for username:', username);

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

  const usernameEl = document.getElementById('profile-username');
  usernameEl.textContent = '@' + data.username;

  if (Array.isArray(data.badges)) {
    console.log('🎖️ User has badges:', data.badges);
    data.badges.forEach((badge) => {
      console.log(`➡️ Adding badge icon: ${badge}`);
      const badgeImg = document.createElement('img');
      badgeImg.className = 'badge-icon';
      badgeImg.alt = badge;
      badgeImg.src = `/uploads/badges/${badge}.png`;
      usernameEl.appendChild(badgeImg);
    });
  }

  // 🔒 Handle private profile case
  if (data.private && currentUserId !== data.id) {
    console.log('🔒 Profile is private and not current user — hiding details');
    document.getElementById('profile-pic').style.filter = 'blur(8px)';
    document.getElementById('profile-bio').textContent = 'This profile is private.';
    followBtn.disabled = true;
    followBtn.style.opacity = '0.5';
    followBtn.style.cursor = 'not-allowed';
    followBtn.innerHTML = '<i class="fas fa-lock"></i> Private Profile';
    document.getElementById('follower-count').textContent = '';
    return;
  }

  const bioText = data.bio || 'This user hasn\'t written a bio yet.';
  console.log('📝 Bio set to:', bioText);
  document.getElementById('profile-bio').textContent = bioText;

  const picEl = document.getElementById('profile-pic');
  if (data.avatar_url) {
    if (data.avatar_url.length > 50) {
      console.log('🖼️ Avatar URL too long, omitted from console for clarity');
    } else {
      console.log('🖼️ Avatar loaded:', data.avatar_url);
    }
    picEl.src = data.avatar_url;
  } else {
    console.warn('🕳️ No avatar URL. Using default.');
    picEl.src = '/uploads/default-avatar.png';
  }

  if (data.follower_count !== undefined) {
    const followerText = `${data.follower_count} follower${data.follower_count !== 1 ? 's' : ''}`;
    document.getElementById('follower-count').textContent = followerText;
    console.log('👥 Follower count set to:', followerText);
  }

  // Online status logic starts here
  const onlineDot = document.getElementById('online-indicator');
  if (!onlineDot) {
    console.warn('⚠️ No online indicator element found');
    return;
  }

  const visibility = data.online_status_visibility || 'everyone';

  async function getFollowStatus(followerId, followingId) {
    if (!followerId || !followingId) return false;
    const { data: followData, error } = await supabase
      .from('follows')
      .select('*')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .maybeSingle();
    if (error) {
      console.error('❌ Error checking follow status:', error);
      return false;
    }
    return !!followData;
  }

  function canSeeOnlineStatus(visibilitySetting, viewerId, profileOwnerId, isFollowing, isFollowedBy) {
    if (visibilitySetting === 'no_one') return false;
    if (visibilitySetting === 'everyone') return true;
    if (visibilitySetting === 'mutual_follow') return isFollowing && isFollowedBy;
    return false;
  }

  const viewerId = currentUserId;
  const profileOwnerId = data.id;

  const viewerFollowsProfile = await getFollowStatus(viewerId, profileOwnerId);
  const profileFollowsViewer = await getFollowStatus(profileOwnerId, viewerId);

  const canShowStatus = canSeeOnlineStatus(visibility, viewerId, profileOwnerId, viewerFollowsProfile, profileFollowsViewer);

  if (!canShowStatus) {
    onlineDot.style.display = 'none';
    console.log('🚫 Online status hidden due to visibility settings');
    return;
  }

  if (data.last_active) {
    const minutesAgo = (Date.now() - new Date(data.last_active)) / 1000 / 60;
    const isOnline = minutesAgo < 5;

    if (isOnline) {
      onlineDot.title = '🟢 Online';
      onlineDot.classList.remove('offline');
      onlineDot.style.display = 'inline-block';
      console.log('🟢 User is online and visible');
    } else {
      onlineDot.title = `⚪ Last seen ${Math.floor(minutesAgo)} min ago`;
      onlineDot.classList.add('offline');
      onlineDot.style.display = 'inline-block';
      console.log('⚪ User is offline but visible');
    }
  } else {
    onlineDot.style.display = 'none';
    console.warn('⚠️ No last_active timestamp found');
  }
}

(async () => {
  currentUserId = await getCurrentUserId();

  await loadProfile();

  if (!currentUserId || currentUserId === profileUserId) {
    console.log('🚫 Follow button hidden (own profile or not logged in)');
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
