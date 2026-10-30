


class VTuberCharityVisual {
  constructor() {
    this.id = "vtuber_charity";
    this.title = "VTUBER COMMUNITY & CHARITY IMPACT";
    this.category = "vtubers";
    this.activeTab = 0; // 0: Global Impact Map, 1: Cause Distribution, 2: Interactive Marathon Stream, 3: Record Campaigns

    // Live Stream Marathon Simulation State
    this.raisedAmount = 485000;
    this.goalAmount = 1000000;
    this.hearts = [];

    // Global Impact Nodes
    this.impactNodes = [
      { name: "Red Cross Disaster Relief", x: -140, y: -20, amount: "$1.2M+", color: [255, 70, 70] },
      { name: "St. Jude Children's Hospital", x: -180, y: -40, amount: "$850K+", color: [255, 180, 50] },
      { name: "WWF Ocean & Rainforests", x: 120, y: 30, amount: "$640K+", color: [50, 220, 120] },
      { name: "The Trevor Project", x: -110, y: -10, amount: "$920K+", color: [180, 80, 255] },
      { name: "Direct Relief Medical", x: 180, y: -30, amount: "$1.5M+", color: [0, 200, 255] }
    ];
  }

  draw() {
    background(6, 8, 20);

    // Header
    textAlign(CENTER, TOP);
    fill(255);
    textSize(20);
    textFont('Helvetica');
    textStyle(BOLD);
    text(this.title, width / 2, 18);

    // Sub Navigation Tabs
    this.drawSubTabs(width / 2, 50);

    let cx = width / 2;
    let cy = 260;

    push();
    translate(cx, cy);
    switch (this.activeTab) {
      case 0: this.drawGlobalImpactMapStage(); break;
      case 1: this.drawCauseDistributionStage(); break;
      case 2: this.drawLiveMarathonStage(); break;
      case 3: this.drawRecordCampaignsStage(); break;
    }
    pop();

    // Contextual Info Box
    this.drawInfoBox(width / 2, 475);
  }

  // =========================================================================
  // STAGE VISUALIZERS
  // =========================================================================

  // Stage 1: Global Impact Map with Pulsing Nodes
  drawGlobalImpactMapStage() {
    // Stylized World Grid Map
    stroke(30, 50, 90, 80);
    strokeWeight(1);
    for (let x = -320; x <= 320; x += 40) {
      line(x, -140, x, 140);
    }
    for (let y = -140; y <= 140; y += 35) {
      line(-320, y, 320, y);
    }

    // World Map Outer Boundary Outline Box
    noFill();
    stroke(0, 180, 255, 100);
    strokeWeight(1.5);
    rect(-330, -150, 660, 300, 8);

    // Render Pulsing Impact Nodes
    for (let node of this.impactNodes) {
      let pulse = sin(frameCount * 0.08 + node.x) * 6 + 12;

      // Glow Aura
      noStroke();
      fill(node.color[0], node.color[1], node.color[2], 40);
      ellipse(node.x, node.y, pulse * 2.5, pulse * 2.5);

      // Core Node
      fill(node.color[0], node.color[1], node.color[2]);
      ellipse(node.x, node.y, 10, 10);

      // Node Label
      fill(240);
      textSize(10);
      textStyle(BOLD);
      textAlign(CENTER, BOTTOM);
      text(node.name, node.x, node.y - 12);

      fill(255, 220, 0);
      textSize(9);
      textStyle(NORMAL);
      textAlign(CENTER, TOP);
      text(node.amount, node.x, node.y + 10);
    }
  }

