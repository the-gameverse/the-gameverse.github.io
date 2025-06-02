// Add games 

const games = [
{ name: "Tiny Fishing", image: "/uploads/covers/tinyfishing.png", link: "https://www.hoodamath.com/mobile/games/hooda-tiny-fishing/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Snow Rider 3D", image: "/uploads/covers/snowrider3d.png", link: "https://www.hoodamath.com/mobile/games/snow-rider-3d/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Guess Word", image: "/uploads/covers/guessword.png", link: "https://www.hoodamath.com/mobile/games/guess-word/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Draw To Smash!", image: "/uploads/covers/drawsmash.png", link: "https://www.hoodamath.com/mobile/games/draw-to-smash/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Slice It All!", image: "/uploads/covers/sliceitall.png", link: "https://www.hoodamath.com/mobile/games/hooda-slice-it/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Rodha", image: "/uploads/covers/rodha.png", link: "https://www.hoodamath.com/mobile/games/rodha/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Swing Monkey", image: "/uploads/covers/swingmonkey.png", link: "https://www.hoodamath.com/mobile/games/swing-monkey/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "8 Ball Pool", image: "/uploads/covers/8ballpool.png", link: "https://www.hoodamath.com/mobile/games/8-ball-pool/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Wheelie Bike", image: "/uploads/covers/wheeliebike.png", link: "https://www.hoodamath.com/mobile/games/wheelie-bike/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Drift Hunters", image: "/uploads/covers/drifthunters.png", link: "https://www.hoodamath.com/mobile/games/drift-hunters/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Taxi Driver 3D", image: "/uploads/covers/taxidriver3d.png", link: "https://www.hoodamath.com/mobile/games/taxi-driver-3d/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life", image: "/uploads/covers/ducklife.png", link: "https://www.hoodamath.com/mobile/games/duck-life/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 2", image: "/uploads/covers/ducklife2.png", link: "https://www.hoodamath.com/mobile/games/duck-life-2-world-champion/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 3", image: "/uploads/covers/ducklife3.png", link: "https://www.hoodamath.com/mobile/games/duck-life-3-evolution/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 4", image: "/uploads/covers/ducklife4.png", link: "https://www.hoodamath.com/mobile/games/duck-life-4/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Life 6", image: "/uploads/covers/ducklife6.png", link: "https://www.hoodamath.com/mobile/games/duck-life-6-space/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "OvO", image: "/uploads/covers/ovo.png", link: "https://www.hoodamath.com/mobile/games/ovo/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Low's Adventure 3", image: "/uploads/covers/lowsadventure3.png", link: "https://www.hoodamath.com/mobile/games/lows-adventures-3/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Draw The Rest", image: "/uploads/covers/drawtherest.png", link: "https://www.hoodamath.com/mobile/games/draw-the-rest/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Opposite Day", image: "/uploads/covers/oppositeday.png", link: "https://www.hoodamath.com/mobile/games/opposite-day/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Resizer", image: "/uploads/covers/resizer.png", link: "https://www.hoodamath.com/mobile/games/resizer/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Level Devil", image: "/uploads/covers/leveldevil.png", link: "https://www.hoodamath.com/mobile/games/level-devil-trap-path/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Melody's Adventure", image: "/uploads/covers/melodysadventure.png", link: "https://www.hoodamath.com/mobile/games/melodys-adventure/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Whopper Clicker", image: "/uploads/covers/whopperclicker.png", link: "https://www.hoodamath.com/mobile/games/whopper-clicker/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Duck Clicker", image: "/uploads/covers/duckduckclicker.png", link: "https://www.hoodamath.com/mobile/games/duck-duck-clicker/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Duck Duck Clicker 3D", image: "/uploads/covers/duckduckclicker3d.png", link: "https://www.hoodamath.com/mobile/games/duck-duck-clicker-3d/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Spacebar Clicker", image: "/uploads/covers/spacebarclicker.png", link: "https://www.hoodamath.com/mobile/games/spacebar-clicker/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Stack", image: "/uploads/covers/stack.png", link: "https://www.hoodamath.com/mobile/games/stack-game/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Capybara Clicker", image: "/uploads/covers/capybaraclicker.png", link: "https://www.hoodamath.com/mobile/games/capybara-clicker/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Candy Clicker", image: "/uploads/covers/candyclicker.png", link: "https://www.hoodamath.com/mobile/games/candy-clicker/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Candy Clicker 2", image: "/uploads/covers/candyclicker2.png", link: "https://www.hoodamath.com/mobile/games/candy-clicker-2/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "2048", image: "/uploads/covers/2048.png", link: "https://www.hoodamath.com/mobile/games/2048-game/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Block Blast!", image: "/uploads/covers/blockblast.png", link: "/storage/games/blockblast.html", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Find Me", image: "/uploads/covers/findme.png", link: "https://www.hoodamath.com/mobile/games/find-me/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Suika Game", image: "/uploads/covers/suika.png", link: "https://www.hoodamath.com/mobile/games/watermelon-game/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Thorn And Balloons", image: "/uploads/covers/thornandballoons.png", link: "https://www.hoodamath.com/mobile/games/thorn-and-balloons/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Icy Purple Head", image: "/uploads/covers/icypurplehead.png", link: "https://www.hoodamath.com/mobile/games/icy-purple-head-super-slide/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Icy Purple Head 2", image: "/uploads/covers/icypurplehead2.png", link: "https://www.hoodamath.com/mobile/games/icy-purple-head-2/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Icy Purple Head 3", image: "/uploads/covers/icypurplehead3.png", link: "https://www.hoodamath.com/mobile/games/icy-purple-head-3/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Are You Human?", image: "/uploads/covers/areyouhuman.png", link: "https://www.hoodamath.com/mobile/games/are-you-human/game.html?nocheckorient=1", clickCount: 0, isFavorited: false, path: "/play" },
{ name: "Move The Pin", image: "/uploads/covers/movethepin.png", link: "https://www.hoodamath.com/mobile/games/move-the-pin/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Growmi", image: "/uploads/covers/growmi.png", link: "https://www.hoodamath.com/mobile/games/growmi/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Idle Breakout", image: "/uploads/covers/idlebreakout.png", link: "https://www.hoodamath.com/mobile/games/idle-breakout/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Rolly Vortex", image: "/uploads/covers/rollyvortex.png", link: "https://www.hoodamath.com/mobile/games/rolly-vortex/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Shortcut Race", image: "/uploads/covers/shortcutrace.png", link: "https://www.hoodamath.com/mobile/games/shortcut-race/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Slope", image: "/uploads/covers/slope.png", link: "https://www.hoodamath.com/mobile/games/rolling-ball-3d/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Electron Dash", image: "/uploads/covers/electrondash.png", link: "https://www.hoodamath.com/mobile/games/electron-dash/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Freehead Skate", image: "/uploads/covers/freeheadskate.png", link: "https://www.hoodamath.com/mobile/games/freehead-skate/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Burger Time", image: "/uploads/covers/burgertime.png", link: "https://www.hoodamath.com/mobile/games/burger-time/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Glitch", image: "/uploads/covers/glitch.png", link: "https://www.hoodamath.com/mobile/games/glitch/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Tunnel Rush", image: "/uploads/covers/tunnelrush.png", link: "https://www.hoodamath.com/mobile/games/tunnel-rush/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Flappy Bird", image: "/uploads/covers/flappybird.png", link: "https://www.hoodamath.com/mobile/games/flappy-bird/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Line Rider", image: "/uploads/covers/linerider.png", link: "https://linerider.com", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Basket Goal", image: "/uploads/covers/basketgoal.png", link: "https://www.hoodamath.com/mobile/games/basket-goal/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Touchdown Rush", image: "/uploads/covers/touchdownrush.png", link: "https://www.hoodamath.com/mobile/games/touchdown-rush/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Mini Golf", image: "/uploads/covers/minigolf.png", link: "https://www.hoodamath.com/mobile/games/mini-golf/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Solitaire", image: "/uploads/covers/solitaire.png", link: "https://www.hoodamath.com/mobile/games/freecell-solitaire/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Checkers", image: "/uploads/covers/checkers.png", link: "https://www.hoodamath.com/mobile/games/checkers/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Orange", image: "/uploads/covers/orange.png", link: "https://www.hoodamath.com/mobile/games/orange/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Head Soccer 2022", image: "/uploads/covers/headsoccer2022.png", link: "https://www.hoodamath.com/mobile/games/head-soccer/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Fall Beans", image: "/uploads/covers/fallbeans.png", link: "https://www.hoodamath.com/mobile/games/fall-beans/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Ball Blast", image: "/uploads/covers/ballblast.png", link: "https://scratch.mit.edu/projects/472077983/embed", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Falling Cubes", image: "/uploads/covers/fallingcubes.png", link: "https://www.hoodamath.com/mobile/games/falling-cubes/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Fancy Diver", image: "/uploads/covers/fancydiver.png", link: "https://www.hoodamath.com/mobile/games/fancy-diver/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Jelly Slice", image: "/uploads/covers/jellyslice.png", link: "https://www.hoodamath.com/mobile/games/jelly-slice/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Geometry Dash", image: "/uploads/covers/geometrydash.png", link: "https://www.hoodamath.com/mobile/games/geometry-dash/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Geometry Dash Subzero", image: "/uploads/covers/geometrydashsubzero.png", link: "https://www.hoodamath.com/mobile/games/geometry-dash-subzero/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Geometry Dash Meltdown", image: "/uploads/covers/geometrydashmeltdown.png", link: "https://www.hoodamath.com/mobile/games/geometry-dash-meltdown/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Planet Clicker", image: "/uploads/covers/planetclicker.png", link: "https://www.hoodamath.com/mobile/games/planet-clicker/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Retro Bowl", image: "/uploads/covers/retrobowl.png", link: "https://agamyacapital.com/uploads/5/5/6/7/5567194/custom_themes/230188292910318641/files/rb1.html", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Infinite Craft", image: "/uploads/covers/infinitecraft.png", link: "https://www.hoodamath.com/mobile/games/infinite-craft/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Piano Tiles", image: "/uploads/covers/pianotiles.png", link: "https://www.hoodamath.com/mobile/games/piano-tiles/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Helix Jump", image: "/uploads/covers/helixjump.png", link: "https://www.hoodamath.com/mobile/games/helix-jump/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Formula Rush", image: "/uploads/covers/formularush.png", link: "https://www.hoodamath.com/mobile/games/formula-rush/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Draw The Hill", image: "/uploads/covers/drawthehill.png", link: "https://www.hoodamath.com/mobile/games/draw-the-hill/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Dino Game", image: "/uploads/covers/dinogame.png", link: "https://www.hoodamath.com/mobile/games/dino-game/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Bike Hero", image: "/uploads/covers/bikehero.png", link: "https://www.hoodamath.com/mobile/games/bike-hero/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Retro Ping Pong", image: "/uploads/covers/retropingpong.png", link: "https://www.hoodamath.com/mobile/games/retro-ping-pong/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Dominoes", image: "/uploads/covers/dominoes.png", link: "https://www.hoodamath.com/mobile/games/dominoes/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Unscrew It", image: "/uploads/covers/unscrewit.png", link: "https://www.hoodamath.com/mobile/games/unscrew-it/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "House Painter", image: "/uploads/covers/housepainter.png", link: "https://www.hoodamath.com/mobile/games/house-painter/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Liquid Sort", image: "/uploads/covers/liquidsort.png", link: "https://www.hoodamath.com/mobile/games/liquid-sort/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Dark Room", image: "/uploads/covers/darkroom.png", link: "https://www.hoodamath.com/mobile/games/dark-room/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Coreball", image: "/uploads/covers/coreball.png", link: "https://www.hoodamath.com/mobile/games/coreball/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Drift Boss", image: "/uploads/covers/driftboss.png", link: "https://www.hoodamath.com/mobile/games/drift-boss/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Sky Speedster", image: "/uploads/covers/skyspeedster.png", link: "https://www.hoodamath.com/mobile/games/sky-speedster/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Car Rush", image: "/uploads/covers/carrush.png", link: "https://www.hoodamath.com/mobile/games/car-rush/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Climbable Arrow", image: "/uploads/covers/climbablearrow.png", link: "https://www.hoodamath.com/mobile/games/climbable-arrow/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Cubeform", image: "/uploads/covers/cubeform.png", link: "https://www.hoodamath.com/mobile/games/cubeform/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Drive Mad", image: "/uploads/covers/drivemad.png", link: "/storage/games/drivemad.html", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Minecraft", image: "/uploads/covers/minecraft.png", link: "/storage/games/minecraft.html", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Arena King", image: "/uploads/covers/arenaking.png", link: "https://script.google.com/macros/s/AKfycbz6GTepbaULO9dEqHBzfb2Rm0C3pdSKcKnaOGr6qAWXxoppLkkA65v3vTgsDS4o7W56aQ/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Cookie Clicker", image: "/uploads/covers/cookieclicker.png", link: "https://script.google.com/macros/s/AKfycbxGM35J29NkO-2LYjxWj_cA9IUaaXypkUy-LqXyLRbGTz0R6lXmAEapz1STN1jlTIRavw/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "slowroads.io", image: "/uploads/covers/slowroadsio.png", link: "https://script.google.com/macros/s/AKfycbzqDA2SnuVZ3DRelxxbUxSV9Z1RJz_gQfDRx06WUpgppWgrdDEErtZ1Lev9O6j2w9ioBQ/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Moto X3M", image: "/uploads/covers/motox3m.png", link: "https://script.google.com/macros/s/AKfycbw7_zG02ZMXnPSdwCx0CcmN8eX_0Bk3715TSP-Eglb1DyVhp7RxShuXq4qJ8Q2s7cnW/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Stickman Parkour", image: "/uploads/covers/stickmanparkour.png", link: "https://script.google.com/macros/s/AKfycbwmHiH-ifVw054CFLpPM7qyZfLfwebB1KTGCqKzm0iJopITachomI745g6ttdHt2NZ6/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Speed Cube", image: "/uploads/covers/speedcube.png", link: "https://www.hoodamath.com/mobile/games/speed-cube/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Flicking Soccer", image: "/uploads/covers/flickingsoccer.png", link: "https://www.hoodamath.com/mobile/games/flicking-soccer/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Number Snake", image: "/uploads/covers/numbersnake.png", link: "https://www.hoodamath.com/mobile/games/number-snake/game.html?nocheckorient=1", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Crossy Road", image: "/uploads/covers/crossyroad.png", link: "/storage/games/crossyroad.html", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Bacon May Die", image: "/uploads/covers/baconmaydie.png", link: "/storage/games/baconmaydie.html", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Stickman Hook", image: "/uploads/covers/stickmanhook.png", link: "/storage/games/stickmanhook.html", path: "/play", clickCount: 0, isFavorited: false },
{ name: "CrazyCattle3D", image: "/uploads/covers/crazycattle3d.png", link: "/storage/games/crazycattle3d.html", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Space Huggers", image: "/uploads/covers/spacehuggers.png", link: "https://openprocessing.org/sketch/2093028/embed", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Super Mario 64", image: "/uploads/covers/supermario64.png", link: "https://openprocessing.org/sketch/2455285/embed", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Sandbox", image: "/uploads/covers/sandbox.png", link: "https://sga4schools.harag.cz/s/sandbox", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Thisissand", image: "/uploads/covers/thisissand.png", link: "https://thisissand.com/", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Mini Golf Master", image: "/uploads/covers/minigolfmaster.png", link: "https://script.google.com/macros/s/AKfycbw5p1tly8IoRN92yaOqJ49QCKGyleyB5HHjyKEbO_n0zlBCpUF1FYvWNjBbJZkcGQQ3Bg/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Paper.io 2", image: "/uploads/covers/paperio2.png", link: "https://script.google.com/macros/s/AKfycbwNxCzUuQVmLRWTwYK2D4yTqpWg2O-qge8BwCkxhLmqWd1DtXynwJXPEDClPt7ERZr-/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Eggy Car", image: "/uploads/covers/eggycar.png", link: "https://script.google.com/macros/s/AKfycbxGFiHgVNVoous7yjguN7bcuwa6lejCHgh6V1weh1vNalyCzpMmaMH9NhTisNSqkUo3/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Omega Nugget Clicker", image: "/uploads/covers/omeganuggetclicker.png", link: "https://script.google.com/macros/s/AKfycbzjgnGGeTNL2DTjJzVx3WGvsLjEyA47O6xYss-ijTLWWwrQv9siK9Gn_QqNDlDkrc27/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Cooking Fever", image: "/uploads/covers/cookingfever.png", link: "https://script.google.com/macros/s/AKfycbyjI0zmcSCEH1KYPHLRli9aaHyQettbfiqOyaKVDeJn8rccfLOQYK6pJze4xP-EFJKg/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Snake.is", image: "/uploads/covers/snakeis.png", link: "https://script.google.com/macros/s/AKfycbwXhPAppqZUy69d6b26B3Z6daQdZmzPsiaSsywQseSBMh94FLNnVTmupJqtonwt9oaQLw/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Roblox Obby", image: "/uploads/covers/robloxobby.png", link: "https://storage.googleapis.com/test-41376.appspot.com/obby.html", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Candy Crush", image: "/uploads/covers/candycrush.png", link: "https://script.google.com/macros/s/AKfycbzQTx2iYEacv65AXzQtwQfo_IJjCWxNMlPlGC6Jrn8_JjT9jgozigOP8IhrXkTelccQcQ/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Among Us", image: "/uploads/covers/amongus.png", link: "https://script.google.com/macros/s/AKfycbyix6sPjvsn_izDvhJLVuif1buj9ZtARvj9D_FEQ0rscRXgl-RgArs0t4oJw_OHm5Dr5A/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Geometry Dash Lite", image: "/uploads/covers/geometrydashlite.png", link: "https://script.google.com/macros/s/AKfycbydNb9Y8FIM3D0vcweKtYCYbjJcSXghedO6MN0aWbP5qIwamjjSkBDirvuMHR_6sc4/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Smash Karts", image: "/uploads/covers/smashkarts.png", link: "https://script.google.com/macros/s/AKfycbx63iRe5mtf5PQGIn_eGwKePxCA1iU6w-YApn57Mh4phi2ZB-G-GCJA1YTV9jKrwoqb/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "PolyTrack", image: "/uploads/covers/polytrack.png", link: "https://script.google.com/macros/s/AKfycbzOmulSCFb0CwkaIrhIBdqglMVAfxQppFmVZmp2cp8-eHLj0j_LjbQtEhNyTClffFte/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Awesome Tanks", image: "/uploads/covers/awesometanks.png", link: "https://script.google.com/macros/s/AKfycbymevkeavNOsB5HAuBlRXCr11dpWboVy58LIy4v_Np9hzx4NgD3Os9Uow5yrKylc2uu/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Awesome Tanks 2", image: "/uploads/covers/awesometanks2.png", link: "https://script.google.com/macros/s/AKfycbyJgJSpZLYW4t7SEW5VCiR5pQyGtXlTSYP4ohz57LkTI3RFdVJNQEnLihXgleCe9wtudQ/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Dig To China", image: "/uploads/covers/digtochina.png", link: "https://script.google.com/macros/s/AKfycbx7MEtbxM9ZlUT0kC5nfQA-x9-KT49crZXU6Lx66Hz1VvTyMA8bUuB--mqTNNhIYIL58Q/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Basketball Legends", image: "/uploads/covers/basketballlegends.png", link: "https://script.google.com/macros/s/AKfycbypcRAKupeX7kvdt4IDnmPNSI788HFppGG-P5V8QRCHzRKZ7AXFdtUjkNBi6QU9yYFc2Q/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Basketball Legends 2020", image: "/uploads/covers/basketballlegends2020.png", link: "https://script.google.com/macros/s/AKfycbwE6Cy_4gnECeA-6JH6xldzGnFQlBC9xPqS1Jlru8kF2Wr4LMshHeNa2jEJjM5cYfz4Pw/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Subway Surfers", image: "/uploads/covers/subwaysurfers.png", link: "/storage/games/subway-surfers/index.html", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Monkey Mart", image: "/uploads/covers/monkeymart.png", link: "/storage/games/monkey-mart/frame.html", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Madden NFL 06", image: "/uploads/covers/maddennfl06.png", link: "https://script.google.com/macros/s/AKfycbwOd9N381nj6rcPfOez6tMGjnldHCgZSidEUO5BZ7yN3R1dRNVas4qcUi499Mt0mUO5/exec", path: "/play", clickCount: 0, isFavorited: false },
{ name: "Farm Life", image: "/uploads/covers/farmlife.png", link: "https://script.google.com/macros/s/AKfycbzDadVVABgCY3sQB6kJHc4h1-mt0KccESqsAVsbndoyNOp1IQdoVz1hA2reL8TuD5B_ug/exec", path: "/play", clickCount: 0, isFavorited: false },

];


// Variable to toggle click count visibility
let showClickCounts = false;
let currentSortOption = 'favorites';  // Default sort option

// Toggle click counts visibility
function toggleClickCounts() {
      console.log("Toggle Click Counts triggered"); // Debugging line
  showClickCounts = !showClickCounts;
  const button = document.getElementById("toggleUsageData");
  button.textContent = showClickCounts ? "Hide Usage Data" : "Show Usage Data";
  displayGames(); // Re-render the games
}
function saveClickCountsToLocalStorage(gameLink) {
  // Save the game's link to sessionStorage
  console.log("Game link saved:", gameLink); // Debugging line
}


// Filter games based on search input
function filterGames() {
  const search = document.getElementById("search").value;
  displayGames(search);

          // Typing animation logic
    clearTimeout(typingTimeout); // Clear the previous timeout
    showLaunchingGame(); // Trigger the game-launching animation
    typingTimeout = setTimeout(() => {
        resetToDefault(); // Reset to the normal streak display
    }, 1000); // Adjust the delay period as needed (e.g., 2000ms = 2 seconds)
}

// Save favorites to localStorage
function saveFavoritesToLocalStorage() {
  const favorites = games.reduce((acc, game) => {
    acc[game.name] = game.isFavorited;
    return acc;
  }, {});
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Load favorites from localStorage
function loadFavoritesFromLocalStorage() {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
  if (storedFavorites) {
    games.forEach(game => {
      if (storedFavorites[game.name] !== undefined) {
        game.isFavorited = storedFavorites[game.name];
      }
    });
  } else {
    // Set all games to non-favorited if no favorites are found in localStorage
    games.forEach(game => {
      game.isFavorited = false;
    });
  }
}

// Save click counts to localStorage
function saveClickCountsToLocalStorage() {
  const clickCounts = games.reduce((acc, game) => {
    acc[game.name] = game.clickCount;
    return acc;
  }, {});
  localStorage.setItem("clickCounts", JSON.stringify(clickCounts));
}

// Load click counts from localStorage
function loadClickCountsFromLocalStorage() {
  const storedClickCounts = JSON.parse(localStorage.getItem("clickCounts"));
  if (storedClickCounts) {
    games.forEach(game => {
      if (storedClickCounts[game.name] !== undefined) {
        game.clickCount = storedClickCounts[game.name];
      }
    });
  }
}

// Load favorites and click counts initially
loadFavoritesFromLocalStorage();
loadClickCountsFromLocalStorage();

// Handle sorting
function sortGames() {
  const sortDropdown = document.getElementById("sortOptions");
    if (!sortDropdown) return;
  currentSortOption = sortDropdown.value;
  displayGames(); // Re-render games with new sort option
}

// Function to check if user liked a game (localStorage)
function isGameLiked(game) {
  const likeKey = `liked_${game.link}`; // or use game.name if that's your key
  return !!localStorage.getItem(likeKey);
}

// Function to display the games
function displayGames(filter = "") {
  const gameMenu = document.getElementById("gameMenu");
  const gameCount = document.getElementById("gameCount");
  gameMenu.innerHTML = "";

  // Sort games based on current sort option
  const filteredGames = games
    .filter(game => game.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (currentSortOption === "favorites") {
        if (a.isFavorited !== b.isFavorited) {
          return b.isFavorited - a.isFavorited;
        }
      } else if (currentSortOption === "clickCount") {
        return b.clickCount - a.clickCount;
      } else if (currentSortOption === "alphabetical") {
        return a.name.localeCompare(b.name);
      } else if (currentSortOption === "liked") {
        // Sort by user liked (localStorage)
        return isGameLiked(b) - isGameLiked(a);
      } else if (currentSortOption === "globalLikes") {
        // Sort by global likes from Supabase
        return (b.globalLikes || 0) - (a.globalLikes || 0);
      }
      else if (currentSortOption === "trending") {
      // Sort by global clicks from Supabase
      return (b.globalClicks || 0) - (a.globalClicks || 0);
      }
      return 0;
    });

  filteredGames.forEach(game => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    // Create the favorite icon (star)
    const favoriteIcon = document.createElement("div");
    favoriteIcon.classList.add("favorite-icon");
    favoriteIcon.innerHTML = game.isFavorited ? '<i class="fa-solid fa-heart-circle-check"></i>' : '<i class="fa-solid fa-heart-circle-plus"></i>'; // Filled or empty star
    favoriteIcon.title = game.isFavorited ? "Unfavorite" : "Favorite";
    favoriteIcon.style.cursor = "pointer";
    favoriteIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering other click events
      game.isFavorited = !game.isFavorited;
      saveFavoritesToLocalStorage(); // Save favorites after toggling
      displayGames(filter); // Re-render the games
    });

    // Create the click count display
    const clickCountElement = document.createElement("div");
    clickCountElement.classList.add("click-count");
    if (showClickCounts) {
      clickCountElement.textContent = `Your Clicks: ${game.clickCount}`;
      clickCountElement.style.display = "block";
    } else {
      clickCountElement.style.display = "none";
    }

    // Create the game link and image
    const gameLink = document.createElement("a");
    gameLink.href = game.path;
    const gameImage = document.createElement("img");
    gameImage.src = game.image;
    gameLink.appendChild(gameImage);

    // Apply blur effect and remove it after 4 seconds
    setTimeout(() => {
      gameImage.classList.add("loaded");
    }, 2000);

    // Create the game name
    const gameName = document.createElement("div");
    gameName.classList.add("game-name");
    gameName.textContent = game.name;
    gameLink.appendChild(gameName);

    // Add all elements to the gameDiv
    gameDiv.appendChild(favoriteIcon);
    gameDiv.appendChild(gameLink);
    gameDiv.appendChild(clickCountElement);

    // Increment click count and save game link and name when the gameDiv is clicked
    gameDiv.addEventListener("click", () => {
      game.clickCount++;
      localStorage.setItem('gameLink', game.link); // Save game link to localStorage
      localStorage.setItem('gameName', game.name); // Save game name to localStorage
      localStorage.setItem('gameImage', game.image); // Save game name to localStorage
      saveClickCountsToLocalStorage(); // Save updated click count
      displayGames(filter); // Re-render the games
    });

    // Append the gameDiv to the gameMenu
    gameMenu.appendChild(gameDiv);
  });

  // Update the game count text
  gameCount.textContent = `${filteredGames.length} out of ${games.length} games were loaded.`;
}

