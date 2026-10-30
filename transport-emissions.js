



// =========================================================================
// TRANSPORT EMISSIONS & EV ADOPTION SIMULATOR
// =========================================================================

class TransportEmissionsVisual {
  constructor() {
    this.id = "transport-emissions";
    this.title = "Transport Emissions & EV Adoption";
    this.category = "environment";

    // Active Navigation Tab
    this.activeTab = "LIFECYCLE"; // "LIFECYCLE", "MODAL_SPLIT", "GRID_IMPACT"

    // Simulation Control Parameters
    this.gridCleanPct = 50;   // Renewable/Clean energy share in national grid (%) [0 - 100]
    this.annualKm = 15000;    // Annual driving distance (km) [5000 - 40000]
  }

  draw() {
    background(245, 248, 250);

    let mainW = width - 40;

    this.drawHeader(20, 15, mainW);
    this.drawTabs(20, 50, mainW);

    if (this.activeTab === "LIFECYCLE") {
      this.drawLifecycleSim(20, 95, mainW, 465);
    } else if (this.activeTab === "MODAL_SPLIT") {
      this.drawModalSplitDetail(20, 95, mainW, 465);
    } else if (this.activeTab === "GRID_IMPACT") {
      this.drawGridImpactDetail(20, 95, mainW, 465);
    }
  }

  drawHeader(x, y, w) {
    fill(40, 60, 80);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(18);
    textStyle(BOLD);
    text("🚗 Transport Emissions: Lifecycle Analysis & EV Transition", x, y);
  }