  // Stage 2: Fundraising Breakdown by Cause
  drawCauseDistributionStage() {
    let causes = [
      { label: "Disaster Relief & Red Cross", percent: 0.35, color: [255, 75, 75] },
      { label: "Health & Children's Hospitals", percent: 0.25, color: [255, 180, 50] },
      { label: "Mental Health Advocacy", percent: 0.20, color: [180, 80, 255] },
      { label: "Environmental Conservation", percent: 0.12, color: [50, 220, 120] },
      { label: "Humanitarian Aid & Water", percent: 0.08, color: [0, 200, 255] }
    ];

    let barY = -110;
    let totalW = 550;

    textAlign(LEFT, CENTER);
    for (let i = 0; i < causes.length; i++) {
      let c = causes[i];

      // Label & Value
      fill(230);
      textSize(11);
      textStyle(BOLD);
      text(c.label, -280, barY + 10);

      fill(255, 220, 0);
      textAlign(RIGHT, CENTER);
      text((c.percent * 100).toFixed(0) + "%", 280, barY + 10);
      textAlign(LEFT, CENTER);

      // Background Progress Bar Track
      fill(20, 30, 50);
      stroke(50, 70, 100);
      strokeWeight(1);
      rect(-280, barY + 22, totalW, 16, 4);

      // Animated Fill
      let fillW = totalW * c.percent * constrain(frameCount * 0.02, 0, 1);
      fill(c.color[0], c.color[1], c.color[2]);
      noStroke();
      rect(-280, barY + 22, fillW, 16, 4);

      barY += 48;
    }
  }

  // Stage 3: Interactive Stream Marathon Goal Meter
  drawLiveMarathonStage() {
    // Stream Frame Canvas Box
    fill(10, 15, 30);
    stroke(0, 200, 255, 120);
    strokeWeight(1.5);
    rect(-280, -130, 560, 260, 8);

    // Goal Meter Title
    textAlign(CENTER, TOP);
    fill(255, 220, 0);
    textSize(14);
    textStyle(BOLD);
    text("LIVE CHARITY STREAM GOAL", 0, -115);

    // Currency Counter Display
    fill(0, 255, 180);
    textSize(28);
    text("$" + this.raisedAmount.toLocaleString() + " / $" + this.goalAmount.toLocaleString(), 0, -90);

    // Large Goal Bar
    let barW = 480;
    let barH = 24;
    fill(20, 35, 60);
    stroke(70, 90, 130);
    strokeWeight(1);
    rect(-barW / 2, -45, barW, barH, 12);

    let pct = constrain(this.raisedAmount / this.goalAmount, 0, 1);
    fill(255, 50, 150);
    noStroke();
    rect(-barW / 2, -45, barW * pct, barH, 12);

    // Interactive Superchat / Donate Button
    let btnHover = mouseX > (width / 2 - 100) && mouseX < (width / 2 + 100) && mouseY > (height / 2 + 20) && mouseY < (height / 2 + 65);
    fill(btnHover ? color(0, 255, 180) : color(0, 200, 255));
    stroke(255);
    strokeWeight(1.5);
    rect(-90, 20, 180, 42, 8);

    fill(10, 20, 40);
    noStroke();
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("CLICK: DONATE $10,000", 0, 41);

    // Render Floating Superchat Heart Particles
    for (let i = this.hearts.length - 1; i >= 0; i--) {
      let h = this.hearts[i];
      h.y -= h.speed;
      h.alpha -= 3;

      fill(255, 80, 180, h.alpha);
      noStroke();
      ellipse(h.x, h.y, h.size, h.size);

      if (h.alpha <= 0) this.hearts.splice(i, 1);
    }
  }

