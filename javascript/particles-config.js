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
        let particleSettings = JSON.parse(localStorage.getItem("particleSettings")) || {
            particles: {
                number: { value: 80 },
                color: { value: "#db0007" },
                size: { value: 3 },
                speed: { value: 1.5 }
            }
        };

        function loadParticles() {
            if (document.getElementById("particles-js")) {
                particlesJS('particles-js', {
                    "particles": {
                        "number": { "value": particleSettings.particles.number.value },
                        "color": { "value": particleSettings.particles.color.value },
                        "shape": { "type": "circle" },
                        "size": { "value": particleSettings.particles.size.value },
                        "move": { "speed": particleSettings.particles.speed.value }
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
        }

        loadParticles(); // Initialize particles on page load

        // CHANGED BY TANNER ORDONEZ:
        
    });
