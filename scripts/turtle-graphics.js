/**
 * TURTLE GRAPHICS JAVASCRIPT - BIRTHDAY CAKE ANIMATION
 * Port dari Python turtle graphics ke HTML5 Canvas
 */

class TurtleGraphics {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.penDown = true;
    this.speed = 0;
    this.penSize = 3;
    this.penColor = "#000000";
    this.fillColor = "#000000";
    this.isVisible = true;

    // Coordinate system conversion (Python turtle uses center origin)
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;

    // Color palette from Python code
    this.colorPalette = {
      light_green: "#c5e8c8",
      medium_green: "#a3d2a7",
      light_yellow: "#f7e8aa",
      cream: "#fffceb",
      off_white: "#fffdf4",
      brown: "#8b5a2b",
      dark_brown: "#5e4425",
      orange: "#ffa500",
      golden_yellow: "#ffb732",
      teal: "#66cccc",
      flame_orange: "#ff6600",
      sky_blue: "#87ceeb",
      light_steel: "#b0c4de",
      confetti_colors: [
        "#4CAF50",
        "#FFC107",
        "#2196F3",
        "#FF5722",
        "#9C27B0",
        "#3F51B5",
        "#00BCD4",
        "#009688",
      ],
    };

    this.init();
  }

  init() {
    // Set background color
    this.canvas.style.backgroundColor = "#d3dae8";
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.clear();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Convert turtle coordinates to canvas coordinates
  toCanvasX(x) {
    return this.centerX + x;
  }

  toCanvasY(y) {
    return this.centerY - y; // Flip Y axis
  }

  // Basic turtle methods
  penup() {
    this.penDown = false;
  }

  pendown() {
    this.penDown = true;
  }

  goto(x, y) {
    if (this.penDown) {
      this.ctx.strokeStyle = this.penColor;
      this.ctx.lineWidth = this.penSize;
      this.ctx.beginPath();
      this.ctx.moveTo(this.toCanvasX(this.x), this.toCanvasY(this.y));
      this.ctx.lineTo(this.toCanvasX(x), this.toCanvasY(y));
      this.ctx.stroke();
    }
    this.x = x;
    this.y = y;
  }

  forward(distance) {
    const radians = (this.angle * Math.PI) / 180;
    const newX = this.x + distance * Math.cos(radians);
    const newY = this.y + distance * Math.sin(radians);
    this.goto(newX, newY);
  }

  left(angle) {
    this.angle += angle;
  }

  right(angle) {
    this.angle -= angle;
  }

  seth(angle) {
    this.angle = angle;
  }

  pencolor(color) {
    this.penColor = this.colorPalette[color] || color;
  }

  pensize(size) {
    this.penSize = size;
  }

  fillcolor(color) {
    this.fillColor = this.colorPalette[color] || color;
  }

  begin_fill() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.toCanvasX(this.x), this.toCanvasY(this.y));
    this.fillPath = true;
  }

  end_fill() {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
    this.fillPath = false;
  }

  dot(size, color) {
    const fillColor = this.colorPalette[color] || color;
    this.ctx.fillStyle = fillColor;
    this.ctx.beginPath();
    this.ctx.arc(
      this.toCanvasX(this.x),
      this.toCanvasY(this.y),
      size / 2,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  }

  write(text, font = "16px Arial") {
    // Add text shadow effect
    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    this.ctx.font = font;
    this.ctx.fillText(
      text,
      this.toCanvasX(this.x) + 2,
      this.toCanvasY(this.y) + 2
    );

    // Main text
    this.ctx.fillStyle = this.penColor;
    this.ctx.font = font;
    this.ctx.fillText(text, this.toCanvasX(this.x), this.toCanvasY(this.y));
    this.ctx.restore();
  }

  // Helper methods for ellipse drawing
  ellipse_x(width, angle_deg) {
    const angle_rad = (angle_deg * Math.PI) / 180;
    return width * Math.cos(angle_rad);
  }

  ellipse_y(height, angle_deg) {
    const angle_rad = (angle_deg * Math.PI) / 180;
    return height * Math.sin(angle_rad);
  }

  // Animated delay
  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

class AnimatedBirthdayCake {
  constructor(canvasId) {
    this.turtle = new TurtleGraphics(canvasId);
    this.isAnimating = false;
  }

  async drawEllipse(width, height, color, fillColor, yOffset = 0) {
    this.turtle.penup();
    this.turtle.goto(width, yOffset);
    this.turtle.pendown();
    this.turtle.pencolor(color);
    this.turtle.fillcolor(fillColor);
    this.turtle.begin_fill();

    for (let deg = 0; deg <= 360; deg += 5) {
      const x = this.turtle.ellipse_x(width, deg);
      const y = this.turtle.ellipse_y(height, deg) + yOffset;
      this.turtle.goto(x, y);

      if (deg % 20 === 0) await this.turtle.delay(10); // Animation delay
    }
    this.turtle.end_fill();
  }

  async drawCakeLayer(width, height, outlineColor, fillColor, yOffset) {
    await this.drawEllipse(width, height, outlineColor, fillColor, yOffset);
  }

  async drawCandle(xPos, yBase, height) {
    // Draw candle body
    this.turtle.penup();
    this.turtle.goto(xPos + 4, yBase);
    this.turtle.pendown();
    this.turtle.pencolor("teal");
    this.turtle.fillcolor("teal");
    this.turtle.begin_fill();

    // Bottom ellipse
    for (let deg = 0; deg <= 360; deg += 10) {
      const x = this.turtle.ellipse_x(4, deg) + xPos;
      const y = this.turtle.ellipse_y(1, deg) + yBase;
      this.turtle.goto(x, y);
    }

    // Side to top
    this.turtle.goto(xPos + 4, yBase + height);

    // Top ellipse
    for (let deg = 0; deg <= 540; deg += 10) {
      const x = this.turtle.ellipse_x(4, deg) + xPos;
      const y = this.turtle.ellipse_y(1, deg) + yBase + height;
      this.turtle.goto(x, y);
      if (deg % 50 === 0) await this.turtle.delay(5);
    }

    this.turtle.goto(xPos - 4, yBase);
    this.turtle.end_fill();

    // Draw candle stripes
    this.turtle.pencolor("white");
    this.turtle.pensize(4);
    for (let i = 1; i < 6; i++) {
      this.turtle.goto(xPos + 4, yBase + 10 * i);
      this.turtle.penup();
      this.turtle.goto(xPos - 4, yBase + 10 * i);
      this.turtle.pendown();
      await this.turtle.delay(20);
    }

    // Draw wick
    this.turtle.penup();
    this.turtle.goto(xPos, yBase + height);
    this.turtle.pendown();
    this.turtle.goto(xPos, yBase + height + 10);
    this.turtle.pensize(3);

    // Draw flame
    this.turtle.penup();
    this.turtle.goto(xPos + 4, yBase + height + 20);
    this.turtle.pendown();
    this.turtle.pencolor("flame_orange");
    this.turtle.fillcolor("flame_orange");
    this.turtle.begin_fill();

    for (let deg = 0; deg <= 360; deg += 15) {
      const x = this.turtle.ellipse_x(4, deg) + xPos;
      const y = this.turtle.ellipse_y(10, deg) + yBase + height + 20;
      this.turtle.goto(x, y);
    }
    this.turtle.end_fill();
    await this.turtle.delay(100);
  }

  async addDots(count, xMin, xMax, yMin, yMax, sizeMin, sizeMax) {
    const colors = this.turtle.colorPalette.confetti_colors;

    for (let i = 0; i < count; i++) {
      this.turtle.penup();
      const x = Math.random() * (xMax - xMin) + xMin;
      const y = Math.random() * (yMax - yMin) + yMin;
      this.turtle.goto(x, y);
      this.turtle.pendown();

      const size = Math.random() * (sizeMax - sizeMin) + sizeMin;
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.turtle.dot(size, color);

      if (i % 5 === 0) await this.turtle.delay(10);
    }
  }

  async animateCake() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.turtle.clear();

    // Animate message first
    this.turtle.penup();
    this.turtle.goto(-100, 200);
    this.turtle.pencolor("#2F4F4F");
    this.turtle.write(
      "Building your special cake...",
      "20px 'Dancing Script', cursive"
    );
    await this.turtle.delay(1000);

    this.turtle.clear();

    // Step 1: Draw base layer
    console.log("Drawing base layer...");
    await this.drawCakeLayer(150, 60, "white", "light_green", 0);
    await this.turtle.delay(300);

    // Step 2: Draw base side
    this.turtle.penup();
    this.turtle.pensize(4);
    this.turtle.goto(150, 0);
    this.turtle.pendown();
    this.turtle.fillcolor("medium_green");
    this.turtle.begin_fill();

    for (let deg = 0; deg <= 180; deg += 5) {
      const x = this.turtle.ellipse_x(150, -deg);
      const y = this.turtle.ellipse_y(70, -deg);
      this.turtle.goto(x, y);
      if (deg % 15 === 0) await this.turtle.delay(20);
    }

    for (let deg = 180; deg <= 360; deg += 5) {
      const x = this.turtle.ellipse_x(150, deg);
      const y = this.turtle.ellipse_y(60, deg);
      this.turtle.goto(x, y);
      if (deg % 15 === 0) await this.turtle.delay(20);
    }
    this.turtle.end_fill();

    // Step 3: Draw second layer
    console.log("Drawing second layer...");
    await this.turtle.delay(500);
    await this.drawCakeLayer(120, 48, "white", "light_yellow", 0);

    // Step 4: Draw second layer sides
    this.turtle.fillcolor("light_yellow");
    this.turtle.begin_fill();
    this.turtle.pensize(4);
    this.turtle.pencolor("light_steel");

    for (let deg = 0; deg <= 540; deg += 10) {
      const x = this.turtle.ellipse_x(120, deg);
      const y = this.turtle.ellipse_y(48, deg) + 70;
      this.turtle.goto(x, y);
      if (deg % 30 === 0) await this.turtle.delay(15);
    }
    this.turtle.goto(-120, 0);
    this.turtle.end_fill();

    // Step 5: Draw second layer top
    await this.drawCakeLayer(120, 48, "light_yellow", "light_yellow", 70);
    await this.drawCakeLayer(110, 44, "cream", "cream", 70);

    // Step 6: Draw blue frosting layer
    console.log("Adding frosting...");
    this.turtle.penup();
    this.turtle.pensize(4);
    this.turtle.goto(120, 0);
    this.turtle.pendown();
    this.turtle.fillcolor("sky_blue");
    this.turtle.begin_fill();
    this.turtle.pencolor("sky_blue");

    for (let deg = 0; deg <= 180; deg += 5) {
      const x = this.turtle.ellipse_x(120, -deg);
      const y = this.turtle.ellipse_y(48, -deg) + 10;
      this.turtle.goto(x, y);
      if (deg % 15 === 0) await this.turtle.delay(25);
    }
    this.turtle.goto(-120, 0);

    for (let deg = 180; deg <= 360; deg += 5) {
      const x = this.turtle.ellipse_x(120, deg);
      const y = this.turtle.ellipse_y(48, deg);
      this.turtle.goto(x, y);
      if (deg % 15 === 0) await this.turtle.delay(25);
    }
    this.turtle.end_fill();

    // Step 7: Draw top layer
    console.log("Drawing top layer...");
    await this.turtle.delay(500);

    // Top layer sides
    this.turtle.penup();
    this.turtle.pensize(4);
    this.turtle.goto(80, 70);
    this.turtle.pendown();
    this.turtle.fillcolor("brown");
    this.turtle.begin_fill();
    this.turtle.pencolor("brown");
    this.turtle.goto(80, 120);

    for (let deg = 0; deg <= 180; deg += 5) {
      const x = this.turtle.ellipse_x(80, deg);
      const y = this.turtle.ellipse_y(32, deg) + 120;
      this.turtle.goto(x, y);
      if (deg % 15 === 0) await this.turtle.delay(30);
    }
    this.turtle.goto(-80, 70);

    for (let deg = 180; deg <= 360; deg += 5) {
      const x = this.turtle.ellipse_x(80, deg);
      const y = this.turtle.ellipse_y(32, deg) + 70;
      this.turtle.goto(x, y);
      if (deg % 15 === 0) await this.turtle.delay(30);
    }
    this.turtle.end_fill();

    // Top layer top
    await this.drawCakeLayer(80, 32, "dark_brown", "dark_brown", 120);
    await this.drawCakeLayer(70, 28, "orange", "orange", 120);

    // Step 8: Draw candles
    console.log("Adding candles...");
    await this.turtle.delay(500);

    const candlePositions = [
      [60, 120, 50],
      [-60, 120, 50],
      [0, 130, 50],
      [30, 110, 50],
      [-30, 110, 50],
    ];

    for (const pos of candlePositions) {
      await this.drawCandle(pos[0], pos[1], pos[2]);
      await this.turtle.delay(200);
    }

    // Step 9: Add confetti
    console.log("Adding confetti...");
    await this.turtle.delay(500);

    const dotRegions = [
      [30, -120, 120, -25, 30, 2, 5],
      [20, -90, 90, -35, 10, 2, 5],
      [20, -80, 80, 60, 90, 2, 5],
      [15, -50, 50, 45, 70, 2, 5],
      [25, -200, 200, 120, 300, 3, 5],
    ];

    for (const region of dotRegions) {
      await this.addDots(...region);
    }

    // Step 10: Final message (di bawah kue)
    await this.turtle.delay(1000);
    this.turtle.seth(90);
    this.turtle.penup();
    this.turtle.goto(-140, -120);
    this.turtle.pendown();
    this.turtle.pencolor("#2F4F4F");
    this.turtle.write(
      "Happy Birthday Dinda!",
      "bold 28px 'Playfair Display', serif"
    );

    // Add decorative elements around text
    await this.turtle.delay(300);

    // Left star
    this.turtle.penup();
    this.turtle.goto(-200, -110);
    this.turtle.pendown();
    this.turtle.dot(8, "#FFD700");

    // Right star
    this.turtle.penup();
    this.turtle.goto(200, -110);
    this.turtle.pendown();
    this.turtle.dot(8, "#FFD700");

    // Heart decorations
    this.turtle.penup();
    this.turtle.goto(-180, -130);
    this.turtle.pendown();
    this.turtle.pencolor("#FF69B4");
    this.turtle.write("💝", "20px Arial");

    this.turtle.penup();
    this.turtle.goto(160, -130);
    this.turtle.pendown();
    this.turtle.write("🎉", "20px Arial");

    // Celebration effect
    await this.turtle.delay(500);
    await this.addDots(25, -250, 250, 180, 300, 4, 10); // Confetti area di atas kue
    await this.addDots(15, -150, 150, -80, -50, 3, 8); // Confetti area di samping tulisan

    this.isAnimating = false;
    console.log("Cake animation complete!");

    // Auto close after 10 seconds
    setTimeout(() => {
      const modal = document.getElementById("turtle-modal");
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    }, 10000);
  }
}

