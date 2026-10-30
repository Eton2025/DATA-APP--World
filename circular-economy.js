


// =========================================================================
// CIRCULAR ECONOMY & MATERIAL FLOW SIMULATOR
// =========================================================================

class CircularEconomyVisual {
  constructor() {
    this.id = "circular-economy";
    this.title = "Circular Economy & Resource Cycles";
    this.category = "environment";

    // Active Navigation Tab
    this.activeTab = "SIMULATOR"; // "SIMULATOR", "R_FRAMEWORK", "DESIGN"

    // Interactive System Drivers
    this.recyclingRate = 25;       // % of post-consumer waste recycled [5 - 90]
    this.repairabilityIndex = 30;  // Product design repairability score [10 - 100]
    this.virginMaterialTax = 10;   // Policy tax on raw resource extraction (%) [0 - 100]
  }

  draw() {
    background(246, 248, 250);

    let mainW = width - 40;

    this.drawHeader(20, 15, mainW);
    this.drawTabs(20, 50, mainW);

    if (this.activeTab === "SIMULATOR") {
      this.drawCircularSim(20, 95, mainW, 465);
    } else if (this.activeTab === "R_FRAMEWORK") {
      this.drawRFrameworkDetail(20, 95, mainW, 465);
    } else if (this.activeTab === "DESIGN") {
      this.drawEcoDesignDetail(20, 95, mainW, 465);
    }
  }

  drawHeader(x, y, w) {
    fill(40, 60, 50);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(18);
    textStyle(BOLD);
    text("🔄 Circular Economy: Closed-Loop Material Flow Dynamics", x, y);
  }

  drawTabs(x, y, w) {
    let tabs = [
      { id: "SIMULATOR", label: "♻️ CLOSED-LOOP FLOW SIMULATOR" },
      { id: "R_FRAMEWORK", label: "📜 THE 9R HIERARCHY FRAMEWORK" },
      { id: "DESIGN", label: "🛠️ ECO-DESIGN & EXTENDED PRODUCER RESPONSIBILITY" }
    ];

    let tabW = 220;
    let tabH = 32;

    for (let i = 0; i < tabs.length; i++) {
      let tx = x + i * (tabW + 12);
      let isActive = this.activeTab === tabs[i].id;

      fill(isActive ? color(39, 174, 96) : color(220, 228, 235));
      stroke(isActive ? color(30, 130, 70) : color(180, 195, 210));
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

  // --- TAB 1: INTERACTIVE CLOSED-LOOP FLOW SIMULATOR ---
  drawCircularSim(x, y, w, h) {
    // Left Control Panel
    let ctrlW = 310;
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, ctrlW, h, 8);

    fill(40, 60, 50);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text("POLICY & SYSTEM DRIVERS", x + 18, y + 18);

    // Slider 1: Recycling Infrastructure Efficiency
    let sY1 = y + 55;
    fill(50);
    textSize(11);
    text(`Recycling Rate Efficiency: ${round(this.recyclingRate)}%`, x + 18, sY1);
    this.drawSlider(x + 18, sY1 + 20, ctrlW - 36, this.recyclingRate, 5, 90, color(39, 174, 96));

    // Slider 2: Product Repairability Index
    let sY2 = y + 130;
    fill(50);
    text(`Product Repairability Index: ${round(this.repairabilityIndex)} / 100`, x + 18, sY2);
    this.drawSlider(x + 18, sY2 + 20, ctrlW - 36, this.repairabilityIndex, 10, 100, color(52, 152, 219));

    // Slider 3: Virgin Extraction Policy Tax
    let sY3 = y + 205;
    fill(50);
    text(`Virgin Raw Material Tax: ${round(this.virginMaterialTax)}%`, x + 18, sY3);
    this.drawSlider(x + 18, sY3 + 20, ctrlW - 36, this.virginMaterialTax, 0, 100, color(230, 126, 34));

    // Derived Real-Time System Metrics
    let virginDemand = constrain(100 - (this.recyclingRate * 0.5 + this.repairabilityIndex * 0.3 + this.virginMaterialTax * 0.2), 10, 95);
    let landfillDiversion = constrain(this.recyclingRate * 0.7 + this.repairabilityIndex * 0.3, 10, 98);
    let carbonReduction = constrain(landfillDiversion * 0.85, 5, 90);

    let mY = y + 285;
    fill(245, 249, 250);
    stroke(210);
    rect(x + 15, mY, ctrlW - 30, 165, 6);

    fill(40, 60, 50);
    textSize(11);
    textStyle(BOLD);
    text("SYSTEM CIRCULARITY PERFORMANCE", x + 25, mY + 12);

    this.drawMetricBar(x + 25, mY + 38, ctrlW - 50, "Virgin Extraction Reliance", virginDemand, "%", color(231, 76, 60));
    this.drawMetricBar(x + 25, mY + 78, ctrlW - 50, "Landfill Diversion Rate", landfillDiversion, "%", color(39, 174, 96));
    this.drawMetricBar(x + 25, mY + 118, ctrlW - 50, "Emissions Avoidance", carbonReduction, "%", color(52, 152, 219));

    // Right Display: Animated Diagram of Material Loops
    let simX = x + ctrlW + 20;
    let simW = w - ctrlW - 20;

    fill(255);
    stroke(200, 210, 225);
    rect(simX, y, simW, h, 8);

    fill(40, 60, 50);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text("CLOSED-LOOP MATERIAL FLOW DIAGRAM", simX + 20, y + 20);

    // Nodes Coordinates
    let cX = simX + simW / 2;
    let cY = y + h / 2 + 10;
    let radius = 120;

    // Outer Loop Path (Circular System)
    noFill();
    stroke(39, 174, 96, 120);
    strokeWeight(6);
    ellipse(cX, cY, radius * 2, radius * 2);

    // Nodes: Extraction, Production, Consumption, Recycling
    this.drawNode(cX - radius, cY, "⛏️ Raw Extraction", color(231, 76, 60));
    this.drawNode(cX, cY - radius, "🏭 Production", color(52, 152, 219));
    this.drawNode(cX + radius, cY, "🛒 Consumption", color(241, 196, 15));
    this.drawNode(cX, cY + radius, "♻️ Recycling / Reuse", color(39, 174, 96));

    // Animated Particle Flow
    let particleCount = floor(map(landfillDiversion, 10, 98, 4, 18));
    for (let p = 0; p < particleCount; p++) {
      let angle = (frameCount * 0.02 + (p * TWO_PI) / particleCount) % TWO_PI;
      let px = cX + cos(angle) * radius;
      let py = cY + sin(angle) * radius;

      fill(39, 174, 96);
      noStroke();
      ellipse(px, py, 10, 10);
    }
  }

  drawNode(x, y, label, col) {
    fill(col);
    stroke(255);
    strokeWeight(2);
    ellipse(x, y, 40, 40);

    fill(50);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(label, x, y > height / 2 + 50 ? y + 30 : y - 30);
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

  // --- TAB 2: THE 9R HIERARCHY FRAMEWORK ---
  drawRFrameworkDetail(x, y, w, h) {
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, w, h, 8);

    fill(40, 60, 50);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text("📜 The 9R Circularity Hierarchy (Refuse to Recover)", x + 25, y + 20);

    let colW = (w - 70) / 3;
    let colH = 370;

    this.drawRColumn(x + 25, y + 60, colW, colH, "1. HIGH CIRCULARITY (Smarter Use)", ["R0: Refuse - Make function redundant without product", "R1: Rethink - Make product use more intensive (sharing)", "R2: Reduce - Increase manufacturing efficiency"], color(39, 174, 96));
    this.drawRColumn(x + 35 + colW, y + 60, colW, colH, "2. MEDIUM CIRCULARITY (Lifespan Extension)", ["R3: Re-use - Secondary product usage", "R4: Repair - Fix defective products for original use", "R5: Refurbish - Restore outdated product to current standards", "R6: Remanufacture - Use parts of discarded product in new ones"], color(52, 152, 219));
    this.drawRColumn(x + 45 + colW * 2, y + 60, colW, colH, "3. LOW CIRCULARITY (Useful Application)", ["R7: Repurpose - Use redundant product in new function", "R8: Recycle - Process materials for same or lower quality", "R9: Recover - Incinerate waste with energy recovery"], color(230, 126, 34));
  }

  drawRColumn(x, y, w, h, title, items, col) {
    fill(248, 250, 252);
    stroke(col);
    strokeWeight(1.5);
    rect(x, y, w, h, 8);

    fill(col);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11.5);
    textStyle(BOLD);
    text(title, x + 15, y + 15);

    fill(70);
    textSize(10.5);
    textStyle(NORMAL);
    let itemY = y + 50;
    for (let i = 0; i < items.length; i++) {
      text(`• ${items[i]}`, x + 15, itemY, w - 30, 60);
      itemY += 65;
    }
  }

