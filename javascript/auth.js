const supabaseUrl = 'https://jbekjmsruiadbhaydlbt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const signupUsernameInput = document.getElementById('signup-username');
const signupAvatarInput = document.getElementById('signup-avatar');
const statusLo = document.getElementById('status-lo');
const statusEl = document.getElementById('status');
const profileInfo = document.getElementById('profile-info');
const profileUsername = document.getElementById('profile-username');
const profileAvatar = document.getElementById('profile-avatar');
const newUsernameInput = document.getElementById('new-username');
const updateUsernameBtn = document.getElementById('update-username-btn');
const authOptions = document.getElementById('auth-options');
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');

function setStatus(msg, los) {
  if (los === "login") {
    console.log(`💬 [Status - Login]: ${msg}`);
    statusLo.innerHTML = msg;
  } else if (los === "signup") {
    console.log(`💬 [Status - Signup]: ${msg}`);
    statusEl.innerHTML = msg;
  } else {
    console.log(`💬 [Status]: ${msg}`);
  }
}

function showLogin() {
  console.log("🔄 Switching to Login view");
  authOptions.style.display = 'none';
  loginSection.style.display = 'block';
  signupSection.style.display = 'none';
}

function showSignup() {
  console.log("🔄 Switching to Signup view");
  authOptions.style.display = 'none';
  signupSection.style.display = 'block';
  loginSection.style.display = 'none';
}

async function signUp() {
  const email = signupEmailInput.value;
  const password = signupPasswordInput.value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  const username = signupUsernameInput.value.trim();

  console.log(`📝 SignUp attempt for email: ${email} username: ${username}`);

  if (!email || !password || !confirmPassword || !username) {
    console.warn("⚠️ SignUp failed: Missing fields");
    return setStatus('Please fill in all fields.', "signup");
  }
  if (password !== confirmPassword) {
    console.warn("⚠️ SignUp failed: Passwords do not match");
    return setStatus('Passwords do not match.', "signup");
  }

  const { data, error } = await supabaseClient.auth.signUp({ email, password });
  if (error) {
    console.error("❌ SignUp error:", error);
    return setStatus('Sign up error: ' + error.message, "signup");
  }

  console.log("✅ SignUp successful:", data);
  setStatus('Signed up! Now you can, <a onclick="showLogin()" style="text-decoration: underline; cursor: pointer">log in</a>.', "signup");
}

async function signIn() {
  console.log(`🔐 SignIn attempt for email: ${emailInput.value}`);
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value
  });
  if (error) {
    console.error("❌ Login error:", error);
    return setStatus('Login error: ' + error.message, "login");
  }
  console.log("✅ Logged in successfully:", data);
  setStatus('Logged in!', "login");
  await ensureProfile();
  await checkForAdmin();
  await loadProfile();
  location.reload();
}

async function signOut() {
  console.log("🚪 Signing out user");
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error("❌ Logout error:", error);
    return setStatus('Logout error: ' + error.message, "login");
  }
  console.log("✅ Logged out successfully");
  profileInfo.style.display = 'none';
  authOptions.style.display = 'block';
  loginSection.style.display = 'none';
  signupSection.style.display = 'none';
  setStatus('Logged out!', "login");
  localStorage.removeItem("loggedInUser");
  localStorage.setItem("isAdmin", JSON.stringify({isAdmin: false, role: null}));
  location.reload();
}

async function checkForAdmin() {
  console.log("🔍 Checking admin access...");
  const { data, error } = await supabaseClient.from('adminpanel_access').select('username, role');
  if (error) {
    console.error("❌ Error fetching admin data:", error);
    return;
  }
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    console.warn("⚠️ No loggedInUser in localStorage");
    return;
  }
  data.forEach(admin => {
    if (admin.username === loggedInUser.username) {
      console.log(`👑 Admin access granted for user: ${admin.username} with role: ${admin.role}`);
      localStorage.setItem("isAdmin", JSON.stringify({isAdmin: true, role: admin.role}));
    }
  });
  window.location.reload();
}

async function ensureProfile() {
  console.log("⏳ Ensuring profile exists for logged in user...");
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    console.warn("⚠️ No logged in user found during ensureProfile");
    return;
  }

  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile) {
    console.log("🆕 No profile found, creating new profile");
    const usernameInputExists = document.body.contains(signupUsernameInput);
    let username = usernameInputExists ? signupUsernameInput.value.trim() : user.email?.split('@')[0] || 'New User';
    await supabaseClient.from('profiles').insert([{ id: user.id, username, avatar_url: null }]);
    console.log(`✅ Profile created with username: ${username}`);
  } else {
    console.log("✅ Profile exists:", profile);
    localStorage.setItem("loggedInUser", JSON.stringify(profile));
  }
}

