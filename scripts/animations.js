/**
 * ANIMATIONS JAVASCRIPT - BIRTHDAY WEBSITE
 * Advanced animation controllers and effects
 */

class AnimationController {
  constructor() {
    this.animations = new Map();
    this.rafId = null;
    this.isRunning = false;
    this.observers = new Map();

    this.init();
  }

  init() {
    this.setupIntersectionObservers();
    this.initializeAdvancedAnimations();
    this.startAnimationLoop();
  }

  /**
   * Setup intersection observers for different animation types
   */
  setupIntersectionObservers() {
    // Fade in animations
    this.observers.set(
      "fadeIn",
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.triggerFadeIn(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      )
    );

    // Slide animations
    this.observers.set(
      "slide",
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.triggerSlide(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      )
    );

    // Scale animations
    this.observers.set(
      "scale",
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.triggerScale(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      )
    );

    // Observe elements
    this.observeElements();
  }

  /**
   * Observe elements for animations
   */
  observeElements() {
    // Fade in elements
    const fadeElements = document.querySelectorAll(".fade-in-on-scroll");
    fadeElements.forEach((el) => this.observers.get("fadeIn").observe(el));

    // Slide elements
    const slideElements = document.querySelectorAll(
      ".slide-in-left, .slide-in-right"
    );
    slideElements.forEach((el) => this.observers.get("slide").observe(el));

    // Scale elements
    const scaleElements = document.querySelectorAll(".scale-in, .rotate-in");
    scaleElements.forEach((el) => this.observers.get("scale").observe(el));
  }

  /**
   * Trigger fade in animation
   */
  triggerFadeIn(element) {
    element.classList.add("visible");
    this.addAnimation(element, "fadeIn", {
      duration: 600,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    });
  }

  /**
   * Trigger slide animation
   */
  triggerSlide(element) {
    element.classList.add("visible");
    this.addAnimation(element, "slide", {
      duration: 800,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    });
  }

  /**
   * Trigger scale animation
   */
  triggerScale(element) {
    element.classList.add("visible");
    this.addAnimation(element, "scale", {
      duration: 600,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    });
  }

  /**
   * Add animation to tracking
   */
  addAnimation(element, type, options) {
    const id = this.generateId();
    this.animations.set(id, {
      element,
      type,
      options,
      startTime: performance.now(),
    });
  }

  /**
   * Initialize advanced animations
   */
  initializeAdvancedAnimations() {
    this.initializeTextReveal();
    this.initializeStaggeredAnimations();
    this.initializeParallaxElements();
    this.initializeMouseTracker();
    this.initializeLiquidMorphing();
  }

  /**
   * Initialize text reveal animations
   */
  initializeTextReveal() {
    const textElements = document.querySelectorAll("[data-text]");

    textElements.forEach((element) => {
      const text = element.dataset.text;
      const chars = text.split("");

      element.innerHTML = chars
        .map((char, index) => {
          if (char === " ") return " ";
          return `<span class="char" style="animation-delay: ${
            index * 50
          }ms">${char}</span>`;
        })
        .join("");
    });

    // Add CSS for character animation
    this.addCharacterAnimation();
  }

  /**
   * Add character animation CSS
   */
  addCharacterAnimation() {
    if (document.getElementById("char-animation-style")) return;

    const style = document.createElement("style");
    style.id = "char-animation-style";
    style.textContent = `
            .char {
                display: inline-block;
                opacity: 0;
                transform: translateY(20px) rotateX(-90deg);
                animation: char-reveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            
            @keyframes char-reveal {
                to {
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg);
                }
            }
        `;
    document.head.appendChild(style);
  }

  /**
   * Initialize staggered animations
   */
  initializeStaggeredAnimations() {
    const staggerContainers = document.querySelectorAll("[data-stagger]");

    staggerContainers.forEach((container) => {
      const delay = parseInt(container.dataset.stagger) || 100;
      const children = container.children;

      Array.from(children).forEach((child, index) => {
        child.style.animationDelay = `${index * delay}ms`;
        child.classList.add("stagger-item");
      });
    });
  }

