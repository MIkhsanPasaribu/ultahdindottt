/**
 * INTERACTIONS JAVASCRIPT - BIRTHDAY WEBSITE
 * Interactive features and user engagement
 */

class InteractionManager {
  constructor() {
    this.interactions = new Map();
    this.gestureHandler = null;
    this.voiceHandler = null;

    this.init();
  }

  init() {
    this.initializeHoverEffects();
    this.initializeClickEffects();
    this.initializeKeyboardInteractions();
    this.initializeGestureSupport();
    this.initializeAccessibility();
    this.initializePerformanceMonitoring();
  }

  /**
   * Initialize hover effects
   */
  initializeHoverEffects() {
    // Memory cards hover
    const memoryCards = document.querySelectorAll(".memory-card");
    memoryCards.forEach((card) => {
      this.addCardHoverEffect(card);
    });

    // Word cards hover
    const wordCards = document.querySelectorAll(".word-card");
    wordCards.forEach((card) => {
      this.addWordCardHoverEffect(card);
    });

    // Floating elements
    const floatingElements = document.querySelectorAll("[data-float]");
    floatingElements.forEach((element) => {
      this.addFloatingEffect(element);
    });
  }

  /**
   * Add card hover effect
   */
  addCardHoverEffect(card) {
    let hoverAnimation = null;

    card.addEventListener("mouseenter", (e) => {
      // Create glow effect
      this.createGlowEffect(card);

      // Add micro-interactions based on card type
      const cardType = card.dataset.memory;
      this.triggerCardSpecificAnimation(card, cardType);

      // Add sound effect
      this.playHoverSound();
    });

    card.addEventListener("mouseleave", () => {
      this.removeGlowEffect(card);

      if (hoverAnimation) {
        hoverAnimation.cancel();
      }
    });

    // Add mouse move tracking for tilt effect
    card.addEventListener("mousemove", (e) => {
      this.addTiltEffect(card, e);
    });
  }

  /**
   * Create glow effect
   */
  createGlowEffect(element) {
    if (element.querySelector(".glow-effect")) return;

    const glow = document.createElement("div");
    glow.className = "glow-effect";
    glow.style.position = "absolute";
    glow.style.top = "0";
    glow.style.left = "0";
    glow.style.right = "0";
    glow.style.bottom = "0";
    glow.style.background =
      "radial-gradient(circle, rgba(135, 206, 235, 0.2) 0%, transparent 70%)";
    glow.style.borderRadius = "inherit";
    glow.style.pointerEvents = "none";
    glow.style.opacity = "0";
    glow.style.transition = "opacity 0.3s ease";

    element.style.position = "relative";
    element.appendChild(glow);

    requestAnimationFrame(() => {
      glow.style.opacity = "1";
    });
  }

  /**
   * Remove glow effect
   */
  removeGlowEffect(element) {
    const glow = element.querySelector(".glow-effect");
    if (glow) {
      glow.style.opacity = "0";
      setTimeout(() => {
        if (glow.parentNode) {
          glow.parentNode.removeChild(glow);
        }
      }, 300);
    }
  }

