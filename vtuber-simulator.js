



// =========================================================================
// VTUBER VIEWER, LORE, SUPERCHAT & CONCERT SIMULATOR
// =========================================================================

class VtuberSimulatorVisual {
  constructor() {
    this.id = "vtuber-simulator";
    this.title = "VTuber Viewer, Lore & Concert Simulator";
    this.category = "vtuber";

    // Sub-tab Navigation: "STREAM", "CONCERT", or "LORE"
    this.activeSubTab = "STREAM";

    // Concert State & VFX
    this.concertState = {
      lightColor: [0, 200, 255],
      penlightAngle: 0,
      songTitle: "★ Stellar Resonance (Live 3D Ver.)",
      bpm: 120,
      cheerCount: 1420
    };

    // Character IP & Lore Profile Data
    this.characterLore = {
      name: "Lumi Celestial",
      title: "Star Guardian & Virtual Singer",
      mama: "KuroBoshi (Character Design / Illustrator)",
      papa: "Live2D_Master (Rigging & Physics)",
      debutDate: "October 14, 2022",
      age: "4,500 Star Years (Looks 19)",
      backstory: "A fallen starlight guardian sent to Earth to collect human smiles through singing and gaming. She lives inside a PC monitor and streams to charge her star core.",
      hashtags: ["#LumiLive", "#LumiArt", "#LumiMemes"],
      designFeatures: [
        "Star-shaped hair clip (Emotions reactive)",
        "Gradient purple-to-cyan twintails",
        "Nebula eyes with floating sparkles",
        "Floating celestial headphones"
      ]
    };

    // Chat Feed Data
    this.chatLog = [
      { user: "Shrimp_09", msg: "konbanwa!!", color: "#61afef", sc: 0 },
      { user: "PixelOtaku", msg: "LFG stream starting!", color: "#98c379", sc: 0 },
      { user: "NekoFan", msg: "Try typing !lore, !mama, or !concert in chat!", color: "#e5c07b", sc: 0 }
    ];

    // Pinned Superchats
    this.pinnedSuperchats = [];

    // Avatar State & Motion
    this.avatarState = {
      expression: "HAPPY", // HAPPY, BLUSH, SHOCK, SMUG
      talkingTimer: 0,
      speechText: "Welcome in! Type !lore, !concert, or use the sub-tabs above!",
      eyeBlink: 0,
      headBob: 0
    };

    // User Input Buffer
    this.inputBuffer = "Hello Lumi!";
    this.selectedScAmount = 0; // 0 = normal chat, 5 = green, 20 = orange, 100 = red SC
  }

  draw() {
    background(18, 22, 34);

    let streamW = 680;
    let chatX = streamW + 10;
    let chatW = width - chatX - 10;

    // Sub-Tab Navigation Bar
    this.drawSubTabs(10, 10, streamW);

    if (this.activeSubTab === "STREAM") {
      // Main Stream Frame
      fill(10, 14, 22);
      stroke(45, 55, 75);
      strokeWeight(2);
      rect(10, 45, streamW, 385, 8);

      this.updateAvatar();
      this.drawAvatar(streamW / 2 + 10, 265);
      this.drawStreamHud(10, 45, streamW);

      if (this.avatarState.talkingTimer > 0) {
        this.drawSpeechBubble(streamW / 2 + 10, 115);
        this.avatarState.talkingTimer--;
      }
    } else if (this.activeSubTab === "CONCERT") {
      // 3D Virtual Concert Mode
      this.drawConcertStage(10, 45, streamW, 385);
    } else {
      // IP, Lore & Character Profile Tab
      this.drawLorePanel(10, 45, streamW, 385);
    }

    // Render Live Chat Feed Panel
    this.drawChatFeed(chatX, 10, chatW, 420);

    // Render Interactive Control Panel (Bottom)
    this.drawControlPanel(10, 440, width - 20, 125);
  }

