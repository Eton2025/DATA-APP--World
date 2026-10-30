




function SunDetails() {
  this.name = 'Sun Details';
  this.id = 'sun';
  
  // Animation state variables
  this.sunRotation = 0;
  this.flarePulse = 0;
  this.activeTab = 'core'; // 'core', 'surface', 'atmosphere'

  this.setup = function() {
    this.sunRotation = 0;
    this.flarePulse = 0;
    this.activeTab = 'core';
  };

  this.destroy = function() {};

  this.draw = function() {
    push();
    background(10, 10, 25);

    // Title
    textAlign(CENTER, TOP);
    fill(255, 200, 0);
    textSize(26);
    textFont('Helvetica');
    textStyle(BOLD);
    text("THE SUN: OUR HOST STAR", width / 2, 25);

    // --- ANIMATED SUN & CORONA ---
    var centerX = width / 2 - 230;
    var centerY = height / 2;

    this.sunRotation -= 0.5;
    this.flarePulse += 0.05;
    var pulseRadius = sin(this.flarePulse) * 8;

    push();
    translate(centerX, centerY);

    // 1. Corona / Outer Glow (Twinkling / Pulsing gently)
    fill(255, 230, 150, 50);
    noStroke();
    ellipse(0, 0, 350 + pulseRadius * 3, 350 + pulseRadius * 3);

    // Rotating Corona Rays
    rotate(radians(this.sunRotation));
    stroke(255, 200, 100, 140);
    strokeWeight(2);
    for (var i = 0; i < 12; i++) {
      rotate(TWO_PI / 12);
      line(0, 0, 250 + pulseRadius, 0);
    }
    pop();

    // --- SUN GRAPHIC / DIAGRAM ---
    push();
    translate(centerX, centerY);

    if (this.activeTab === 'core') {
      let r = 90; // Fixed radius so it never bounces

      // Outer Yellow Body (Photosphere base layer)
      fill(255, 230, 0);
      stroke(180, 140, 0);
      strokeWeight(1.5);
      ellipse(0, 0, r * 2.9, r * 2.9);

      // Red Photosphere Ring Outer Boundary
      noFill();
      stroke(220, 30, 20);
      strokeWeight(8);
      ellipse(0, 0, r * 2.9 - 4, r * 2.9 - 4);

      // Cutaway Wedge (Top-Right Quadrant)
      fill(255, 140, 0);
      noStroke();
      arc(0, 0, r * 1.5, r * 1.5, PI * 1.5, TWO_PI);

      fill(230, 80, 20);
      arc(0, 0, r * 1.4 * 2, r * 1.4 * 2, PI * 1.5, TWO_PI);

      fill(0, 220, 255);
      arc(0, 0, r * 0.7 * 2, r * 0.7 * 2, PI * 1.5, TWO_PI);

      fill(255, 255, 255);
      arc(0, 0, r * 0.25 * 2, r * 0.25 * 2, PI * 1.5, TWO_PI);

      stroke(80, 40, 0);
      strokeWeight(1.5);
      line(0, 0, 0, -r); 
      line(0, 0, r, 0);  

      fill(40, 15, 0);
      noStroke();
      ellipse(52, 45, 6, 4);
      ellipse(64, 32, 5, 3);
    } 
    else if (this.activeTab === 'atmosphere') {
      // --- ATMOSPHERE TAB: SUN WITH SHOOTING SOLAR STORMS & FLARES ---
      
      // Base Sun Sphere
      fill(255, 200, 0);
      stroke(255, 240, 150);
      strokeWeight(4);
      ellipse(0, 0, 261, 261);

      // Animated Solar Flares / Prominences shooting outward
      let flareOffset = sin(millis() * 0.008) * 15;
      
      // Top-Right Solar Storm Plume
      push();
      rotate(radians(-45));
      noFill();
      stroke(255, 60, 0, 200);
      strokeWeight(8 + flareOffset * 0.3);
      beginShape();
      vertex(0, -130);
      bezierVertex(40, -180 - flareOffset, 90, -160 - flareOffset, 120, -110);
      endShape();
      pop();

      // Left Solar Flare Ejection
      push();
      rotate(radians(135));
      noFill();
      stroke(255, 120, 0, 180);
      strokeWeight(6 - flareOffset * 0.2);
      beginShape();
      vertex(0, -130);
      bezierVertex(-50, -170 + flareOffset, -90, -150 + flareOffset, -110, -100);
      endShape();
      pop();

      // Particle bursts representing coronal mass ejections (CMEs)
      fill(255, 150, 50, 150);
      noStroke();
      let pDist = 140 + (millis() * 0.05) % 60;
      ellipse(pDist * 0.7, -pDist * 0.7, 12, 12);
      ellipse(-pDist * 0.5, pDist * 0.8, 8, 8);
    } 
    else {
      // Standard Sun Sphere for Surface & Temp tab
      fill(255, 230, 0);
      stroke(255, 240, 150);
      strokeWeight(4);
      ellipse(0, 0, 261, 261);
    }
    pop();

    // --- INTERACTIVE INFORMATION CARD ---
    var cardX = width / 2 + 30;
    var cardY = 90;
    var cardW = 440;
    var cardH = 450;

    // Card Container Background
    fill(20, 25, 45);
    stroke(255, 200, 0, 100);
    strokeWeight(2);
    rect(cardX, cardY, cardW, cardH, 12);

    // Category Tabs
    var tabs = [
      { id: 'core', label: 'Core & Energy' },
      { id: 'surface', label: 'Surface & Temp' },
      { id: 'atmosphere', label: 'Solar Wind' }
    ];

    for (var t = 0; t < tabs.length; t++) {
      var tabX = cardX + 15 + (t * 135);
      var tabY = cardY + 15;
      var isSelected = (this.activeTab === tabs[t].id);

      fill(isSelected ? color(255, 180, 0) : color(35, 42, 70));
      noStroke();
      rect(tabX, tabY, 128, 35, 6);

      fill(isSelected ? 0 : 255);
      textSize(12);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text(tabs[t].label, tabX + 64, tabY + 17);
    }

    // Tab Contents
    fill(255);
    textAlign(LEFT, TOP);
    textFont('Helvetica');

    if (this.activeTab === 'core') {
      textSize(18);
      textStyle(BOLD);
      text("Nuclear Fusion Reactor & Layers", cardX + 20, cardY + 70);

      textSize(14);
      textStyle(NORMAL);
      var msg1 = "• Core (Cyan): Center reactor at 15,000,000 °C fusing Hydrogen to Helium.\n\n" +
                 "• Radiative Zone (Red-Orange): Energy moves outward via photons taking over 100k years.\n\n" +
                 "• Convective Zone (Orange): Boiling plasma columns transport heat to the surface.\n\n" +
                 "• Photosphere (Yellow): The stable visible surface glowing at ~5,500 °C with sunspots.\n\n"+
                 "• Chromosphere (Red Ring): The First layer of atmosphere of the Sun where solar storms, flares and other activity occur.\n\n"+
                 "• Corona (Pale): The Outer atmosphere that is hotter than the surface, but seen only in an eclipse.";
      text(msg1, cardX + 20, cardY + 110, cardW - 40, cardH + 20);
    } 
    else if (this.activeTab === 'surface') {
      textSize(18);
      textStyle(BOLD);
      text("Photosphere Features", cardX + 20, cardY + 70);

      textSize(14);
      textStyle(NORMAL);
      var msg2 = "• Surface Temp: 5,500 °C (5,778 K)\n\n" +
                 "• Sunspots: Cooler regions (~3,800 °C) caused by magnetic field concentrations.\n\n" +
                 "• Rotation: Differential rotation (25 days at equator vs 35 days at poles).\n\n" +
                 "• Classification: G2V Main-Sequence Yellow Dwarf.";
      text(msg2, cardX + 20, cardY + 110, cardW - 40, cardH + 20);
    } 
    else if (this.activeTab === 'atmosphere') {
      textSize(18);
      textStyle(BOLD);
      text("Space Weather & Flares", cardX + 20, cardY + 70);

      textSize(14);
      textStyle(NORMAL);
      var msg3 = "• Solar Wind: Continuous stream of charged particles moving at 400 km/s.\n\n" +
                 "• Solar Flares: Explosions on the Sun's surface from magnetic line interactions that throw plasma and can cause damage to satellites.\n\n" +
                 "• Coronal Mass Ejections (CMEs): Huge bursts of plasma that cause Earth's Auroras.\n\n" +
                 "• Heliosphere: The Sun's magnetic bubble protecting our system from interstellar radiation.";
      text(msg3, cardX + 20, cardY + 110, cardW - 40, cardH + 20);
    }

    pop();
  };

  // Click handling for tab switches
  this.mousePressed = function() {
    var mx = (mouseX / width) * 1024;
    var my = (mouseY / height) * 576;

    var cardX = width / 2 + 30;
    var cardY = 90;
    var tabs = ['core', 'surface', 'atmosphere'];

    for (var t = 0; t < tabs.length; t++) {
      var tabX = cardX + 15 + (t * 135);
      var tabY = cardY + 15;
      if (mx >= tabX && mx <= tabX + 128 && my >= tabY && my <= tabY + 35) {
        this.activeTab = tabs[t];
      }
    }
  };
}