async function uploadAvatar(userId, file) {
  if (!file) {
    console.warn("⚠️ No file provided for avatar upload");
    return null;
  }
  console.log("📤 Uploading avatar...");
  const base64Url = await fileToDataUrl(file);
  await updateAvatarUrl(userId, base64Url);
  console.log("✅ Avatar uploaded and URL updated");
  return base64Url;
}

async function updateAvatarUrl(userId, url) {
  console.log("🔄 Updating avatar URL in profile...");
  const { error } = await supabaseClient.from('profiles').update({ avatar_url: url }).eq('id', userId);
  if (error) {
    console.error("❌ Avatar update error:", error);
    setStatus('Avatar update error: ' + error.message, "login");
  } else {
    console.log("✅ Avatar URL updated successfully");
  }
}

async function updateUsername() {
  const newUsername = newUsernameInput.value.trim();
  console.log(`✏️ Attempting username update to: ${newUsername}`);
  if (!newUsername) {
    console.warn("⚠️ Username update failed: no input");
    return setStatus('Please enter a new username.');
  }
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    console.warn("⚠️ Username update failed: not logged in");
    return setStatus('You must be logged in.', "login");
  }

  showAvatarPopup();
  const { error } = await supabaseClient.from('profiles').update({ username: newUsername }).eq('id', user.id);
  hideAvatarPopup();

  if (error) {
    console.error("❌ Username update failed:", error);
    return setStatus('Username update failed: ' + error.message, "login");
  }
  console.log("✅ Username updated successfully");
  setStatus('Username updated!', "login");
  await loadProfile();

  const navbarUsername = document.querySelector('.username');
  if (navbarUsername) navbarUsername.textContent = newUsername;
}

async function loadProfile() {
  console.log("⏳ Loading profile data for current user...");
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    console.warn("⚠️ No logged in user found during profile load");
    return setStatus('Not logged in', "login");
  }

  let { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.id)
    .maybeSingle();

  // Create or select warning section
  let warningSection = document.getElementById('profile-warning');
  if (!warningSection) {
    warningSection = document.createElement('div');
    warningSection.id = 'profile-warning';
    warningSection.style = "background:rgba(255,0,0,0.15);color:#b00;padding:18px 24px;margin:16px auto;border-radius:12px;max-width:500px;font-weight:bold;display:none;";
    warningSection.innerHTML = "<h3> Your account isn't connected to a profile. </h3>  <p>This can cause issues with your account, and may cause failures with sync, and other features. Please log out, then log back in to fix it. If this keeps happening after, please contact support.</p><button id='logout-btn'>Log Out</button>";
    document.body.insertBefore(warningSection, document.body.firstChild);
    // Attach logout event
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      console.log("🚪 Logout button clicked (from warning section)");
      signOut();
    });
  }

  if (error) {
    console.error("❌ Error loading profile:", error);
    setStatus('Error loading profile: ' + error.message,  "login");
    warningSection.style.display = "block";
    return;
  }

  if (!profile) {
    // No profile found, create one
    console.warn("⚠️ No profile found for user, creating one...");
    // Default username: use before @ in email, or "User"
    const defaultUsername = user.email ? user.email.split('@')[0] : 'User';
    const { error: createError } = await supabaseClient
      .from('profiles')
      .insert([{ id: user.id, username: defaultUsername }]);
    if (createError) {
      console.error("❌ Failed to create profile:", createError);
      setStatus('Failed to create profile: ' + createError.message, "login");
      warningSection.style.display = "block";
      return;
    }
    // Try to load the new profile again
    ({ data: profile } = await supabaseClient
      .from('profiles')
      .select('username, avatar_url')
      .eq('id', user.id)
      .maybeSingle());
    setStatus('Profile created! Please finish setting up your account.', "login");
    showNotification('Account recovered', {
      body: 'Your account was successfully recovered and a profile was created. Customize your profile now.', 
      duration: 5000,
      persistClose: true
    });
    warningSection.style.display = "none";
  } else {
    // Hide warning if profile exists
    warningSection.style.display = "none";
  }

  if (!profile) {
    // Still no profile, show warning
    warningSection.style.display = "block";
    return;
  }

  console.log("✅ Profile loaded:", profile);
  profileUsername.textContent = profile.username;

  if (profile?.avatar_url && profile.avatar_url.startsWith('data:image/')) {
    profileAvatar.src = profile.avatar_url;
    profileAvatar.style.display = 'block';
    console.log("🖼️ Avatar set from data URL");
  } else {
    profileAvatar.src = 'default-avatar.png'; // fallback avatar
    profileAvatar.style.display = 'block';
    console.log("🖼️ Using default avatar");
  }

  authOptions.style.display = 'none';
  loginSection.style.display = 'none';
  signupSection.style.display = 'none';
  profileInfo.style.display = 'block';

  const navbarUsername = document.querySelector('.username');
  if (navbarUsername) navbarUsername.textContent = profile.username;
}

