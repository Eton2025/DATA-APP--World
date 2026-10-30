



function WhatIsVtuberInfo() {
  this.name = 'What is VTuber';
  this.id = 'what-is-vtuber';

  // State variables
  this.eyeBlinkTimer = 0;
  this.mouthScale = 1.0;
  this.currentTab = 'value'; // 'value', 'pipeline', 'misconceptions', 'lexicon'

  // Image assets placeholders
  this.avatarImage = null;
  this.selectedTerm = 'Kizuna AI';

  // Dictionary of VTuber Community Lexicon
  this.lexiconData = {
    'Kizuna AI': {
      title: 'Kizuna AI (The Pioneer - 2016)',
      desc: 'Coined the term "Virtual YouTuber". Pioneered 3D digital motion capture and proved that virtual avatars could build multi-million fan bases.'
    },
    'Mama / Papa': {
      title: 'Mama (Artist) & Papa (Rigger)',
      desc: 'Community honorifics for creators. "Mama" designs/illustrates the 2D layered artwork, while "Papa" rigs deformer meshes in Live2D/Blender.'
    },
    'Kayfabe': {
      title: 'Kayfabe & Lore Persona',
      desc: 'Maintaining character lore on stream without breaking character—a term borrowed from pro wrestling to preserve immersion.'
    },
    'Graduation': {
      title: 'Graduation (Retirement)',
      desc: 'The official retirement or departure of a VTuber character persona from an agency or platform, often celebrated with final live streams.'
    },
    'Superchat Trains': {
      title: 'Superchat Trains & Red Streams',
      desc: 'Coordinated fan monetization floods during milestone broadcasts, turning chat feeds entirely red with high-tier monetary support.'
    }
  };

  this.preload = function() {
    // If local image assets exist, load them here:
    // this.avatarImage = loadImage('assets/vtuber-preview.png');
  };

  this.setup = function() {
    this.eyeBlinkTimer = 0;
    this.mouthScale = 1.0;
    this.currentTab = 'value';
    this.selectedTerm = 'Kizuna AI';
  };

  this.draw = function() {
    background(165, 255, 255);

    // --- SCREEN TITLE HEADER ---
    fill(47, 53, 66);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    textFont('sans-serif');
    textStyle(BOLD);
    text('Understanding Virtual YouTubers (VTubers)', width / 2, 35);
    textStyle(NORMAL);

    // =========================================================================
    // LEFT COLUMN: CONTENT CARDS + 4-TAB SWITCHER
    // =========================================================================
    var colX = 40;
    var colY = 70;
    var colWidth = 460;

    // --- 4-TAB SWITCHER BUTTONS ---
    var btnW = 110;
    var btnH = 28;
    var btnGap = 6;

    drawTabButton(colX, colY, btnW, btnH, '💡 Core Value', this.currentTab === 'value');
    drawTabButton(colX + btnW + btnGap, colY, btnW, btnH, '⚙️ Pipeline', this.currentTab === 'pipeline');
    drawTabButton(colX + (btnW + btnGap) * 2, colY, btnW, btnH, '🛡️ Objections', this.currentTab === 'misconceptions');
    drawTabButton(colX + (btnW + btnGap) * 3, colY, btnW, btnH, '📖 Lexicon', this.currentTab === 'lexicon');

    // --- RENDER SELECTED TAB CONTENT ---
    var cardY = colY + 38;
    var cardH = 100;
    var cardGap = 12;

    if (this.currentTab === 'value') {
      drawContentCard(colX, cardY, colWidth, cardH, 
        '1. Privacy & Safety Infrastructure', 
        'Anonymity shields creators from harassment and doxxing. This barrier between physical identity and digital persona empowers performers to interact authentically.',
        color(0, 30, 200));

      drawContentCard(colX, cardY + cardH + cardGap, colWidth, cardH, 
        '2. Boundless Creative Agency', 
        'Performers are unshackled from physical human constraints, manifesting highly stylized avatars engineered specifically to mirror their inner creative vision and lore.',
        color(0, 30, 200));

      drawContentCard(colX, cardY + (cardH + cardGap) * 2, colWidth, cardH, 
        '3. Live Interactive Production Value', 
        'Advanced tracking algorithms map real-time expressions into graphics, blending animation styles with live interactive media.',
        color(0, 30, 200));

    } else if (this.currentTab === 'pipeline') {
      drawContentCard(colX, cardY, colWidth, cardH, 
        '1. Layered Artwork & Rigging (Live2D)', 
        'Artists split digital drawings into hundreds of separate layers (eyes, hair, mouth). Riggers map deformer grids in Live2D Cubism or Blender.',
        color(0, 30, 200));

      drawContentCard(colX, cardY + cardH + cardGap, colWidth, cardH, 
        '2. Real-Time Computer Vision & Tracking', 
        'Webcams or iOS TrueDepth cameras track 50+ facial landmarks via MediaPipe or OpenSeeFace to map head rotation and mouth shapes.',
        color(0, 30, 200));

      drawContentCard(colX, cardY + (cardH + cardGap) * 2, colWidth, cardH, 
        '3. Middleware & OBS Compositing', 
        'Software like VTube Studio reads tracking parameters, applies spring physics (hair/clothes bounce), and outputs transparent alpha video to OBS.',
        color(0, 30, 200));

    } else if (this.currentTab === 'misconceptions') {
      drawContentCard(colX, cardY, colWidth, cardH, 
        'MYTH: "It\'s fake or hiding behind a filter"', 
        'REALITY: Anonymity yields emotional honesty. Removing appearance judgment allows creators to express genuine humor far more freely.',
        color(0, 30, 200));

      drawContentCard(colX, cardY + cardH + cardGap, colWidth, cardH, 
        'MYTH: "It\'s a temporary gimmick or cartoon for kids"', 
        'REALITY: VTubing is the natural evolution of digital identity. Backed by major entertainment agencies filling stadium concerts, it is a global industry.',
        color(0, 30, 200));

      drawContentCard(colX, cardY + (cardH + cardGap) * 2, colWidth, cardH, 
        'MYTH: "They just turn on a filter and do no real work"', 
        'REALITY: VTubers act as executive producers, voice performers, and technical operators simultaneously while managing tracking rigs and live chat.',
        color(0, 30, 200));

    } else if (this.currentTab === 'lexicon') {
      // Interactive Lexicon Selection List
      var terms = Object.keys(this.lexiconData);
      var termH = 55;
      var termGap = 8;

      for (var t = 0; t < terms.length; t++) {
        var termKey = terms[t];
        var ty = cardY + t * (termH + termGap);
        var isSelected = this.selectedTerm === termKey;

        fill(isSelected ? color(0, 30, 200) : color(255));
        stroke(isSelected ? 0 : 200);
        strokeWeight(1);
        rect(colX, ty, colWidth, termH, 6);

        fill(isSelected ? 255 : 40);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(12);
        textStyle(BOLD);
        text(termKey, colX + 15, ty + termH / 2);

        fill(isSelected ? 220 : 120);
        textAlign(RIGHT, CENTER);
        textSize(10);
        text("Click to Inspect ➔", colX + colWidth - 15, ty + termH / 2);
      }
    }

    // =========================================================================
    // RIGHT COLUMN: INTERACTIVE SIMULATOR & ASSET PLACEHOLDER
    // =========================================================================
    var simX = 530;
    var simY = 70;
    var simWidth = 420;
    var simHeight = 360;

    // Tech Badges Above Monitor
    drawTechBadge(simX, simY, 110, 20, 'Live2D Rig v5.0');
    drawTechBadge(simX + 118, simY, 80, 20, '60 FPS');
    drawTechBadge(simX + 206, simY, 120, 20, 'Facial MoCap AI');

    var frameY = simY + 28;
    var frameH = simHeight - 28;

    // Frame Outer Glow
    var glowAlpha = map(sin(frameCount * 0.05), -1, 1, 30, 100);
    stroke(0, 210, 255, glowAlpha);
    strokeWeight(4);
    noFill();
    rect(simX - 2, frameY - 2, simWidth + 4, frameH + 4, 12);

    // Hardware Container Frame
    fill(47, 53, 66);
    stroke(116, 125, 140);
    strokeWeight(2);
    rect(simX, frameY, simWidth, frameH, 10);

    // Active Canvas Screen
    fill(30, 30, 40);
    noStroke();
    rect(simX + 10, frameY + 10, simWidth - 20, frameH - 55, 6);

    // Active Status Light Indicator
    var pulseSize = map(sin(frameCount * 0.1), -1, 1, 8, 11);
    fill(46, 213, 115);
    ellipse(simX + 30, frameY + frameH - 22, pulseSize, pulseSize);
    fill(220, 225, 230);
    textSize(11);
    textAlign(LEFT, CENTER);
    text('Live Face-Tracking Simulation Engine: ACTIVE', simX + 45, frameY + frameH - 22);

    // --- RENDER DIGITAL AVATAR OR DOWNLOADED IMAGE ASSET ---
    var avX = simX + simWidth / 2;
    var avY = frameY + 150;

    if (this.avatarImage) {
      // Image Asset Display Container
      imageMode(CENTER);
      image(this.avatarImage, avX, avY, 180, 220);
    } else {
      // Fallback Interactive Vector Rig Simulation
      fill(255, 118, 117);
      rect(avX - 55, avY - 40, 110, 120, 20);

      fill(255, 223, 185);
      ellipse(avX, avY + 10, 90, 95);

      this.eyeBlinkTimer += 1;
      var eyeOpenHeight = 14;
      if (this.eyeBlinkTimer % 120 > 112) {
        eyeOpenHeight = 2;
      }
      this.mouthScale = map(sin(frameCount * 0.15), -1, 1, 4, 18);

      fill(47, 53, 66);
      ellipse(avX - 18, avY, 12, eyeOpenHeight);
      ellipse(avX + 18, avY, 12, eyeOpenHeight);

      fill(255, 121, 121, 140);
      ellipse(avX - 25, avY + 18, 14, 8);
      ellipse(avX + 25, avY + 18, 14, 8);

      fill(235, 94, 85);
      ellipse(avX, avY + 22, 16, this.mouthScale);

      fill(255, 118, 117);
      triangle(avX - 45, avY - 30, avX, avY - 45, avX - 10, avY - 10);
      triangle(avX + 45, avY - 30, avX, avY - 45, avX + 10, avY - 10);
      rect(avX - 45, avY - 42, 90, 15, 4);
    }

    // =========================================================================
    // INFORMATIVE SUMMARY / CULTURE INSPECTOR CARD (BOTTOM BAR)
    // =========================================================================
    var cardX = 40;
    var cardY = 450;
    var cardWidth = 910;
    var cardHeight = 65;

    fill(214, 251, 231);
    stroke(46, 213, 115);
    strokeWeight(1);
    rect(cardX, cardY, cardWidth, cardHeight, 6);

    fill(30, 86, 49);
    noStroke();
    textAlign(LEFT, TOP);
    textFont('sans-serif');

    if (this.currentTab === 'lexicon') {
      var item = this.lexiconData[this.selectedTerm];
      textSize(12);
      textStyle(BOLD);
      text(`LEXICON INSPECTOR: ${item.title}`, cardX + 15, cardY + 12);
      textSize(11);
      textStyle(NORMAL);
      text(item.desc, cardX + 15, cardY + 32, cardWidth - 30, 30);
    } else {
      textSize(11);
      textStyle(NORMAL);
      textAlign(CENTER, CENTER);
      text('VTuber Industry Overview: Separating vocal performance from physical identity lowers creator burnout factors\nwhile granting full imaginative control over branding aesthetics, representing a major protective milestone in modern streaming.', cardX + cardWidth / 2, cardY + cardHeight / 2);
    }
  };

  // --- MOUSE CLICK DETECTOR ---
  this.mousePressed = function() {
    var mx = mouseX;
    var my = mouseY;

    var colX = 40;
    var colY = 70;
    var btnW = 110;
    var btnH = 28;
    var btnGap = 6;

    // Tab 1: Core Value
    if (mx >= colX && mx <= colX + btnW && my >= colY && my <= colY + btnH) {
      this.currentTab = 'value';
    }
    // Tab 2: Tech Pipeline
    else if (mx >= colX + btnW + btnGap && mx <= colX + (btnW + btnGap) + btnW && my >= colY && my <= colY + btnH) {
      this.currentTab = 'pipeline';
    }
    // Tab 3: Objections
    else if (mx >= colX + (btnW + btnGap) * 2 && mx <= colX + (btnW + btnGap) * 2 + btnW && my >= colY && my <= colY + btnH) {
      this.currentTab = 'misconceptions';
    }
    // Tab 4: Lexicon
    else if (mx >= colX + (btnW + btnGap) * 3 && mx <= colX + (btnW + btnGap) * 3 + btnW && my >= colY && my <= colY + btnH) {
      this.currentTab = 'lexicon';
    }

    // Lexicon Term Selection Clicks
    if (this.currentTab === 'lexicon') {
      var cardY = colY + 38;
      var termH = 55;
      var termGap = 8;
      var terms = Object.keys(this.lexiconData);

      for (var t = 0; t < terms.length; t++) {
        var ty = cardY + t * (termH + termGap);
        if (mx >= colX && mx <= colX + 460 && my >= ty && my <= ty + termH) {
          this.selectedTerm = terms[t];
          return;
        }
      }
    }
  };

  this.destroy = function() {};
}

