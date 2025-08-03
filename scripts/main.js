/**
 * MAIN JAVASCRIPT - BIRTHDAY WEBSITE
 * Core functionality and initialization
 */

// DOM Elements
const loadingScreen = document.getElementById("loading-screen");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const hiddenStar = document.getElementById("hidden-star");
const easterEggModal = document.getElementById("easter-egg-modal");
const closeModal = document.getElementById("close-modal");
const skyParticles = document.getElementById("sky-particles");
const secretButton = document.getElementById("secret-button");
const secretModal = document.getElementById("secret-modal");
const musicPlayer = document.getElementById("music-player");
const musicToggle = document.getElementById("music-toggle");
const backgroundMusic = document.getElementById("background-music");
const photoUpload = document.getElementById("photo-upload");
const dindaPhoto = document.getElementById("dinda-photo");
const photoFrame = document.querySelector(".photo-frame");

// State
let isLoaded = false;
let isDarkMode = localStorage.getItem("darkMode") === "true";
let particleCount = 0;
const maxParticles = 30;
let isPlaying = false;
let isMusicEnabled = localStorage.getItem("musicEnabled") !== "false";
let hasScrolledToBottom = false;

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeWebsite();
});

/**
 * Initialize all website functionality
 */
function initializeWebsite() {
  // Set initial theme
  if (isDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  // Initialize mobile scroll fixes
  initializeMobileScrollFix();
  initializeSmoothScrolling();

  // Initialize components
  setTimeout(() => {
    hideLoadingScreen();
    createSkyParticles();
    initializeScrollAnimations();
    initializeTypewriterEffects();
    initializeDarkMode();
    initializeEasterEgg();
    initializeSecretButton();
    initializeScrollToBottomDetection();
    initializeParallax();
    initializeMemoryCards();
    initializeWordCards();
    initializePoemAnimation();
    initializeMusicPlayer();
    initializePhotoUpload();
    loadSavedPhoto();

    // Mark as loaded
    isLoaded = true;
  }, 3000); // Loading screen duration
}

/**
 * Hide loading screen with fade out effect
 */
function hideLoadingScreen() {
  if (loadingScreen) {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }
}

/**
 * Create animated sky particles
 */
function createSkyParticles() {
  if (!skyParticles) return;

  function createParticle() {
    if (particleCount >= maxParticles) return;

    const particle = document.createElement("div");
    particle.className = "sky-particle";

    // Random position and properties
    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 4 + 4;
    const delay = Math.random() * 2;

    particle.style.left = startX + "px";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.animationDuration = duration + "s";
    particle.style.animationDelay = delay + "s";

    skyParticles.appendChild(particle);
    particleCount++;

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
        particleCount--;
      }
    }, (duration + delay) * 1000);
  }

  // Create particles periodically
  setInterval(createParticle, 500);

  // Create initial batch
  for (let i = 0; i < 10; i++) {
    setTimeout(createParticle, i * 200);
  }
}

/**
 * Initialize mobile scroll optimizations for smooth scrolling
 */
function initializeMobileScrollFix() {
  // Detect mobile devices
  const isMobile =
    window.innerWidth <= 768 ||
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    // Set viewport height for mobile
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);

    // Custom smooth scroll implementation for mobile
    let isScrolling = false;

    // Override any programmatic scrolling with smooth behavior
    const originalScrollTo = window.scrollTo;
    const originalScrollIntoView = Element.prototype.scrollIntoView;

    window.scrollTo = function (options) {
      if (typeof options === "object" && options !== null) {
        options.behavior = "smooth";
      } else if (arguments.length === 2) {
        // scrollTo(x, y) format
        options = {
          left: arguments[0],
          top: arguments[1],
          behavior: "smooth",
        };
      }
      return originalScrollTo.call(this, options);
    };

    Element.prototype.scrollIntoView = function (options) {
      if (typeof options === "boolean") {
        options = { block: options ? "start" : "end", behavior: "smooth" };
      } else if (typeof options === "object" && options !== null) {
        options.behavior = "smooth";
      } else {
        options = { behavior: "smooth", block: "start" };
      }
      return originalScrollIntoView.call(this, options);
    };

    // Prevent scroll event throttling that might interfere with smooth scrolling
    document.addEventListener(
      "touchstart",
      function () {
        isScrolling = true;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      function () {
        setTimeout(() => {
          isScrolling = false;
        }, 100);
      },
      { passive: true }
    );

    // Optimize scroll performance
    let ticking = false;
    function updateScrollPosition() {
      // Perform scroll-dependent operations here if needed
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(updateScrollPosition);
          ticking = true;
        }
      },
      { passive: true }
    );
  }
}

