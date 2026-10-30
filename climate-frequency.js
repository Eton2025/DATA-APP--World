



// =========================================================================
// CLIMATE FREQUENCY & EXTREME WEATHER EVENTS SIMULATOR
// =========================================================================

class ClimateFrequencyVisual {
  constructor() {
    this.id = "climate-frequency";
    this.title = "Climate Frequency & Extreme Events";
    this.category = "environment";

    // Active Tab Mode
    this.activeTab = "DISTRIBUTION"; // "DISTRIBUTION", "TYPES", "ATTRIBUTION"

    // Simulation Parameters
    this.globalWarmingC = 1.5; // Temperature Anomaly (°C) [0.0 to 4.0]
    this.eventFocus = "HEATWAVE"; // "HEATWAVE", "HEAVY_RAIN", "DROUGHT"
  }

  draw() {
    background(245, 247, 250);

    let mainW = width - 40;

    this.drawHeader(20, 15, mainW);
    this.drawTabs(20, 50, mainW);

    if (this.activeTab === "DISTRIBUTION") {
      this.drawDistributionSim(20, 95, mainW, 465);
    } else if (this.activeTab === "TYPES") {
      this.drawEventTypesDetail(20, 95, mainW, 465);
    } else if (this.activeTab === "ATTRIBUTION") {
      this.drawAttributionDetail(20, 95, mainW, 465);
    }
  }

  drawHeader(x, y, w) {
    fill(40, 50, 70);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(18);
    textStyle(BOLD);
    text("🌩️ Climate Frequency: Extreme Weather Return Periods", x, y);
  }