  drawSubTabs(x, y, w) {
    let tabs = [
      { id: "STREAM", label: "📺 LIVE STREAM" },
      { id: "CONCERT", label: "🎤 VIRTUAL CONCERT" },
      { id: "LORE", label: "📜 IP, LORE & DESIGN" }
    ];

    let tabW = 140;
    let tabH = 30;

    for (let i = 0; i < tabs.length; i++) {
      let tx = x + i * (tabW + 8);
      let isActive = this.activeSubTab === tabs[i].id;

      fill(isActive ? color(0, 200, 200) : color(30, 40, 58));
      stroke(isActive ? 255 : 60);
      strokeWeight(1);
      rect(tx, y, tabW, tabH, 6);

      fill(isActive ? 0 : 200);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(10);
      textStyle(BOLD);
      text(tabs[i].label, tx + tabW / 2, y + tabH / 2);
    }
  }

  drawConcertStage(x, y, w, h) {
    // Stage Dark Background
    fill(5, 5, 12);
    stroke(45, 55, 75);
    rect(x, y, w, h, 8);

    // Stage Spotlights Beam VFX
    push();
    blendMode(ADD);
    let beamColor = color(this.concertState.lightColor[0], this.concertState.lightColor[1], this.concertState.lightColor[2], 60);
    fill(beamColor);
    noStroke();

    // Left & Right Stage Beams
    let swing1 = sin(frameCount * 0.04) * 80;
    let swing2 = cos(frameCount * 0.04) * 80;
    triangle(x + 50, y, x + 150 + swing1, y + h, x + 50 + swing1, y + h);
    triangle(x + w - 50, y, x + w - 150 + swing2, y + h, x + w - 50 + swing2, y + h);
    pop();

    // Stage Platform
    fill(20, 25, 40);
    stroke(0, 200, 255);
    ellipse(x + w / 2, y + h - 50, 400, 70);

    // Performer Avatar (Dynamic Concert Dance Motion)
    this.avatarState.headBob = sin(frameCount * 0.12) * 12;
    this.drawAvatar(x + w / 2, y + h / 2 + 10);

    // Crowd Penlights (Glow Sticks) Silhouette & Waving
    this.concertState.penlightAngle = sin(frameCount * 0.1) * 0.3;
    let penCols = [color(0, 200, 255), color(255, 0, 150), color(0, 255, 150)];

    for (let px = x + 20; px < x + w - 20; px += 22) {
      let py = y + h - 15 + sin(px + frameCount * 0.05) * 5;
      let col = penCols[floor(px) % 3];

      push();
      translate(px, py);
      rotate(this.concertState.penlightAngle);

      // Glow Stick Beam
      stroke(col);
      strokeWeight(4);
      line(0, 0, 0, -22);

      // Audience Silhouette
      fill(10, 12, 18);
      noStroke();
      ellipse(0, 5, 18, 18);
      pop();
    }

    // Concert HUD Banner
    fill(0, 180);
    noStroke();
    rect(x, y, w, 32, 8, 8, 0, 0);

    fill(255, 0, 120);
    textAlign(LEFT, CENTER);
    textSize(11);
    textStyle(BOLD);
    text("LIVE 3D CONCERT", x + 15, y + 16);

    fill(255);
    textStyle(NORMAL);
    text(`NOW PLAYING: ${this.concertState.songTitle}  |  CHEERS: ${this.concertState.cheerCount}`, x + 130, y + 16);
  }

