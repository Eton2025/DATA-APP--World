


// =========================================================================
// RENEWABLE ENERGY & GENERATION VECTORS (TABBED EDITION)
// =========================================================================

function RenewableEnergyVisual() {
  this.name = 'Renewable Energy';
  this.id = 'renewable-energy';

  // Active Tab: "OVERVIEW" or "RENEWABLES_DETAIL"
  this.activeTab = "OVERVIEW";

  // 1. Primary Global Energy Share Data
  this.pieData = [
    { source: 'Petroleum/Oil', share: 3, color: [116, 125, 140] },
    { source: 'Natural Gas',   share: 23, color: [74, 105, 124] },
    { source: 'Coal',          share: 35, color: [47, 53, 66] },
    { source: 'Nuclear',       share: 9,  color: [140, 122, 230] },
    { source: 'Renewables',    share: 30,  color: [46, 213, 115] }
  ];

  // 2. Sub-Renewable Energy Specific Breakdown Data
  this.renewableSubPieData = [
    { source: 'Hydropower', share: 14, color: [52, 152, 219] },
    { source: 'Biofuels and Bioenergy',   share: 1, color: [230, 126, 34] },
    { source: 'Wind',       share: 8,  color: [241, 196, 15] },
    { source: 'Geothermal', share: 1,  color: [231, 76, 60] },
    { source: 'Solar',      share: 6,  color: [46, 204, 113] }
  ];

  // 3. Historical Timeline Data
  this.timelineData = [
    { year: 2000, fossil: 15, clean: 3, windSolar: 0.5 },
    { year: 2005, fossil: 17, clean: 4, windSolar: 0.8 },
    { year: 2010, fossil: 19, clean: 4.5, windSolar: 1.5 },
    { year: 2015, fossil: 20, clean: 5, windSolar: 3.2 },
    { year: 2020, fossil: 21, clean: 5.8, windSolar: 5.5 },
    { year: 2024, fossil: 22, clean: 6.5, windSolar: 7.2 }
  ];

  this.layout = {
    leftX: 520,
    rightX: 960,
    topY: 170,
    bottomY: 460
  };

  // Image Placeholders
  this.images = {
    solar: null,
    hydro: null,
    wind: null,
    geothermal: null
  };

  this.preload = function() {
    // Optional: Load your image assets here if available
    // this.images.solar = loadImage('assets/solar_panel.jpg');
    // this.images.hydro = loadImage('assets/hydro_dam.jpg');
  };

  this.setup = function() {};

  this.draw = function() {
    background(255, 255, 150); 

    // --- TITLE HEADER ---
    fill(47, 53, 66);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    textStyle(BOLD);
    text('Global Energy Allocation & Clean Generation Vectors', width / 2, 35);

    // --- NAVIGATION TABS ---
    this.drawTabs();

    // --- ROUTING CONTENT BASED ON ACTIVE TAB ---
    if (this.activeTab === "OVERVIEW") {
      this.drawOverviewTab();
    } else if (this.activeTab === "RENEWABLES_DETAIL") {
      this.drawRenewableDetailTab();
    }
  };

  // ==========================================
  // TAB NAVIGATION BAR
  // ==========================================
  this.drawTabs = function() {
    let tabs = [
      { id: "OVERVIEW", label: "📊 OVERVIEW & TIMELINE" },
      { id: "RENEWABLES_DETAIL", label: "🌱 RENEWABLE BREAKDOWN & ASSETS" }
    ];

    let tabW = 250;
    let tabH = 32;
    let startX = width / 2 - (tabs.length * (tabW + 10)) / 2;
    let y = 70;

    for (let i = 0; i < tabs.length; i++) {
      let tx = startX + i * (tabW + 10);
      let isActive = this.activeTab === tabs[i].id;

      fill(isActive ? color(46, 213, 115) : color(220, 228, 235));
      stroke(isActive ? color(39, 174, 96) : color(180, 195, 210));
      strokeWeight(1.5);
      rect(tx, y, tabW, tabH, 6);

      fill(isActive ? 255 : 60);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(12);
      textStyle(BOLD);
      text(tabs[i].label, tx + tabW / 2, y + tabH / 2);
    }
  };

  // ==========================================
  // TAB 1: OVERVIEW & TIMELINE (ORIGINAL CHARTS)
  // ==========================================
  this.drawOverviewTab = function() {
    // --- LEFT COMPONENT: PROPORTIONAL PIE CHART MATRIX ---
    var pieCenterX = 260;
    var pieCenterY = 300;
    var pieDiameter = 220;
    var lastAngle = 0;

    for (var i = 0; i < this.pieData.length; i++) {
      var angleDelta = radians(map(this.pieData[i].share, 0, 100, 0, 360));
      fill(this.pieData[i].color[0], this.pieData[i].color[1], this.pieData[i].color[2]);
      stroke(255);
      strokeWeight(1.5);
      arc(pieCenterX, pieCenterY, pieDiameter, pieDiameter, lastAngle, lastAngle + angleDelta, PIE);
      
      // Legend
      noStroke();
      fill(this.pieData[i].color[0], this.pieData[i].color[1], this.pieData[i].color[2]);
      rect(60, 450 + (i * 22), 14, 14, 3);
      
      fill(47, 53, 66);
      textAlign(LEFT, CENTER);
      textSize(12);
      textStyle(BOLD);
      text(this.pieData[i].source + ' (' + this.pieData[i].share + '%)', 85, 457 + (i * 22));
      
      lastAngle += angleDelta;
    }

    fill(47, 53, 66);
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text('Current Global Energy Share', pieCenterX, this.layout.topY - 20);

    // --- RIGHT COMPONENT: CLEAN GENERATION LINE TIMELINE ---
    stroke(220);
    strokeWeight(1);
    for (var g = 0; g <= 25; g += 5) {
      var yGrid = map(g, 0, 25, this.layout.bottomY, this.layout.topY);
      line(this.layout.leftX, yGrid, this.layout.rightX, yGrid);
      noStroke();
      fill(116, 125, 140);
      textSize(10);
      textAlign(RIGHT, CENTER);
      text(g + "M", this.layout.leftX - 12, yGrid);
    }

    var numPoints = this.timelineData.length;
    for (var i = 0; i < numPoints; i++) {
      var xPos = map(i, 0, numPoints - 1, this.layout.leftX, this.layout.rightX);
      
      noStroke();
      fill(47, 53, 66);
      textSize(11);
      textAlign(CENTER, TOP);
      text(this.timelineData[i].year, xPos, this.layout.bottomY + 12);

      if (i > 0) {
        var prevX = map(i - 1, 0, numPoints - 1, this.layout.leftX, this.layout.rightX);
        
        var prevYFossil = map(this.timelineData[i-1].fossil, 0, 25, this.layout.bottomY, this.layout.topY);
        var currYFossil = map(this.timelineData[i].fossil, 0, 25, this.layout.bottomY, this.layout.topY);
        stroke(116, 125, 140); strokeWeight(2.5);
        line(prevX, prevYFossil, xPos, currYFossil);

        var prevYClean = map(this.timelineData[i-1].clean, 0, 25, this.layout.bottomY, this.layout.topY);
        var currYClean = map(this.timelineData[i].clean, 0, 25, this.layout.bottomY, this.layout.topY);
        stroke(74, 222, 128);
        line(prevX, prevYClean, xPos, currYClean);

        var prevYWindSolar = map(this.timelineData[i-1].windSolar, 0, 25, this.layout.bottomY, this.layout.topY);
        var currYWindSolar = map(this.timelineData[i].windSolar, 0, 25, this.layout.bottomY, this.layout.topY);
        stroke(255, 165, 2);
        line(prevX, prevYWindSolar, xPos, currYWindSolar);
      }
    }

    noStroke();
    fill(47, 53, 66);
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text('Electricity Generation (Million Gigawatt Hours)', (this.layout.leftX + this.layout.rightX) / 2, this.layout.topY - 20);

    textAlign(LEFT, CENTER); textSize(11);
    fill(116, 125, 140); text('• Fossil Generation', this.layout.leftX + 20, this.layout.topY + 15);
    fill(21, 128, 61);    text('• Hydro & Nuclear', this.layout.leftX + 150, this.layout.topY + 15);
    fill(255, 165, 2);    text('• Wind & Solar Growth', this.layout.leftX + 270, this.layout.topY + 15);

    // Bottom Summary Banner
    var summaryY = 540;
    fill(240, 253, 244);
    stroke(74, 222, 128);
    strokeWeight(1.5);
    rect(250, summaryY, 710, 45, 6);

    noStroke();
    fill(21, 128, 61);
    textAlign(CENTER, CENTER);
    textSize(11);
    text("Renewable Breakdown: Hydropower (35%), Biofuels (20%), Wind (9%), Biomass (6%), Geothermal (5%), Solar (1%)", width / 2 + 100, summaryY + 22);
  };

  // ==========================================
  // TAB 2: RENEWABLE BREAKDOWN & ASSETS
  // ==========================================
  this.drawRenewableDetailTab = function() {
    // --- LEFT SIDE: SUB-RENEWABLES PIE CHART ---
    var pieCenterX = 260;
    var pieCenterY = 290;
    var pieDiameter = 220;
    var lastAngle = 0;

    fill(47, 53, 66);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text('Renewable Energy Sources Breakdown', pieCenterX, 150);

    for (var i = 0; i < this.renewableSubPieData.length; i++) {
      var angleDelta = radians(map(this.renewableSubPieData[i].share, 0, 100, 0, 360));
      fill(this.renewableSubPieData[i].color[0], this.renewableSubPieData[i].color[1], this.renewableSubPieData[i].color[2]);
      stroke(255);
      strokeWeight(1.5);
      arc(pieCenterX, pieCenterY, pieDiameter, pieDiameter, lastAngle, lastAngle + angleDelta, PIE);
      
      // Legend
      noStroke();
      fill(this.renewableSubPieData[i].color[0], this.renewableSubPieData[i].color[1], this.renewableSubPieData[i].color[2]);
      rect(60, 430 + (i * 22), 14, 14, 3);
      
      fill(47, 53, 66);
      textAlign(LEFT, CENTER);
      textSize(12);
      textStyle(BOLD);
      text(this.renewableSubPieData[i].source + ' (' + this.renewableSubPieData[i].share + '%)', 85, 437 + (i * 22));
      
      lastAngle += angleDelta;
    }

    // --- RIGHT SIDE: RENEWABLE POWER PLANT ASSETS ---
    let gridX = 500;
    let gridY = 150;
    let cardW = 210;
    let cardH = 180;
    let gap = 20;

    let plantTypes = [
      { title: "🌊 Hydropower Dam", desc: "Accounts for 35% of renewables. Leverages gravitational flow of water to drive large turbines.", imgKey: "hydro" },
      { title: "☀️ Solar PV Arrays", desc: "Fastest-growing sector (1% -> 10%+ projected). Direct photon-to-electron conversion.", imgKey: "solar" },
      { title: "💨 Wind Turbines", desc: "Generates 9% of renewables via offshore and onshore atmospheric kinetic wind pressure.", imgKey: "wind" },
      { title: "🌋 Geothermal Energy", desc: "Provides 5% baseline load using subsurface Earth thermal heat and steam power.", imgKey: "geothermal" }
    ];

    for (let i = 0; i < plantTypes.length; i++) {
      let col = i % 2;
      let row = floor(i / 2);
      let cx = gridX + col * (cardW + gap);
      let cy = gridY + row * (cardH + gap);

      // Card Container
      fill(255);
      stroke(200, 215, 225);
      strokeWeight(1.5);
      rect(cx, cy, cardW, cardH, 8);

      // Image Area or Fallback Graphic
      if (this.images[plantTypes[i].imgKey]) {
        image(this.images[plantTypes[i].imgKey], cx + 10, cy + 10, cardW - 20, 90);
      } else {
        fill(235, 242, 248);
        noStroke();
        rect(cx + 10, cy + 10, cardW - 20, 90, 6);
        fill(120, 140, 160);
        textAlign(CENTER, CENTER);
        textSize(11);
        textStyle(NORMAL);
        text(`[ Image: ${plantTypes[i].title} ]`, cx + cardW / 2, cy + 55);
      }

      // Card Info
      fill(47, 53, 66);
      noStroke();
      textAlign(LEFT, TOP);
      textSize(12);
      textStyle(BOLD);
      text(plantTypes[i].title, cx + 10, cy + 108);

      fill(90);
      textSize(10);
      textStyle(NORMAL);
      text(plantTypes[i].desc, cx + 10, cy + 126, cardW - 20, 50);
    }
  };

  // Tab Interaction Handler
  this.mousePressed = function() {
    let tabW = 250;
    let tabH = 32;
    let startX = width / 2 - (2 * (tabW + 10)) / 2;
    let y = 70;

    if (mouseY >= y && mouseY <= y + tabH) {
      if (mouseX >= startX && mouseX <= startX + tabW) {
        this.activeTab = "OVERVIEW";
      } else if (mouseX >= startX + tabW + 10 && mouseX <= startX + 2 * tabW + 10) {
        this.activeTab = "RENEWABLES_DETAIL";
      }
    }
  };

  this.destroy = function() {};
}