
const book = document.getElementById("book");
const openBookButton = document.getElementById("openBook");
const openHint = document.getElementById("openHint");

const welcome = document.getElementById("welcome");
const chapters = document.getElementById("chapters");
const poemPanel = document.getElementById("poemPanel");

const letterPage = document.getElementById("letterPage");
const letterContent = document.getElementById("letterContent");
const chapterNumber = document.getElementById("chapterNumber");

const backToWelcome = document.getElementById("backToWelcome");
const previousChapter = document.getElementById("previousChapter");
const nextChapter = document.getElementById("nextChapter");

const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicTitle = document.getElementById("musicTitle");
const musicTime = document.getElementById("musicTime");
const progressTrack = document.getElementById("progressTrack");
const progressFill = document.getElementById("progressFill");
const particles = document.getElementById("particles");

let currentChapter = 0;
let isBookOpen = false;
let pageIsAnimating = false;

// Each chapter has its own mood and message.
const letters = [
  {
    name: "Velvet",
    subtitle: "A little mischief",
    title: "An official notice for Shortie",
    greeting: "Dear Bonggo,",
    paragraphs: [
      "You have been selected for a very important position.",
      "Your responsibilities include being ridiculously cute, occasionally dramatic, and accepting that someone is going to tease you simply because it's fun.",
      "Your salary? Absolutely nothing. Your benefits? Unlimited affection, terrible jokes, and one extremely annoying person who has decided that making you smile is a worthwhile hobby.",
      "And before you complain about the working conditions, Teacher, I'm afraid the management is very handsome and completely unreasonable.",
      "Jokes aside, Momo, I hope something makes you smile today. Even if it's just this ridiculous little notice."
    ],
    signoff: "With mischief, always ♡"
  },
  {
    name: "Midnight",
    subtitle: "No words needed",
    title: "You can be quiet here",
    greeting: "Hey, Sugar Baby.",
    paragraphs: [
      "You don't always have to be the talkative version of yourself.",
      "You don't have to entertain anyone, come up with the right words, or pretend to have more energy than you do.",
      "Some days, being quiet is just being quiet. Some days, we need a little space. And sometimes, we don't even know what we need. That's okay, too.",
      "I'm not going to turn this little book into another list of questions. You've already got enough things asking for your attention.",
      "So just take a breath, get comfortable, and stay here for a moment if you want to. You can close this page whenever you're ready.",
      "There's nothing you need to prove to deserve a little gentleness."
    ],
    signoff: "No explanations required. ♡"
  },
  {
    name: "Blush",
    subtitle: "A tiny reminder",
    title: "In case you need a reminder",
    greeting: "My lovely Joy,",
    paragraphs: [
      "The world has a funny habit of making us forget the little things that make us wonderful.",
      "So here's your reminder: you are allowed to have imperfect days and still be someone worth caring about.",
      "You don't have to be cheerful all the time. You don't have to be productive every minute. You don't even have to know what you're feeling before you give yourself permission to rest.",
      "And for what it's worth, I'm glad our paths crossed. Out of all the ordinary little moments that could have passed us by, somehow there was a chance for us to know each other.",
      "I hope life gives you more soft mornings, unexpected laughter, good news, and people who make you feel comfortable being yourself."
    ],
    signoff: "A little kindness, just for you. ♡"
  },
  {
    name: "Daydream",
    subtitle: "Take your time",
    title: "A small place to rest",
    greeting: "Dear Teacher,",
    paragraphs: [
      "Imagine that the world has turned its volume down for a while.",
      "There's a comfy place to sit, your favourite song playing softly, nothing urgent waiting for you, and absolutely no one asking you to explain yourself.",
      "You can bring your thoughts here, or leave them at the door. You can smile, sigh, daydream, or do absolutely nothing.",
      "If something is on your mind, you can talk about it whenever you want. If nothing is wrong and you simply don't feel like talking today, that's okay, too.",
      "I'm not here to decide what you should feel. I just wanted to leave you something gentle to find when you needed a little softness.",
      "So take your time, Momo. One moment at a time is enough."
    ],
    signoff: "You deserve gentle days, too. ♡"
  }
];

function showScreen(screenToShow) {
  [welcome, chapters, poemPanel].forEach(screen => {
    screen.classList.add("hidden");
  });

  screenToShow.classList.remove("hidden");
}

