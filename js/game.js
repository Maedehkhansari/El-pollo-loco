let canvans;
let gameMenu;
let world;
let keyboard = new Keyboard();
let isMute = false;

function init() {
  canvans = document.getElementById("canvas");
  help = document.getElementById("help");
  control = document.getElementById("control");
  gameMenu = document.getElementById("game-menu");
}

function startTheGame() {
  world = new World(canvans, keyboard);
  canvans.classList.remove("d-none");
  help.classList.remove("d-none");
  control.classList.remove("d-none");
  gameMenu.classList.add("d-none");

  document.querySelectorAll(".keyboard-button").forEach((button) => {
    button.addEventListener("mousedown", (event) =>
      setControlState(event, true)
    );
    button.addEventListener("mouseup", (event) =>
      setControlState(event, false)
    );
    button.addEventListener("mouseleave", (event) =>
      setControlState(event, false)
    );
  });

  document.querySelectorAll(".keyboard-button").forEach((button) => {
    button.addEventListener("touchstart", (event) =>
      setControlState(event, true)
    );
    button.addEventListener("touchend", (event) =>
      setControlState(event, false)
    );
  });
}

function resetGame() {
  world.cleanUp();
  canvans.classList.add("d-none");
  help.classList.add("d-none");
  control.classList.add("d-none");
  gameMenu.classList.remove("d-none");
}

function muteSound() {
  if (isMute) {
    world.playBackgroundSound();
    isMute = false;
  } else {
    world.muteBackgroundSound();
    isMute = true;
  }

  document.getElementById("volume-img").classList.toggle("d-none");
  document.getElementById("mute-img").classList.toggle("d-none");
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode === 38) {
    keyboard.UP = true;
  }

  if (e.keyCode === 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode === 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode === 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode === 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode === 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode === 38) {
    keyboard.UP = false;
  }

  if (e.keyCode === 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode === 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode === 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode === 68) {
    keyboard.D = false;
  }
});

function setControlState(event, state) {
  console.log(event.target.id);

  if (event.target.id === "left") {
    keyboard.LEFT = state;
  }

  if (event.target.id === "right") {
    keyboard.RIGHT = state;
  }

  if (event.target.id === "throw") {
    keyboard.D = state;
  }

  if (event.target.id === "jump") {
    keyboard.SPACE = state;
  }
}
