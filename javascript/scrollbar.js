let particleSettings = JSON.parse(
  localStorage.getItem("particleSettings")
);
let styleTag = document.createElement("style");
styleTag.innerHTML = `::-webkit-scrollbar-thumb { background-color: ${particleSettings.particles.color.value} !important; }`;
document.head.appendChild(styleTag);