  // Stage 4: Record-Breaking VTuber Charity Milestones
  drawRecordCampaignsStage() {
    let campaigns = [
      { title: "Indie VTuber Collective Marathon", total: "$1,500,000+", cause: "Disaster Relief", year: "2024" },
      { title: "Gamers Outreach Virtual Concert", total: "$820,000+", cause: "Childhood Medical Play", year: "2025" },
      { title: "Global Wildlife Fund Stream", total: "$650,000+", cause: "Habitat Protection", year: "2025" },
      { title: "Mental Health Awareness Week", total: "$950,000+", cause: "Crisis Support Helplines", year: "2026" }
    ];

    let startY = -120;
    for (let i = 0; i < campaigns.length; i++) {
      let c = campaigns[i];
      let cardY = startY + i * 62;

      // Card Box
      fill(14, 22, 42);
      stroke(0, 180, 255, 100);
      strokeWeight(1);
      rect(-280, cardY, 560, 52, 6);

      // Left Accent Ribbon
      fill(255, 180, 50);
      noStroke();
      rect(-280, cardY, 6, 52, 6);

      // Title & Year
      textAlign(LEFT, CENTER);
      fill(255);
      textSize(12);
      textStyle(BOLD);
      text(c.title + " (" + c.year + ")", -260, cardY + 16);

      fill(180, 210, 255);
      textSize(10);
      textStyle(NORMAL);
      text("Cause: " + c.cause, -260, cardY + 34);

      // Total Raised Badge
      textAlign(RIGHT, CENTER);
      fill(0, 255, 180);
      textSize(14);
      textStyle(BOLD);
      text(c.total, 260, cardY + 26);
    }
  }

  // =========================================================================
  // HELPER UI OVERLAYS
  // =========================================================================

  drawSubTabs(x, y) {
    let tabs = ["1. Global Impact Map", "2. Cause Distribution", "3. Live Goal Stream", "4. Milestone Records"];
    let tw = 170;
    let th = 26;
    let startX = x - (tabs.length * tw) / 2;

    for (let i = 0; i < tabs.length; i++) {
      let tx = startX + i * tw;
      let isSelected = this.activeTab === i;

      fill(isSelected ? color(255, 80, 150) : color(20, 30, 50));
      stroke(isSelected ? 255 : 70);
      strokeWeight(1);
      rect(tx + 4, y, tw - 8, th, 5);

      fill(isSelected ? 255 : 220);
      noStroke();
      textSize(10);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text(tabs[i], tx + tw / 2, y + th / 2);
    }
  }

  drawInfoBox(x, y) {
    fill(12, 16, 30, 230);
    stroke(50, 70, 110);
    strokeWeight(1.5);
    rect(x - 420, y, 840, 70, 8);

    let descriptions = [
      "Global Impact Map: VTuber fanbases mobilize globally across North America, Europe, and Asia to mobilize rapid disaster response and medical fundraising.",
      "Cause Distribution: Superchats, charity merchandise sales, and direct stream donations prioritize medical care, mental health support, and humanitarian aid.",
      "Live Stream Goal Meter: Gamified stream incentives (stretch goals, avatar cosplay changes, fan karaoke marathons) boost donation participation.",
      "Milestone Records: Major agency and indie VTuber streams have raised over $10M+ collectively across international charity platforms."
    ];

    textAlign(LEFT, TOP);
    fill(255, 80, 150);
    textSize(12);
    textStyle(BOLD);
    text("VTUBER CHARITY & COMMUNITY IMPACT:", x - 400, y + 10);

    fill(210);
    textSize(11);
    textStyle(NORMAL);
    text(descriptions[this.activeTab], x - 400, y + 32, 800, 32);
  }

  mousePressed() {
    let mx = (mouseX / width) * 1024;
    let my = (mouseY / height) * 576;

    // Sub-Tabs Click
    let tw = 170;
    let th = 26;
    let startX = (width / 2) - (4 * tw) / 2;

    if (my >= 50 && my <= 76) {
      for (let i = 0; i < 4; i++) {
        let tx = startX + i * tw;
        if (mx >= tx && mx <= tx + tw) {
          this.activeTab = i;
          return;
        }
      }
    }

    // Tab 2 Interactive Donation Button Click
    if (this.activeTab === 2) {
      if (mx > (width / 2 - 100) && mx < (width / 2 + 100) && my > (260 + 20) && my < (260 + 65)) {
        this.raisedAmount = min(this.raisedAmount + 10000, this.goalAmount);

        // Spawn Superchat Heart Particles
        for (let i = 0; i < 8; i++) {
          this.hearts.push({
            x: random(-80, 80),
            y: 20,
            size: random(8, 18),
            speed: random(1.5, 3.5),
            alpha: 255
          });
        }
      }
    }
  }
}