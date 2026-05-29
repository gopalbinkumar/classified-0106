"use strict";

const DEV_SKIP_INTRO = false; // Set to true to skip loading and verification screens for faster testing
const ENABLE_FLOATING_HEARTS = false; // Set to false to disable floating hearts for better performance on low-end devices

if (DEV_SKIP_INTRO) {
  document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("unlocked");

    const loader = document.getElementById("loading-screen");
    const verify = document.getElementById("verification-screen");
    const access = document.getElementById("access-loading-screen");

    if (loader) loader.style.display = "none";
    if (verify) verify.style.display = "none";
    if (access) access.style.display = "none";

    generateHeroStars();
    if (ENABLE_FLOATING_HEARTS) {
      startFloatingHearts();
    }
    initScrollReveal();
    initTypewriterObserver();
  });
}
/* ============================================================
   1. LOADING SCREEN
   ============================================================ */
window.addEventListener("load", function () {
  if (DEV_SKIP_INTRO) return;

  setTimeout(function () {
    const loader = document.getElementById("loading-screen");
    const verifyScreen = document.getElementById("verification-screen");

    // munculkan verifikasi dulu
    if (verifyScreen) {
      verifyScreen.classList.add("active");
    }

    // baru hilangkan loading screen sedikit setelahnya
    setTimeout(() => {
      if (loader) {
        loader.classList.add("hidden");
      }
    }, 100);
  }, 4500);
});

let verifyCurrentStep = 1;

const verificationQuestions = {
  1: "QUESTION 1: What is your nickname?",
  2: "QUESTION 2: What is your birthday date? (dd/mm)",
  3: "QUESTION 3: Who is your favorite person?",
  4: "QUESTION 4: What is your favorite color?",

};

const verificationAnswers = {
  1: ["sinta", "yashinta"],
  2: ["1 june", "01 june", "01/06", "1/6"],
  3: ["dzaki", "gopal"],
  4: ["pink", "merah muda"],
};

