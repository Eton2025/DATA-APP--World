


function EarthDetails() {
  this.name = 'Earth & Moon';
  this.id = 'earth';

  // State Variables
  this.moonAngle = 0;
  this.primaryTab = 'earth'; 
  this.subTab = 'habitability';

  this.setup = function() {
    this.moonAngle = 0;
    this.primaryTab = 'earth';
    this.subTab = 'habitability';
  };

  this.destroy = function() {};

  this.draw = function() {
    push();
    background(5, 12, 30);

    // Title Header
    textAlign(CENTER, TOP);
    fill(0, 220, 255);
    textSize(22);
    textFont('Helvetica');
    textStyle(BOLD);
    text("EARTH & MOON SYSTEM EXPLORER", width / 2, 18);

    // Orbit Animation Step
    this.moonAngle -= 0.01;

    var systemX = 260;
    var systemY = height / 2 + 20;

    push();
    translate(systemX, systemY);

    // ==================== VISUALIZATION CANVAS ====================
    if (this.primaryTab === 'earth') {
      if (this.subTab === 'habitability') {
        // --- 1. RESTORED ORIGINAL STATIC EARTH DESIGN ---
        fill(0, 120, 240);
        stroke(80, 200, 255, 150);
        strokeWeight(4);
        ellipse(0, 0, 220, 220);

        // Static Landmasses
        fill(40, 180, 90);
        noStroke();
        ellipse(-35, -25, 75, 45);
        ellipse(25, 35, 65, 55);
        ellipse(30, -35, 40, 30);
        fill(210, 170, 80);
        ellipse(-15, -10, 30, 20);

        // Ice Cap Glare Arcs
        fill(240, 245, 255);
        ellipse(0, -95, 80, 25);
        ellipse(0, 95, 70, 20);

        // Outer Atmosphere Ring
        noFill();
        stroke(100, 200, 255, 80);
        strokeWeight(6);
        ellipse(0, 0, 232, 232);
      } 
      else if (this.subTab === 'earth_structure') {
        // --- 2. EXPANDED ATMOSPHERE & INTERIOR STRUCTURE ---
        let r = 60; // Base Earth Radius
          // crust colour: 101, 67, 33

        // Concentric Atmosphere Rings (Expanded Radii for clear separation)
        noFill();
        stroke(180, 220, 255, 100); strokeWeight(3); ellipse(0, 0, r * 3.6, r * 3.6); // Exosphere
        stroke(120, 200, 255, 120); strokeWeight(4); ellipse(0, 0, r * 3.1, r * 3.1); // Thermosphere
        stroke(70, 160, 255, 150); strokeWeight(4); ellipse(0, 0, r * 2.6, r * 2.6); // Mesosphere
        stroke(30, 120, 255, 180); strokeWeight(4); ellipse(0, 0, r * 2.2, r * 2.2); // Stratosphere
        stroke(10, 80, 230, 200);  strokeWeight(5); ellipse(0, 0, r * 1.8, r * 1.8); // Troposphere

        // Core Interior Layers
        fill(200, 30, 30); stroke(255, 180, 80); strokeWeight(2);
        ellipse(0, 0, r * 1.5, r * 1.5); // Mantle

        fill(255, 140, 0);
        ellipse(0, 0, r * 0.9, r * 0.9); // Outer Core

        fill(255, 245, 180);
        ellipse(0, 0, r * 0.4, r * 0.4); // Inner Core

        // Atmospheric Layer Annotations & Callouts
        stroke(0, 220, 255, 180); strokeWeight(1);
        
        // Atmosphere Callout Lines
        line(r * 0.9, 0, r * 0.9 + 25, 0);
        line(r * 1.1, -15, r * 1.1 + 25, -15);
        line(r * 1.3, -30, r * 1.3 + 25, -30);
        line(r * 1.55, -45, r * 1.55 + 25, -45);
        line(r * 1.8, -60, r * 1.8 + 25, -60);

        fill(0, 220, 255); noStroke(); textSize(10); textAlign(LEFT, CENTER); textStyle(BOLD);
        text("Troposphere (0-12 km)", r * 0.9 + 28, 0);
        text("Stratosphere (12-50 km)", r * 1.1 + 28, -15);
        text("Mesosphere (50-85 km)", r * 1.3 + 28, -30);
        text("Thermosphere (85-600 km)", r * 1.55 + 28, -45);
        text("Exosphere (600+ km)", r * 1.8 + 28, -60);

        // Interior Core Annotations
        stroke(255, 200, 100, 180);
        line(-5, 0, -r * 1.6, 30);
        line(-16, -r *0.25, -r * 1.6, 10);
        line(-16, -r *0.55, -r *1.6, -10);
        line(-16, r *0.68, -r *1.6, 50);

        fill(255, 200, 100); noStroke(); textAlign(RIGHT, CENTER);
        text("Mantle", -r * 1.3 - 25, -10);
        text("Outer Core", -r * 1.3 - 25, 10);
        text("Inner core", -r * 1.3 - 25, 30);
        text("Crust", -r * 1.3 - 25, 50);
      }
    } 
    else if (this.primaryTab === 'moon') {
      if (this.subTab === 'moon_phases') {
        // --- 3. ORBIT & LIVE FOOTAGE PHASES ---
        var orbitR = 120;
        noFill(); stroke(0, 150, 255, 60); strokeWeight(1.5);
        ellipse(0, 0, orbitR * 2, orbitR * 2);

        // Center Earth
        fill(0, 120, 240); stroke(80, 200, 255); strokeWeight(2);
        ellipse(0, 0, 60, 60);

        // Orbiting Moon Position
        var mx = cos(this.moonAngle) * orbitR;
        var my = sin(this.moonAngle) * orbitR;

        // Sunlight Direction Lines (Sunlight comes fixed from RIGHT)
        stroke(255, 230, 100, 80); strokeWeight(1);
        for(let y = -90; y <= 90; y += 30) {
          line(190, y, 160, y);
        }
        fill(255, 230, 100); noStroke(); textSize(10); textAlign(RIGHT, CENTER);
        text("SUNLIGHT ➔", 210, 0);

        // Orbiting Moon Rendering
        push();
        translate(mx, my);
        fill(190); stroke(255); strokeWeight(1);
        ellipse(0, 0, 26, 26);

        // Fixed Shadow (Left side always shaded)
        fill(5, 12, 30, 220); noStroke();
        arc(0, 0, 26, 26, HALF_PI, PI + HALF_PI);
        pop();

        // --- LIVE FOOTAGE PHASES PREVIEW BOX ---
        push();
        translate(-190, 80);
        fill(10, 18, 38); stroke(0, 200, 255, 150); strokeWeight(1.5);
        rect(0, 0, 110, 110, 8);

        fill(0, 220, 255); noStroke(); textSize(9); textAlign(CENTER, TOP); textStyle(BOLD);
        text("LIVE EARTH VIEW", 55, 6);

        // Quantize moonAngle to every 45 degrees (PI / 4) starting from New Moon
        var normAngle = (this.moonAngle % TWO_PI + TWO_PI) % TWO_PI;
        var step = PI / 4;
        var phaseIndex = Math.round(normAngle / step) % 8;

        // Render Live Earth-Perspective Moon Phase
        translate(55, 60);
        fill(180); stroke(255); strokeWeight(1);
        ellipse(0, 0, 60, 60);

        fill(5, 12, 30, 240); noStroke();
        if (phaseIndex === 0) {
          // New Moon (0°) - Fully dark
          ellipse(0, 0, 60, 60);
        } else if (phaseIndex === 1) {
          // Waxing Crescent (45°)
          arc(0, 0, 60, 60, -HALF_PI, HALF_PI);
          fill(5, 12, 30);
          ellipse(0, 0, 30, 60);
        } else if (phaseIndex === 2) {
          // First Quarter (90°)
          arc(0, 0, 60, 60, -HALF_PI, HALF_PI);
        } else if (phaseIndex === 3) {
          // Waxing Gibbous (135°)
          arc(0, 0, 60, 60, -HALF_PI, HALF_PI);
          fill(180);
          ellipse(0, 0, 30, 60);
        } else if (phaseIndex === 4) {
          // Full Moon (180°) - Fully lit
        } else if (phaseIndex === 5) {
          // Waning Gibbous (225°)
          arc(0, 0, 60, 60, HALF_PI, PI + HALF_PI);
          fill(180);
          ellipse(0, 0, 30, 60);
        } else if (phaseIndex === 6) {
          // Third Quarter (270°)
          arc(0, 0, 60, 60, HALF_PI, PI + HALF_PI);
        } else if (phaseIndex === 7) {
          // Waning Crescent (315°)
          arc(0, 0, 60, 60, HALF_PI, PI + HALF_PI);
          fill(5, 12, 30);
          ellipse(0, 0, 30, 60);
        } 
        pop();
      } 
      else if (this.subTab === 'moon_surface') {
        // Stationary Moon Surface Map
        fill(180, 185, 195); stroke(220); strokeWeight(2);
        ellipse(0, 0, 210, 210);

        fill(100, 105, 115); noStroke();
        ellipse(-30, -30, 60, 45); 
        ellipse(30, -35, 45, 40);  
        ellipse(50, 10, 40, 35);   
        ellipse(-45, 20, 50, 60);  

        fill(235); ellipse(35, 65, 12, 12); 

        fill(255); textSize(10); textAlign(CENTER, CENTER); textStyle(NORMAL);
        text("Mare Imbrium", -30, -30);
        text("Mare Serenitatis", 35, -50);
        text("Mare Tranquillitatis", 55, 30);
        text("Oceanus Procellarum", -50, 55);
        fill(0, 220, 255);
        text("Tycho Crater", 35, 82);
      } 
      else if (this.subTab === 'moon_structure') {
        // --- 4. FULL CIRCLE LUNAR STRUCTURE WITH HIGHER FAR-SIDE CRUST ---
        let mr = 85;

        // Outer Thicker Far-Side Crust Layer (Asymmetrical offset circle)
        push();
        fill(210, 215, 225); stroke(120); strokeWeight(1.5);
        ellipse(-12, 0, (mr + 16) * 2, (mr + 12) * 2); 

        // Rigid Mantle (Full Circle)
        fill(140, 135, 130); stroke(180); strokeWeight(1);
        ellipse(0, 0, mr * 1.8, mr * 1.8);

        // Deep Mantle Zone (Full Circle)
        fill(110, 100, 90);
        ellipse(0, 0, mr * 1.1, mr * 1.1);

        // Metallic Core (Full Circle)
        fill(230, 120, 40); stroke(255, 180, 0);
        ellipse(0, 0, mr * 0.4, mr * 0.4);
        pop();

        // Far Side vs Near Side Callout Annotations
        stroke(0, 220, 255); strokeWeight(1);
        line(-mr - 20, -10, -mr - 50, -30);
        line(mr + 5, -10, mr + 35, -30);

        fill(0, 220, 255); noStroke(); textSize(10); textStyle(BOLD);
        textAlign(RIGHT, CENTER);
        text("FAR SIDE\nThicker Crust (~100 km)", -mr - 55, -30);
        textAlign(LEFT, CENTER);
        text("NEAR SIDE\nThinner Crust (~60 km)", mr + 40, -30);
      }
    }
    pop();

    // ==================== RIGHT PANEL & TABS ====================
    var cardX = 520;
    var cardY = 60;
    var cardW = 480;
    var cardH = 480;

    fill(12, 22, 45); stroke(0, 200, 255, 120); strokeWeight(2);
    rect(cardX, cardY, cardW, cardH, 10);

    // Primary Tabs
    var mainTabs = [
      { id: 'earth', label: '🌍 EARTH DATA' },
      { id: 'moon', label: '🌙 MOON DATA' }
    ];

    for (var m = 0; m < mainTabs.length; m++) {
      var mX = cardX + 15 + (m * 225);
      var mY = cardY + 12;
      var isMSelected = (this.primaryTab === mainTabs[m].id);

      fill(isMSelected ? color(0, 180, 240) : color(25, 38, 70));
      noStroke();
      rect(mX, mY, 215, 32, 6);

      fill(isMSelected ? 255 : 180);
      textSize(12); textStyle(BOLD); textAlign(CENTER, CENTER);
      text(mainTabs[m].label, mX + 107, mY + 16);
    }

    // Sub-Tabs
    var subTabs = (this.primaryTab === 'earth') ? 
      [{ id: 'habitability', label: 'Habitability Icons' }, { id: 'earth_structure', label: 'Structure & Atmosphere' }] :
      [{ id: 'moon_phases', label: 'Orbit & Phases' }, { id: 'moon_surface', label: 'Surface Map' }, { id: 'moon_structure', label: 'Crust & Interior' }];

    var subW = (cardW - 30 - ((subTabs.length - 1) * 8)) / subTabs.length;
    for (var s = 0; s < subTabs.length; s++) {
      var sX = cardX + 15 + (s * (subW + 8));
      var sY = cardY + 52;
      var isSSelected = (this.subTab === subTabs[s].id);

      fill(isSSelected ? color(0, 110, 180) : color(20, 30, 55));
      stroke(isSSelected ? color(0, 200, 255) : color(40, 60, 90)); strokeWeight(1);
      rect(sX, sY, subW, 26, 4);

      fill(isSSelected ? 255 : 160);
      textSize(10); textStyle(BOLD); textAlign(CENTER, CENTER);
      text(subTabs[s].label, sX + (subW / 2), sY + 13);
    }

    // Card Content Area
    var contentY = cardY + 90;
    
    if (this.primaryTab === 'earth' && this.subTab === 'habitability') {
      // Habitability Icons Grid
      drawHabitabilityIcon(cardX + 20, contentY + 10, "🌡️", "Right Temp", "Moderate temperature range");
      drawHabitabilityIcon(cardX + 240, contentY + 10, "🧲", "Molten Core", "Shielding magnetic field");
      
      drawHabitabilityIcon(cardX + 20, contentY + 90, "☀️", "Reliable Sun", "Steady heat and light");
      drawHabitabilityIcon(cardX + 240, contentY + 90, "💧", "Surface Water", "Essential liquid chemistry");

      drawHabitabilityIcon(cardX + 20, contentY + 170, "🔄", "Spin & Tilt", "Prevents thermal extremes");
      drawHabitabilityIcon(cardX + 240, contentY + 170, "⚖️", "Mass & Gravity", "Retains protective atmosphere");

      drawHabitabilityIcon(cardX + 20, contentY + 250, "☁️", "Atmosphere", "Insulation & breathable air");
      drawHabitabilityIcon(cardX + 240, contentY + 250, "🧪", "Key Elements", "C, O, N, P vital for life");
    } 
    else {
      fill(255); textAlign(LEFT, TOP); textFont('Helvetica');
      textSize(15); textStyle(BOLD);
      
      if (this.subTab === 'earth_structure') {
        text("Atmospheric Layers & Interior Structure", cardX + 20, contentY + 10);
        textSize(11); textStyle(NORMAL);
        var earthText = "• Troposphere (0–12 km): Contains 75% of atmosphere mass & weather systems.\n\n" +
                        "• Stratosphere (12–50 km): Houses the Ozone Layer absorbing UV radiation.\n\n" +
                        "• Mesosphere (50–85 km): High-density zone where meteors burn up upon entry.\n\n" +
                        "• Thermosphere (85–600 km): Home to Auroras and International Space Station.\n\n" +
                        "• Exosphere (600+ km): Outer transition layer directly into space.\n\n" +
                        "• Crust: Surface of earth, thinnest under oceans at 5-10km, THickest under mountains at 70-80km. Split into different plates due to tectonic movement.\n\n"+
                        "• Mantle: Partly moletn on the outer part. Drives tectonic activity and releases earth's heat \n\n"+
                        "• Outer core: Molten, generates earth's magnetic field. \n\n"+
                        "• Inner core: Solid, made of iron, as hot as 5500°C, holds planet together by gravity.";
        
        text(earthText, cardX + 20, contentY + 38, cardW - 40, 320);
      } else if (this.subTab === 'moon_phases') {
        text("Dynamic Orbit & Live Lunar Phases", cardX + 20, contentY + 10);
        textSize(12); textStyle(NORMAL);
        
        var phaseNames = [
          "New Moon (0°)",
          "Waxing Crescent (45°)",
          "First Quarter (90°)",
          "Waxing Gibbous (135°)",
          "Full Moon (180°)",
          "Waning Gibbous (225°)",
          "Third Quarter (270°)",
          "Waning Crescent (315°)"
        ];
        var normAngle = (this.moonAngle % TWO_PI + TWO_PI) % TWO_PI;
        var pIdx = Math.round(normAngle / (PI / 4)) % 8;
        var curPhase = phaseNames[pIdx];

        text("• Constant Sunlight Direction: Sunlight streams from the right in space.\n\n" +
             "• Current Phase: " + curPhase + "\n\n" +
             "• Live Earth View Window: The lower preview box continuously updates the phase every 45° of the Moon's orbit starting from New Moon.", cardX + 20, contentY + 40, cardW - 40, 300);
      } else if (this.subTab === 'moon_surface') {
        text("Labeled Lunar Surface Map", cardX + 20, contentY + 10);
        textSize(12); textStyle(NORMAL);
        text("• Maria (Seas): Dark basalt plains formed by ancient volcanic eruptions.\n\n" +
             "• Craters: Preserved impact scars remaining intact due to lack of erosion.", cardX + 20, contentY + 40, cardW - 40, 300);
      } else if (this.subTab === 'moon_structure') {
        text("Lunar Crust Asymmetry & Interior", cardX + 20, contentY + 10);
        textSize(12); textStyle(NORMAL);
        text("• Asymmetrical Crust: The Moon's far side crust (~100 km) is significantly thicker than the Earth-facing near side crust (~60 km).\n\n" +
             "• Rigid Mantle: Composed of olivine and pyroxene minerals.\n\n" +
             "• Small Core: Metallic center comprising only 1–2% of the Moon's total mass.", cardX + 20, contentY + 40, cardW - 40, 300);
      }
    }

    pop();
  };

  // Helper function for rendering habitability icons
  function drawHabitabilityIcon(x, y, symbol, title, desc) {
    push();
    fill(25, 40, 75); stroke(0, 180, 240, 100); strokeWeight(1);
    rect(x, y, 220, 68, 6);

    textSize(22); textAlign(CENTER, CENTER);
    text(symbol, x + 25, y + 34);

    fill(0, 220, 255); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text(title, x + 52, y + 12);

    fill(200); textSize(10); textStyle(NORMAL);
    text(desc, x + 52, y + 32, 160, 32);
    pop();
  }

  // Mouse Interaction Router
  this.mousePressed = function() {
    var mx = (mouseX / width) * 1024;
    var my = (mouseY / height) * 576;
    var cardX = 520; var cardY = 60;

    // Primary Tab clicks
    var mainTabs = ['earth', 'moon'];
    for (var m = 0; m < mainTabs.length; m++) {
      var mX = cardX + 15 + (m * 225);
      var mY = cardY + 12;
      if (mx >= mX && mx <= mX + 215 && my >= mY && my <= mY + 32) {
        this.primaryTab = mainTabs[m];
        this.subTab = (this.primaryTab === 'earth') ? 'habitability' : 'moon_phases';
        return;
      }
    }

    // Sub-Tab clicks
    var subTabs = (this.primaryTab === 'earth') ? ['habitability', 'earth_structure'] : ['moon_phases', 'moon_surface', 'moon_structure'];
    var cardW = 480;
    var subW = (cardW - 30 - ((subTabs.length - 1) * 8)) / subTabs.length;

    for (var s = 0; s < subTabs.length; s++) {
      var sX = cardX + 15 + (s * (subW + 8));
      var sY = cardY + 52;
      if (mx >= sX && mx <= sX + subW && my >= sY && my <= sY + 26) {
        this.subTab = subTabs[s];
        return;
      }
    }
  };
}