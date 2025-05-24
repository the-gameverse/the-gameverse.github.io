// Get the panic key and URL from localStorage
let panickey = localStorage.getItem("panicKey") || "Escape";
let panicURL = localStorage.getItem("cloakLink") || "https://www.google.com/";

// Listen for the panic key
document.addEventListener("keydown", function (event) {
  if (event.key === panickey) {
    window.location.href = panicURL;
  }
});

// Allow user to set a new panic key
window.listenForKey = function() {
  alert("Press the key you want to use as your Panic Key.");
  function setKey(e) {
    localStorage.setItem("panicKey", e.key);
    panickey = e.key;
    alert("Panic key set to: " + e.key);
    document.removeEventListener("keydown", setKey, true);
  }
  document.addEventListener("keydown", setKey, true);
};