/**
 * Initialize enhanced smooth scrolling for all devices
 */
function initializeSmoothScrolling() {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Enhanced scrollTo function for programmatic scrolling
  window.smoothScrollTo = function (targetY, duration = 800) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const ease = 0.5 - Math.cos(progress * Math.PI) / 2;

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  };

  // Handle any section scrolling
  window.scrollToSection = function (sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const targetY = section.offsetTop;
      window.smoothScrollTo(targetY);
    }
  };
}

/**
 * Initialize scroll-triggered animations
 */
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Special handling for memory cards
        if (entry.target.classList.contains("memory-card")) {
          const delay =
            Array.from(entry.target.parentNode.children).indexOf(entry.target) *
            150;
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, delay);
        }

        // Special handling for word cards
        if (entry.target.classList.contains("word-card")) {
          const delay = parseFloat(entry.target.dataset.delay) * 1000 || 0;
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) rotateY(0deg)";
          }, delay);
        }
      }
    });
  }, observerOptions);

  // Observe elements
  const animatedElements = document.querySelectorAll(
    ".memory-card, .word-card, .poem-verse, .message-card"
  );
  animatedElements.forEach((el) => observer.observe(el));
}

/**
 * Initialize typewriter effects for letter section
 */
function initializeTypewriterEffects() {
  const typewriterElements = document.querySelectorAll(".typewriter-text");

  typewriterElements.forEach((element) => {
    const delay = parseInt(element.dataset.delay) || 0;
    const text = element.textContent;

    // Clear initial text
    element.textContent = "";
    element.style.opacity = "1";

    setTimeout(() => {
      typewriterEffect(element, text, 50);
    }, delay);
  });
}

/**
 * Typewriter effect function
 */
function typewriterEffect(element, text, speed) {
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

/**
 * Initialize dark mode functionality
 */
function initializeDarkMode() {
  if (!darkModeToggle) return;

  darkModeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    localStorage.setItem("darkMode", isDarkMode);

    // Add toggle animation
    darkModeToggle.style.transform = "scale(0.8) rotate(180deg)";
    setTimeout(() => {
      darkModeToggle.style.transform = "scale(1) rotate(0deg)";
    }, 200);
  });
}

/**
 * Initialize Easter egg functionality
 */
function initializeEasterEgg() {
  if (!hiddenStar || !easterEggModal || !closeModal) return;

  // Hide easter egg initially (no inline style needed, CSS handles this)
  hiddenStar.classList.remove("show", "animate-in", "pulsing");

  hiddenStar.addEventListener("click", () => {
    easterEggModal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Play sound effect (if available)
    playStarSound();

    // Add countdown timer before turtle animation
    showCountdownTimer();
  });

  closeModal.addEventListener("click", closeEasterEggModal);
  easterEggModal.addEventListener("click", (e) => {
    if (e.target === easterEggModal) {
      closeEasterEggModal();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && easterEggModal.style.display === "flex") {
      closeEasterEggModal();
    }
  });
}

/**
 * Close Easter egg modal
 */
function closeEasterEggModal() {
  if (easterEggModal) {
    easterEggModal.style.display = "none";
    document.body.style.overflow = "";

    // Keep hidden star visible using CSS classes
    if (hiddenStar) {
      hiddenStar.classList.remove("pulsing");
      hiddenStar.classList.add("show", "animate-in");
    }

    // Show secret button after Easter egg is closed
    showSecretButton();
  }
}

/**
 * Play star sound effect (placeholder)
 */
function playStarSound() {
  // Create audio context for sound effect
  if (window.AudioContext || window.webkitAudioContext) {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      1200,
      audioContext.currentTime + 0.1
    );

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.3
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }
}