  drawLorePanel(x, y, w, h) {
    fill(22, 28, 42);
    stroke(45, 55, 75);
    rect(x, y, w, h, 8);

    fill(0, 200, 200);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textStyle(BOLD);
    text(`${this.characterLore.name} — ${this.characterLore.title}`, x + 20, y + 20);

    fill(220);
    textSize(12);
    textStyle(NORMAL);

    let col1X = x + 20;
    let col2X = x + 340;
    let metaY = y + 50;

    fill(255, 180, 0);
    textStyle(BOLD);
    text("ARTIST CREDITS (CREATOR ECONOMY)", col1X, metaY);
    textStyle(NORMAL);
    fill(200);
    text(`• Mama (Illustrator): ${this.characterLore.mama}`, col1X, metaY + 20);
    text(`• Papa (Live2D Rigger): ${this.characterLore.papa}`, col1X, metaY + 38);
    text(`• Debut Date: ${this.characterLore.debutDate}`, col1X, metaY + 56);
    text(`• Age: ${this.characterLore.age}`, col1X, metaY + 74);

    fill(0, 255, 200);
    textStyle(BOLD);
    text("CHARACTER BACKSTORY & LORE", col2X, metaY);
    textStyle(NORMAL);
    fill(200);
    text(this.characterLore.backstory, col2X, metaY + 20, 310, 100);

    let featY = metaY + 115;
    fill(255, 120, 180);
    textStyle(BOLD);
    text("VISUAL IDENTITY & RIG DESIGN", col1X, featY);
    textStyle(NORMAL);
    fill(200);
    for (let f = 0; f < this.characterLore.designFeatures.length; f++) {
      text(`• ${this.characterLore.designFeatures[f]}`, col1X, featY + 20 + f * 18);
    }

    fill(100, 200, 255);
    textStyle(BOLD);
    text("COMMUNITY HASHTAGS", col2X, featY);
    textStyle(NORMAL);
    fill(200);
    for (let hTag = 0; hTag < this.characterLore.hashtags.length; hTag++) {
      text(`• ${this.characterLore.hashtags[hTag]}`, col2X, featY + 20 + hTag * 18);
    }
  }

  updateAvatar() {
    this.avatarState.headBob = sin(frameCount * 0.05) * 6;
    if (frameCount % 180 === 0) {
      this.avatarState.eyeBlink = 10;
    }
    if (this.avatarState.eyeBlink > 0) this.avatarState.eyeBlink--;
  }

  drawAvatar(x, y) {
    push();
    translate(x, y + this.avatarState.headBob);

    fill(160, 90, 220);
    noStroke();
    ellipse(-40, 20, 50, 140);
    ellipse(40, 20, 50, 140);

    fill(255, 224, 200);
    ellipse(0, 0, 130, 140);

    if (this.avatarState.expression === "BLUSH" || this.avatarState.expression === "HAPPY") {
      fill(255, 100, 120, 120);
      ellipse(-35, 15, 25, 14);
      ellipse(35, 15, 25, 14);
    }

    fill(255);
    ellipse(-30, -10, 32, this.avatarState.eyeBlink > 0 ? 3 : 36);
    ellipse(30, -10, 32, this.avatarState.eyeBlink > 0 ? 3 : 36);

    if (this.avatarState.eyeBlink === 0) {
      fill(0, 200, 255);
      ellipse(-30, -8, 18, 22);
      ellipse(30, -8, 18, 22);
      fill(255);
      ellipse(-34, -12, 6, 6);
      ellipse(26, -12, 6, 6);
    }

    stroke(80, 40, 100);
    strokeWeight(3);
    noFill();
    if (this.avatarState.expression === "SHOCK") {
      arc(-30, -32, 25, 15, PI, TWO_PI);
      arc(30, -32, 25, 15, PI, TWO_PI);
    } else {
      arc(-30, -26, 25, 15, PI + QUARTER_PI, TWO_PI);
      arc(30, -26, 25, 15, PI, TWO_PI - QUARTER_PI);
    }

    noStroke();
    fill(230, 80, 100);
    let isTalking = this.avatarState.talkingTimer > 0 || this.activeSubTab === "CONCERT";
    let mouthOpen = isTalking ? abs(sin(frameCount * 0.3)) * 20 + 6 : 4;

    if (this.avatarState.expression === "SHOCK") {
      ellipse(0, 25, 20, 26);
    } else {
      arc(0, 20, 24, mouthOpen, 0, PI);
    }

    pop();
  }

  drawSpeechBubble(x, y) {
    push();
    fill(255);
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER);
    rect(x, y, 360, 55, 12);
    triangle(x - 10, y + 27, x + 10, y + 27, x, y + 40);