  /**
   * Initialize parallax elements
   */
  initializeParallaxElements() {
    this.parallaxElements = document.querySelectorAll("[data-parallax]");

    this.parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      element.dataset.parallaxSpeed = speed;
    });
  }

  /**
   * Initialize mouse tracker for interactive effects
   */
  initializeMouseTracker() {
    this.mouse = { x: 0, y: 0 };
    this.targetMouse = { x: 0, y: 0 };

    document.addEventListener("mousemove", (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    });

    // Interactive elements
    const interactiveElements = document.querySelectorAll(
      "[data-mouse-interact]"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        this.addMouseInteraction(element);
      });

      element.addEventListener("mouseleave", () => {
        this.removeMouseInteraction(element);
      });
    });
  }

  /**
   * Add mouse interaction to element
   */
  addMouseInteraction(element) {
    element.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

    const updateTransform = () => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (this.mouse.x * window.innerWidth - centerX) * 0.02;
      const deltaY = (this.mouse.y * window.innerHeight - centerY) * 0.02;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    };

    element.mouseInteractionUpdate = updateTransform;
  }

  /**
   * Remove mouse interaction from element
   */
  removeMouseInteraction(element) {
    element.style.transform = "translate(0, 0) scale(1)";
    delete element.mouseInteractionUpdate;
  }

  /**
   * Initialize liquid morphing backgrounds
   */
  initializeLiquidMorphing() {
    const liquidElements = document.querySelectorAll(".liquid-morph");

    liquidElements.forEach((element) => {
      this.addLiquidMorph(element);
    });
  }

  /**
   * Add liquid morph animation to element
   */
  addLiquidMorph(element) {
    const morphValues = [
      "60% 40% 30% 70% / 60% 30% 70% 40%",
      "30% 60% 70% 40% / 50% 60% 30% 60%",
      "50% 30% 60% 50% / 30% 70% 50% 60%",
      "70% 50% 40% 60% / 60% 40% 60% 30%",
    ];

    let currentIndex = 0;

    const morphAnimation = () => {
      element.style.borderRadius = morphValues[currentIndex];
      currentIndex = (currentIndex + 1) % morphValues.length;
    };

    setInterval(morphAnimation, 2000);
  }

  /**
   * Start animation loop
   */
  startAnimationLoop() {
    this.isRunning = true;
    this.animate();
  }

  /**
   * Main animation loop
   */
  animate() {
    if (!this.isRunning) return;

    this.updateMouseInterpolation();
    this.updateParallax();
    this.updateAnimations();

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  /**
   * Update mouse interpolation
   */
  updateMouseInterpolation() {
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.1;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.1;

    // Update elements with mouse interaction
    document.querySelectorAll("[data-mouse-interact]").forEach((element) => {
      if (element.mouseInteractionUpdate) {
        element.mouseInteractionUpdate();
      }
    });
  }

  /**
   * Update parallax effects
   */
  updateParallax() {
    if (!this.parallaxElements) return;

    const scrollTop = window.pageYOffset;

    this.parallaxElements.forEach((element) => {
      const speed = parseFloat(element.dataset.parallaxSpeed);
      const yPos = -(scrollTop * speed);

      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }

  /**
   * Update tracked animations
   */
  updateAnimations() {
    const currentTime = performance.now();

    this.animations.forEach((animation, id) => {
      const elapsed = currentTime - animation.startTime;
      const progress = Math.min(elapsed / animation.options.duration, 1);

      if (progress >= 1) {
        this.animations.delete(id);
      }
    });
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Stop all animations
   */
  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  /**
   * Destroy animation controller
   */
  destroy() {
    this.stop();
    this.observers.forEach((observer) => observer.disconnect());
    this.animations.clear();
  }
}

/**
 * Text Animation Utilities
 */
class TextAnimator {
  static typewriter(element, text, speed = 50, callback = null) {
    element.textContent = "";
    let i = 0;

    const timer = setInterval(() => {
      element.textContent += text[i];
      i++;

      if (i >= text.length) {
        clearInterval(timer);
        if (callback) callback();
      }
    }, speed);

    return timer;
  }

  static reveal(element, duration = 1000) {
    const text = element.textContent;
    const words = text.split(" ");

    element.innerHTML = words
      .map(
        (word) =>
          `<span class="word" style="opacity: 0; transform: translateY(20px);">${word}</span>`
      )
      .join(" ");

    const wordElements = element.querySelectorAll(".word");

    wordElements.forEach((word, index) => {
      setTimeout(() => {
        word.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        word.style.opacity = "1";
        word.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  static wave(element) {
    const text = element.textContent;
    const chars = text.split("");

    element.innerHTML = chars
      .map((char, index) => {
        if (char === " ") return " ";
        return `<span class="wave-char" style="animation-delay: ${
          index * 100
        }ms">${char}</span>`;
      })
      .join("");

    // Add wave animation CSS
    if (!document.getElementById("wave-animation-style")) {
      const style = document.createElement("style");
      style.id = "wave-animation-style";
      style.textContent = `
                .wave-char {
                    display: inline-block;
                    animation: wave 2s ease-in-out infinite;
                }
                
                @keyframes wave {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `;
      document.head.appendChild(style);
    }
  }
}

/**
 * Particle System
 */
class ParticleSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.particles = [];
    this.options = {
      count: options.count || 50,
      speed: options.speed || 1,
      size: options.size || { min: 1, max: 3 },
      color: options.color || "rgba(255, 255, 255, 0.8)",
      ...options,
    };

    this.init();
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.options.count; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement("div");
    const size =
      Math.random() * (this.options.size.max - this.options.size.min) +
      this.options.size.min;

    particle.style.position = "absolute";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.backgroundColor = this.options.color;
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";

    // Random starting position
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    // Add physics properties
    particle.vx = (Math.random() - 0.5) * this.options.speed;
    particle.vy = (Math.random() - 0.5) * this.options.speed;
    particle.life = Math.random() * 1000 + 1000; // Lifespan in ms
    particle.age = 0;

    this.container.appendChild(particle);
    this.particles.push(particle);
  }

  animate() {
    this.particles.forEach((particle, index) => {
      // Update position
      const currentLeft = parseFloat(particle.style.left);
      const currentTop = parseFloat(particle.style.top);

      particle.style.left = currentLeft + particle.vx + "%";
      particle.style.top = currentTop + particle.vy + "%";

      // Update age and opacity
      particle.age += 16; // Assuming 60fps
      const opacity = 1 - particle.age / particle.life;
      particle.style.opacity = Math.max(0, opacity);

      // Remove dead particles
      if (particle.age >= particle.life) {
        particle.remove();
        this.particles.splice(index, 1);
        this.createParticle(); // Create new particle
      }
    });

    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.particles.forEach((particle) => particle.remove());
    this.particles = [];
  }
}

/**
 * Initialize animations when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize main animation controller
  window.animationController = new AnimationController();

  // Initialize text animations
  const textRevealElements = document.querySelectorAll("[data-text-reveal]");
  textRevealElements.forEach((element) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            TextAnimator.reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
  });

  // Initialize wave text animations
  const waveTextElements = document.querySelectorAll("[data-text-wave]");
  waveTextElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      TextAnimator.wave(element);
    });
  });
});

// Export classes for external use
window.TextAnimator = TextAnimator;
window.ParticleSystem = ParticleSystem;
window.AnimationController = AnimationController;