// Initialize when DOM is ready
let birthdayCake = null;

document.addEventListener("DOMContentLoaded", () => {
  // Create the modal and canvas for turtle graphics
  createTurtleModal();
});

function createTurtleModal() {
  // Create modal HTML
  const modalHTML = `
        <div id="turtle-modal" class="turtle-modal">
            <div class="turtle-modal-content">
                <div class="turtle-header">
                    <h3>🎂 Special Birthday Cake for Dindaaa 🎂</h3>
                    <button id="close-turtle-modal" class="close-turtle-btn">&times;</button>
                </div>
                <canvas id="turtle-canvas" width="600" height="500"></canvas>
                <div class="turtle-footer">
                    <p>Hoope you like it and had a great day:)</p>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Add styles
  const style = document.createElement("style");
  style.textContent = `
        .turtle-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            animation: turtle-modal-appear 0.5s ease-out;
        }
        
        .turtle-modal-content {
            background: white;
            border-radius: 20px;
            padding: 20px;
            text-align: center;
            max-width: 90vw;
            max-height: 90vh;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
        }
        
        .turtle-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .turtle-header h3 {
            font-family: 'Playfair Display', serif;
            color: #2F4F4F;
            margin: 0;
            font-size: 1.5rem;
        }
        
        .close-turtle-btn {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .close-turtle-btn:hover {
            background: #f0f0f0;
            color: #333;
        }
        
        #turtle-canvas {
            border: 2px solid #87CEEB;
            border-radius: 10px;
            background: #d3dae8;
            max-width: 100%;
            height: auto;
        }
        
        .turtle-footer {
            margin-top: 15px;
        }
        
        .turtle-footer p {
            font-family: 'Dancing Script', cursive;
            color: #666;
            font-size: 1.1rem;
            margin: 0;
        }
        
        @keyframes turtle-modal-appear {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @media (max-width: 768px) {
            .turtle-modal-content {
                padding: 15px;
            }
            
            .turtle-header h3 {
                font-size: 1.2rem;
            }
            
            #turtle-canvas {
                max-width: 100%;
                height: auto;
            }
        }
        
        /* Countdown styles */
        #countdown-number {
            transition: transform 0.2s ease;
        }
    `;

  document.head.appendChild(style);

  // Initialize turtle graphics
  birthdayCake = new AnimatedBirthdayCake("turtle-canvas");

  // Add event listeners
  document
    .getElementById("close-turtle-modal")
    .addEventListener("click", closeTurtleModal);
  document.getElementById("turtle-modal").addEventListener("click", (e) => {
    if (e.target.id === "turtle-modal") {
      closeTurtleModal();
    }
  });
}

function showTurtleAnimation() {
  const modal = document.getElementById("turtle-modal");
  if (modal && birthdayCake) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Start animation after a short delay
    setTimeout(() => {
      birthdayCake.animateCake();
    }, 500);
  }
}

function closeTurtleModal() {
  const modal = document.getElementById("turtle-modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";

    // Clear canvas
    if (birthdayCake) {
      birthdayCake.turtle.clear();
    }
  }
}

// Export for use in other files
window.showTurtleAnimation = showTurtleAnimation;
window.closeTurtleModal = closeTurtleModal;
