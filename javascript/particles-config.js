/* DO NOT MODIFY THIS FILE */

particlesJS('particles-js', 
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#8A2BE2"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1.5,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "push"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": false
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }
  );

   document.addEventListener("DOMContentLoaded", function() {
    function getParticleSettings() {
        // Get settings from localStorage or use defaults
        const defaults = {
            preset: "custom",
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
        if (document.getElementById("particles-js")) {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": Number(settings.numParticles) },
                    "color": { "value": settings.particleColor },
                    "shape": { "type": settings.particleShape },
                    "opacity": { "value": Number(settings.particleOpacity) },
                    "size": { "value": Number(settings.particleSize) },
                    "move": { "speed": Number(settings.particleSpeed) }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onclick": { "enable": true, "mode": "push" }
                    }
                },
                "retina_detect": true
            });
        }
        // Optionally, update the form fields to reflect current settings
        document.getElementById('preset').value = settings.preset;
        document.getElementById('numParticles').value = settings.numParticles;
        document.getElementById('particleColor').value = settings.particleColor;
        document.getElementById('particleShape').value = settings.particleShape;
        document.getElementById('particleSize').value = settings.particleSize;
        document.getElementById('particleSpeed').value = settings.particleSpeed;
        document.getElementById('particleOpacity').value = settings.particleOpacity;
    }

    window.applySettings = function() {
        const preset = document.getElementById('preset').value;
        const numParticles = document.getElementById('numParticles').value;
        const particleColor = document.getElementById('particleColor').value;
        const particleShape = document.getElementById('particleShape').value;
        const particleSize = document.getElementById('particleSize').value;
        const particleSpeed = document.getElementById('particleSpeed').value;
        const particleOpacity = document.getElementById('particleOpacity').value;

        const settings = {
            preset,
            numParticles,
            particleColor,
            particleShape,
            particleSize,
            particleSpeed,
            particleOpacity
        };
        localStorage.setItem('particleSettings', JSON.stringify(settings));
        alert('Particle settings saved!');
        loadParticles();
    };

    window.resetSettings = function() {
        localStorage.removeItem('particleSettings');
        alert('Particle settings reset to default!');
        loadParticles();
    };

    loadParticles();
});
