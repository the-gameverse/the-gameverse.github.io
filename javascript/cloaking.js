const cloaks = [
    { id: 'cloak1', title: 'Google', favicon: 'https://www.google.com/favicon.ico' },
    { id: 'cloak2', title: 'Google Drive', favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png' },
    { id: 'cloak3', title: 'Cloak 3', favicon: 'url_to_favicon3' }
];

const logo = "\x1b[91m[GameVerse Cloak]\x1b[0m";

const cloak = {
  getFavicon() {
    const icons = document.querySelectorAll('link[rel="icon"]');
    return icons.length > 0 ? icons[0].href : null;
  },
  setFavicon(url) {
    const icons = document.querySelectorAll('link[rel="icon"]');
    icons.forEach((icon) => (icon.href = url));
  },
  getTitle() {
    return document.title;
  },
  setTitle(newTitle) {
    document.title = newTitle;
  },
  setCloak(newTitle, url) {
    this.setTitle(newTitle);
    this.setFavicon(url);
    localStorage.setItem("cloakTitle", newTitle);
    localStorage.setItem("cloakFavicon", url);
  },
  init() {
    let cloakTitle = localStorage.getItem("cloakTitle");
    let cloakFavicon = localStorage.getItem("cloakFavicon");

    if (!cloakTitle || !cloakFavicon) {
      console.log(logo, "Initializing cloak settings...");
      const newTitle = this.getTitle();
      const newFavicon = this.getFavicon();
      if (!cloakTitle) {
        localStorage.setItem("cloakTitle", newTitle);
      }
      if (!cloakFavicon && newFavicon) {
        localStorage.setItem("cloakFavicon", newFavicon);
      }
      cloakTitle = localStorage.getItem("cloakTitle");
      cloakFavicon = localStorage.getItem("cloakFavicon");
    }

    this.setCloak(cloakTitle, cloakFavicon);
  },
  aboutBlank(url) {
    if (!url) url = "https://www.google.com/search?q=how+many+seconds+in+a+day";
    const newWindow = window.open();
    const iframe = newWindow.document.createElement("iframe");
    newWindow.document.body.style.margin = "0";
    newWindow.document.body.style.height = "100vh";
    iframe.src = window.location.href;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    newWindow.document.body.appendChild(iframe);
    window.location.replace(url);
  },
  reset() {
    localStorage.removeItem("cloakTitle");
    localStorage.removeItem("cloakFavicon");
    window.location.reload();
  },
};

window.cloak = cloak;

document.addEventListener("DOMContentLoaded", () => {
  let savedTitle = localStorage.getItem("cloakTitle");
  let savedFavicon = localStorage.getItem("cloakFavicon");

  cloak.setFavicon(savedFavicon);
  cloak.setTitle(savedTitle);

  const cloakSelect = document.querySelector("[data-cloak-select]");

  if (cloakSelect) {
    cloakSelect.addEventListener("change", () => {
      const selectedCloakName = cloakSelect.value;
      const selectedCloak = cloaks.find(
        (cloak) => cloak.name === selectedCloakName
      );

      if (selectedCloak) {
        cloak.setCloak(selectedCloak.title, selectedCloak.icon);
        console.log(logo, `Set cloak to: ${selectedCloak.title}`);
      } else {
        console.error(
          `Cloak '${selectedCloakName}' not found in cloaks array.`
        );
      }
    });
  }
});

cloak.init();
