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
    statusLo.innerHTML = msg;
  } else if (los === "signup") {
    statusEl.innerHTML = msg;
  }
}

function showLogin() {
  authOptions.style.display = 'none';
  loginSection.style.display = 'block';
  signupSection.style.display = 'none';
}

function showSignup() {
  authOptions.style.display = 'none';
  signupSection.style.display = 'block';
  loginSection.style.display = 'none';
}

async function signUp() {
  const email = signupEmailInput.value;
  const password = signupPasswordInput.value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  const username = signupUsernameInput.value.trim();

  if (!email || !password || !confirmPassword || !username)
    return setStatus('Please fill in all fields.', "signup");
  if (password !== confirmPassword)
    return setStatus('Passwords do not match.', "signup");

  const { data, error } = await supabaseClient.auth.signUp({ email, password });
  if (error) return setStatus('Sign up error: ' + error.message, "signup");

  setStatus('Signed up! Please check your email to confirm, then <a onclick="showLogin()" style="text-decoration: underline; cursor: pointer">log in</a>.', "signup");
}

async function signIn() {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value
  });
  if (error) return setStatus('Login error: ' + error.message, "login");
  setStatus('Logged in!', "login");
  await ensureProfile();
  await checkForAdmin();
  await loadProfile();
  location.reload();
}

async function signOut() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) return setStatus('Logout error: ' + error.message, "login");
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
  const { data, error } = await supabaseClient.from('adminpanel_access').select('username, role')
  data.forEach(admin => {
    if (admin.username === JSON.parse(localStorage.getItem("loggedInUser")).username) {
      localStorage.setItem("isAdmin", JSON.stringify({isAdmin: true, role: admin.role}));
    }
  });
  window.location.reload();
}

async function ensureProfile() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.id)
    .maybeSingle();

  if (!profile) {
    const usernameInputExists = document.body.contains(signupUsernameInput);
    let username = usernameInputExists ? signupUsernameInput.value.trim() : user.email?.split('@')[0] || 'New User';
    await supabaseClient.from('profiles').insert([{ id: user.id, username, avatar_url: null }]);
  } else {
    localStorage.setItem("loggedInUser", JSON.stringify(profile));
  }
}

async function uploadAvatar(userId, file) {
  if (!file) return null;
  const base64Url = await fileToDataUrl(file);
  await updateAvatarUrl(userId, base64Url);
  return base64Url;
}

async function updateAvatarUrl(userId, url) {
  const { error } = await supabaseClient.from('profiles').update({ avatar_url: url }).eq('id', userId);
  if (error) setStatus('Avatar update error: ' + error.message, "login");
}

async function updateUsername() {
  const newUsername = newUsernameInput.value.trim();
  if (!newUsername) return setStatus('Please enter a new username.');
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return setStatus('You must be logged in.', "login");

  showAvatarPopup();
  const { error } = await supabaseClient.from('profiles').update({ username: newUsername }).eq('id', user.id);
  hideAvatarPopup();

  if (error) return setStatus('Username update failed: ' + error.message, "login");
  setStatus('Username updated!', "login");
  await loadProfile();

  const navbarUsername = document.querySelector('.username');
  if (navbarUsername) navbarUsername.textContent = newUsername;
}

async function loadProfile() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return setStatus('Not logged in', "login");

  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.id)
    .maybeSingle();

  if (error) return setStatus('Error loading profile: ' + error.message,  "login");
  if (!profile) return setStatus('No profile found. Please log out and sign in again.', "login");

  profileUsername.textContent = profile.username;

  if (profile?.avatar_url && profile.avatar_url.startsWith('data:image/')) {
    profileAvatar.src = profile.avatar_url;
    profileAvatar.style.display = 'block';
  } else {
    profileAvatar.src = 'default-avatar.png'; // fallback avatar
    profileAvatar.style.display = 'block';
  }

  authOptions.style.display = 'none';
  loginSection.style.display = 'none';
  signupSection.style.display = 'none';
  profileInfo.style.display = 'block';

  const navbarUsername = document.querySelector('.username');
  if (navbarUsername) navbarUsername.textContent = profile.username;
}

