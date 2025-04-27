function saveProfile(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const photoUrl = document.getElementById("profileImage").value;
  const photoFileInput = document.getElementById("profileImageFile");
  const photoFile = photoFileInput.files[0];
  if (!username) {
    alert("Please enter a username.");
    return;
  }
  if (photoFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      saveToLocalStorage(username, event.target.result);
    };
    reader.readAsDataURL(photoFile);
  } else if (photoUrl) {
    saveToLocalStorage(username, photoUrl);
  } else {
    alert("Please provide a photo via URL or upload.");
  }
}
function saveToLocalStorage(username, photo) {
  const updatedUser = { username: username, photo: photo };
  localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
  displayUserInfo();
  alert("Profile saved successfully!");
}
function displayUserInfo() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    document.getElementById("displayUsername").innerText = user.username;
    document.getElementById("displayPhoto").src = user.photo;
  }
}