/**
 * Show countdown timer before turtle animation
 */
function showCountdownTimer() {
  if (!easterEggModal) return;

  // Update modal content with countdown
  const modalContent = easterEggModal.querySelector(".modal-content");
  if (!modalContent) return;

  const originalContent = modalContent.innerHTML;

  // Personal messages for each countdown number
  const personalMessages = {
    5: "Dinda, kamu adalah seseorang yang sangat spesial...",
    4: "Setiap hari bersamamu adalah berkah yang tak terhingga...",
    3: "Mimpi-mimpimu akan menjadi kenyataan yang indah...",
    2: "Semoga tahun baru ini membawa kebahagiaan yang berlimpah...",
    1: "Get ready for something magical, Dinda! ✨",
    0: "Here's your special surprise! 🎂",
  };

  modalContent.innerHTML = `
    <h3>🎂 Preparing Your Special Surprise! 🎂</h3>
    <div style="font-size: 4rem; font-weight: bold; color: #FF6B6B; margin: 30px 0;">
      <span id="countdown-number">5</span>
    </div>
    <p id="personal-message" style="font-size: 1.1rem; color: #666; min-height: 60px; display: flex; align-items: center; justify-content: center; text-align: center; font-style: italic;">
      ${personalMessages[5]}
    </p>
    <button id="close-modal">Cancel</button>
  `;

  // Re-attach close button event
  const newCloseBtn = modalContent.querySelector("#close-modal");
  if (newCloseBtn) {
    newCloseBtn.addEventListener("click", () => {
      modalContent.innerHTML = originalContent;
      closeEasterEggModal();
    });
  }

  const countdownElement = document.getElementById("countdown-number");
  const messageElement = document.getElementById("personal-message");
  let countdown = 5;

  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdownElement && messageElement) {
      countdownElement.textContent = countdown;
      messageElement.textContent = personalMessages[countdown];

      // Add pulse animation
      countdownElement.style.transform = "scale(1.2)";
      setTimeout(() => {
        countdownElement.style.transform = "scale(1)";
      }, 150);
    }

    if (countdown <= 0) {
      clearInterval(countdownInterval);

      // Close easter egg modal
      closeEasterEggModal();

      // Show secret button after Easter egg is completed
      setTimeout(() => {
        showSecretButton();
      }, 1000);

      // Show turtle animation after a brief moment
      setTimeout(() => {
        if (window.showTurtleAnimation) {
          window.showTurtleAnimation();
        }
      }, 300);
    }
  }, 1000);
}

/**
 * Initialize scroll to bottom detection for Easter egg
 */
function initializeScrollToBottomDetection() {
  function checkScrollPosition() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if user scrolled to within 100px of bottom
    const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;

    if (isNearBottom && !hasScrolledToBottom) {
      hasScrolledToBottom = true;
      showEasterEgg();
    }
  }

  function showEasterEgg() {
    if (hiddenStar) {
      hiddenStar.classList.add("show");

      // Animate Easter egg appearance
      setTimeout(() => {
        hiddenStar.classList.add("animate-in");
      }, 100);

      // Add gentle pulse animation to attract attention
      setTimeout(() => {
        hiddenStar.classList.add("pulsing");
      }, 1000);

      // Show a subtle notification
      showEasterEggNotification();
    }
  }

  function showEasterEggNotification() {
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #87CEEB, #B0E0E6);
      color: #2F4F4F;
      padding: 15px 20px;
      border-radius: 15px;
      font-family: 'Dancing Script', cursive;
      font-size: 1.1rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      z-index: 999;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.5s ease;
      pointer-events: none;
    `;
    notification.textContent =
      "✨ You found the hidden surprise! Click the star! ⭐";

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(0)";
    }, 500);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    }, 4000);
  }

  // Add CSS for gentle pulse animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes gentle-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  `;
  document.head.appendChild(style);

  // Throttled scroll listener
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(checkScrollPosition);
      ticking = true;
      setTimeout(() => {
        ticking = false;
      }, 100);
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
}

/**
 * Initialize secret button functionality
 */