// =========================================================================
// HELPER DRAWING FUNCTIONS
// =========================================================================

function drawTabButton(x, y, w, h, label, isActive) {
  push();
  if (isActive) {
    fill(0, 30, 200);
    stroke(0, 30, 200);
  } else {
    fill(220, 230, 235);
    stroke(180, 190, 200);
  }
  strokeWeight(1);
  rect(x, y, w, h, 6);

  fill(isActive ? 255 : 80);
  noStroke();
  textSize(10.5);
  textFont('sans-serif');
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text(label, x + w / 2, y + h / 2 - 1); 
  pop();
}

function drawContentCard(x, y, w, h, title, body, accentColor) {
  push();
  fill(255, 255, 255, 200);
  stroke(220, 225, 230);
  strokeWeight(1);
  rect(x, y, w, h, 6);

  fill(accentColor);
  noStroke();
  rect(x, y, 5, h, 6, 0, 0, 6);

  fill(47, 53, 66);
  textSize(12);
  textFont('sans-serif');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(title, x + 15, y + 10);

  fill(70, 80, 95);
  textSize(10);
  textFont('sans-serif');
  textStyle(NORMAL);
  text(body, x + 15, y + 28, w - 25);
  pop();
}

function drawTechBadge(x, y, w, h, label) {
  push();
  fill(47, 53, 66, 180);
  stroke(116, 125, 140);
  strokeWeight(1);
  rect(x, y, w, h, 10);

  fill(165, 255, 255);
  noStroke();
  textSize(10);
  textFont('sans-serif');
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  text(label, x + w / 2, y + h / 2 - 1);
  pop();
}