profileAvatar.addEventListener('click', async () => {
  console.log("👆 Avatar clicked, triggering file input...");
  let fileInput = document.getElementById('profile-avatar-input');
  if (!fileInput) {
    console.log("➕ Creating hidden file input for avatar upload");
    fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.id = 'profile-avatar-input';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!file || !user) {
        console.warn("⚠️ Upload aborted: no file or user not logged in");
        return setStatus('You must be logged in to upload an avatar.', "login");
      }
      showAvatarPopup();
      setStatus('Uploading avatar...', "login");
      const publicUrl = await uploadAvatar(user.id, file);
      hideAvatarPopup();
      if (publicUrl) {
        await updateAvatarUrl(user.id, publicUrl);
        await loadProfile();
        setStatus('Avatar updated!', "login");
      }
      fileInput.value = '';
    });
  }
  fileInput.click();
});

const updateAvatarBtn = document.getElementById('update-avatar-btn');
const avatarInput = document.getElementById('profile-avatar-input');

updateAvatarBtn?.addEventListener('click', async () => {
  console.log("🔄 Update avatar button clicked");
  const file = avatarInput.files[0];
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!file) {
    console.warn("⚠️ No image file selected");
    return setStatus('Please select an image file.', "login");
  }
  if (!user) {
    console.warn("⚠️ User not logged in for avatar upload");
    return setStatus('You must be logged in to upload an avatar.', "login");
  }
  showAvatarPopup();
  setStatus('Uploading avatar...', "login");
  const publicUrl = await uploadAvatar(user.id, file);
  hideAvatarPopup();
  if (publicUrl) {
    await updateAvatarUrl(user.id, publicUrl);
    await loadProfile();
    setStatus('Avatar updated!', "login");
    avatarInput.value = '';
    const navbarAvatar = document.querySelector('.profile-img');
    if (navbarAvatar) {
      navbarAvatar.src = publicUrl + '?t=' + Date.now();
      console.log("🖼️ Navbar avatar updated with new image");
    }
  }
});

document.getElementById('signup-btn')?.addEventListener('click', function (e) {
  e.preventDefault();
  console.log("👤 Signup button clicked");
  signUp();
});
document.getElementById('login-btn')?.addEventListener('click', () => {
  console.log("🔑 Login button clicked");
  signIn();
});
document.getElementById('logout-btn')?.addEventListener('click', () => {
  console.log("🚪 Logout button clicked");
  signOut();
});
updateUsernameBtn?.addEventListener('click', () => {
  console.log("✏️ Update username button clicked");
  updateUsername();
});
window.onload = async () => {
  console.log("🌐 Window loaded, loading profile and bio...");
  await loadProfile();
  await loadBio();
  await loadPrivateSetting();
};

function showAvatarPopup() {
  console.log("📤 Showing avatar upload popup");
  document.getElementById('avatar-upload-popup').style.display = 'flex';
}
function hideAvatarPopup() {
  console.log("📥 Hiding avatar upload popup");
  setTimeout(() => {
    document.getElementById('avatar-upload-popup').style.display = 'none';
    showNotification('Changes uploaded.', {
      body: 'Your changes were made successfully.',
      duration: 5000,
    });
  }, 3000);
}

document.getElementById('toggle-signup-password').onclick = function () {
  console.log("👁️ Toggling signup password visibility");
  const pw = document.getElementById('signup-password');
  pw.type = pw.type === 'password' ? 'text' : 'password';
  this.innerHTML = pw.type === 'text'
    ? '<i class="fa-solid fa-eye-slash"></i>'
    : '<i class="fa-solid fa-eye"></i>';
};

document.getElementById('toggle-signup-confirm-password').onclick = function () {
  console.log("👁️ Toggling signup confirm password visibility");
  const pw = document.getElementById('signup-confirm-password');
  pw.type = pw.type === 'password' ? 'text' : 'password';
  this.innerHTML = pw.type === 'text'
    ? '<i class="fa-solid fa-eye-slash"></i>'
    : '<i class="fa-solid fa-eye"></i>';
};

function fileToDataUrl(file) {
  console.log("🔄 Converting file to DataURL...");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log("✅ File converted to DataURL");
      resolve(reader.result);
    };
    reader.onerror = (err) => {
      console.error("❌ File conversion failed:", err);
      reject(err);
    };
    reader.readAsDataURL(file);
  });
}

const bioTextarea = document.getElementById('bio-textarea');
const saveBioBtn = document.getElementById('save-bio-btn');
const bioStatus = document.getElementById('bio-status');

async function loadBio() {
  console.log("⏳ Loading user bio...");
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    console.warn("⚠️ No logged in user found during bio load");
    return;
  }

  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('bio')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error("❌ Error loading bio:", error);
    bioStatus.textContent = 'Error loading bio.';
    return;
  }

  console.log("✅ Bio loaded:", profile?.bio);
  bioTextarea.value = profile?.bio || '';
  bioStatus.textContent = '';
}

