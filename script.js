let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;

const colors = ["green", "red", "yellow", "blue"];
const h2 = document.querySelector("h2");

// Start game on keypress
document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    level = 0;
    gameSequence = [];
    h2.textContent = "Level 1";
    nextSequence();
  }
});

// Handle button clicks
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!started) return;

    const color = btn.id;
    userSequence.push(color);
    playSound(color);
    animateUserPress(color);
    checkAnswer(userSequence.length - 1);
  });
});

function nextSequence() {
  userSequence = [];
  level++;
  h2.textContent = `Level ${level}`;
  
  const randomColor = colors[Math.floor(Math.random() * 4)];
  gameSequence.push(randomColor);

  const btn = document.getElementById(randomColor);
  animateFlash(btn);
  playSound(randomColor);
}

function checkAnswer(index) {
  if (userSequence[index] === gameSequence[index]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.style.backgroundColor = "red";
    h2.innerHTML = `Game Over! You reached level ${level}.<br>Press any key to restart.`;
    setTimeout(() => {
      document.body.style.backgroundColor = "#f2f2f2";
    }, 300);
    startOver();
  }
}

function animateFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 200);
}

function animateUserPress(color) {
  const btn = document.getElementById(color);
  btn.classList.add("user-flash");
  setTimeout(() => btn.classList.remove("user-flash"), 150);
}

function playSound(color) {
  const audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function startOver() {
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}