function initializeSecretButton() {
  if (!secretButton || !secretModal) return;

  secretButton.addEventListener("click", () => {
    secretModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    showStep("warning-step");
  });

  // Warning step buttons
  const warningNo = document.getElementById("warning-no");
  const warningYes = document.getElementById("warning-yes");

  if (warningNo) {
    warningNo.addEventListener("click", () => {
      closeSecretModal();
    });
  }

  if (warningYes) {
    warningYes.addEventListener("click", () => {
      showStep("password-step");
    });
  }

  // Password step buttons
  const passwordBack = document.getElementById("password-back");
  const passwordSubmit = document.getElementById("password-submit");
  const passwordInput = document.getElementById("password-input");

  if (passwordBack) {
    passwordBack.addEventListener("click", () => {
      showStep("warning-step");
      clearPasswordError();
    });
  }

  if (passwordSubmit) {
    passwordSubmit.addEventListener("click", () => {
      checkPassword();
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        checkPassword();
      }
    });

    // Auto-format date input
    passwordInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2);
      }
      if (value.length >= 5) {
        value = value.substring(0, 5) + "/" + value.substring(5, 9);
      }
      e.target.value = value;
    });
  }

  // Letter step button
  const closeLetter = document.getElementById("close-letter");
  if (closeLetter) {
    closeLetter.addEventListener("click", () => {
      closeSecretModal();
    });
  }

  // Close modal button
  const closeSecretModalBtn = document.getElementById("close-secret-modal");
  if (closeSecretModalBtn) {
    closeSecretModalBtn.addEventListener("click", () => {
      closeSecretModal();
    });
  }

  // Close on backdrop click
  secretModal.addEventListener("click", (e) => {
    if (e.target === secretModal) {
      closeSecretModal();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && secretModal.style.display === "flex") {
      closeSecretModal();
    }
  });
}

function showSecretButton() {
  if (secretButton) {
    secretButton.classList.add("show");

    setTimeout(() => {
      secretButton.classList.add("animate-in");
    }, 100);

    // Add floating animation
    setTimeout(() => {
      secretButton.classList.add("floating");
    }, 1000);
  }
}

function showStep(stepId) {
  const steps = document.querySelectorAll(".modal-step");
  steps.forEach((step) => {
    step.style.display = "none";
  });

  const targetStep = document.getElementById(stepId);
  if (targetStep) {
    targetStep.style.display = "block";
  }

  if (stepId === "password-step") {
    const passwordInput = document.getElementById("password-input");
    if (passwordInput) {
      setTimeout(() => passwordInput.focus(), 100);
    }
  }
}

function checkPassword() {
  const passwordInput = document.getElementById("password-input");
  const passwordError = document.getElementById("password-error");

  if (!passwordInput || !passwordError) return;

  const inputValue = passwordInput.value.trim();
  const correctPassword = "04/08/2005"; // Dinda's birthday: 4 Agustus 2005

  if (inputValue === correctPassword) {
    clearPasswordError();
    showStep("letter-step");
    // Add celebration effect
    createHeartParticles();
  } else {
    passwordError.style.display = "block";
    passwordInput.style.borderColor = "#ff6b6b";
    passwordInput.classList.add("shake");

    setTimeout(() => {
      passwordInput.classList.remove("shake");
      passwordInput.style.borderColor = "";
    }, 500);
  }
}

function clearPasswordError() {
  const passwordError = document.getElementById("password-error");
  const passwordInput = document.getElementById("password-input");

  if (passwordError) {
    passwordError.style.display = "none";
  }
  if (passwordInput) {
    passwordInput.style.borderColor = "";
    passwordInput.value = "";
  }
}

function closeSecretModal() {
  if (secretModal) {
    secretModal.style.display = "none";
    document.body.style.overflow = "";
    clearPasswordError();
    showStep("warning-step");
  }
}

function createHeartParticles() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.innerHTML = "💝";
      heart.className = "heart-particle";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";
      heart.style.animationDuration = Math.random() * 2 + 3 + "s";

      document.body.appendChild(heart);

      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 5000);
    }, i * 200);
  }
}

/**
 * Initialize parallax scrolling effects
 */