  drawTabs(x, y, w) {
    let tabs = [
      { id: "LIFECYCLE", label: "⚡ EV VS ICE LIFECYCLE SIMULATOR" },
      { id: "MODAL_SPLIT", label: "🚌 MODAL DECARBONIZATION" },
      { id: "GRID_IMPACT", label: "🔌 POWER GRID & BATTERY LIFE" }
    ];

    let tabW = 220;
    let tabH = 32;

    for (let i = 0; i < tabs.length; i++) {
      let tx = x + i * (tabW + 12);
      let isActive = this.activeTab === tabs[i].id;

      fill(isActive ? color(46, 204, 113) : color(220, 228, 235));
      stroke(isActive ? color(39, 174, 96) : color(180, 195, 210));
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

  // --- TAB 1: EV VS ICE LIFECYCLE SIMULATOR ---
  drawLifecycleSim(x, y, w, h) {
    // Left Controls Panel
    let ctrlW = 310;
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, ctrlW, h, 8);

    fill(40, 60, 80);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text("SIMULATION PARAMETERS", x + 18, y + 18);

    // Slider 1: Power Grid Cleanliness
    let sY1 = y + 55;
    fill(50);
    textSize(11);
    text(`Electricity Grid Renewables: ${round(this.gridCleanPct)}%`, x + 18, sY1);
    this.drawSlider(x + 18, sY1 + 20, ctrlW - 36, this.gridCleanPct, 0, 100, color(46, 204, 113));

    // Slider 2: Annual Driving Mileage
    let sY2 = y + 130;
    fill(50);
    text(`Annual Driving Distance: ${round(this.annualKm).toLocaleString()} km`, x + 18, sY2);
    this.drawSlider(x + 18, sY2 + 20, ctrlW - 36, this.annualKm, 5000, 40000, color(52, 152, 219));

    // Calculations: Lifecycle Carbon Emissions (g CO2e / km)
    let iceManufacturing = 45;   // Base chassis/engine manufacturing
    let iceTailpipe = 192;        // Direct combustion emissions
    let iceFuelSupply = 38;       // Well-to-tank fuel refining
    let iceTotalPerKm = iceManufacturing + iceTailpipe + iceFuelSupply;

    let evManufacturing = 85;    // Higher initial battery manufacturing footprint
    let evElecIntensity = map(this.gridCleanPct, 0, 100, 120, 5); // Electricity grid intensity
    let evTotalPerKm = evManufacturing + evElecIntensity;

    let totalSavedTons10Yrs = ((iceTotalPerKm - evTotalPerKm) * (this.annualKm * 10)) / 1000000;

    let mY = y + 215;
    fill(245, 249, 252);
    stroke(210);
    rect(x + 15, mY, ctrlW - 30, 235, 6);

    fill(40, 60, 80);
    textSize(11);
    textStyle(BOLD);
    text("10-YEAR LIFECYCLE SUMMARY", x + 25, mY + 15);

    this.drawMetricRow(x + 25, mY + 45, "⛽ ICE Vehicle Intensity", `${round(iceTotalPerKm)} g CO2/km`, color(231, 76, 60));
    this.drawMetricRow(x + 25, mY + 100, "⚡ BEV Vehicle Intensity", `${round(evTotalPerKm)} g CO2/km`, color(46, 204, 113));
    this.drawMetricRow(x + 25, mY + 155, "🌱 10-Year Net CO2 Savings", `${nf(totalSavedTons10Yrs, 1, 1)} Metric Tons`, color(39, 174, 96));

    // Right Display: Comparative Breakdown Chart
    let plotX = x + ctrlW + 20;
    let plotW = w - ctrlW - 20;

    fill(255);
    stroke(200, 210, 225);
    rect(plotX, y, plotW, h, 8);

    fill(40, 60, 80);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text("LIFECYCLE CARBON BREAKDOWN (g CO2e / km)", plotX + 20, y + 20);

    // Bar Chart Construction
    let barY1 = y + 80;
    let barY2 = y + 200;
    let maxBarW = plotW - 220;

    // ICE Bar
    fill(60);
    textSize(11);
    textStyle(BOLD);
    text("Gasoline ICE Vehicle", plotX + 20, barY1);

    let iceWidth = map(iceTotalPerKm, 0, 300, 0, maxBarW);
    fill(231, 76, 60);
    rect(plotX + 20, barY1 + 18, iceWidth, 32, 4);

    fill(40);
    text(`${round(iceTotalPerKm)} g/km`, plotX + 30 + iceWidth, barY1 + 28);

    // EV Bar
    fill(60);
    text("Battery Electric (BEV)", plotX + 20, barY2);

    let evWidth = map(evTotalPerKm, 0, 300, 0, maxBarW);
    fill(46, 204, 113);
    rect(plotX + 20, barY2 + 18, evWidth, 32, 4);

    fill(40);
    text(`${round(evTotalPerKm)} g/km`, plotX + 30 + evWidth, barY2 + 28);

    // Dynamic Carbon Payback Breakeven Distance
    let breakevenKm = (evManufacturing - iceManufacturing) * 1000 / (iceTailpipe + iceFuelSupply - evElecIntensity);
    if (breakevenKm < 0) breakevenKm = 0;

    fill(245, 248, 252);
    stroke(210);
    rect(plotX + 20, y + 330, plotW - 40, 115, 6);

    fill(40, 60, 80);
    noStroke();
    textSize(12);
    textStyle(BOLD);
    text("💡 EV Manufacturing Carbon Payback Point", plotX + 35, y + 348);

    fill(70);
    textSize(11);
    textStyle(NORMAL);
    text(`Due to battery mineral extraction, BEVs start with a higher manufacturing footprint. However, based on your grid clean mix (${round(this.gridCleanPct)}%), the EV offsets its initial manufacturing debt after driving approx. ${round(breakevenKm).toLocaleString()} km (${nf(breakevenKm / this.annualKm, 1, 1)} years).`, plotX + 35, y + 372, plotW - 70, 60);
  }

  drawMetricRow(x, y, label, val, col) {
    fill(60);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10.5);
    textStyle(BOLD);
    text(label, x, y);

    fill(col);
    textSize(16);
    text(val, x, y + 16);
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

  // --- TAB 2: MODAL DECARBONIZATION ---
  drawModalSplitDetail(x, y, w, h) {
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, w, h, 8);

    fill(40, 60, 80);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text("🚌 Decarbonizing Modal Transport & Urban Mobility", x + 25, y + 20);

    let cardW = (w - 70) / 3;
    let cardH = 370;

    this.drawModeCard(x + 25, y + 60, cardW, cardH, "🚆 RAIL & MASS TRANSIT", "Electric high-speed rail generates up to 90% fewer emissions per passenger-km than domestic flights. Urban metros shift millions away from private auto reliance.", color(52, 152, 219));
    this.drawModeCard(x + 35 + cardW, y + 60, cardW, cardH, "🚛 HEAVY FREIGHT TRUCKING", "Long-haul freight trucking accounts for ~30% of transport emissions. Hydrogen fuel cells (FCEVs) and megawatt-capacity fast charging offer pathways for heavy electrification.", color(230, 126, 34));
    this.drawModeCard(x + 45 + cardW * 2, y + 60, cardW, cardH, "✈️ AVIATION & MARITIME", "Hard-to-abate sectors require Sustainable Aviation Fuels (SAF), green ammonia for ocean cargo, and synthetic e-fuels produced from captured carbon and green hydrogen.", color(155, 89, 182));
  }