profileAvatar.addEventListener('click', async () => {
  let fileInput = document.getElementById('profile-avatar-input');
  if (!fileInput) {
    fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.id = 'profile-avatar-input';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!file || !user) return setStatus('You must be logged in to upload an avatar.', "login");
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
  const file = avatarInput.files[0];
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!file) return setStatus('Please select an image file.', "login");
  if (!user) return setStatus('You must be logged in to upload an avatar.', "login");
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
    if (navbarAvatar) navbarAvatar.src = publicUrl + '?t=' + Date.now();
  }
});

document.getElementById('signup-btn')?.addEventListener('click', function (e) {
  e.preventDefault();
  signUp();
});
document.getElementById('login-btn')?.addEventListener('click', signIn);
document.getElementById('logout-btn')?.addEventListener('click', signOut);
updateUsernameBtn?.addEventListener('click', updateUsername);
window.onload = loadProfile;

function showAvatarPopup() {
  document.getElementById('avatar-upload-popup').style.display = 'flex';
}
function hideAvatarPopup() {
  setTimeout(() => {
    document.getElementById('avatar-upload-popup').style.display = 'none';
    showNotification('Changes uploaded.', {
      body: 'Your changes were made successfully.',
      duration: 5000,
    });
  }, 3000);
}

document.getElementById('toggle-signup-password').onclick = function () {
  const pw = document.getElementById('signup-password');
  pw.type = pw.type === 'password' ? 'text' : 'password';
  this.innerHTML = pw.type === 'text'
    ? '<i class="fa-solid fa-eye-slash"></i>'
    : '<i class="fa-solid fa-eye"></i>';
};

document.getElementById('toggle-signup-confirm-password').onclick = function () {
  const pw = document.getElementById('signup-confirm-password');
  pw.type = pw.type === 'password' ? 'text' : 'password';
  this.innerHTML = pw.type === 'text'
    ? '<i class="fa-solid fa-eye-slash"></i>'
    : '<i class="fa-solid fa-eye"></i>';
};

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
const bioTextarea = document.getElementById('bio-textarea');
const saveBioBtn = document.getElementById('save-bio-btn');
const bioStatus = document.getElementById('bio-status');

async function loadBio() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('bio')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    bioStatus.textContent = 'Error loading bio.';
    return;
  }

  bioTextarea.value = profile?.bio || '';
  bioStatus.textContent = '';
}

async function saveBio() {
  bioStatus.style.color = '#aaa';
  bioStatus.textContent = 'Saving...';

  const newBio = bioTextarea.value.trim();
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    bioStatus.style.color = 'red';
    bioStatus.textContent = 'You must be logged in to save your bio.';
    return;
  }

  const { error } = await supabaseClient
    .from('profiles')
    .update({ bio: newBio })
    .eq('id', user.id);

  if (error) {
    bioStatus.style.color = 'red';
    bioStatus.textContent = 'Failed to save bio: ' + error.message;
  } else {
    bioStatus.style.color = '#0f0';
    bioStatus.textContent = 'Bio saved successfully!';
  }

  setTimeout(() => {
    bioStatus.textContent = '';
  }, 4000);
}

saveBioBtn.addEventListener('click', saveBio);

// Call this when loading profile so bio textarea populates
window.onload = async () => {
  await loadProfile();
  await loadBio();
  await loadPrivateSetting();
};

const privateToggle = document.getElementById('private-toggle');

async function loadPrivateSetting() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  const { data: profile, error } = await supabaseClient
    .from('profiles')
    .select('private')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Error loading privacy setting:', error.message);
    return;
  }

  privateToggle.checked = profile?.private || false;
}

privateToggle.addEventListener('change', async () => {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return alert('You need to be logged in.');

  const newPrivacy = privateToggle.checked;

  const { error } = await supabaseClient
    .from('profiles')
    .update({ private: newPrivacy })
    .eq('id', user.id);

  if (error) {
    alert('Failed to update privacy: ' + error.message);
    // revert toggle
    privateToggle.checked = !newPrivacy;
  } else {
    alert(`Profile privacy set to ${newPrivacy ? 'Private' : 'Public'}.`);
  }
});
