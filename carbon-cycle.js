


// =========================================================================
// CARBON CYCLE, SINKS & CARBON CAPTURE (CCS/DAC) SIMULATOR
// =========================================================================

class CarbonCycleVisual {
  constructor() {
    this.id = "carbon-cycle";
    this.title = "Carbon Cycle, Sinks & Capture (CCS/DAC)";
    this.category = "environment";

    // Active Navigation Tab
    this.activeTab = "SIMULATOR"; // "SIMULATOR", "SINKS", "CAPTURE_TECH"

    // Simulation Driver Parameters
    this.fossilEmissions = 36.8;  // Annual fossil fuel emissions (Gt CO2/year) [10.0 - 50.0]
    this.landSinkEfficiency = 80; // Land/Forest sink health status (%) [20 - 100]
    this.dacDeployment = 0.5;     // Direct Air Capture deployment level (Gt CO2/year removed) [0.0 - 10.0]
  }

  draw() {
    background(245, 248, 250);

    let mainW = width - 40;

    this.drawHeader(20, 15, mainW);
    this.drawTabs(20, 50, mainW);

    if (this.activeTab === "SIMULATOR") {
      this.drawCarbonSim(20, 95, mainW, 465);
    } else if (this.activeTab === "SINKS") {
      this.drawNaturalSinksDetail(20, 95, mainW, 465);
    } else if (this.activeTab === "CAPTURE_TECH") {
      this.drawCaptureTechDetail(20, 95, mainW, 465);
    }
  }

