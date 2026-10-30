



// =========================================================================
// OCEAN PARAMETERS & MARINE ECOSYSTEM SIMULATOR
// =========================================================================

class OceanParametersVisual {
  constructor() {
    this.id = "ocean-parameters";
    this.title = "Ocean Parameters & Marine Health";
    this.category = "environment";

    // Navigation Tabs
    this.activeTab = "SIMULATOR"; // "SIMULATOR", "ACIDITY", "FISHING"

    // Interactive Control Parameters
    this.tempRiseC = 1.2;     // Global ocean temp anomaly (°C) [0.0 - 4.0]
    this.oceanPh = 8.05;       // Ocean pH level [7.6 - 8.2] (Pre-industrial ~8.25)
    this.fishingIntensity = 75;// Global fishing effort (% capacity) [10 - 150]

    // Selected Fish Species / Ecosystem Focus
    this.selectedZone = "CORAL"; // "CORAL", "PELAGIC", "ARCTIC"
  }

  draw() {
    background(240, 248, 255); // Crisp ocean theme light backdrop

    let mainW = width - 40;

    // Header & Sub-tabs
    this.drawHeader(20, 15, mainW);
    this.drawTabs(20, 50, mainW);

    if (this.activeTab === "SIMULATOR") {
      this.drawOceanSimulator(20, 95, mainW, 465);
    } else if (this.activeTab === "ACIDITY") {
      this.drawAcidificationDetail(20, 95, mainW, 465);
    } else if (this.activeTab === "FISHING") {
      this.drawFishingIssuesDetail(20, 95, mainW, 465);
    }
  }

  drawHeader(x, y, w) {
    fill(20, 50, 90);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(18);
    textStyle(BOLD);
    text("🌊 Ocean Parameters: Warming, Acidification & Fish Biomass", x, y);
  }

  drawTabs(x, y, w) {
    let tabs = [
      { id: "SIMULATOR", label: "🧪 MULTI-PARAMETER SIMULATOR" },
      { id: "ACIDITY", label: "🧪 OCEAN ACIDIFICATION (pH)" },
      { id: "FISHING", label: "🎣 OVERFISHING & CRASH MECHANICS" }
    ];

    let tabW = 220;
    let tabH = 32;

    for (let i = 0; i < tabs.length; i++) {
      let tx = x + i * (tabW + 12);
      let isActive = this.activeTab === tabs[i].id;

      fill(isActive ? color(0, 120, 200) : color(210, 225, 240));
      stroke(isActive ? color(0, 80, 150) : color(170, 190, 210));
      strokeWeight(1);
      rect(tx, y, tabW, tabH, 6);

      fill(isActive ? 255 : 60);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(11);
      textStyle(BOLD);
      text(tabs[i].label, tx + tabW / 2, y + tabH / 2);
    }
  }

