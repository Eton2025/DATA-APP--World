

function ExoplanetHabitability() {
  this.name = 'Exoplanet Habitability';
  this.id = 'exoplanet-habitability';
  this.loaded = false;

  this.activeTab = 0; // 0 = Scatter Plot, 1 = Ideal World & Star Infographic
  this.hoveredPlanet = null;

  // Exoplanet Dataset (ESI: 0.0 to 1.0, Temp in K, Radius relative to Earth R⊕)
  this.exoplanets = [
    { name: "Earth (Baseline)", esi: 1.00, temp: 288, radius: 1.00, distLY: 0, star: "Sun (G-type)", status: "Optimal / Confirmed Habitable", color: [100, 180, 255] },
    { name: "Kepler-1649c", esi: 0.90, temp: 234, radius: 1.06, distLY: 300, star: "Kepler-1649 (M-type)", status: "Earth-size / Habitable Zone", color: [0, 230, 150] },
    { name: "Proxima Centauri b", esi: 0.87, temp: 234, radius: 1.03, distLY: 4.2, star: "Proxima Centauri (M-type)", status: "Closest Exoplanet / Potentially Habitable", color: [0, 230, 150] },
    { name: "TRAPPIST-1e", esi: 0.85, temp: 251, radius: 0.92, distLY: 40, star: "TRAPPIST-1 (M-type)", status: "Rocky / High Habitability Potential", color: [0, 230, 150] },
    { name: "Gliese 667 Cc", esi: 0.84, temp: 277, radius: 1.54, distLY: 23.6, star: "Gliese 667 C (M-type)", status: "Super-Earth in Habitable Zone", color: [0, 230, 150] },
    { name: "Kepler-452b", esi: 0.83, temp: 265, radius: 1.63, distLY: 1402, star: "Kepler-452 (G-type)", status: "Super-Earth / Earth's Cousin", color: [0, 230, 150] },
    { name: "K2-18b", esi: 0.73, temp: 250, radius: 2.61, distLY: 124, star: "K2-18 (M-type)", status: "Sub-Neptune / Hycean Ocean World", color: [180, 210, 100] },
    { name: "Mars (Local)", esi: 0.64, temp: 210, radius: 0.53, distLY: 0.000015, star: "Sun (G-type)", status: "Cold / Thin Atmosphere", color: [230, 100, 70] },
    { name: "Venus (Local)", esi: 0.44, temp: 737, radius: 0.95, distLY: 0.000004, star: "Sun (G-type)", status: "Runaway Greenhouse Effect", color: [255, 80, 50] },
    { name: "WASP-12b", esi: 0.10, temp: 750, radius: 1.90, distLY: 1410, star: "WASP-12 (F-type)", status: "Ultra-Hot Jupiter / Scorching", color: [255, 50, 50] }
  ];

  // Data for Ideal Star Comparison Infographic
  this.starTypes = [
    {
      type: "G-Type (Yellow Dwarf)",
      example: "Our Sun",
      lifespan: "~10 Billion Years",
      radiation: "Moderate UV / Low Flares",
      verdict: "Good (Habitable)",
      desc: "Provides abundant light, but 10B year lifespan is relatively short for slow evolutionary paths.",
      color: [255, 230, 90]
    },
    {
      type: "K-Type (Orange Dwarf)",
      example: "Kepler-442",
      lifespan: "20 - 70 Billion Years",
      radiation: "Very Low Flares & Stable Radiation",
      verdict: "★ SUPERHABITABLE (Ideal)",
      desc: "The absolute sweet spot! Extremely long stability without the dangerous flares of red dwarfs.",
      color: [255, 160, 50]
    },
    {
      type: "M-Type (Red Dwarf)",
      example: "Proxima Centauri",
      lifespan: "100+ Billion Years",
      radiation: "High Stellar Flares / UV Bursts",
      verdict: "Challenging",
      desc: "Plentiful in the galaxy, but planets are often tidally locked or stripped of atmospheres by flares.",
      color: [255, 60, 50]
    }
  ];

  this.preload = function() {};

  this.setup = function() {
    this.loaded = true;
  };

  this.destroy = function() {};

  this.draw = function() {
    if (!this.loaded) return;

    push();
    background(8, 12, 28);

    // Title Header
    fill(255);
    textAlign(CENTER, TOP);
    textSize(22);
    textFont('Helvetica');
    textStyle(BOLD);
    text("EXOPLANET HABITABILITY & SUPERHABITABILITY", width / 2, 14);

    // Tab Navigation Bar
    this.drawTabs();

    // Render Active Tab Content
    if (this.activeTab === 0) {
      this.drawScatterPlot();
      this.drawInfoCard();
    } else {
      this.drawIdealInfographic();
    }

    pop();
  };

  // --- TAB BUTTONS ---
  this.drawTabs = function() {
    let tabs = ["1. Exoplanet Data Scatter Plot", "2. Ideal Star & World Infographic"];
    let tabW = 230;
    let tabH = 32;
    let startX = (width - (tabs.length * tabW + (tabs.length - 1) * 15)) / 2;
    let tabY = 46;

    for (let t = 0; t < tabs.length; t++) {
      let x = startX + t * (tabW + 15);
      let isSel = (this.activeTab === t);

      stroke(isSel ? [0, 255, 200] : 80);
      strokeWeight(isSel ? 2 : 1);
      fill(isSel ? [0, 140, 170] : [22, 32, 52]);
      rect(x, tabY, tabW, tabH, 6);

      noStroke();
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(12);
      textStyle(BOLD);
      text(tabs[t], x + tabW / 2, tabY + tabH / 2);
    }
  };

  // --- TAB 1: SCATTER PLOT ---
  this.drawScatterPlot = function() {
    let plotX = 110;
    let plotY = 95;
    let plotW = 820;
    let plotH = 360;

    // Plot Background Frame
    fill(15, 22, 40);
    stroke(50, 70, 100);
    strokeWeight(1);
    rect(plotX, plotY, plotW, plotH, 6);

    // Goldilocks Zone Shading
    let hzX1 = map(200, 150, 800, plotX, plotX + plotW);
    let hzX2 = map(320, 150, 800, plotX, plotX + plotW);

    noStroke();
    fill(0, 255, 120, 30);
    rect(hzX1, plotY, hzX2 - hzX1, plotH);

    fill(0, 255, 150, 180);
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text("HABITABLE ZONE", (hzX1 + hzX2) / 2, plotY + 8);

    // Axes Ticks & Grid
    stroke(255, 255, 255, 30);
    strokeWeight(1);

    for (let esiVal = 0.0; esiVal <= 1.0; esiVal += 0.2) {
      let py = map(esiVal, 0.0, 1.0, plotY + plotH, plotY);
      line(plotX, py, plotX + plotW, py);

      noStroke();
      fill(180, 200, 220);
      textAlign(RIGHT, CENTER);
      textSize(11);
      textStyle(NORMAL);
      text(esiVal.toFixed(1), plotX - 10, py);
      stroke(255, 255, 255, 30);
    }

    for (let tempVal = 200; tempVal <= 800; tempVal += 100) {
      let px = map(tempVal, 150, 800, plotX, plotX + plotW);
      line(px, plotY, px, plotY + plotH);

      noStroke();
      fill(180, 200, 220);
      textAlign(CENTER, TOP);
      textSize(11);
      textStyle(NORMAL);
      text(tempVal + " K", px, plotY + plotH + 6);
      stroke(255, 255, 255, 30);
    }

    // Axis Labels
    noStroke();
    fill(0, 255, 200);
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);

    push();
    translate(plotX - 55, plotY + plotH / 2);
    rotate(-HALF_PI);
    text("Earth Similarity Index (ESI) ➔", 0, 0);
    pop();

    text("Equilibrium Surface Temperature (Kelvin) ➔", plotX + plotW / 2, plotY + plotH + 26);

    // Exoplanet Nodes
    this.hoveredPlanet = null;

    for (let i = 0; i < this.exoplanets.length; i++) {
      let p = this.exoplanets[i];
      let px = map(p.temp, 150, 800, plotX, plotX + plotW);
      let py = map(p.esi, 0.0, 1.0, plotY + plotH, plotY);
      let pRadius = map(p.radius, 0.5, 2.8, 10, 32);

      let isHovered = dist(mouseX, mouseY, px, py) < max(pRadius, 14);
      if (isHovered) this.hoveredPlanet = p;

      let pulse = sin(frameCount * 0.08 + i) * 3;
      noStroke();
      fill(p.color[0], p.color[1], p.color[2], isHovered ? 120 : 40);
      ellipse(px, py, (pRadius + pulse) * 2, (pRadius + pulse) * 2);

      stroke(255, 255, 255, isHovered ? 255 : 160);
      strokeWeight(isHovered ? 2.5 : 1);
      fill(p.color[0], p.color[1], p.color[2]);
      ellipse(px, py, pRadius * 2, pRadius * 2);

      noStroke();
      fill(isHovered ? [0, 255, 200] : [220, 220, 220]);
      textAlign(CENTER, BOTTOM);
      textSize(isHovered ? 12 : 10);
      textStyle(isHovered ? BOLD : NORMAL);
      text(p.name, px, py - pRadius - 4);
    }
  };

  this.drawInfoCard = function() {
    let cardY = 488;
    let cardX = 110;
    let cardW = 820;
    let cardH = 72;

    fill(18, 26, 45);
    stroke(0, 200, 255);
    strokeWeight(1);
    rect(cardX, cardY, cardW, cardH, 8);

    noStroke();

    if (this.hoveredPlanet) {
      let p = this.hoveredPlanet;
      fill(0, 255, 200);
      textAlign(LEFT, TOP);
      textSize(14);
      textStyle(BOLD);
      text(p.name.toUpperCase(), cardX + 16, cardY + 10);

      fill(255);
      textSize(11);
      textStyle(NORMAL);
      text("ESI Score: " + p.esi.toFixed(2) + " / 1.00", cardX + 16, cardY + 32);
      text("Surface Temp: " + p.temp + " K (" + (p.temp - 273).toFixed(0) + "°C)", cardX + 16, cardY + 48);

      text("Radius: " + p.radius.toFixed(2) + " R⊕", cardX + 260, cardY + 32);
      text("Distance: " + (p.distLY === 0 ? "Local Solar System" : p.distLY + " Light Years"), cardX + 260, cardY + 48);

      text("Host Star: " + p.star, cardX + 530, cardY + 32);
      fill(p.color[0], p.color[1], p.color[2]);
      textStyle(BOLD);
      text("Status: " + p.status, cardX + 530, cardY + 48);
    } else {
      fill(255, 200, 0);
      textAlign(LEFT, TOP);
      textSize(13);
      textStyle(BOLD);
      text("EXPLORE EXOPLANETS", cardX + 16, cardY + 10);

      fill(220);
      textSize(11);
      textStyle(NORMAL);
      text("Hover over any planet node in the chart above to inspect its Earth Similarity Index (ESI), surface temperature, radius, host star, and habitability status.", cardX + 16, cardY + 32, cardW - 32, 35);
    }
  };

  // --- TAB 2: IDEAL STAR & PLANET INFOGRAPHIC ---
  this.drawIdealInfographic = function() {
    let startY = 95;

    // LEFT SECTION: Ideal Star Comparison (G vs K vs M)
    let col1X = 40;
    let col1W = 540;

    fill(18, 26, 45);
    stroke(0, 200, 255);
    strokeWeight(1);
    rect(col1X, startY, col1W, 460, 8);

    noStroke();
    fill(0, 255, 200);
    textAlign(LEFT, TOP);
    textSize(16);
    textStyle(BOLD);
    text("STELLAR HOST COMPARISON: G vs K vs M STARS", col1X + 16, startY + 14);

    for (let i = 0; i < this.starTypes.length; i++) {
      let st = this.starTypes[i];
      let boxY = startY + 48 + i * 130;

      fill(25, 36, 60);
      stroke(st.color[0], st.color[1], st.color[2]);
      strokeWeight(1.5);
      rect(col1X + 14, boxY, col1W - 28, 120, 6);

      // --- TWINKLING STAR HALO GRAPHIC ---
      let sx = col1X + 50;
      let sy = boxY + 40;
      
      // Calculate twinkling halo radius using frameCount
      let haloPulse = sin(frameCount * 0.1 + i * 1.5) * 6;
      noStroke();
      fill(st.color[0], st.color[1], st.color[2], 50 + haloPulse * 4);
      ellipse(sx, sy, 54 + haloPulse, 54 + haloPulse);

      // Solid Star Core (Fixed size, stable)
      fill(st.color[0], st.color[1], st.color[2]);
      ellipse(sx, sy, 38, 38);

      // Star Details
      fill(255);
      textAlign(LEFT, TOP);
      textSize(14);
      textStyle(BOLD);
      text(st.type, col1X + 85, boxY + 12);

      fill(st.color[0], st.color[1], st.color[2]);
      textAlign(RIGHT, TOP);
      textSize(12);
      text(st.verdict, col1X + col1W - 28, boxY + 12);

      fill(200, 220, 240);
      textAlign(LEFT, TOP);
      textSize(11);
      textStyle(NORMAL);
      text("• Example: " + st.example, col1X + 85, boxY + 34);
      text("• Lifespan: " + st.lifespan, col1X + 85, boxY + 50);
      text("• Radiation: " + st.radiation, col1X + 85, boxY + 66);

      fill(230);
      text(st.desc, col1X + 18, boxY + 88, col1W - 56, 30);
    }

    // RIGHT SECTION: Ideal "Superhabitable" Planet Blueprint
    let col2X = 600;
    let col2W = 384;

    fill(18, 26, 45);
    stroke(0, 255, 150);
    strokeWeight(1);
    rect(col2X, startY, col2W, 460, 8);

    noStroke();
    fill(0, 255, 150);
    textAlign(LEFT, TOP);
    textSize(16);
    textStyle(BOLD);
    text("SUPERHABITABLE WORLD BLUEPRINT", col2X + 16, startY + 14);

    fill(220);
    textSize(11);
    textStyle(NORMAL);
    text("What makes a planet BETTER than Earth?", col2X + 16, startY + 36);

    let traits = [
      { label: "Optimal Mass & Size", val: "1.2 - 1.5 Earth Radii (1.5 - 5 M⊕)", desc: "Slightly larger size preserves internal geothermal heat longer and strengthens magnetic fields." },
      { label: "Surface Temperature", val: "25°C Average (~5°C Warmer)", desc: "Higher average temperatures with high humidity foster broader biodiversity across continents." },
      { label: "Atmosphere & Oxygen", val: "25 - 30% Oxygen Blend", desc: "Thicker atmosphere provides higher protection against cosmic rays without thermal runaway." },
      { label: "Geological Activity", val: "Active Plate Tectonics", desc: "Sustains long-term carbon-silicate recycling to stabilize atmospheric climate for billions of years." }
    ];

    for (let k = 0; k < traits.length; k++) {
      let tr = traits[k];
      let ty = startY + 62 + k * 96;

      fill(25, 38, 55);
      stroke(0, 200, 150, 120);
      strokeWeight(1);
      rect(col2X + 14, ty, col2W - 28, 88, 6);

      noStroke();
      fill(0, 255, 200);
      textAlign(LEFT, TOP);
      textSize(12);
      textStyle(BOLD);
      text((k + 1) + ". " + tr.label, col2X + 24, ty + 10);

      fill(255, 215, 0);
      textSize(11);
      text("Target: " + tr.val, col2X + 24, ty + 26);

      fill(200, 215, 230);
      textSize(10.5);
      textStyle(NORMAL);
      text(tr.desc, col2X + 24, ty + 44, col2W - 48, 40);
    }
  };

  // --- MOUSE CLICK HANDLER ---
  this.mousePressed = function() {
    let tabs = 2;
    let tabW = 230;
    let tabH = 32;
    let startX = (width - (tabs * tabW + (tabs - 1) * 15)) / 2;
    let tabY = 46;

    for (let t = 0; t < tabs; t++) {
      let x = startX + t * (tabW + 15);
      if (mouseX >= x && mouseX <= x + tabW && mouseY >= tabY && mouseY <= tabY + tabH) {
        this.activeTab = t;
        break;
      }
    }
  };
}