// Function to get random games
function getRandomGames(num) {
  const shuffled = games.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

// Function to display random games
function displayRandomGames() {
  const randomGames = getRandomGames(7); // Change the number to the desired count of random games
  const randomGameContainer = document.getElementById('randomGameContainer');
  randomGameContainer.innerHTML = ''; // Clear previous content

  randomGames.forEach(game => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    // Create the game link and image
    const gameLink = document.createElement("a");
    gameLink.href = "#"; // Use '#' to prevent default link behavior
    const gameImage = document.createElement("img");
    gameImage.src = game.image;
    gameLink.appendChild(gameImage);

    // Create the game name
    const gameName = document.createElement("div");
    gameName.classList.add("game-name");
    gameName.textContent = game.name;
    gameLink.appendChild(gameName);

    // Add click event listener to redirect iframe
    gameLink.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      redirectIframe(game.link, game.name); // Call the redirect function with the game link and name
      localStorage.setItem('gameLink', game.link); // Save game link to localStorage
      localStorage.setItem('gameName', game.name); // Save game name to localStorage
      
    });

    // Add all elements to the gameDiv
    gameDiv.appendChild(gameLink);

    // Append the gameDiv to the randomGameContainer
    randomGameContainer.appendChild(gameDiv);
  });
}

// Call the function to display random games on load
window.addEventListener('load', displayRandomGames);