function initializeParallax() {
  let ticking = false;

  function updateParallax() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Parallax clouds
    const clouds = document.querySelectorAll(".cloud");
    clouds.forEach((cloud, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrollTop * speed);
      cloud.style.transform = `translateY(${yPos}px)`;
    });

    // Parallax sections
    const parallaxElements = document.querySelectorAll(
      ".parallax-slow, .parallax-medium, .parallax-fast"
    );
    parallaxElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const speed = element.classList.contains("parallax-slow")
        ? 0.2
        : element.classList.contains("parallax-medium")
        ? 0.5
        : 0.8;

      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      }
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick, { passive: true });
}

/**
 * Initialize memory cards hover effects
 */
function initializeMemoryCards() {
  const memoryCards = document.querySelectorAll(".memory-card");

  memoryCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Add special hover effect based on memory type
      const memoryType = card.dataset.memory;

      switch (memoryType) {
        case "coffee":
          card.style.background = "linear-gradient(135deg, #FFF8DC, #F5DEB3)";
          break;
        case "hospital":
          card.style.background = "linear-gradient(135deg, #F0F8FF, #E6F3FF)";
          break;
        case "coding":
          card.style.background = "linear-gradient(135deg, #F0FFF0, #E8F5E8)";
          break;
        case "sunset":
          card.style.background = "linear-gradient(135deg, #FFE4B5, #FFDAB9)";
          break;
        case "sky":
          card.style.background = "linear-gradient(135deg, #E0F6FF, #B0E0E6)";
          break;
        case "reports":
          card.style.background = "linear-gradient(135deg, #F5F5F5, #E8E8E8)";
          break;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.background = "var(--white)";
    });
  });
}

/**
 * Initialize word cards animation
 */
function initializeWordCards() {
  const wordCards = document.querySelectorAll(".word-card");

  wordCards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      // Create ripple effect
      const ripple = document.createElement("div");
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(135, 206, 235, 0.3)";
      ripple.style.pointerEvents = "none";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.left = "50%";
      ripple.style.top = "50%";
      ripple.style.width = "200px";
      ripple.style.height = "200px";
      ripple.style.marginLeft = "-100px";
      ripple.style.marginTop = "-100px";

      card.appendChild(ripple);

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    });
  });

  // Add ripple animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

/**
 * Initialize poem animation
 */
function initializePoemAnimation() {
  const poemVerses = document.querySelectorAll(".poem-verse");

  const poemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
            entry.target.style.filter = "blur(0)";

            // Animate lines within verse
            const lines = entry.target.querySelectorAll("p");
            lines.forEach((line, lineIndex) => {
              setTimeout(() => {
                line.style.opacity = "1";
                line.style.transform = "translateY(0)";
              }, lineIndex * 200);
            });
          }, index * 300);
        }
      });
    },
    { threshold: 0.3 }
  );

  poemVerses.forEach((verse) => poemObserver.observe(verse));

  // Final message animation
  const messageCard = document.querySelector(".message-card");
  if (messageCard) {
    const messageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "scale(1) rotateY(0deg)";
            }, 500);
          }
        });
      },
      { threshold: 0.3 }
    );

    messageObserver.observe(messageCard);
  }
}

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/**
 * Handle window resize
 */
function handleResize() {
  // Recalculate particle positions if needed
  if (isLoaded) {
    // Update any size-dependent calculations
    updateResponsiveElements();
  }
}

/**
 * Update responsive elements
 */
function updateResponsiveElements() {
  // Update any elements that need recalculation on resize
  const windowWidth = window.innerWidth;

  // Adjust particle creation rate based on screen size
  if (windowWidth < 768) {
    maxParticles = 15;
  } else if (windowWidth < 1024) {
    maxParticles = 20;
  } else {
    maxParticles = 30;
  }
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Initialize scroll indicator click
 */
function initializeScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      scrollToSection("letter");
    });
  }
}

// Event Listeners
window.addEventListener("resize", debounce(handleResize, 250));
window.addEventListener("load", () => {
  initializeScrollIndicator();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        "Page load time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    }, 0);
  });
}

/**
 * Music Player functionality
 */