    fill(20);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(this.avatarState.speechText, x, y, 340, 45);
    pop();
  }

  drawStreamHud(x, y, w) {
    fill(0, 160);
    noStroke();
    rect(x, y, w, 32, 8, 8, 0, 0);

    fill(255, 60, 60);
    ellipse(x + 25, y + 16, 10, 10);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(12);
    textStyle(BOLD);
    text("LIVE", x + 36, y + 16);

    fill(180);
    textSize(11);
    textStyle(NORMAL);
    text("Lumi Ch. Virtual Idol | 24,812 Viewers", x + 85, y + 16);
  }

  drawChatFeed(x, y, w, h) {
    fill(24, 28, 40);
    stroke(45, 55, 75);
    rect(x, y, w, h, 8);

    fill(35, 45, 65);
    rect(x, y, w, 32, 8, 8, 0, 0);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(12);
    textStyle(BOLD);
    text("Top Chat (Try !lore, !mama, !concert)", x + 12, y + 16);

    let tickerY = y + 36;
    let tickerX = x + 8;
    for (let i = 0; i < this.pinnedSuperchats.length && i < 3; i++) {
      let sc = this.pinnedSuperchats[i];
      fill(sc.bgColor);
      rect(tickerX, tickerY, 70, 24, 4);

      fill(255);
      textAlign(CENTER, CENTER);
      textSize(10);
      textStyle(BOLD);
      text(`$${sc.amount}`, tickerX + 35, tickerY + 12);
      tickerX += 76;
    }

    let msgY = y + 75;
    for (let i = Math.max(0, this.chatLog.length - 8); i < this.chatLog.length; i++) {
      let item = this.chatLog[i];

      if (item.sc > 0) {
        fill(item.bgColor);
        rect(x + 8, msgY, w - 16, 42, 6);
        fill(255);
        textAlign(LEFT, TOP);
        textSize(10);
        textStyle(BOLD);
        text(`${item.user} • $${item.sc}`, x + 14, msgY + 6);
        textSize(11);
        textStyle(NORMAL);
        text(item.msg, x + 14, msgY + 22);
        msgY += 48;
      } else {
        fill(item.color);
        textAlign(LEFT, TOP);
        textSize(11);
        textStyle(BOLD);
        text(item.user + ":", x + 10, msgY);

        fill(220);
        textStyle(NORMAL);
        let nameW = textWidth(item.user + ": ");
        text(item.msg, x + 10 + nameW, msgY);
        msgY += 22;
      }
    }
  }

  drawControlPanel(x, y, w, h) {
    fill(25, 32, 48);
    stroke(50);
    rect(x, y, w, h, 8);

    fill(255);
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text("SIMULATOR CONTROLS — SEND MESSAGE TO STREAMER", x + 15, y + 12);

    fill(15, 20, 30);
    stroke(80);
    rect(x + 15, y + 36, 480, 32, 6);

    fill(255);
    textAlign(LEFT, CENTER);
    textSize(12);
    text(this.inputBuffer + (frameCount % 60 < 30 ? "|" : ""), x + 25, y + 52);

    let scTiers = [
      { label: "Free Chat", amt: 0, col: color(60, 70, 90) },
      { label: "$5 Green SC", amt: 5, col: color(15, 157, 88) },
      { label: "$20 Orange SC", amt: 20, col: color(230, 81, 0) },
      { label: "$100 RED SC!", amt: 100, col: color(208, 2, 27) }
    ];

    let btnX = x + 15;
    let btnY = y + 78;

    for (let t = 0; t < scTiers.length; t++) {
      let tier = scTiers[t];
      let isSel = this.selectedScAmount === tier.amt;

      fill(tier.col);
      stroke(isSel ? 255 : 0);
      strokeWeight(isSel ? 2 : 0);
      rect(btnX, btnY, 110, 32, 6);

      fill(255);
      textAlign(CENTER, CENTER);
      textSize(10);
      textStyle(BOLD);
      text(tier.label, btnX + 55, btnY + 16);

      btnX += 118;
    }

    fill(0, 200, 200);
    stroke(255);
    strokeWeight(1);
    rect(x + 510, y + 36, 110, 74, 6);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text("SEND ▶", x + 565, y + 73);
  }

  sendUserMessage() {
    if (this.inputBuffer.trim().length === 0) return;

    let msg = this.inputBuffer;
    let amt = this.selectedScAmount;
    let bgColor = amt === 5 ? color(15, 157, 88) : amt === 20 ? color(230, 81, 0) : color(208, 2, 27);

    this.chatLog.push({
      user: "You (Viewer)",
      msg: msg,
      color: "#00e5ff",
      sc: amt,
      bgColor: bgColor
    });

    if (amt > 0) {
      this.pinnedSuperchats.unshift({ amount: amt, bgColor: bgColor });
      this.concertState.cheerCount += amt * 5;
    }

    this.triggerStreamerReaction(msg, amt);
  }

  triggerStreamerReaction(msg, scAmount) {
    this.avatarState.talkingTimer = 180;
    let lowerMsg = msg.toLowerCase().trim();

    if (lowerMsg === "!lore") {
      this.avatarState.expression = "HAPPY";
      this.avatarState.speechText = "I'm a Star Guardian sent to Earth to gather human smiles through streaming!";
    } else if (lowerMsg === "!concert") {
      this.activeSubTab = "CONCERT";
      this.avatarState.speechText = "Switching to Live Concert Mode! Let's sing together!";
    } else if (lowerMsg === "!mama" || lowerMsg === "!papa") {
      this.avatarState.expression = "HAPPY";
      this.avatarState.speechText = `My Mama is ${this.characterLore.mama} and my Papa is ${this.characterLore.papa}!`;
    } else if (scAmount >= 100) {
      this.avatarState.expression = "BLUSH";
      this.avatarState.speechText = "AKDHSKJH RED SUPERCHAT?! $100?! Thank you so much for supporting the stream!!";
    } else if (scAmount >= 20) {
      this.avatarState.expression = "HAPPY";
      this.avatarState.speechText = `Thank you for the $${scAmount} Superchat! You're awesome!`;
    } else {
      this.avatarState.expression = "SMUG";
      this.avatarState.speechText = `Reading chat: "${msg}" — That's what I'm talking about!`;
    }
  }

  keyPressed(key, keyCode) {
    if (keyCode === BACKSPACE) {
      this.inputBuffer = this.inputBuffer.slice(0, -1);
    } else if (keyCode === ENTER) {
      this.sendUserMessage();
    } else if (key.length === 1) {
      this.inputBuffer += key;
    }
  }

  mousePressed() {
    let mx = (mouseX / width) * 1024;
    let my = (mouseY / height) * 576;

    // Sub-Tab Click Detection
    let tabW = 140;
    if (my >= 10 && my <= 40) {
      if (mx >= 10 && mx <= 10 + tabW) {
        this.activeSubTab = "STREAM";
        return;
      }
      if (mx >= 18 + tabW && mx <= 18 + tabW * 2) {
        this.activeSubTab = "CONCERT";
        return;
      }
      if (mx >= 26 + tabW * 2 && mx <= 26 + tabW * 3) {
        this.activeSubTab = "LORE";
        return;
      }
    }

    let ctrlX = 10;
    let ctrlY = 440;

    // Send Button Click
    if (mx >= ctrlX + 510 && mx <= ctrlX + 620 && my >= ctrlY + 36 && my <= ctrlY + 110) {
      this.sendUserMessage();
      return;
    }

    // Tier Selection Buttons
    let scTiers = [0, 5, 20, 100];
    let btnX = ctrlX + 15;
    let btnY = ctrlY + 78;

    for (let t = 0; t < scTiers.length; t++) {
      if (mx >= btnX && mx <= btnX + 110 && my >= btnY && my <= btnY + 32) {
        this.selectedScAmount = scTiers[t];
        return;
      }
      btnX += 118;
    }
  }
}