function showSkeletonLoader() {
    const gameMenu = document.getElementById("gameMenu");
    gameMenu.innerHTML = ""; // Clear existing content

    for (let i = 0; i < 70; i++) { // Add 40 skeleton loaders
        const skeletonGame = document.createElement("div");
        skeletonGame.classList.add("skeleton", "skeleton-game");

        gameMenu.appendChild(skeletonGame); // Append only the skeleton game element
    }
}

function displayGamesWithSkeleton() {
    // Hide the search bar, dropdown, and game count
    const searchBar = document.getElementById("search");
    const sortDropdown = document.getElementById("sortOptions");
    const gameCount = document.getElementById("gameCount");
    const welcomeText = document.getElementById("welcome");

    if (searchBar) searchBar.style.display = "none";
    if (sortDropdown) sortDropdown.style.display = "none";
    if (gameCount) gameCount.style.display = "none";
    if (welcomeText) welcomeText.style.display = "none";

    // Show skeleton loaders
    showSkeletonLoader();

    setTimeout(() => {
        // Replace skeletons with actual games
        displayGames();

        // Show the search bar, dropdown, and game count again
        if (searchBar) searchBar.style.display = "inline-block";
        if (sortDropdown) sortDropdown.style.display = "inline-block";
        if (gameCount) gameCount.style.display = "block";
    }, 5000); // 5-second delay
}

