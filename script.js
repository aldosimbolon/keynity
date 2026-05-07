// ===== QUOTE COLLECTION =====
const quotes = [
  { text: "Small things make big differences ✨", author: "Keynity Team" },
  { text: "Carry a little joy with you everywhere 🎀", author: "Daily Reminder" },
  { text: "You are the main character of your story 💖", author: "Keynity Vibes" },
  { text: "Soft heart, strong soul 🌸", author: "Self Love Club" },
  { text: "Today is a good day to be happy ☀️", author: "Mood Booster" },
  { text: "Bloom where you are planted 🌷", author: "Garden of Life" },
  { text: "Every accessory tells a story 💫", author: "Keynity Team" },
  { text: "Be your own kind of beautiful 💕", author: "Confidence Notes" },
  { text: "Stay soft, but never weak 🫧", author: "Keynity Mantra" },
  { text: "Good vibes only, always 🌈", author: "Daily Energy" },
];

// ===== QUOTE ROTATOR =====
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");

let lastIndex = -1;

function getRandomQuote() {
  let idx;
  do {
    idx = Math.floor(Math.random() * quotes.length);
  } while (idx === lastIndex && quotes.length > 1);
  lastIndex = idx;
  return quotes[idx];
}

function showQuote(animate = true) {
  const quote = getRandomQuote();

  if (animate) {
    quoteText.style.opacity = "0";
    quoteAuthor.style.opacity = "0";
    quoteText.style.transform = "translateY(10px)";

    setTimeout(() => {
      quoteText.textContent = `"${quote.text}"`;
      quoteAuthor.textContent = `— ${quote.author}`;
      quoteText.style.transition = "all 0.4s ease";
      quoteAuthor.style.transition = "all 0.4s ease";
      quoteText.style.opacity = "1";
      quoteAuthor.style.opacity = "1";
      quoteText.style.transform = "translateY(0)";
    }, 200);
  } else {
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
  }
}

// Show first quote on load
showQuote(false);

// Button event
newQuoteBtn.addEventListener("click", () => showQuote(true));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== CONFETTI ON LOAD (subtle welcome effect) =====
function spawnConfetti() {
  const emojis = ["💖", "✨", "🌸", "🎀", "⭐"];
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed; inset: 0; pointer-events: none;
    z-index: 9999; overflow: hidden;
  `;
  document.body.appendChild(container);

  for (let i = 0; i < 15; i++) {
    const piece = document.createElement("span");
    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    piece.style.cssText = `
      position: absolute;
      top: -50px;
      left: ${Math.random() * 100}%;
      font-size: ${Math.random() * 20 + 20}px;
      animation: confettiFall ${Math.random() * 2 + 2}s ease-in forwards;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 4000);
}

const style = document.createElement("style");
style.textContent = `
  @keyframes confettiFall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Trigger confetti when page loads
window.addEventListener("load", () => {
  setTimeout(spawnConfetti, 300);
});

(function() {
  // Track sumber visitor (dari QR / direct / sosmed)
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source') || 'direct';
  console.log('Visitor source:', source);
  
  // Kirim event ke Google Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'qr_scan', { 
      source: source,
      page: 'home'
    });
  }
})();

// Track klik playlist
document.querySelectorAll('.playlist-card').forEach(card => {
  card.addEventListener('click', () => {
    const playlistName = card.querySelector('.playlist-title').textContent;
    if (typeof gtag === 'function') {
      gtag('event', 'playlist_click', {
        playlist_name: playlistName
      });
    }
    console.log('Playlist clicked:', playlistName);
  });
});

// Track klik tombol "Get Another Quote"
const quoteBtn = document.getElementById('newQuoteBtn');
if (quoteBtn) {
  quoteBtn.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'new_quote_click');
    }
  });
}