  drawHeader(x, y, w) {
    fill(40, 50, 60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(18);
    textStyle(BOLD);
    text("🪵 Global Carbon Cycle: Sinks, Atmospheric Accumulation & Capture Tech", x, y);
  }

  drawTabs(x, y, w) {
    let tabs = [
      { id: "SIMULATOR", label: "🧪 CARBON BALANCE SIMULATOR" },
      { id: "SINKS", label: "🌲 NATURAL SINKS & FLUXES" },
      { id: "CAPTURE_TECH", label: "🏭 CCS & DIRECT AIR CAPTURE (DAC)" }
    ];

    let tabW = 220;
    let tabH = 32;

    for (let i = 0; i < tabs.length; i++) {
      let tx = x + i * (tabW + 12);
      let isActive = this.activeTab === tabs[i].id;

      fill(isActive ? color(44, 62, 80) : color(220, 228, 235));
      stroke(isActive ? color(24, 37, 50) : color(180, 195, 210));
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

  // --- TAB 1: CARBON BALANCE & ACCUMULATION SIMULATOR ---
  drawCarbonSim(x, y, w, h) {
    // Left Control Panel
    let ctrlW = 310;
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, ctrlW, h, 8);

    fill(40, 50, 60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text("GLOBAL EMISSIONS & REMOVALS", x + 18, y + 18);

    // Slider 1: Annual Fossil Fuel & Industry Emissions
    let sY1 = y + 55;
    fill(50);
    textSize(11);
    text(`Fossil Emissions: ${nf(this.fossilEmissions, 1, 1)} Gt CO2/yr`, x + 18, sY1);
    this.drawSlider(x + 18, sY1 + 20, ctrlW - 36, this.fossilEmissions, 10.0, 50.0, color(231, 76, 60));

    // Slider 2: Land Biosphere Sink Health
    let sY2 = y + 130;
    fill(50);
    text(`Forest/Land Sink Capacity: ${round(this.landSinkEfficiency)}%`, x + 18, sY2);
    this.drawSlider(x + 18, sY2 + 20, ctrlW - 36, this.landSinkEfficiency, 20, 100, color(46, 204, 113));

    // Slider 3: Engineered Carbon Removal (DAC & CCS)
    let sY3 = y + 205;
    fill(50);
    text(`Tech Carbon Removal (DAC): ${nf(this.dacDeployment, 1, 1)} Gt CO2/yr`, x + 18, sY3);
    this.drawSlider(x + 18, sY3 + 20, ctrlW - 36, this.dacDeployment, 0.0, 10.0, color(52, 152, 219));

    // Calculations: Annual Carbon Mass Balance
    let naturalLandSink = 11.5 * (this.landSinkEfficiency / 100.0); // Baseline ~11.5 Gt CO2/yr
    let naturalOceanSink = 10.2;                                     // Baseline ~10.2 Gt CO2/yr
    let totalRemovals = naturalLandSink + naturalOceanSink + this.dacDeployment;
    let netAtmosphericAccumulation = this.fossilEmissions - totalRemovals;

    // Convert Gt CO2 net accumulation to atmospheric ppm rise (~7.8 Gt CO2 = +1 ppm CO2)
    let annualPpmIncrease = netAtmosphericAccumulation / 7.8;

    let mY = y + 285;
    fill(245, 249, 252);
    stroke(210);
    rect(x + 15, mY, ctrlW - 30, 165, 6);

    fill(40, 50, 60);
    textSize(11);
    textStyle(BOLD);
    text("ANNUAL MASS BALANCE METRICS", x + 25, mY + 12);

    this.drawMetricRow(x + 25, mY + 40, "🌍 Total Natural & Tech Sinks", `${nf(totalRemovals, 1, 1)} Gt CO2/yr`, color(46, 204, 113));
    this.drawMetricRow(x + 25, mY + 82, "☁️ Net Atmospheric Growth", `${nf(netAtmosphericAccumulation, 1, 1)} Gt CO2/yr`, netAtmosphericAccumulation > 0 ? color(231, 76, 60) : color(39, 174, 96));
    this.drawMetricRow(x + 25, mY + 124, "📈 Atmospheric CO2 Concentration Rate", `${netAtmosphericAccumulation > 0 ? "+" : ""}${nf(annualPpmIncrease, 1, 2)} ppm/yr`, netAtmosphericAccumulation > 0 ? color(231, 76, 60) : color(39, 174, 96));

    // Right Display: Box-Flux Diagram of Global Carbon Pools
    let simX = x + ctrlW + 20;
    let simW = w - ctrlW - 20;

    fill(255);
    stroke(200, 210, 225);
    rect(simX, y, simW, h, 8);

    fill(40, 50, 60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text("GLOBAL CARBON CYCLE FLUX MAP (Gt CO2/YEAR)", simX + 20, y + 20);

    // Box Representations of Reservoirs
    let boxW = 150;
    let boxH = 75;

    // Atmosphere Box (Center Top)
    this.drawPoolBox(simX + simW / 2 - boxW / 2, y + 60, boxW, boxH, "☁️ ATMOSPHERE", "~870 Gt C (425+ ppm)", color(120, 140, 160));

    // Land/Forest Box (Bottom Left)
    this.drawPoolBox(simX + 40, y + 250, boxW, boxH, "🌲 LAND BIOSPHERE", `Sink: -${nf(naturalLandSink, 1, 1)} Gt/yr`, color(46, 204, 113));

    // Ocean Box (Bottom Right)
    this.drawPoolBox(simX + simW - 40 - boxW, y + 250, boxW, boxH, "🌊 OCEAN SINKS", `Sink: -${nf(naturalOceanSink, 1, 1)} Gt/yr`, color(52, 152, 219));

    // Engineered Removal Box (Bottom Center)
    this.drawPoolBox(simX + simW / 2 - boxW / 2, y + 360, boxW, boxH, "🏭 DAC & GEOLOGICAL", `Removal: -${nf(this.dacDeployment, 1, 1)} Gt/yr`, color(155, 89, 182));

    // Animated Particles indicating Emission vs Absorption Flow
    let fluxCount = floor(map(abs(netAtmosphericAccumulation), 0, 30, 4, 16));
    for (let p = 0; p < fluxCount; p++) {
      let animOffset = (frameCount * 2 + p * 25) % 130;

      // Emissions arrow down from top or up into atmosphere
      fill(231, 76, 60);
      noStroke();
      ellipse(simX + 70, y + 70 + animOffset, 8, 8);
    }
  }

  drawPoolBox(x, y, w, h, title, sub, col) {
    fill(248, 250, 253);
    stroke(col);
    strokeWeight(2);
    rect(x, y, w, h, 6);

    fill(col);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(title, x + w / 2, y + 25);

    fill(70);
    textSize(10);
    textStyle(NORMAL);
    text(sub, x + w / 2, y + 50);
  }

  drawMetricRow(x, y, label, val, col) {
    fill(60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text(label, x, y);

    fill(col);
    textSize(14);
    text(val, x, y + 15);
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

  // --- TAB 2: NATURAL SINKS DETAIL ---
  drawNaturalSinksDetail(x, y, w, h) {
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, w, h, 8);

    fill(40, 50, 60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text("🌲 Natural Carbon Sinks & Biogeochemical Mechanisms", x + 25, y + 20);

    let cardW = (w - 70) / 3;
    let cardH = 370;

    this.drawSinkCard(x + 25, y + 60, cardW, cardH, "🌳 TERRESTRIAL BIOSPHERE", "Forests, soils, and peatlands absorb ~30% of anthropogenic emissions via photosynthesis. Deforestation and wildfires turn land sinks into carbon sources.", color(46, 204, 113));
    this.drawSinkCard(x + 35 + cardW, y + 60, cardW, cardH, "🌊 OCEAN SOLUBILITY PUMP", "Cold, polar surface ocean waters dissolve CO2 gas directly from the atmosphere, sinking carbon into deep abyssal ocean currents for centuries.", color(52, 152, 219));
    this.drawSinkCard(x + 45 + cardW * 2, y + 60, cardW, cardH, "🐋 BIOLOGICAL OCEAN PUMP", "Phytoplankton fix carbon during photosynthesis. When organisms die, organic carbon sinks to the ocean floor (marine snow), locking carbon in ocean sediment.", color(155, 89, 182));
  }

  drawSinkCard(x, y, w, h, title, desc, col) {
    fill(248, 250, 253);
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

  // --- TAB 3: CCS & DIRECT AIR CAPTURE (DAC) ---
  drawCaptureTechDetail(x, y, w, h) {
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, w, h, 8);

    fill(40, 50, 60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text("🏭 Carbon Capture, Utilization & Storage (CCUS / DAC)", x + 25, y + 20);

    let boxW = (w - 60) / 2;
    let boxH = 160;

    this.drawInfoBox(x + 20, y + 65, boxW, boxH, "POINT-SOURCE CARBON CAPTURE (CCS)", "Scrubbers capture CO2 directly from industrial flue gas stacks (cement, steel, chemical plants) using amine chemical solvents before it enters the atmosphere.");
    this.drawInfoBox(x + 40 + boxW, y + 65, boxW, boxH, "DIRECT AIR CAPTURE (DAC)", "Large fan arrays pull ambient air (~425 ppm CO2) across solid sorbent filters or liquid contractors to remove legacy carbon directly from the atmosphere.");
    this.drawInfoBox(x + 20, y + 245, boxW, boxH, "PERMANENT GEOLOGICAL SEQUESTRATION", "Captured CO2 is compressed into a supercritical fluid and injected 1+ km underground into basalt rock formations or saline aquifers, mineralizing into solid stone.");
    this.drawInfoBox(x + 40 + boxW, y + 245, boxW, boxH, "ENERGY & COST PENALTIES", "DAC currently requires high thermal energy (up to 1,200 kWh per ton CO2 captured) and costs $200–$600/ton, requiring clean energy supplies to maintain net-negative emissions.");
  }

  drawInfoBox(x, y, w, h, title, textBody) {
    fill(248, 250, 253);
    stroke(200, 215, 230);
    strokeWeight(1);
    rect(x, y, w, h, 6);

    fill(52, 152, 219);
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

    let tabW = 220;
    if (my >= 50 && my <= 82) {
      if (mx >= 20 && mx <= 20 + tabW) this.activeTab = "SIMULATOR";
      if (mx >= 32 + tabW && mx <= 32 + tabW * 2) this.activeTab = "SINKS";
      if (mx >= 44 + tabW * 2 && mx <= 44 + tabW * 3) this.activeTab = "CAPTURE_TECH";
      return;
    }

    if (this.activeTab === "SIMULATOR" && mx >= 38 && mx <= 312) {
      if (my >= 145 && my <= 175) {
        this.fossilEmissions = map(mx, 38, 312, 10.0, 50.0);
      }
      if (my >= 220 && my <= 250) {
        this.landSinkEfficiency = map(mx, 38, 312, 20, 100);
      }
      if (my >= 295 && my <= 325) {
        this.dacDeployment = map(mx, 38, 312, 0.0, 10.0);
      }
    }
  }

  keyPressed() {}
}