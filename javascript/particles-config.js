document.addEventListener("DOMContentLoaded", function () {
  function getParticleSettings() {
    const defaults = {
      preset: "default",
      numParticles: 80,
      particleColor: "#8A2BE2",
      particleShape: "circle",
      particleSize: 3,
      particleSpeed: 1.5,
      particleOpacity: 1
    };

    try {
      const saved = JSON.parse(localStorage.getItem("particleSettings"));
      return Object.assign({}, defaults, saved);
    } catch {
      return defaults;
    }
  }

  function loadParticles() {
    const settings = getParticleSettings();

    // Destroy existing instance if needed
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    }

    particlesJS("particles-js", {
      particles: {
        number: {
          value: Number(settings.numParticles),
          density: { enable: true, value_area: 800 }
        },
        color: { value: settings.particleColor },
        shape: {
          type: settings.particleShape,
          stroke: { width: 0, color: "#000" },
          polygon: { nb_sides: 5 }
        },
        opacity: {
          value: Number(settings.particleOpacity),
          random: false,
          anim: { enable: false }
        },
        size: {
          value: Number(settings.particleSize),
          random: true,
          anim: { enable: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: Number(settings.particleSpeed),
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          attract: { enable: false }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false, mode: "push" },
          onclick: { enable: false, mode: "push" },
          resize: false
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });

    // Update UI fields if they exist
    if (document.getElementById("numParticles")) {
      document.getElementById("numParticles").value = settings.numParticles;
      document.getElementById("particleColor").value = settings.particleColor;
      document.getElementById("particleShape").value = settings.particleShape;
      document.getElementById("particleSize").value = settings.particleSize;
      document.getElementById("particleSpeed").value = settings.particleSpeed;
      document.getElementById("particleOpacity").value = settings.particleOpacity;
    }
  }

  // Save settings + reload
  window.applySettings = function () {
  // Check all inputs exist first to avoid errors
  const numParticlesInput = document.getElementById("numParticles");
  const particleColorInput = document.getElementById("particleColor");
  const particleShapeInput = document.getElementById("particleShape");
  const particleSizeInput = document.getElementById("particleSize");
  const particleSpeedInput = document.getElementById("particleSpeed");
  const particleOpacityInput = document.getElementById("particleOpacity");

  if (
    !numParticlesInput ||
    !particleColorInput ||
    !particleShapeInput ||
    !particleSizeInput ||
    !particleSpeedInput ||
    !particleOpacityInput
  ) {
    alert("One or more particle setting inputs are missing from the page!");
    return;
  }

  const settings = {
    preset: "custom",
    numParticles: numParticlesInput.value,
    particleColor: particleColorInput.value,
    particleShape: particleShapeInput.value,
    particleSize: particleSizeInput.value,
    particleSpeed: particleSpeedInput.value,
    particleOpacity: particleOpacityInput.value,
  };

  localStorage.setItem("particleSettings", JSON.stringify(settings));
  loadParticles();
  alert("Particle settings saved!");
};


  // Reset to default settings
  window.resetSettings = function () {
    localStorage.removeItem("particleSettings");
    loadParticles();
    alert("Particle settings reset to default!");
  };

  // Load on page ready
  loadParticles();
});