// Call the function on page load
window.addEventListener("load", async () => {
  await fetchGlobalLikes();
  await fetchGlobalClicks();
  displayGamesWithSkeleton();
});
async function fetchGlobalLikes() {
  const supabaseUrl = 'https://jbekjmsruiadbhaydlbt.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY';
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.from('game_votes').select('game_id, likes');
  if (error) {
    console.error('Error fetching global likes:', error);
    return;
  }
  games.forEach(game => {
    const found = data.find(row => row.game_id === game.link || row.game_id === game.name);
    game.globalLikes = found ? found.likes : 0;
  });
}
  // Map likes to games array
  games.forEach(game => {
    // Use game.link as the unique ID (adjust if you use game.name)
    const found = data.find(row => row.game_id === game.link || row.game_id === game.name);
    game.globalLikes = found ? found.likes : 0;
  });
async function fetchGlobalClicks() {
  const supabaseUrl = 'https://jbekjmsruiadbhaydlbt.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZWtqbXNydWlhZGJoYXlkbGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzOTQ2NTgsImV4cCI6MjA2Mzk3MDY1OH0.5Oku6Ug-UH2voQhLFGNt9a_4wJQlAHRaFwTeQRyjTSY';
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.from('game_votes').select('game_id, clicks');
  if (error) {
    console.error('Error fetching global clicks:', error);
    return;
  }
  games.forEach(game => {
    const found = data.find(row => row.game_id === game.link || row.game_id === game.name);
    game.globalClicks = found ? found.clicks : 0;
  });
}