function openTheBook() {
  // Try to start the song from the same tap/click that opens the book.
  // This helps browsers recognize the playback as user-initiated.
  if (music.paused) {
    music.play()
      .then(() => {
        musicTime.textContent = "Playing softly ♡";
        updateMusicButton();
      })
      .catch(() => {
        // The book still opens if playback is blocked or the file is missing.
        musicTime.textContent = "Tap ▶ to try playing music ♡";
        updateMusicButton();
      });
  }

  if (isBookOpen) return;

  isBookOpen = true;
  book.classList.add("open");
  openHint.textContent = "a little world, just for you ♡";
  openBookButton.disabled = true;

  window.setTimeout(() => {
    showScreen(chapters);
    openBookButton.disabled = false;
    chapters.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1050);
}

openBookButton.addEventListener("click", openTheBook);

book.addEventListener("click", () => {
  if (!isBookOpen) openTheBook();
});

function renderChapter(index) {
  currentChapter = (index + letters.length) % letters.length;
  const chapter = letters[currentChapter];

  pageIsAnimating = true;
  letterPage.classList.remove("turning");

  // Restart the page-turn animation.
  void letterPage.offsetWidth;
  letterPage.classList.add("turning");

  chapterNumber.textContent =
    `A LITTLE NOTE · ${String(currentChapter + 1).padStart(2, "0")}`;

  const paragraphs = chapter.paragraphs
    .map(paragraph => `<p>${paragraph}</p>`)
    .join("");

  letterContent.innerHTML = `
    <p class="letter-greeting">${chapter.greeting}</p>
    <h3>${chapter.title}</h3>
    ${paragraphs}
    <p class="letter-signoff">${chapter.signoff}</p>
  `;

  showScreen(poemPanel);

  window.setTimeout(() => {
    pageIsAnimating = false;
  }, 680);

  poemPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll(".heart-card").forEach(card => {
  card.addEventListener("click", () => {
    renderChapter(Number(card.dataset.chapter));
  });
});

previousChapter.addEventListener("click", () => {
  showScreen(chapters);
  chapters.scrollIntoView({ behavior: "smooth", block: "start" });
});

nextChapter.addEventListener("click", () => {
  if (pageIsAnimating) return;
  renderChapter(currentChapter + 1);
});

backToWelcome.addEventListener("click", () => {
  showScreen(welcome);
  welcome.scrollIntoView({ behavior: "smooth", block: "start" });
});

// MUSIC PLAYER
// Keep by-chance.mp3 in the same folder as index.html.
const songNames = {
  "by-chance.mp3": "By Chance"
};

musicTitle.textContent = songNames["by-chance.mp3"];

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updateMusicButton() {
  const playing = !music.paused;

  musicToggle.textContent = playing ? "Ⅱ" : "▶";
  musicToggle.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  musicToggle.setAttribute("aria-pressed", String(playing));
}

async function toggleMusic() {
  if (music.paused) {
    try {
      await music.play();
      musicTime.textContent = "Playing softly ♡";
    } catch (error) {
      musicTime.textContent = "Add by-chance.mp3 to the website folder";
    }
  } else {
    music.pause();
    musicTime.textContent = "Paused — take your time";
  }

  updateMusicButton();
}

musicToggle.addEventListener("click", toggleMusic);

music.addEventListener("timeupdate", () => {
  if (!Number.isFinite(music.duration) || music.duration <= 0) return;

  const percentage = (music.currentTime / music.duration) * 100;
  progressFill.style.width = `${percentage}%`;

  musicTime.textContent =
    `${formatTime(music.currentTime)} / ${formatTime(music.duration)}`;
});

music.addEventListener("loadedmetadata", () => {
  musicTime.textContent = `Ready · ${formatTime(music.duration)}`;
});

music.addEventListener("play", updateMusicButton);

music.addEventListener("pause", updateMusicButton);

music.addEventListener("ended", () => {
  progressFill.style.width = "0%";
  updateMusicButton();
});

music.addEventListener("error", () => {
  musicTime.textContent = "Add your song file to play music";
  musicToggle.disabled = false;
});

// Let her tap the progress bar to seek within the song.
progressTrack.addEventListener("click", event => {
  if (!Number.isFinite(music.duration) || music.duration <= 0) return;

  const rect = progressTrack.getBoundingClientRect();
  const ratio = Math.min(
    1,
    Math.max(0, (event.clientX - rect.left) / rect.width)
  );

  music.currentTime = ratio * music.duration;
});

// Floating stars and tiny hearts.
const symbols = ["✧", "♡", "·", "✦"];

function createParticle() {
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.textContent = symbols[
    Math.floor(Math.random() * symbols.length)
  ];

  particle.style.left = `${Math.random() * 100}%`;
  particle.style.fontSize = `${8 + Math.random() * 12}px`;
  particle.style.animationDuration = `${9 + Math.random() * 9}s`;

  particles.appendChild(particle);

  particle.addEventListener("animationend", () => {
    particle.remove();
  }, { once: true });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(createParticle, 900);
}