  // --- TAB 1: INTERACTIVE OCEAN ENVIRONMENT SIMULATOR ---
  drawOceanSimulator(x, y, w, h) {
    // Left Control Sliders Panel
    let ctrlW = 310;
    fill(255);
    stroke(180, 200, 220);
    rect(x, y, ctrlW, h, 8);

    fill(20, 50, 90);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text("ENVIRONMENTAL DRIVERS", x + 18, y + 18);

    // Slider 1: Temperature Anomaly
    let sY1 = y + 55;
    fill(50);
    textSize(11);
    text(`Sea Temp Anomaly: +${nf(this.tempRiseC, 1, 1)}°C`, x + 18, sY1);
    this.drawSlider(x + 18, sY1 + 20, ctrlW - 36, this.tempRiseC, 0.0, 4.0, color(255, 80, 80));

    // Slider 2: Ocean pH Level
    let sY2 = y + 130;
    fill(50);
    text(`Ocean pH Level: ${nf(this.oceanPh, 1, 2)} pH`, x + 18, sY2);
    fill(120);
    textSize(9.5);
    text("(Pre-industrial: ~8.25 pH | More acidic -> lower number)", x + 18, sY2 + 15);
    this.drawSlider(x + 18, sY2 + 35, ctrlW - 36, 8.25 - this.oceanPh, 0.0, 0.65, color(180, 80, 250));

    // Slider 3: Fishing Intensity
    let sY3 = y + 215;
    fill(50);
    textSize(11);
    text(`Global Fishing Effort: ${round(this.fishingIntensity)}%`, x + 18, sY3);
    this.drawSlider(x + 18, sY3 + 20, ctrlW - 36, this.fishingIntensity, 10, 150, color(0, 180, 200));

    // Derived Real-Time Metrics
    let bleachingRisk = constrain(map(this.tempRiseC, 0.5, 3.0, 5, 100), 5, 100);
    let shellCalcificationLoss = constrain(map(8.25 - this.oceanPh, 0, 0.55, 0, 75), 0, 75);
    let biomassRemaining = constrain(100 - (this.fishingIntensity * 0.4 + this.tempRiseC * 12 + (8.25 - this.oceanPh) * 50), 5, 100);

    let mY = y + 295;
    fill(240, 245, 250);
    stroke(200);
    rect(x + 15, mY, ctrlW - 30, 155, 6);

    fill(20, 50, 90);
    textSize(11);
    textStyle(BOLD);
    text("REAL-TIME IMPACT METRICS", x + 25, mY + 12);

    this.drawMetricBar(x + 25, mY + 38, ctrlW - 50, "Coral Bleaching Risk", bleachingRisk, "%", color(255, 70, 70));
    this.drawMetricBar(x + 25, mY + 78, ctrlW - 50, "Shell Degradation Rate", shellCalcificationLoss, "%", color(160, 60, 220));
    this.drawMetricBar(x + 25, mY + 118, ctrlW - 50, "Fish Biomass Remaining", biomassRemaining, "%", color(0, 180, 120));

    // Right Display: Animated Ocean Water Cross-Section
    let simX = x + ctrlW + 20;
    let simW = w - ctrlW - 20;

    // Ocean Tank Viewport
    fill(10, 35, 65);
    stroke(0, 100, 180);
    strokeWeight(2);
    rect(simX, y, simW, h, 8);

    // Dynamic Ocean Color based on Acidification & Heat
    let rCol = map(this.tempRiseC, 0, 4, 10, 60);
    let gCol = map(this.oceanPh, 8.25, 7.6, 50, 20);
    let bCol = map(this.tempRiseC, 0, 4, 110, 70);
    fill(rCol, gCol, bCol, 220);
    rect(simX, y, simW, h, 8);

    // Water Surface Waves
    fill(255, 255, 255, 40);
    noStroke();
    beginShape();
    for (let wx = 0; wx <= simW; wx += 20) {
      let wy = y + 15 + sin((wx + frameCount * 3) * 0.03) * 5;
      vertex(simX + wx, wy);
    }
    vertex(simX + simW, y);
    vertex(simX, y);
    endShape(CLOSE);

    // Render Coral Reef Base (Bleaching visualization)
    let coralHealth = map(bleachingRisk, 5, 100, 255, 60);
    fill(coralHealth, coralHealth * 0.4, coralHealth * 0.6);
    rect(simX + 40, y + h - 45, simW - 80, 25, 8);
    textAlign(CENTER, CENTER);
    textSize(10);
    fill(255);
    text(bleachingRisk > 60 ? "⚠️ SEVERE CORAL BLEACHING" : "🪸 HEALTHY REEF STRUCTURE", simX + simW / 2, y + h - 32);

    // Render Dynamic Fish Swarm based on Biomass
    let fishCount = floor(map(biomassRemaining, 0, 100, 2, 28));
    for (let f = 0; f < fishCount; f++) {
      let fx = simX + 50 + ((f * 47 + frameCount * (1 + f % 3)) % (simW - 100));
      let fy = y + 50 + ((f * 31) % (h - 130));

      fill(255, 200, 50);
      ellipse(fx, fy, 14, 8);
      triangle(fx - 7, fy, fx - 13, fy - 4, fx - 13, fy + 4);
    }
  }