function initializeMusicPlayer() {
  if (!musicToggle || !backgroundMusic) return;

  musicToggle.addEventListener("click", toggleMusic);

  // Set initial state
  updateMusicButton();

  // Try to autoplay when page loads (after user interaction)
  if (isMusicEnabled) {
    setTimeout(() => {
      playMusic();
    }, 3000);
  }

  // Update progress bar
  backgroundMusic.addEventListener("timeupdate", updateProgress);
  backgroundMusic.addEventListener("ended", onMusicEnded);
}

function toggleMusic() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  if (!backgroundMusic) return;

  backgroundMusic
    .play()
    .then(() => {
      isPlaying = true;
      updateMusicButton();
      localStorage.setItem("musicEnabled", "true");
    })
    .catch((error) => {
      console.log("Music autoplay prevented:", error);
      isPlaying = false;
      updateMusicButton();
    });
}

function pauseMusic() {
  if (!backgroundMusic) return;

  backgroundMusic.pause();
  isPlaying = false;
  updateMusicButton();
  localStorage.setItem("musicEnabled", "false");
}

function updateMusicButton() {
  if (!musicToggle) return;

  const musicIcon = musicToggle.querySelector(".music-icon");
  const musicText = musicToggle.querySelector(".music-text");

  if (isPlaying) {
    musicIcon.textContent = "🎵";
    musicText.textContent = "Playing";
    musicToggle.classList.add("playing");
  } else {
    musicIcon.textContent = "🎵";
    musicText.textContent = "Play Music";
    musicToggle.classList.remove("playing");
  }
}

function updateProgress() {
  if (!backgroundMusic) return;

  const progress =
    (backgroundMusic.currentTime / backgroundMusic.duration) * 100;
  const progressBar = document.querySelector(".progress-bar");

  if (progressBar) {
    progressBar.style.width = progress + "%";
  }
}

function onMusicEnded() {
  isPlaying = false;
  updateMusicButton();
}

/**
 * Photo Upload functionality
 */
function initializePhotoUpload() {
  if (!photoUpload || !dindaPhoto || !photoFrame) return;

  // Check if photo frame already has a default photo/SVG loaded
  const hasDefaultPhoto =
    dindaPhoto.src &&
    (dindaPhoto.src.includes("dinda-photo.svg") ||
      dindaPhoto.src.includes("dinda-photo.jpg"));

  if (hasDefaultPhoto) {
    // Mark as uploaded to hide overlay and disable hover effects
    photoFrame.classList.add("photo-uploaded");
    const overlay = document.querySelector(".photo-overlay");
    if (overlay) {
      overlay.style.display = "none";
    }
    return; // Don't add click handlers for upload
  }

  // Only add upload functionality if no default photo
  photoUpload.addEventListener("change", handlePhotoUpload);
  photoFrame.addEventListener("click", () => photoUpload.click());

  // Load saved photo from localStorage if exists
  loadSavedPhoto();
}

function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = function (e) {
      dindaPhoto.src = e.target.result;
      dindaPhoto.style.objectFit = "cover";

      // Hide overlay after photo is uploaded
      const overlay = document.querySelector(".photo-overlay");
      if (overlay) {
        overlay.style.display = "none";
      }

      // Save photo to localStorage
      localStorage.setItem("dindaPhoto", e.target.result);

      // Add uploaded class for styling
      photoFrame.classList.add("photo-uploaded");
    };

    reader.readAsDataURL(file);
  } else {
    alert("Please select a valid image file!");
  }
}

function loadSavedPhoto() {
  const savedPhoto = localStorage.getItem("dindaPhoto");
  if (savedPhoto && dindaPhoto) {
    dindaPhoto.src = savedPhoto;
    dindaPhoto.style.objectFit = "cover";

    const overlay = document.querySelector(".photo-overlay");
    if (overlay) {
      overlay.style.display = "none";
    }

    if (photoFrame) {
      photoFrame.classList.add("photo-uploaded");
    }
  }
}

// Export functions for testing or external use
window.birthdayWebsite = {
  scrollToSection,
  isDarkMode: () => isDarkMode,
  toggleDarkMode: () => darkModeToggle.click(),
  createParticle: () => createSkyParticles(),
};