  // --- TAB 3: ECO-DESIGN & EPR ---
  drawEcoDesignDetail(x, y, w, h) {
    fill(255);
    stroke(200, 210, 225);
    rect(x, y, w, h, 8);

    fill(40, 60, 50);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text("🛠️ Eco-Design Principles & Extended Producer Responsibility (EPR)", x + 25, y + 20);

    let boxW = (w - 60) / 2;
    let boxH = 160;

    this.drawInfoBox(x + 20, y + 65, boxW, boxH, "DESIGN FOR DISASSEMBLY (DfD)", "Products designed with standardized snap-fits instead of permanent adhesives allow rapid, low-cost component separation during repair and recycling.");
    this.drawInfoBox(x + 40 + boxW, y + 65, boxW, boxH, "EXTENDED PRODUCER RESPONSIBILITY (EPR)", "Environmental policies force manufacturers to finance post-consumer collection and treatment, incentivizing durable, non-toxic product architecture.");
    this.drawInfoBox(x + 20, y + 245, boxW, boxH, "DIGITAL PRODUCT PASSPORTS (DPP)", "QR-coded digital records trace material provenance, chemical composition, and repair manuals across supply chain actors.");
    this.drawInfoBox(x + 40 + boxW, y + 245, boxW, boxH, "PRODUCT-AS-A-SERVICE (PaaS)", "Manufacturers retain ownership of hardware (e.g., lighting-as-a-service), shifting internal business goals toward maximizing hardware longevity over volume sales.");
  }

  drawInfoBox(x, y, w, h, title, textBody) {
    fill(248, 250, 253);
    stroke(200, 215, 230);
    strokeWeight(1);
    rect(x, y, w, h, 6);

    fill(39, 174, 96);
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
      if (mx >= 32 + tabW && mx <= 32 + tabW * 2) this.activeTab = "R_FRAMEWORK";
      if (mx >= 44 + tabW * 2 && mx <= 44 + tabW * 3) this.activeTab = "DESIGN";
      return;
    }

    if (this.activeTab === "SIMULATOR" && mx >= 38 && mx <= 312) {
      if (my >= 145 && my <= 175) {
        this.recyclingRate = map(mx, 38, 312, 5, 90);
      }
      if (my >= 220 && my <= 250) {
        this.repairabilityIndex = map(mx, 38, 312, 10, 100);
      }
      if (my >= 295 && my <= 325) {
        this.virginMaterialTax = map(mx, 38, 312, 0, 100);
      }
    }
  }

  keyPressed() {}
}