  drawTabs(x, y, w) {
    let tabs = [
      { id: "DISTRIBUTION", label: "📊 BELL CURVE SHIFT SIMULATOR" },
      { id: "TYPES", label: "🌪️ EXTREME EVENT DYNAMICS" },
      { id: "ATTRIBUTION", label: "🔍 EXTREME EVENT ATTRIBUTION" }
    ];

    let tabW = 220;
    let tabH = 32;

    for (let i = 0; i < tabs.length; i++) {
      let tx = x + i * (tabW + 12);
      let isActive = this.activeTab === tabs[i].id;

      fill(isActive ? color(230, 80, 50) : color(220, 228, 235));
      stroke(isActive ? color(180, 50, 30) : color(180, 195, 210));
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

  // --- TAB 1: GAUSSIAN BELL CURVE SHIFT SIMULATOR ---
  drawDistributionSim(x, y, w, h) {
    // Left Control Panel
    let ctrlW = 310;
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, ctrlW, h, 8);

    fill(40, 50, 70);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text("GLOBAL WARMING PARAMETER", x + 18, y + 18);

    // Warming Slider
    let sY = y + 55;
    fill(50);
    textSize(11);
    text(`Global Temperature Anomaly: +${nf(this.globalWarmingC, 1, 1)}°C`, x + 18, sY);
    this.drawSlider(x + 18, sY + 20, ctrlW - 36, this.globalWarmingC, 0.0, 4.0, color(230, 80, 50));

    // Return Frequency Multipliers
    let heatwaveFreq = pow(1.5, this.globalWarmingC * 2.2);
    let rainFreq = pow(1.3, this.globalWarmingC * 1.8);
    let droughtFreq = pow(1.4, this.globalWarmingC * 2.0);

    let mY = y + 140;
    fill(248, 250, 252);
    stroke(210);
    rect(x + 15, mY, ctrlW - 30, 310, 6);

    fill(40, 50, 70);
    textSize(11);
    textStyle(BOLD);
    text("1-IN-50 YEAR EVENT FREQUENCIES", x + 25, mY + 15);

    this.drawMultiplierRow(x + 25, mY + 45, "🔥 50-Year Heatwaves", heatwaveFreq, "x more frequent", color(230, 80, 50));
    this.drawMultiplierRow(x + 25, mY + 130, "🌧️ Extreme Precipitation", rainFreq, "x more frequent", color(40, 120, 220));
    this.drawMultiplierRow(x + 25, mY + 215, "🌾 Agricultural Droughts", droughtFreq, "x more frequent", color(210, 140, 30));

    // Right Display: Statistical Distribution Shift (Normal Curve)
    let plotX = x + ctrlW + 20;
    let plotW = w - ctrlW - 20;

    fill(255);
    stroke(200, 210, 225);
    rect(plotX, y, plotW, h, 8);

    fill(40, 50, 70);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text("STATISTICAL FREQUENCY SHIFT (GAUSSIAN DISTRIBUTION)", plotX + 20, y + 20);

    // Draw Bell Curves
    let graphBaseY = y + h - 60;
    let graphH = 300;

    // Axis
    stroke(180);
    strokeWeight(1);
    line(plotX + 40, graphBaseY, plotX + plotW - 30, graphBaseY);

    // Baseline Normal Curve (Pre-industrial)
    noFill();
    stroke(150, 160, 175);
    strokeWeight(2);
    beginShape();
    for (let px = 40; px <= plotW - 30; px++) {
      let xVal = map(px, 40, plotW - 30, -4, 6);
      let yVal = exp(-0.5 * pow(xVal, 2));
      vertex(plotX + px, graphBaseY - yVal * graphH * 0.75);
    }
    endShape();

    // Shifted Normal Curve (Current Warming)
    stroke(230, 80, 50);
    strokeWeight(3);
    fill(230, 80, 50, 40);
    beginShape();
    let shift = this.globalWarmingC * 0.8;
    for (let px = 40; px <= plotW - 30; px++) {
      let xVal = map(px, 40, plotW - 30, -4, 6);
      let yVal = exp(-0.5 * pow(xVal - shift, 2));
      vertex(plotX + px, graphBaseY - yVal * graphH * 0.75);
    }
    vertex(plotX + plotW - 30, graphBaseY);
    vertex(plotX + 40, graphBaseY);
    endShape(CLOSE);

    // Threshold Line for "Extreme Event"
    let thresholdX = map(2.0, -4, 6, 40, plotW - 30);
    stroke(200, 0, 0);
    strokeWeight(1.5);
    line(plotX + thresholdX, graphBaseY - graphH, plotX + thresholdX, graphBaseY);

    fill(200, 0, 0);
    noStroke();
    textSize(10);
    textAlign(LEFT, TOP);
    text("Extreme Event Threshold (3σ)", plotX + thresholdX + 6, graphBaseY - graphH + 10);
  }

  drawMultiplierRow(x, y, label, mult, suffix, col) {
    fill(50);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text(label, x, y);

    fill(col);
    textSize(16);
    text(`${nf(mult, 1, 1)}${suffix}`, x, y + 16);
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

  // --- TAB 2: EXTREME EVENT TYPES DETAIL ---
  drawEventTypesDetail(x, y, w, h) {
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, w, h, 8);

    fill(40, 50, 70);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text("🌪️ Physical Drivers of Extreme Weather Intensification", x + 25, y + 20);

    let cardW = (w - 70) / 3;
    let cardH = 370;

    this.drawTypeCard(x + 25, y + 60, cardW, cardH, "🔥 HEATWAVES & DROUGHTS", "Clausius-Clapeyron relation: warmer air increases atmospheric evaporative demand. Soil moisture depletes faster, compounding land surface temperature spikes into record-breaking heat domes.", color(230, 80, 50));
    this.drawTypeCard(x + 35 + cardW, y + 60, cardW, cardH, "🌧️ EXTREME PRECIPITATION", "For every 1°C of warming, atmosphere holds ~7% more water vapor. Heavy rainfall events become significantly more intense, raising urban and flash flooding risks.", color(40, 120, 220));
    this.drawTypeCard(x + 45 + cardW * 2, y + 60, cardW, cardH, "🌀 TROPICAL CYCLONES", "Warming ocean surface temperatures fuel tropical storm intensity. While total cyclone count may remain stable, Category 4 and 5 storms occur with higher frequency.", color(140, 60, 200));
  }

  drawTypeCard(x, y, w, h, title, desc, col) {
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

  // --- TAB 3: EXTREME EVENT ATTRIBUTION ---
  drawAttributionDetail(x, y, w, h) {
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, w, h, 8);

    fill(40, 50, 70);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text("🔍 World Weather Attribution (WWA) Science Framework", x + 25, y + 20);

    fill(70);
    textSize(11.5);
    textStyle(NORMAL);
    text("Attribution science uses high-resolution climate model ensembles to compare real-world observational data with a counterfactual 'world without human emissions'. This calculates how much human activity altered event likelihood and intensity.", x + 25, y + 48, w - 50, 45);

    let boxW = (w - 60) / 2;
    let boxH = 150;

    this.drawInfoBox(x + 20, y + 120, boxW, boxH, "OBSERVATIONAL DATA ANALYSIS", "Station records and satellite data establish historical baseline return times for specific regional weather extremes.");
    this.drawInfoBox(x + 40 + boxW, y + 120, boxW, boxH, "COUNTERFACTUAL MODELING", "Climate models simulate identical weather patterns without anthropogenic greenhouse gas forcing to measure likelihood changes.");
    this.drawInfoBox(x + 20, y + 290, boxW, boxH, "PROBABILITY MULTIPLIER (FAR)", "Fraction of Attributable Risk (FAR) quantifies the exact percentage increase in event probability due to climate change.");
    this.drawInfoBox(x + 40 + boxW, y + 290, boxW, boxH, "REAL-TIME PUBLIC ATTRIBUTION", "Attribution studies are now published within days of extreme events to inform adaptation planning and disaster relief.");
  }

  drawInfoBox(x, y, w, h, title, textBody) {
    fill(248, 250, 253);
    stroke(200, 215, 230);
    strokeWeight(1);
    rect(x, y, w, h, 6);

    fill(230, 80, 50);
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
      if (mx >= 20 && mx <= 20 + tabW) this.activeTab = "DISTRIBUTION";
      if (mx >= 32 + tabW && mx <= 32 + tabW * 2) this.activeTab = "TYPES";
      if (mx >= 44 + tabW * 2 && mx <= 44 + tabW * 3) this.activeTab = "ATTRIBUTION";
      return;
    }

    if (this.activeTab === "DISTRIBUTION" && mx >= 38 && mx <= 312) {
      if (my >= 145 && my <= 175) {
        this.globalWarmingC = map(mx, 38, 312, 0.0, 4.0);
      }
    }
  }

  keyPressed() {}
}