const cloaks = [
  { name: "gdoc", title: "Untitled document - Google Docs", icon: "/uploads/cloaks/gdocs.png", link: "https://docs.google.com/document/u/0/" },
  { name: "gslides", title: "Untitled presentation - Google Slides", icon: "/uploads/cloaks/gslides.png", link: "https://docs.google.com/presentation/u/0/" },
  { name: "gsheets", title: "Untitled spreadsheet - Google Sheets", icon: "/uploads/cloaks/gsheets.png", link: "https://docs.google.com/spreadsheets/u/0/" },
  { name: "calculator", title: "Calculator - Google Search", icon: "/uploads/cloaks/google.png", link: "https://www.google.com/search?q=calculator" },
  { name: "desmoscalc", title: "Desmos | Scientific Calculator", icon: "/uploads/cloaks/desmos.png", link: "https://www.desmos.com/scientific" },
  { name: "gdrive", title: "Google Drive", icon: "/uploads/cloaks/gdrive.png", link: "https://drive.google.com/" },
  { name: "google", title: "Google", icon: "/uploads/cloaks/google.png", link: "https://www.google.com/" },
  { name: "gassign", title: "Google Assignments", icon: "/uploads/cloaks/gassign.png", link: "https://assignments.google.com/" },
  { name: "blank", title: "        ", icon: "/uploads/cloaks/transparent.png", link: "" }
  // Add more as needed
];
window.cloaks = cloaks;

const logo = "\x1b[91m[Parcoil Cloak]\x1b[0m";

const cloak = {
  getFavicon() {
    const icons = document.querySelectorAll('link[rel="icon"]');
    return icons.length > 0 ? icons[0].href : null;
  },
  setFavicon(url) {
    const icons = document.querySelectorAll('link[rel="icon"]');
    icons.forEach((icon) => (icon.href = url));
    localStorage.setItem("cloakFavicon", url);
  },
  getTitle() {
    return document.title;
  },
  setTitle(newTitle) {
    document.title = newTitle;
    localStorage.setItem("cloakTitle", newTitle);
  },
  setLink(newLink) {
    localStorage.setItem("cloakLink", newLink);
  },
  setCloak(newTitle, url, link) {
    this.setTitle(newTitle);
    this.setFavicon(url);
    this.setLink(link);
  },
  init() {
    console.warn(
      logo,
      "cloak.init() has been deprecated. theres no need to call it anymore."
    );
  },
  aboutBlank(url) {
    if (!url) url = "https://www.google.com/search?q=how+many+seconds+in+a+day";
    const newWindow = window.open("", "_blank");
    const iframe = newWindow.document.createElement("iframe");
    newWindow.document.body.style.margin = "0";
    newWindow.document.body.style.height = "100vh";
    iframe.src = window.location.href;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    newWindow.document.body.appendChild(iframe);
    window.close();
  },
  reset(reload = true) {
    localStorage.removeItem("cloakTitle");
    localStorage.removeItem("cloakFavicon");
    console.log(
      logo,
      "Cloak reset. Title and favicon will remain unset until needed."
    );
    if (reload === true) {
      window.location.reload();
    }
  },
};

window.cloak = cloak;

document.addEventListener("DOMContentLoaded", () => {
  const cloakSelect = document.querySelector("[data-cloak-select]");

  if (cloakSelect) {
    cloakSelect.addEventListener("change", () => {
      const selectedCloakName = cloakSelect.value;
      const selectedCloak = cloaks.find(
        (cloak) => cloak.name === selectedCloakName
      );

      if (selectedCloak) {
        cloak.setCloak(selectedCloak.title, selectedCloak.icon, selectedCloak.link);
        console.log(logo, `Set cloak to: ${selectedCloak.title}`);
      } else {
        console.error(
          `Cloak '${selectedCloakName}' not found in cloaks array.`
        );
      }
    });
  }

  const savedTitle = localStorage.getItem("cloakTitle");
  const savedFavicon = localStorage.getItem("cloakFavicon");
  if (savedTitle && savedFavicon) {
    cloak.setTitle(savedTitle);
    cloak.setFavicon(savedFavicon);
  }
});