function normalizeAnswer(value) {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

function checkVerification() {
  const input = document.getElementById("verify-answer");
  const error = document.getElementById("verify-error");
  const questionText = document.getElementById("verify-question-text");
  const stepText = document.getElementById("verify-step");

  if (!input) return;

  const userAnswer = normalizeAnswer(input.value);
  const validAnswers = verificationAnswers[verifyCurrentStep];

  if (!validAnswers.includes(userAnswer)) {
    if (error) {
      error.textContent = "ACCESS DENIED. INVALID RESPONSE.";
    }

    input.value = "";
    input.focus();

    return;
  }

  if (error) {
    error.textContent = "ACCESS GRANTED FOR STEP " + verifyCurrentStep + ".";
  }

  if (verifyCurrentStep < 4) {
    verifyCurrentStep++;

    setTimeout(() => {
      if (questionText) {
        questionText.textContent =
          "> " + verificationQuestions[verifyCurrentStep];
      }

      if (stepText) {
        stepText.textContent = verifyCurrentStep;
      }

      if (error) {
        error.textContent = "";
      }

      input.value = "";
      input.focus();
    }, 1000);

    return;
  }

  if (error) {
    error.textContent = "FULL ACCESS GRANTED.";
  }

  setTimeout(() => {
    unlockBirthdayWebsite();
  }, 800);
}

function unlockBirthdayWebsite() {
  const verifyScreen = document.getElementById("verification-screen");
  const accessLoadingScreen = document.getElementById("access-loading-screen");

  if (verifyScreen) {
    verifyScreen.classList.remove("active");
    verifyScreen.classList.add("hidden");

    setTimeout(() => {
      verifyScreen.style.display = "none";
    }, 400);
  }

  if (accessLoadingScreen) {
    const accessProgress = accessLoadingScreen.querySelector(
      ".access-loading-progress",
    );

    if (accessProgress) {
      accessProgress.style.animation = "none";
      accessProgress.offsetHeight; // force reflow
      accessProgress.style.animation = "";
    }

    setTimeout(() => {
      accessLoadingScreen.classList.add("active");
    }, 300);
  }

  setTimeout(() => {
    if (accessLoadingScreen) {
      accessLoadingScreen.classList.remove("active");
      accessLoadingScreen.classList.add("hidden");

      setTimeout(() => {
        accessLoadingScreen.style.display = "none";
      }, 500);
    }

    document.body.classList.add("unlocked");

    generateHeroStars();
    if (ENABLE_FLOATING_HEARTS) {
      startFloatingHearts();
    }
    initScrollReveal();
    initTypewriterObserver();

    setTimeout(() => {
      launchBirthdayPopper();
    }, 500);
  }, 3600);
}

document.addEventListener("keydown", function (e) {
  const verifyScreen = document.getElementById("verification-screen");

  if (
    verifyScreen &&
    verifyScreen.classList.contains("active") &&
    e.key === "Enter"
  ) {
    checkVerification();
  }
});

/* ============================================================
   2. HERO STAR PARTICLES
   ============================================================ */
function generateHeroStars() {
  const container = document.querySelector(".hero-stars");
  if (!container) return;

  const count = 40;
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("hero-star");

    const size = Math.random() * 4 + 2; // 2–6px
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 4;
    const dur = Math.random() * 3 + 2;

    star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            top: ${top}%;
            animation-duration: ${dur}s;
            animation-delay: ${delay}s;
        `;
    container.appendChild(star);
  }
}

/* ============================================================
   3. FLOATING HEARTS
   ============================================================ */
const heartEmojis = ["❤️", "💕", "💖", "💗", "💓", "💝", "💞", "🌸"];

function createFloatingHeart() {
  const container = document.getElementById("hearts-container");
  if (!container) return;

  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.textContent =
    heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  const left = Math.random() * 100;
  const size = Math.random() * 1.2 + 0.8; // 0.8–2em
  const duration = Math.random() * 8 + 7; // 7–15s
  const delay = Math.random() * 3;

  heart.style.cssText = `
        left: ${left}%;
        font-size: ${size}rem;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

  container.appendChild(heart);

  // Remove after animation
  setTimeout(
    function () {
      heart.remove();
    },
    (duration + delay) * 1000 + 200,
  );
}

function startFloatingHearts() {
  // Initial burst
  for (let i = 0; i < 8; i++) {
    setTimeout(createFloatingHeart, i * 400);
  }
  // Continuous generation
  setInterval(createFloatingHeart, 2500);
}

/* ============================================================
   4. SMOOTH SCROLL HELPER
   ============================================================ */
function scrollToNext(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ============================================================
   5. SCROLL REVEAL ANIMATION
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-up");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = Array.from(
            entry.target.parentElement.querySelectorAll(".reveal-up"),
          );
          const i = siblings.indexOf(entry.target);
          const delay = i * 100;

          setTimeout(function () {
            entry.target.classList.add("visible");
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

/* ============================================================
   6. TYPEWRITER EFFECT
   ============================================================ */
let typewriterDone = false;

function initTypewriterObserver() {
  const section = document.getElementById("letter");
  if (!section) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !typewriterDone) {
          typewriterDone = true;
          startTypewriter();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(section);
}

function startTypewriter() {
  const container = document.getElementById("typewriter-text");
  const seal = document.querySelector(".letter-seal");

  if (!container || typeof letterLines === "undefined") return;

  // Build full text
  const fullText = letterLines.join("\n");
  let charIndex = 0;
  let html = "";

  // Add cursor
  const cursor = document.createElement("span");
  cursor.classList.add("cursor");

  function type() {
    if (charIndex < fullText.length) {
      const char = fullText[charIndex];
      if (char === "\n") {
        html += "<br>";
      } else {
        // Escape HTML
        html += char
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      container.innerHTML = html;
      container.appendChild(cursor);
      charIndex++;

      // Vary speed for natural feel
      let speed = 28;
      if (char === "." || char === ",") speed = 160;
      else if (char === "\n") speed = 100;
      else if (Math.random() < 0.05) speed = 80;

      setTimeout(type, speed);
    } else {
      // Remove cursor, show seal
      cursor.remove();
      if (seal) {
        setTimeout(function () {
          seal.classList.add("show");
        }, 400);
      }
    }
  }

  setTimeout(type, 600);
}

/* ============================================================
   7. GALLERY MODAL
   ============================================================ */
let currentPhoto = 0;

function openModal(index) {
  if (typeof galleryData === "undefined") return;

  currentPhoto = index;
  updateModal();

  const modal = document.getElementById("gallery-modal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function updateModal() {
  const img = document.getElementById("modal-img");
  const caption = document.getElementById("modal-caption");
  if (!img || !caption) return;

  const photo = galleryData[currentPhoto];
  img.src = photo.src;
  img.alt = photo.caption;
  caption.textContent = photo.caption;
}

function changePhoto(direction) {
  if (typeof galleryData === "undefined") return;
  currentPhoto =
    (currentPhoto + direction + galleryData.length) % galleryData.length;
  updateModal();
}

function closeModal(event) {
  const modal = document.getElementById("gallery-modal");
  if (!modal) return;

  // Close only when clicking backdrop or close button
  if (
    !event ||
    event.target === modal ||
    event.currentTarget.classList.contains("modal-close")
  ) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Keyboard nav
document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("gallery-modal");
  if (!modal || !modal.classList.contains("open")) return;

  if (e.key === "ArrowLeft") changePhoto(-1);
  if (e.key === "ArrowRight") changePhoto(1);
  if (e.key === "Escape") closeModal();
});

/* ============================================================
   8. REASONS CAROUSEL
   ============================================================ */
let reasonIndex = 0;
let reasonAnimating = false;

function showNextReason() {
  if (typeof reasons === "undefined" || reasons.length === 0) return;
  if (reasonAnimating) return;

  reasonAnimating = true;

  const el = document.getElementById("reason-text");
  const counter = document.getElementById("reason-num");
  if (!el) return;

  // Fade out
  el.classList.add("fade-out");

  setTimeout(function () {
    // Update text
    el.textContent = reasons[reasonIndex];
    reasonIndex = (reasonIndex + 1) % reasons.length;
    if (counter)
      counter.textContent = reasonIndex === 0 ? reasons.length : reasonIndex;

    // Fade in
    el.classList.remove("fade-out");
    el.classList.add("fade-in");

    setTimeout(function () {
      el.classList.remove("fade-in");
      reasonAnimating = false;
    }, 400);
  }, 350);
}

/* ============================================================
   9. CONFETTI ANIMATION
   ============================================================ */
const confettiColors = [
  "#FF6B9D",
  "#FFD6E5",
  "#F7C873",
  "#FF8FB5",
  "#FFFFFF",
  "#E8547A",
  "#FFB3CE",
  "#FFF5F8",
  "#FF4081",
  "#FFCDD2",
];

function createConfettiPiece() {
  const container = document.getElementById("confetti-container");
  if (!container) return;

  const piece = document.createElement("div");
  piece.classList.add("confetti-piece");

  const color =
    confettiColors[Math.floor(Math.random() * confettiColors.length)];
  const left = Math.random() * 100;
  const width = Math.random() * 8 + 6;
  const height = Math.random() * 10 + 8;
  const duration = Math.random() * 3 + 2;
  const delay = Math.random() * 2;
  const shape = Math.random() > 0.5 ? "50%" : "2px";

  piece.style.cssText = `
        left: ${left}%;
        width: ${width}px;
        height: ${height}px;
        background: ${color};
        border-radius: ${shape};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

  container.appendChild(piece);

  setTimeout(
    function () {
      piece.remove();
    },
    (duration + delay) * 1000 + 300,
  );
}

function launchConfetti() {
  const count = 120;
  for (let i = 0; i < count; i++) {
    setTimeout(createConfettiPiece, i * 25);
  }
}

/* ============================================================
   10. SURPRISE BUTTON
   ============================================================ */
function triggerSurprise() {
  // Launch confetti
  launchConfetti();

  // Extra hearts burst
  for (let i = 0; i < 20; i++) {
    setTimeout(createFloatingHeart, i * 150);
  }

  // Show overlay
  const overlay = document.getElementById("surprise-overlay");
  if (overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    overlay.removeAttribute("aria-hidden");
  }
}

function closeSurprise() {
  const overlay = document.getElementById("surprise-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    overlay.setAttribute("aria-hidden", "true");
  }
}

/* ============================================================
   11. GALLERY PLACEHOLDER ENHANCEMENT
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  // Add captions to placeholders dynamically
  const placeholderCaptions = [
    "📸 Tambahkan Foto 1",
    "📸 Tambahkan Foto 2",
    "📸 Tambahkan Foto 3",
    "📸 Tambahkan Foto 4",
    "📸 Tambahkan Foto 5",
    "📸 Tambahkan Foto 6",
  ];

  // If no real images, style the gallery items as placeholders
  const galleryImgs = document.querySelectorAll(".gallery-img-wrapper img");
  galleryImgs.forEach(function (img, i) {
    img.addEventListener("error", function () {
      const wrapper = img.closest(".gallery-img-wrapper");
      if (wrapper) {
        wrapper.innerHTML = `
                    <div class="photo-placeholder-inner">
                        <span class="ph-icon">📷</span>
                        <span class="ph-label">${placeholderCaptions[i] || "Foto " + (i + 1)}</span>
                        <span class="ph-hint">Upload ke assets/photos/photo${i + 1}.jpg</span>
                    </div>
                `;
        wrapper.style.cssText = `
                    background: linear-gradient(135deg, #FFD6E5, #FFF5F8);
                    display: flex; align-items: center; justify-content: center;
                    height: 100%; text-align: center; padding: 1rem;
                    flex-direction: column; gap: 0.4rem;
                `;
        const inner = wrapper.querySelector(".photo-placeholder-inner");
        if (inner) {
          inner.style.cssText =
            "display:flex; flex-direction:column; align-items:center; gap:0.4rem;";
        }
        const phIcon = wrapper.querySelector(".ph-icon");
        if (phIcon) {
          phIcon.style.cssText = "font-size:2.5rem;";
        }
        const phLabel = wrapper.querySelector(".ph-label");
        if (phLabel) {
          phLabel.style.cssText =
            "font-size:0.78rem; font-weight:600; color:#FF6B9D;";
        }
        const phHint = wrapper.querySelector(".ph-hint");
        if (phHint) {
          phHint.style.cssText =
            "font-size:0.65rem; color:#A07080; font-family: monospace;";
        }
      }
    });
  });
});

/* ============================================================
   12. PASSIVE SCROLL PERFORMANCE
   ============================================================ */
// Register all scroll listeners as passive for better performance
(function () {
  let supportsPassive = false;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        },
      }),
    );
  } catch (e) {}

  const passiveOption = supportsPassive ? { passive: true } : false;

  // Parallax-lite on hero (subtle)
  const hero = document.querySelector(".section-hero");
  const heroContent = document.querySelector(".hero-content");

  if (hero && heroContent) {
    window.addEventListener(
      "scroll",
      function () {
        const scrolled = window.pageYOffset;
        const heroH = hero.offsetHeight;
        if (scrolled < heroH) {
          heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
          heroContent.style.opacity = 1 - (scrolled / heroH) * 1.3;
        }
      },
      passiveOption,
    );
  }
})();

/* ============================================================
   13. MOBILE TOUCH SWIPE FOR GALLERY MODAL
   ============================================================ */
(function () {
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    },
    { passive: true },
  );

  document.addEventListener(
    "touchend",
    function (e) {
      const modal = document.getElementById("gallery-modal");
      if (!modal || !modal.classList.contains("open")) return;

      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);

      if (Math.abs(dx) > 50 && dy < 80) {
        changePhoto(dx < 0 ? 1 : -1);
      }
    },
    { passive: true },
  );
})();

/* ============================================================
   END OF SCRIPT
   ============================================================ */
function launchBirthdayPopper() {
  const left = document.querySelector(".party-popper.left");
  const right = document.querySelector(".party-popper.right");

  if (!left || !right) return;

  left.classList.add("animate");
  right.classList.add("animate");

  launchCornerConfetti();

  setTimeout(() => {
    const surprise = document.getElementById("birthday-surprise");
    if (surprise) surprise.remove();
  }, 3500);
}

function launchCornerConfetti() {
  if (typeof confetti === "undefined") return;

  const duration = 2200;
  const end = Date.now() + duration;

  const colors = [
    "#ff4f8b",
    "#ffb6c1",
    "#ffd700",
    "#ffffff",
    "#ff69b4",
    "#f7c873",
  ];

  function frame() {
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 65,
      startVelocity: 55,
      decay: 0.9,
      gravity: 0.9,
      scalar: 1,
      ticks: 220,
      origin: {
        x: 0,
        y: 1,
      },
      colors: colors,
    });

    confetti({
      particleCount: 7,
      angle: 120,
      spread: 65,
      startVelocity: 55,
      decay: 0.9,
      gravity: 0.9,
      scalar: 1,
      ticks: 220,
      origin: {
        x: 1,
        y: 1,
      },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }

  frame();
}

function scrollFacts(direction) {
  const grid = document.getElementById("factsGrid");

  if (!grid) return;

  const scrollAmount = 320;

  grid.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}
