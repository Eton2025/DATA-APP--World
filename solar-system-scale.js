


function SolarSystemScale() {
  this.name = 'Solar System Scale';
  this.id = 'solar-system-scale';
  this.loaded = false;

  // View mode: 'size' or 'distance'
  this.viewMode = 'size';

  // Real planetary dataset
  this.planets = [
    { name: "Sun", size: 1392700, dist: 0, color: [255, 204, 0], desc: "Contains 99.8% of all mass in the Solar System." },
    { name: "Mercury", size: 4879, dist: 57.9, color: [169, 169, 169], desc: "Smallest planet, closest to the Sun." },
    { name: "Venus", size: 12104, dist: 108.2, color: [227, 186, 143], desc: "Hottest planet due to dense greenhouse atmosphere." },
    { name: "Earth", size: 12756, dist: 149.6, color: [100, 149, 237], desc: "Our home; only known planet with liquid surface water." },
    { name: "Mars", size: 6792, dist: 227.9, color: [220, 20, 60], desc: "The Red Planet; home to Olympus Mons, the largest volcano." },
    { name: "Jupiter", size: 142984, dist: 778.6, color: [218, 165, 32], desc: "Largest planet; massive gas giant with 95+ moons." },
    { name: "Saturn", size: 120536, dist: 1433.5, color: [238, 232, 170], desc: "Famous for its spectacular ring system." },
    { name: "Uranus", size: 51118, dist: 2872.5, color: [175, 238, 238], desc: "Ice giant that rotates on its side (98° tilt)." },
    { name: "Neptune", size: 49528, dist: 4495.1, color: [65, 105, 225], desc: "Farthest planet; features supersonic winds." }
  ];

  this.preload = function() {};

  this.setup = function() {
    this.loaded = true;
  };

  this.destroy = function() {};

  this.draw = function() {
    if (!this.loaded) return;

    push();
    // Render deep dark space background
    background(0);

    // Title Header
    fill(255);
    textAlign(CENTER, TOP);
    textSize(22);
    textFont('Helvetica');
    textStyle(BOLD);
    text("SOLAR SYSTEM SCALE COMPARISON", width / 2, 20);

    // Render View Mode Toggle Buttons
    this.drawToggleButtons();

    // Render active scale mode
    if (this.viewMode === 'size') {
      this.drawSizeComparison();
    } else {
      this.drawDistanceComparison();
    }

    pop();
  };

  // --- DRAW SIZE COMPARISON BAR CHART ---
  this.drawSizeComparison = function() {
    let startY = 110;
    let barH = 34;
    let maxW = 520;
    let hoveredPlanet = null;

    // Skip Sun for bar scaling so smaller planets stay visible
    let maxPlanetSize = 142984; // Jupiter diameter

    for (let i = 1; i < this.planets.length; i++) {
      let p = this.planets[i];
      let y = startY + (i - 1) * (barH + 12);
      let barW = map(p.size, 0, maxPlanetSize, 15, maxW);

      // Check hover state
      let isHovered = mouseX >= 180 && mouseX <= 180 + barW && mouseY >= y && mouseY <= y + barH;
      if (isHovered) hoveredPlanet = p;

      // Planet Name Label
      fill(255);
      textAlign(RIGHT, CENTER);
      textSize(13);
      textStyle(BOLD);
      text(p.name, 160, y + barH / 2);

      // Bar Graphics
      stroke(isHovered ? 255 : 0);
      strokeWeight(isHovered ? 2 : 1);
      fill(p.color[0], p.color[1], p.color[2]);
      rect(180, y, barW, barH, 6);

      // Value text
      noStroke();
      fill(220);
      textAlign(LEFT, CENTER);
      textSize(12);
      textStyle(NORMAL);
      text(p.size.toLocaleString() + " km", 195 + barW, y + barH / 2);
    }

    // Bottom Info Note / Tooltip Card
    let cardY = 480;
    fill(20, 30, 50);
    stroke(0, 200, 255);
    strokeWeight(1);
    rect(180, cardY, 680, 70, 8);

    noStroke();
    fill(0, 255, 200);
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);

    if (hoveredPlanet) {
      text("SELECTED: " + hoveredPlanet.name.toUpperCase(), 195, cardY + 12);
      fill(255);
      textSize(12);
      textStyle(NORMAL);
      text(hoveredPlanet.desc + " (Diameter: " + hoveredPlanet.size.toLocaleString() + " km)", 195, cardY + 38);
    } else {
      text("DID YOU KNOW?", 195, cardY + 12);
      fill(255);
      textSize(12);
      textStyle(NORMAL);
      text("The Sun (1,392,700 km) is so massive that over 1.3 million Earths could fit inside it!", 195, cardY + 38);
    }
  };

  // --- DRAW DISTANCE COMPARISON (ORBIT MAP) ---
  this.drawDistanceComparison = function() {
    let startX = 140;
    let endX = width - 80;
    let cy = 300;
    let maxDist = 4495.1; // Neptune distance in million km

    // Draw Logarithmic Orbit Axis Line
    stroke(100, 150, 255, 150);
    strokeWeight(3);
    line(startX, cy, endX, cy);

    // Render Sun on the far left
    noStroke();
    fill(255, 204, 0);
    ellipse(startX - 25, cy, 60, 60);
    fill(255);
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text("SUN", startX - 25, cy + 40);

    let hoveredPlanet = null;

    for (let i = 1; i < this.planets.length; i++) {
      let p = this.planets[i];
      // Use log mapping so inner planets aren't squished together
      let px = map(log(p.dist), log(50), log(maxDist + 500), startX + 40, endX);

      let isHover = dist(mouseX, mouseY, px, cy) < 18;
      if (isHover) hoveredPlanet = p;

      // Orbit Marker Node
      stroke(255, 255, 255, isHover ? 255 : 120);
      strokeWeight(isHover ? 3 : 1);
      fill(p.color[0], p.color[1], p.color[2]);
      ellipse(px, cy, isHover ? 26 : 18, isHover ? 26 : 18);

      // Vertical connector tick
      stroke(255, 255, 255, 60);
      strokeWeight(1);
      line(px, cy - 25, px, cy + 25);

      // Label staggered above/below
      noStroke();
      fill(255);
      textAlign(CENTER, i % 2 === 0 ? BOTTOM : TOP);
      textSize(11);
      textStyle(BOLD);
      text(p.name, px, i % 2 === 0 ? cy - 32 : cy + 32);
    }

    // Information Card
    let cardY = 460;
    fill(20, 30, 50);
    stroke(255, 100, 0);
    strokeWeight(1);
    rect(180, cardY, 680, 80, 8);

    noStroke();
    fill(255, 150, 0);
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);

    if (hoveredPlanet) {
      text(hoveredPlanet.name.toUpperCase() + " DISTANCE FROM SUN", 200, cardY + 14);
      fill(255);
      textSize(12);
      textStyle(NORMAL);
      text("Average Distance: " + hoveredPlanet.dist + " Million km (" + (hoveredPlanet.dist / 149.6).toFixed(2) + " AU)", 200, cardY + 38);
      text(hoveredPlanet.desc, 200, cardY + 56);
    } else {
      text("DISTANCE SCALE IN ASTRONOMICAL UNITS (AU)", 200, cardY + 14);
      fill(255);
      textSize(12);
      textStyle(NORMAL);
      text("1 AU = 149.6 Million km (Distance from Earth to the Sun). Hover over any planet node above to inspect its orbit details!", 200, cardY + 42);
    }
  };

  // --- DRAW VIEW TOGGLE BUTTONS ---
  this.drawToggleButtons = function() {
    let sizeBtnSel = (this.viewMode === 'size');
    let distBtnSel = (this.viewMode === 'distance');

    // Size Button
    stroke(sizeBtnSel ? [0, 255, 200] : 100);
    strokeWeight(sizeBtnSel ? 2 : 1);
    fill(sizeBtnSel ? [0, 150, 180] : [30, 35, 50]);
    rect(330, 55, 170, 34, 6);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text("Planet Size Scale", 415, 72);

    // Distance Button
    stroke(distBtnSel ? [0, 255, 200] : 100);
    strokeWeight(distBtnSel ? 2 : 1);
    fill(distBtnSel ? [0, 150, 180] : [30, 35, 50]);
    rect(520, 55, 170, 34, 6);

    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text("Orbit Distance Scale", 605, 72);
  };

  // Mouse interactivity for mode switching
  this.mousePressed = function() {
    // Size Button Click Bounds
    if (mouseX >= 330 && mouseX <= 500 && mouseY >= 55 && mouseY <= 89) {
      this.viewMode = 'size';
    }
    // Distance Button Click Bounds
    else if (mouseX >= 520 && mouseX <= 690 && mouseY >= 55 && mouseY <= 89) {
      this.viewMode = 'distance';
    }
  };
}