const panickey = "`";
const panicURL = "https://www.google.com/search?q=calculator"; // Suggestion: make this what the cloak is set to
document.addEventListener("keydown", function (event) {
  if (event.key === panickey) {
    window.location.href = panicURL;
  }
});