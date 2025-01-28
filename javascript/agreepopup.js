// Function to check if the user has already agreed
function hasAgreed() {
  return localStorage.getItem('hasAgreed') === 'true';
}

// Function to handle the "I Agree" button click
document.getElementById('agreeButton').addEventListener('click', function() {
  // Store the agreement in localStorage to remember it
  localStorage.setItem('hasAgreed', 'true');
  // Hide the pop-up
  document.getElementById('popup').style.display = 'none';
});

// Function to handle the "I Don't Agree" button click
document.getElementById('disagreeButton').addEventListener('click', function() {
  // Close the current tab
  location.replace("/errors/notagreed");
});

// Show the pop-up if the user hasn't agreed
window.onload = function() {
  if (!hasAgreed()) {
    document.getElementById('popup').style.display = 'flex';
  }
};