  drawMetricBar(x, y, w, label, val, unit, col) {
    fill(60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(9.5);
    textStyle(BOLD);
    text(`${label}: ${round(val)}${unit}`, x, y);

    fill(210, 220, 230);
    rect(x, y + 14, w, 10, 4);

    fill(col);
    rect(x, y + 14, (w * val) / 100, 10, 4);
  }

  drawSlider(x, y, w, currentVal, minVal, maxVal, accentCol) {
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(x, y, w, 8, 4);

    let handleX = map(currentVal, minVal, maxVal, x, x + w);
    fill(accentCol);
    stroke(255);
    strokeWeight(1.5);
    ellipse(handleX, y + 4, 18, 18);
  }

  // --- TAB 2: OCEAN ACIDIFICATION DETAIL ---
  drawAcidificationDetail(x, y, w, h) {
    fill(255);
    stroke(180, 200, 220);
    rect(x, y, w, h, 8);

    fill(20, 50, 90);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text("🧪 Ocean Acidification: The Chemistry of $CO_2$ Absorption", x + 25, y + 20);

    fill(60);
    textSize(11.5);
    textStyle(NORMAL);
    text("The ocean absorbs ~30% of human-emitted carbon dioxide ($CO_2$). When $CO_2$ dissolves in seawater, it forms carbonic acid ($H_2CO_3$), releasing hydrogen ions ($H^+$) that lower seawater pH and deplete carbonate ions ($CO_3^{2-}$).", x + 25, y + 48, w - 50, 45);

    // Chemistry Process Step Cards
    let cardW = (w - 70) / 3;
    let cardH = 320;
    let cardY = y + 110;

    this.drawAcidCard(x + 25, cardY, cardW, cardH, "1. $CO_2$ ABSORPTION", "Atmospheric $CO_2$ dissolves into ocean surface waters at accelerating rates due to burning fossil fuels.", color(0, 150, 220));
    this.drawAcidCard(x + 35 + cardW, cardY, cardW, cardH, "2. pH DROPS ($H^+$ IONS)", "Seawater pH has dropped from 8.25 to 8.05 since the Industrial Revolution—a 30% increase in ocean acidity.", color(150, 60, 220));
    this.drawAcidCard(x + 45 + cardW * 2, cardY, cardW, cardH, "3. SHELL DISSOLUTION", "Marine organisms (pteropods, oysters, corals) cannot build calcium carbonate ($CaCO_3$) shells, causing shell erosion.", color(220, 60, 100));
  }

  drawAcidCard(x, y, w, h, title, desc, col) {
    fill(245, 248, 252);
    stroke(col);
    strokeWeight(1.5);
    rect(x, y, w, h, 8);

    fill(col);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text(title, x + 15, y + 15);

    fill(70);
    textSize(11);
    textStyle(NORMAL);
    text(desc, x + 15, y + 45, w - 30, h - 60);
  }

  // --- TAB 3: OVERFISHING & COMMERCIAL FISHING ISSUES ---
  drawFishingIssuesDetail(x, y, w, h) {
    fill(255);
    stroke(180, 200, 220);
    rect(x, y, w, h, 8);

    fill(20, 50, 90);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text("🎣 Global Overfishing & Ecosystem Collapse Dynamics", x + 25, y + 20);

    let boxW = (w - 60) / 2;
    let boxH = 185;

    // Issue 1: Trolling & Bycatch
    this.drawInfoBox(x + 20, y + 55, boxW, boxH, "BOTTOM TRAWLING & BYCATCH", "Heavy nets drag across the sea floor, destroying deep-sea coral habitats. Up to 40% of global marine catch is unintended bycatch (dolphins, turtles, juvenile fish) discarded dead back into the ocean.");

    // Issue 2: Maximum Sustainable Yield (MSY)
    this.drawInfoBox(x + 40 + boxW, y + 55, boxW, boxH, "MAXIMUM SUSTAINABLE YIELD (MSY)", "Over 35% of global fish stocks are exploited beyond biological sustainability limits. Fishing beyond MSY prevents populations from naturally replenishing.");

    // Issue 3: Food Web Collapse
    this.drawInfoBox(x + 20, y + 255, boxW, boxH, "FISHING DOWN THE FOOD WEB", "As predatory fish (tuna, cod, sharks) deplete by 90%, commercial fleets target smaller forage species (anchovies, krill), disrupting marine mammal and bird food supply chains.");

    // Issue 4: Illegal (IUU) Fishing
    this.drawInfoBox(x + 40 + boxW, y + 255, boxW, boxH, "ILLEGAL, UNREPORTED & UNREGULATED (IUU)", "IUU fishing accounts for 1-in-5 caught fish worldwide, exploiting weak governance in international waters and undercutting sustainable local fisheries.");
  }

  drawInfoBox(x, y, w, h, title, textBody) {
    fill(245, 248, 252);
    stroke(200, 215, 230);
    strokeWeight(1);
    rect(x, y, w, h, 6);

    fill(0, 100, 180);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text(title, x + 15, y + 15);

    fill(70);
    textSize(11);
    textStyle(NORMAL);
    text(textBody, x + 15, y + 40, w - 30, h - 50);
  }

  mousePressed() {
    let mx = mouseX;
    let my = mouseY;

    // Tab Bar Clicks
    let tabW = 220;
    if (my >= 50 && my <= 82) {
      if (mx >= 20 && mx <= 20 + tabW) this.activeTab = "SIMULATOR";
      if (mx >= 32 + tabW && mx <= 32 + tabW * 2) this.activeTab = "ACIDITY";
      if (mx >= 44 + tabW * 2 && mx <= 44 + tabW * 3) this.activeTab = "FISHING";
      return;
    }

    // Slider Clicks on Simulator Tab
    if (this.activeTab === "SIMULATOR" && mx >= 38 && mx <= 312) {
      // Temp slider
      if (my >= 145 && my <= 175) {
        this.tempRiseC = map(mx, 38, 312, 0.0, 4.0);
      }
      // pH slider
      if (my >= 240 && my <= 270) {
        let acidOffset = map(mx, 38, 312, 0.0, 0.65);
        this.oceanPh = 8.25 - acidOffset;
      }
      // Fishing slider
      if (my >= 305 && my <= 335) {
        this.fishingIntensity = map(mx, 38, 312, 10, 150);
      }
    }
  }

  keyPressed() {}
}