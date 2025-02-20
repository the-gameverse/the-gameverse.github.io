const panickey = "`";
const panicURL = localStorage.getItem("cloakLink"); // Suggestion: make this what the cloak is set to
document.addEventListener("keydown", function (event) {
  if (event.key === panickey) {
    window.location.href = panicURL;
  }
});