  drawModeCard(x, y, w, h, title, desc, col) {
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

  // --- TAB 3: POWER GRID & BATTERY LIFE ---
  drawGridImpactDetail(x, y, w, h) {
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, w, h, 8);

    fill(40, 60, 80);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text("🔌 Smart Charging, Vehicle-to-Grid (V2G) & Battery Recycling", x + 25, y + 20);

    let boxW = (w - 60) / 2;
    let boxH = 160;

    this.drawInfoBox(x + 20, y + 65, boxW, boxH, "SMART CHARGING & PEAK SHAVING", "Uncontrolled peak EV charging strains electrical transformers. Managed smart charging shifts load to overnight off-peak hours when renewable availability is highest.");
    this.drawInfoBox(x + 40 + boxW, y + 65, boxW, boxH, "VEHICLE-TO-GRID (V2G) INTEGRATION", "Bidirectional EV chargers allow stationary vehicle batteries to supply electricity back to the grid during emergency demand spikes, acting as distributed energy storage.");
    this.drawInfoBox(x + 20, y + 245, boxW, boxH, "SECOND-LIFE BATTERY STORAGE", "EV batteries retired at 70-80% capacity are repurposed for stationary grid energy storage, extending hardware utility by 10-15 years before recycling.");
    this.drawInfoBox(x + 40 + boxW, y + 245, boxW, boxH, "CLOSED-LOOP LITHIUM RECYCLING", "Hydrometallurgical recycling recovers over 95% of critical battery metals (lithium, cobalt, nickel), reducing virgin mining land requirements.");
  }

  drawInfoBox(x, y, w, h, title, textBody) {
    fill(248, 250, 253);
    stroke(200, 215, 230);
    strokeWeight(1);
    rect(x, y, w, h, 6);

    fill(46, 204, 113);
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
      if (mx >= 20 && mx <= 20 + tabW) this.activeTab = "LIFECYCLE";
      if (mx >= 32 + tabW && mx <= 32 + tabW * 2) this.activeTab = "MODAL_SPLIT";
      if (mx >= 44 + tabW * 2 && mx <= 44 + tabW * 3) this.activeTab = "GRID_IMPACT";
      return;
    }

    if (this.activeTab === "LIFECYCLE" && mx >= 38 && mx <= 312) {
      if (my >= 145 && my <= 175) {
        this.gridCleanPct = map(mx, 38, 312, 0, 100);
      }
      if (my >= 220 && my <= 250) {
        this.annualKm = map(mx, 38, 312, 5000, 40000);
      }
    }
  }

  keyPressed() {}
}