async function saveBio() {
  console.log("💾 Saving bio...");
  bioStatus.style.color = '#aaa';
  bioStatus.textContent = 'Saving...';

  const newBio = bioTextarea.value.trim();
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    console.warn("⚠️ User must be logged in to save bio");
    bioStatus.style.color = 'red';
    bioStatus.textContent = 'You must be logged in to save your bio.';
    return;
  }

  const { error } = await supabaseClient
    .from('profiles')
    .update({ bio: newBio })
    .eq('id', user.id);

  if (error) {
    console.error("❌ Failed to save bio:", error);
    bioStatus.style.color = 'red';
    bioStatus.textContent = 'Failed to save bio: ' + error.message;
  } else {
    console.log("✅ Bio saved successfully");
    bioStatus.style.color = '#0f0';
    bioStatus.textContent = 'Bio saved successfully!';
  }

  setTimeout(() => {
    bioStatus.textContent = '';
  }, 4000);
}

saveBioBtn.addEventListener('click', saveBio);

window.onload = async () => {
  console.log("🌐 Window loaded, loading profile, bio, and privacy setting...");
  await loadProfile();
  await loadBio();
  await loadPrivateSetting();
};

const privateToggle = document.getElementById('private-toggle');

async function loadPrivateSetting() {
  console.log("🔒 Loading profile privacy setting...");
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    console.warn("⚠️ No logged in user found when loading privacy setting");
    return;
  }

  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('private')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error("❌ Error loading privacy setting:", error.message);
    return;
  }

  console.log(`✅ Privacy setting loaded: private=${profile?.private || false}`);
  privateToggle.checked = profile?.private || false;
}

privateToggle.addEventListener('change', async () => {
  console.log("🔄 Privacy toggle changed");
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    alert('You need to be logged in.');
    console.warn("⚠️ Privacy toggle change aborted - user not logged in");
    return;
  }

  const newPrivacy = privateToggle.checked;
  console.log(`🔐 Updating privacy setting to: ${newPrivacy}`);

  const { error } = await supabaseClient
    .from('profiles')
    .update({ private: newPrivacy })
    .eq('id', user.id);

if (error) {
  alert('Failed to update privacy: ' + error.message);
  console.error("❌ Failed to update privacy setting:", error);
  // revert toggle
  privateToggle.checked = !newPrivacy;
} else {
  console.log(`✅ Privacy setting updated successfully to ${newPrivacy}`);
  if (newPrivacy) {
    showNotification("You're anonymous, explorer!", {
      body: "You've vanished from the public eye. Your profile is now private.",
      duration: 5000,
    });
  } else {
    showNotification("Out of hiding?", {
      body: "Your profile is now public again. Welcome back to the spotlight!",
      duration: 5000,
    });
  }
}
});
const statusVisibilityRadios = document.querySelectorAll('input[name="status-visibility"]');

async function loadStatusVisibility() {
  const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
  if (userError || !user) {
    console.warn('⚠️ No logged in user found or error:', userError);
    return;
  }

  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('online_status_visibility')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('❌ Error loading status visibility:', error);
    return;
  }

  const visibility = profile?.online_status_visibility || 'everyone';
  console.log(`👀 Loaded status visibility: ${visibility}`);

  statusVisibilityRadios.forEach(radio => {
    radio.checked = radio.value === visibility;
  });
}

statusVisibilityRadios.forEach(radio => {
  radio.addEventListener('change', async () => {
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      alert('🚫 You must be logged in to change this setting.');
      console.warn('🚫 Attempt to change status visibility without login.');
      return;
    }

    const newVisibility = document.querySelector('input[name="status-visibility"]:checked').value;

    const { error } = await supabaseClient
      .from('profiles')
      .update({ online_status_visibility: newVisibility })
      .eq('id', user.id);

    if (error) {
      alert('❌ Failed to update status visibility: ' + error.message);
      console.error('❌ Error updating status visibility:', error);
    } else {
      console.log(`✅ Status visibility updated to: ${newVisibility}`);
      // Show notification based on selection
      if (newVisibility === "everyone") {
        showNotification("You're visible to the galaxy!", {
          body: "Everyone can now see your online status. Shine bright!",
          duration: 5000,
        });
      } else if (newVisibility === "mutual") {
        showNotification("Only your crew can see you.", {
          body: "Your online status is now visible only to mutual followers.",
          duration: 5000,
        });
      } else if (newVisibility === "noone") {
        showNotification("You've gone dark.", {
          body: "No one can see your online status now. Total stealth mode activated.",
          duration: 5000,
        });
      }
    }
  });
});
// Call on page load
loadStatusVisibility()