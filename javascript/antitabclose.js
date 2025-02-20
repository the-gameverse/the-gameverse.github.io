let antiTabCloseEnabled = localStorage.getItem("antiTabCloseEnabled") === "true";

function toggleAntiTabClose(enable) {
  if (enable) {
    window.addEventListener('beforeunload', beforeUnloadHandler);
    window.onbeforeunload = function() { return "Anti-tab close enabled."; };
  } else {
    window.removeEventListener('beforeunload', beforeUnloadHandler);
    window.onbeforeunload = null;
  }
  localStorage.setItem("antiTabCloseEnabled", enable);
}

function beforeUnloadHandler(e) {
  e.preventDefault();
  e.returnValue = '';
}

if (antiTabCloseEnabled) {
  toggleAntiTabClose(true);
}