  /**
   * Add tilt effect based on mouse position
   */
  addTiltEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    const rotateX = (mouseY / rect.height) * 10;
    const rotateY = (mouseX / rect.width) * -10;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  }

  /**
   * Trigger card specific animations
   */
  triggerCardSpecificAnimation(card, cardType) {
    const icon = card.querySelector(".memory-icon");
    if (!icon) return;

    switch (cardType) {
      case "coffee":
        this.animateCoffeeIcon(icon);
        break;
      case "hospital":
        this.animateHospitalIcon(icon);
        break;
      case "coding":
        this.animateCodingIcon(icon);
        break;
      case "sunset":
        this.animateSunsetIcon(icon);
        break;
      case "sky":
        this.animateSkyIcon(icon);
        break;
      case "reports":
        this.animateReportsIcon(icon);
        break;
    }
  }

  /**
   * Animate coffee icon
   */
  animateCoffeeIcon(icon) {
    const steam = icon.querySelector(".coffee-steam");
    if (steam) {
      steam.style.animation = "steam-rise 1s ease-in-out infinite";
    }
  }

  /**
   * Animate hospital icon
   */
  animateHospitalIcon(icon) {
    const cross = icon.querySelector(".hospital-cross");
    if (cross) {
      cross.style.animation = "pulse 1s ease-in-out infinite";
    }
  }

  /**
   * Animate coding icon
   */
  animateCodingIcon(icon) {
    const codeLines = icon.querySelector(".code-lines");
    if (codeLines) {
      codeLines.style.animation = "code-typing 2s ease-in-out infinite";
    }
  }

  /**
   * Animate sunset icon
   */
  animateSunsetIcon(icon) {
    const sun = icon.querySelector(".sun");
    if (sun) {
      sun.style.animation = "sun-glow 2s ease-in-out infinite";
    }
  }

  /**
   * Animate sky icon
   */
  animateSkyIcon(icon) {
    const stars = icon.querySelectorAll(".stars");
    stars.forEach((star) => {
      star.style.animation = "star-twinkle 1.5s ease-in-out infinite";
    });
  }

  /**
   * Animate reports icon
   */
  animateReportsIcon(icon) {
    const docs = icon.querySelectorAll('[class^="doc-"]');
    docs.forEach((doc, index) => {
      doc.style.animation = `document-stack 2s ease-in-out infinite ${
        index * 0.2
      }s`;
    });
  }

  /**
   * Add word card hover effect
   */
  addWordCardHoverEffect(card) {
    card.addEventListener("mouseenter", () => {
      this.createRippleEffect(card);
      this.addWordCardGlow(card);
    });

    card.addEventListener("mouseleave", () => {
      this.removeWordCardGlow(card);
    });
  }

  /**
   * Create ripple effect
   */
  createRippleEffect(element) {
    const ripple = document.createElement("div");
    ripple.className = "ripple-effect";

    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(135, 206, 235, 0.5)";
    ripple.style.pointerEvents = "none";
    ripple.style.transform = "scale(0)";
    ripple.style.left = "50%";
    ripple.style.top = "50%";
    ripple.style.width = "100px";
    ripple.style.height = "100px";
    ripple.style.marginLeft = "-50px";
    ripple.style.marginTop = "-50px";
    ripple.style.animation = "ripple-expand 0.6s ease-out";

    element.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);

    // Add ripple animation if not exists
    this.addRippleAnimation();
  }

  /**
   * Add ripple animation CSS
   */
  addRippleAnimation() {
    if (document.getElementById("ripple-animation-style")) return;

    const style = document.createElement("style");
    style.id = "ripple-animation-style";
    style.textContent = `
            @keyframes ripple-expand {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.1);
                    opacity: 0.8;
                }
            }
        `;
    document.head.appendChild(style);
  }

  /**
   * Add word card glow
   */
  addWordCardGlow(card) {
    const glow = card.querySelector(".card-glow");
    if (glow) {
      glow.style.opacity = "1";
      glow.style.animation = "glow-pulse 2s ease-in-out infinite";
    }
  }

  /**
   * Remove word card glow
   */
  removeWordCardGlow(card) {
    const glow = card.querySelector(".card-glow");
    if (glow) {
      glow.style.opacity = "0.5";
      glow.style.animation = "none";
    }
  }

  /**
   * Add floating effect
   */
  addFloatingEffect(element) {
    const amplitude = parseFloat(element.dataset.amplitude) || 10;
    const speed = parseFloat(element.dataset.speed) || 2;

    let startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;
      const y = Math.sin(elapsed * speed) * amplitude;

      element.style.transform = `translateY(${y}px)`;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  /**
   * Initialize click effects
   */
  initializeClickEffects() {
    // Add click effect to all interactive elements
    const interactiveElements = document.querySelectorAll(
      "button, .memory-card, .word-card, .scroll-indicator, .hidden-star"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.createClickEffect(e);
        this.playClickSound();
      });
    });
  }

  /**
   * Create click effect
   */
  createClickEffect(event) {
    const effect = document.createElement("div");
    effect.className = "click-effect";

    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    effect.style.position = "absolute";
    effect.style.left = x + "px";
    effect.style.top = y + "px";
    effect.style.width = "20px";
    effect.style.height = "20px";
    effect.style.background =
      "radial-gradient(circle, rgba(135, 206, 235, 0.8) 0%, transparent 70%)";
    effect.style.borderRadius = "50%";
    effect.style.pointerEvents = "none";
    effect.style.transform = "translate(-50%, -50%) scale(0)";
    effect.style.animation = "click-expand 0.3s ease-out";

    event.target.style.position = "relative";
    event.target.appendChild(effect);

    setTimeout(() => {
      if (effect.parentNode) {
        effect.parentNode.removeChild(effect);
      }
    }, 300);

    // Add click animation if not exists
    this.addClickAnimation();
  }

  /**
   * Add click animation CSS
   */
  addClickAnimation() {
    if (document.getElementById("click-animation-style")) return;

    const style = document.createElement("style");
    style.id = "click-animation-style";
    style.textContent = `
            @keyframes click-expand {
                to {
                    transform: translate(-50%, -50%) scale(3);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  /**
   * Initialize keyboard interactions
   */
  initializeKeyboardInteractions() {
    const focusableElements = document.querySelectorAll(
      "button, a, input, [tabindex]"
    );

    focusableElements.forEach((element) => {
      element.addEventListener("focus", () => {
        this.addFocusEffect(element);
      });

      element.addEventListener("blur", () => {
        this.removeFocusEffect(element);
      });
    });

    // Arrow key navigation for memory cards
    this.initializeCardNavigation();
  }

  /**
   * Add focus effect
   */
  addFocusEffect(element) {
    element.style.outline = "2px solid var(--primary-sky)";
    element.style.outlineOffset = "4px";
    element.style.transition = "outline 0.2s ease";
  }

  /**
   * Remove focus effect
   */
  removeFocusEffect(element) {
    element.style.outline = "none";
  }

  /**
   * Initialize card navigation with arrow keys
   */
  initializeCardNavigation() {
    const cards = document.querySelectorAll(".memory-card, .word-card");
    let currentIndex = -1;

    document.addEventListener("keydown", (e) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
        return;

      e.preventDefault();

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          currentIndex = Math.min(currentIndex + 1, cards.length - 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          currentIndex = Math.max(currentIndex - 1, 0);
          break;
      }

      if (currentIndex >= 0 && currentIndex < cards.length) {
        cards[currentIndex].focus();
        cards[currentIndex].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
  }

  /**
   * Initialize gesture support for mobile
   */
  initializeGestureSupport() {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchend",
      (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Detect swipe gestures
        if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
          this.handleSwipeGesture(deltaX, deltaY);
        }
      },
      { passive: true }
    );
  }

  /**
   * Handle swipe gestures
   */
  handleSwipeGesture(deltaX, deltaY) {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        // Swipe right
        this.handleSwipeRight();
      } else {
        // Swipe left
        this.handleSwipeLeft();
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        // Swipe down
        this.handleSwipeDown();
      } else {
        // Swipe up
        this.handleSwipeUp();
      }
    }
  }

  /**
   * Handle swipe right
   */
  handleSwipeRight() {
    // Navigate to previous section or card
    this.navigateSection(-1);
  }

  /**
   * Handle swipe left
   */
  handleSwipeLeft() {
    // Navigate to next section or card
    this.navigateSection(1);
  }

  /**
   * Handle swipe up
   */
  handleSwipeUp() {
    // Scroll to next section
    this.scrollToNextSection();
  }

  /**
   * Handle swipe down
   */
  handleSwipeDown() {
    // Scroll to previous section
    this.scrollToPreviousSection();
  }

  /**
   * Navigate sections
   */
  navigateSection(direction) {
    const sections = document.querySelectorAll("section");
    const currentSection = this.getCurrentSection();
    const currentIndex = Array.from(sections).indexOf(currentSection);

    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < sections.length) {
      sections[nextIndex].scrollIntoView({ behavior: "smooth" });
    }
  }

  /**
   * Get current section in viewport
   */
  getCurrentSection() {
    const sections = document.querySelectorAll("section");
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    for (let section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
        return section;
      }
    }

    return sections[0];
  }

  /**
   * Scroll to next section
   */
  scrollToNextSection() {
    this.navigateSection(1);
  }

  /**
   * Scroll to previous section
   */
  scrollToPreviousSection() {
    this.navigateSection(-1);
  }

  /**
   * Initialize accessibility features
   */
  initializeAccessibility() {
    // Add ARIA labels
    this.addAriaLabels();

    // Add keyboard shortcuts
    this.addKeyboardShortcuts();

    // Add screen reader support
    this.addScreenReaderSupport();
  }

  /**
   * Add ARIA labels
   */
  addAriaLabels() {
    const memoryCards = document.querySelectorAll(".memory-card");
    memoryCards.forEach((card, index) => {
      card.setAttribute(
        "aria-label",
        `Memory card ${index + 1}: ${card.querySelector("h3").textContent}`
      );
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
    });

    const wordCards = document.querySelectorAll(".word-card");
    wordCards.forEach((card, index) => {
      card.setAttribute("aria-label", `Inspirational quote ${index + 1}`);
      card.setAttribute("role", "article");
    });
  }

  /**
   * Add keyboard shortcuts
   */
  addKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + key combinations
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "d":
            e.preventDefault();
            document.getElementById("dark-mode-toggle").click();
            break;
          case "h":
            e.preventDefault();
            document
              .getElementById("hero")
              .scrollIntoView({ behavior: "smooth" });
            break;
        }
      }

      // Escape key
      if (e.key === "Escape") {
        this.closeAllModals();
      }
    });
  }

  /**
   * Close all modals
   */
  closeAllModals() {
    const modal = document.getElementById("easter-egg-modal");
    if (modal && modal.style.display === "flex") {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  /**
   * Add screen reader support
   */
  addScreenReaderSupport() {
    // Add live regions for dynamic content
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.style.position = "absolute";
    liveRegion.style.left = "-9999px";
    liveRegion.id = "live-region";
    document.body.appendChild(liveRegion);
  }

  /**
   * Announce to screen reader
   */
  announceToScreenReader(message) {
    const liveRegion = document.getElementById("live-region");
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  /**
   * Initialize performance monitoring
   */
  initializePerformanceMonitoring() {
    // Monitor frame rate
    this.monitorFrameRate();

    // Monitor memory usage
    this.monitorMemoryUsage();
  }

  /**
   * Monitor frame rate
   */
  monitorFrameRate() {
    let lastTime = performance.now();
    let frameCount = 0;

    const checkFrameRate = (currentTime) => {
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

        if (fps < 30) {
          console.warn("Low frame rate detected:", fps, "fps");
          this.optimizePerformance();
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(checkFrameRate);
    };

    requestAnimationFrame(checkFrameRate);
  }

  /**
   * Monitor memory usage
   */
  monitorMemoryUsage() {
    if ("memory" in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const usedPercent =
          (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

        if (usedPercent > 80) {
          console.warn(
            "High memory usage detected:",
            usedPercent.toFixed(2) + "%"
          );
          this.cleanupMemory();
        }
      }, 10000);
    }
  }

  /**
   * Optimize performance
   */
  optimizePerformance() {
    // Reduce particle count
    const particleContainers = document.querySelectorAll(".sky-particle");
    if (particleContainers.length > 20) {
      for (let i = 20; i < particleContainers.length; i++) {
        particleContainers[i].remove();
      }
    }

    // Disable non-essential animations on low-end devices
    if (this.isLowEndDevice()) {
      document.body.classList.add("reduced-animations");
    }
  }

  /**
   * Check if device is low-end
   */
  isLowEndDevice() {
    return (
      navigator.hardwareConcurrency <= 2 ||
      navigator.deviceMemory <= 2 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }

  /**
   * Cleanup memory
   */
  cleanupMemory() {
    // Remove unnecessary DOM elements
    const expiredElements = document.querySelectorAll(".expired, .temporary");
    expiredElements.forEach((element) => element.remove());

    // Clear animation caches
    if (window.animationController) {
      window.animationController.animations.clear();
    }
  }

  /**
   * Play hover sound
   */
  playHoverSound() {
    this.playTone(600, 0.1, 0.05);
  }

  /**
   * Play click sound
   */
  playClickSound() {
    this.playTone(800, 0.15, 0.1);
  }

  /**
   * Play tone
   */
  playTone(frequency, duration, volume) {
    if (!window.AudioContext && !window.webkitAudioContext) return;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }
}

// Initialize interaction manager when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.interactionManager = new InteractionManager();
});

// Export for external use
window.InteractionManager = InteractionManager;
