

function StarTemperatures() {
  this.name = 'Star Temperatures';
  this.id = 'star-temperatures';
  this.loaded = false;

  // Selected star details
  this.hoveredStar = null;

  // Spectral Classes & Color Ranges (O, B, A, F, G, K, M)
  this.spectralClasses = [
    { type: 'O', temp: '> 30,000 K', color: [60, 90, 255] },
    { type: 'B', temp: '10,000 - 30,000 K', color: [130, 180, 255] },
    { type: 'A', temp: '7,500 - 10,000 K', color: [220, 235, 255] },
    { type: 'F', temp: '6,000 - 7,500 K', color: [255, 255, 220] },
    { type: 'G', temp: '5,200 - 6,000 K', color: [255, 235, 100] },
    { type: 'K', temp: '3,700 - 5,200 K', color: [255, 160, 50] },
    { type: 'M', temp: '< 3,700 K', color: [255, 50, 40] }
  ];

  // Famous Star Data mapped relative to canvas coordinates (1024x576)
  this.stars = [
    // Supergiants
    { name: "Betelgeuse", class: "M", group: "Supergiants", temp: "3,500 K", x: 880, y: 150, size: 28, color: [255, 60, 50] },
    { name: "Antares", class: "M", group: "Supergiants", temp: "3,600 K", x: 920, y: 175, size: 26, color: [255, 50, 40] },
    { name: "Rigel", class: "B", group: "Supergiants", temp: "12,100 K", x: 490, y: 130, size: 20, color: [150, 200, 255] },
    { name: "Deneb", class: "A", group: "Supergiants", temp: "8,500 K", x: 530, y: 100, size: 22, color: [210, 230, 255] },

    // Giants
    { name: "Aldebaran", class: "K", group: "Giants", temp: "3,900 K", x: 810, y: 240, size: 20, color: [255, 150, 40] },
    { name: "Arcturus", class: "K", group: "Giants", temp: "4,280 K", x: 760, y: 250, size: 22, color: [255, 170, 50] },
    { name: "Pollux", class: "K", group: "Giants", temp: "4,660 K", x: 730, y: 275, size: 18, color: [255, 180, 70] },

    // Main Sequence
    { name: "Spica", class: "B", group: "Main Sequence", temp: "22,400 K", x: 280, y: 170, size: 16, color: [100, 160, 255] },
    { name: "Vega", class: "A", group: "Main Sequence", temp: "9,600 K", x: 520, y: 270, size: 14, color: [220, 235, 255] },
    { name: "Sirius A", class: "A", group: "Main Sequence", temp: "9,940 K", x: 550, y: 290, size: 13, color: [230, 240, 255] },
    { name: "Sun", class: "G", group: "Main Sequence", temp: "5,778 K", x: 670, y: 350, size: 11, color: [255, 235, 80] },
    { name: "Alpha Centauri B", class: "K", group: "Main Sequence", temp: "5,260 K", x: 730, y: 380, size: 9, color: [255, 160, 50] },
    { name: "Proxima Centauri", class: "M", group: "Main Sequence", temp: "3,040 K", x: 870, y: 440, size: 7, color: [255, 60, 50] },

    // White Dwarfs
    { name: "Sirius B", class: "A", group: "White Dwarfs", temp: "25,200 K", x: 250, y: 410, size: 7, color: [180, 220, 255] },
    { name: "Procyon B", class: "F", group: "White Dwarfs", temp: "7,740 K", x: 530, y: 450, size: 6, color: [240, 240, 220] }
  ];

  this.preload = function() {};

  this.setup = function() {
    this.loaded = true;
  };

  this.destroy = function() {};

  this.draw = function() {
    if (!this.loaded) return;

    push();
    background(8, 10, 22);

    // Title Header
    fill(255);
    textAlign(CENTER, TOP);
    textSize(22);
    textFont('Helvetica');
    textStyle(BOLD);
    text("HERTZSPRUNG–RUSSELL DIAGRAM & STAR TEMPERATURES", width / 2, 16);

    // Axis Labels
    fill(180, 200, 220);
    textSize(11);
    textAlign(RIGHT, CENTER);
    text("Luminosity (Solar Units) ➔", 80, 260);

    // Render Group Background Cloud Labels
    this.drawGroupBackgrounds();

    // Render Spectral Temperature Color Spectrum Bar at Bottom
    this.drawTemperatureBar();

    // Render Twinkling Stars
    this.drawStars();

    // Information Card overlay on hover
    this.drawInfoCard();

    pop();
  };

  // --- DRAW GROUP REGION LABELS ---
  this.drawGroupBackgrounds = function() {
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Helvetica');
    textStyle(BOLD);

    // Supergiants
    fill(255, 200, 100, 30);
    ellipse(700, 140, 480, 100);
    fill(255, 220, 150, 160);
    textSize(18);
    text("SUPERGIANTS", 680, 130);

    // Giants
    fill(255, 140, 0, 30);
    ellipse(790, 260, 220, 90);
    fill(255, 170, 80, 180);
    textSize(16);
    text("GIANTS", 790, 240);

    // White Dwarfs
    fill(100, 150, 255, 25);
    ellipse(380, 430, 380, 70);
    fill(150, 190, 255, 160);
    textSize(15);
    text("WHITE DWARFS", 380, 430);

    // Main Sequence Band Label
    fill(255, 255, 255, 140);
    textSize(16);
    push();
    translate(400, 220);
    rotate(radians(22));
    text("MAIN SEQUENCE", 0, 0);
    pop();
  };

  // --- DRAW COLOR SPECTRUM BAR (O B A F G K M) ---
  this.drawTemperatureBar = function() {
    let startX = 100;
    let startY = 485;
    let barW = 820;
    let barH = 28;
    let segW = barW / this.spectralClasses.length;

    for (let i = 0; i < this.spectralClasses.length; i++) {
      let sc = this.spectralClasses[i];
      let x = startX + i * segW;

      // Color Segment
      fill(sc.color[0], sc.color[1], sc.color[2]);
      stroke(0);
      strokeWeight(1);
      rect(x, startY, segW, barH);

      // Class Label (O, B, A, F, G, K, M)
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(14);
      textStyle(BOLD);
      text(sc.type, x + segW / 2, startY + barH / 2);
    }

    // Temperature Direction Legend
    fill(200);
    textSize(11);
    textStyle(NORMAL);
    textAlign(LEFT, TOP);
    text("◄ 30,000 K (Hotter / Bluer)", startX, startY + barH + 6);
    textAlign(RIGHT, TOP);
    text("(Cooler / Redder) 3,000 K ►", startX + barW, startY + barH + 6);
    textAlign(CENTER, TOP);
    text("Surface Temperature (Kelvin)", startX + barW / 2, startY + barH + 6);
  };

  // --- DRAW TWINKLING STARS ---
  this.drawStars = function() {
    this.hoveredStar = null;

    for (let i = 0; i < this.stars.length; i++) {
      let s = this.stars[i];

      // Twinkle luminance wave calculation based on frameCount and star index offset
      let twinkle = sin(frameCount * 0.08 + i * 1.5) * 0.25 + 0.85;
      let dSize = s.size * twinkle;

      let isHovered = dist(mouseX, mouseY, s.x, s.y) < max(s.size, 15);
      if (isHovered) this.hoveredStar = s;

      // Outer Glow Aura
      noStroke();
      fill(s.color[0], s.color[1], s.color[2], isHovered ? 120 : 50);
      ellipse(s.x, s.y, dSize * 2.2, dSize * 2.2);

      // Core Star Body
      stroke(255, 255, 255, isHovered ? 255 : 180);
      strokeWeight(isHovered ? 2 : 1);
      fill(s.color[0], s.color[1], s.color[2]);
      ellipse(s.x, s.y, dSize, dSize);

      // Label text
      noStroke();
      fill(isHovered ? [0, 255, 200] : [220, 220, 220]);
      textAlign(LEFT, CENTER);
      textSize(isHovered ? 12 : 10);
      textStyle(isHovered ? BOLD : NORMAL);
      text(s.name, s.x + s.size / 2 + 6, s.y);
    }
  };

  // --- DRAW HOVER TOOLTIP CARD ---
  this.drawInfoCard = function() {
    if (!this.hoveredStar) return;

    let s = this.hoveredStar;
    let cardW = 260;
    let cardH = 95;
    let cardX = min(s.x + 15, width - cardW - 20);
    let cardY = max(s.y - 100, 50);

    fill(15, 22, 38, 230);
    stroke(s.color[0], s.color[1], s.color[2]);
    strokeWeight(2);
    rect(cardX, cardY, cardW, cardH, 8);

    noStroke();
    fill(0, 255, 200);
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text(s.name, cardX + 12, cardY + 10);

    fill(255);
    textSize(11);
    textStyle(NORMAL);
    text("Group Region: " + s.group, cardX + 12, cardY + 32);
    text("Spectral Class: Class " + s.class, cardX + 12, cardY + 48);
    text("Surface Temp: " + s.temp, cardX + 12, cardY + 64);
  };
}