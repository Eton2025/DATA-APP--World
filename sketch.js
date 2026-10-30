




// =========================================================================
// PROJECT: MULTI-CATEGORY DATA VISUALISATION HUB
// =========================================================================

let climateBGM, vtuberBGM, spaceBGM;
let currentBGM = null;
let isMuted = false;

let kiaraImg, pekoraImg, guraImg, marineImg;

let sunRotationAngle = 0;
let marsRotationAngle = 0;
let turbineAngle = 0;
let spaceOrbitAngle = 0;
let bgTriangles = [];

var gallery;
var currentScreen = "HOME"; // Modes: "HOME", "CLIMATE_MENU", "VTUBER_MENU", "SPACE_MENU", "VISUAL"

function onErr(err) {
  console.warn("Asset load warning:", err);
}

function preload() {
  if (typeof soundFormats === 'function' && typeof loadSound === 'function') {
    soundFormats('mp3', 'wav');
    climateBGM = loadSound('assets/climate-bgm.mp3', null, onErr);
    vtuberBGM  = loadSound('assets/pekora-bgm.mp3', null, onErr);
    spaceBGM   = loadSound('assets/space-bgm.mp3', null, onErr);
  }
  
  kiaraImg  = loadImage('assets/Takanashi_Kiara_-_3D_Model_01.png', null, onErr);
  pekoraImg = loadImage('assets/Usada_Pekora_-_3D_Model_01-4.png', null, onErr);
  guraImg   = loadImage('assets/Gawr_Gura_-_3D_Model_01.png', null, onErr);
  marineImg = loadImage('assets/Houshou_Marine_-_3D_Model_01-3.png', null, onErr);
}

function setup() {
  let canvasContainer = select('#app');
  let c = createCanvas(windowWidth, windowHeight);
  if (canvasContainer) {
    c.parent(canvasContainer);
  }

  setTimeout(() => {
    resizeCanvas(windowWidth, windowHeight);
  }, 100);

  initBackgroundTriangles();

  if (typeof Gallery !== 'undefined') {
    gallery = new Gallery();
  } else {
    gallery = {
      visuals: [],
      currentCategory: 'climate',
      selectedVisual: null,
      addVisual: function(v, cat) { this.visuals.push(v); },
      setCategory: function(cat) { this.currentCategory = cat; },
      selectVisual: function(id) { 
        this.selectedVisual = this.visuals.find(v => v && v.id === id) || this.visuals[0]; 
      }
    };
  }

  // Register Climate Visuals
  if (typeof GlobalWarmingVisual !== 'undefined') gallery.addVisual(new GlobalWarmingVisual(), 'climate');
  if (typeof RenewableEnergyVisual !== 'undefined') gallery.addVisual(new RenewableEnergyVisual(), 'climate');
  if (typeof OceanParametersVisual !== 'undefined') gallery.addVisual(new OceanParametersVisual(), 'climate');
  if (typeof ClimateFrequencyVisual !== 'undefined') gallery.addVisual(new ClimateFrequencyVisual(), 'climate');
  if (typeof TransportEmissionsVisual !== 'undefined') gallery.addVisual(new TransportEmissionsVisual(), 'climate');
  if (typeof CarbonCycleVisual !== 'undefined') gallery.addVisual(new CarbonCycleVisual(), 'climate');

  // Register VTuber Visuals
  if (typeof WhatIsVtuberInfo !== 'undefined') gallery.addVisual(new WhatIsVtuberInfo(), 'vtuber');
  if (typeof VtuberPopularityVisual !== 'undefined') gallery.addVisual(new VtuberPopularityVisual(), 'vtuber');
  if (typeof VTuberCharityVisual !== 'undefined') gallery.addVisual(new VTuberCharityVisual(), 'vtuber');
  if (typeof VTuberMocapVisual !== 'undefined') gallery.addVisual(new VTuberMocapVisual(), 'vtuber');
  if (typeof VtuberSimulatorVisual !== 'undefined') gallery.addVisual(new VtuberSimulatorVisual(), 'vtuber');

  // Register Space Visuals
  if (typeof SolarSystemScale !== 'undefined') gallery.addVisual(new SolarSystemScale(), 'space');
  if (typeof StarTemperatures !== 'undefined') gallery.addVisual(new StarTemperatures(), 'space');
  if (typeof ExoplanetHabitability !== 'undefined') gallery.addVisual(new ExoplanetHabitability(), 'space');
  if (typeof SunDetails !== 'undefined') gallery.addVisual(new SunDetails(), 'space');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function isHover(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function draw() {
  updateAudioRouting();

  if (currentScreen === "HOME") {
    drawHomeScreen();
    resetMatrix();
    drawMuteButton();
  } else if (currentScreen === "CLIMATE_MENU") {
    drawClimateMenuScreen();
    resetMatrix();
    drawMuteButton();
  } else if (currentScreen === "VTUBER_MENU") {
    drawVtuberMenuScreen();
    resetMatrix();
    drawMuteButton();
  } else if (currentScreen === "SPACE_MENU") {
    drawSpaceMenuScreen();
    resetMatrix();
    drawMuteButton();
  } else if (currentScreen === "VISUAL") {
    if (gallery && gallery.currentCategory === 'climate') {
      background(254, 249, 195); 
    } else if (gallery && gallery.currentCategory === 'vtuber') {
      background(207, 250, 254); 
    } else if (gallery && gallery.currentCategory === 'space') {
      background(11, 15, 25);
    }

    // Render active visual canvas
    if (gallery && gallery.selectedVisual && typeof gallery.selectedVisual.draw === 'function') {
      gallery.selectedVisual.draw();
    }
    
    // FORCE RESET COORDINATE SYSTEM BEFORE DRAWING TOP OVERLAY BUTTONS
    resetMatrix();
    
    drawMenuButton(20, 15, 80, 30, [46, 213, 115], "← BACK", 11, [255, 255, 255]);
    drawMuteButton();
  }
}

// Keyboard ESC Fallback for Navigation
function keyPressed() {
  if (keyCode === ESCAPE) {
    if (typeof fullscreen === 'function' && fullscreen()) {
      fullscreen(false);
    }
    
    if (currentScreen === "VISUAL") {
      if (gallery && gallery.currentCategory === 'climate') currentScreen = "CLIMATE_MENU";
      else if (gallery && gallery.currentCategory === 'vtuber') currentScreen = "VTUBER_MENU";
      else if (gallery && gallery.currentCategory === 'space') currentScreen = "SPACE_MENU";
    } else if (currentScreen !== "HOME") {
      currentScreen = "HOME";
    }
    return false;
  }
}

// Global Audio Routing
function safePlayCheck(track) {
  return track && typeof track.isPlaying === 'function' && track.isPlaying();
}

function switchBGM(newTrack) {
  if (currentBGM === newTrack && safePlayCheck(currentBGM)) return;

  if (currentBGM && typeof currentBGM.pause === 'function') {
    try { currentBGM.pause(); } catch(e) {}
  }

  currentBGM = newTrack;

  if (!isMuted && currentBGM && typeof currentBGM.isLoaded === 'function' && currentBGM.isLoaded()) {
    try {
      currentBGM.setVolume(0.25);
      currentBGM.loop();
    } catch(e) {}
  }
}

function updateAudioRouting() {
  if (isMuted || currentScreen === "HOME") {
    if (safePlayCheck(currentBGM)) {
      try { currentBGM.pause(); } catch(e) {}
    }
    return;
  }

  if (gallery && gallery.currentCategory === 'climate') {
    switchBGM(climateBGM);
  } else if (gallery && gallery.currentCategory === 'vtuber') {
    switchBGM(vtuberBGM);
  } else if (gallery && gallery.currentCategory === 'space') {
    switchBGM(spaceBGM);
  }
}

function drawMuteButton() {
  let label = isMuted ? "🔇 MUTED" : "🔊 AUDIO";
  let btnColor = isMuted ? [220, 53, 69] : [40, 167, 69];
  drawMenuButton(width - 95, 15, 80, 30, btnColor, label, 10, [255, 255, 255]);
}

// Master Mouse Handler
function mousePressed() {
  if (typeof getAudioContext === 'function') {
    try {
      let ctx = getAudioContext();
      if (ctx && ctx.state !== 'running') ctx.resume();
    } catch(e) {}
  }

  // Audio Toggle (Screen-Space Check)
  if (isHover(width - 95, 15, 80, 30)) {
    isMuted = !isMuted;
    if (isMuted && currentBGM && typeof currentBGM.pause === 'function') {
      try { currentBGM.pause(); } catch(e) {}
    } else if (!isMuted && currentBGM && typeof currentBGM.loop === 'function') {
      try { currentBGM.loop(); } catch(e) {}
    }
    return false;
  }

  // GLOBAL BACK BUTTON INTERCEPTION
  if (currentScreen !== "HOME" && isHover(20, 15, 80, 30)) {
    if (typeof fullscreen === 'function' && fullscreen()) {
      fullscreen(false);
    }

    if (currentScreen === "VISUAL") {
      if (gallery && gallery.currentCategory === 'climate') currentScreen = "CLIMATE_MENU";
      else if (gallery && gallery.currentCategory === 'vtuber') currentScreen = "VTUBER_MENU";
      else if (gallery && gallery.currentCategory === 'space') currentScreen = "SPACE_MENU";
    } else {
      currentScreen = "HOME";
    }
    return false;
  }

  // HOME SCREEN
  if (currentScreen === "HOME") {
    let cardW = min(280, (width - 160) / 3);
    let cardH = 220;
    let startY = height * 0.32;
    let gap = (width - (cardW * 3)) / 4;

    let x1 = gap;
    let x2 = gap * 2 + cardW;
    let x3 = gap * 3 + cardW * 2;

    if (isHover(x1, startY, cardW, cardH)) {
      if (gallery) gallery.setCategory('climate');
      currentScreen = "CLIMATE_MENU";
    } else if (isHover(x2, startY, cardW, cardH)) {
      if (gallery) gallery.setCategory('vtuber');
      currentScreen = "VTUBER_MENU";
    } else if (isHover(x3, startY, cardW, cardH)) {
      if (gallery) gallery.setCategory('space');
      currentScreen = "SPACE_MENU";
    }
  } 

  // CLIMATE SUB-MENU
  else if (currentScreen === "CLIMATE_MENU") {
    let btnX = 30;
    let startY = 80;
    let h = 48;
    let climateVisuals = gallery.visuals.filter(v => v.category === 'climate' || (v.visual && v.visual.category === 'climate'));

    for (let i = 0; i < climateVisuals.length; i++) {
      if (isHover(btnX, startY + (i * h), 220, h - 4)) {
        let selected = climateVisuals[i];
        let visId = selected.id || (selected.visual && selected.visual.id) || i;
        if (typeof gallery.selectVisual === 'function') gallery.selectVisual(visId);
        currentScreen = "VISUAL";
        return false;
      }
    }
  } 

  // VTUBER SUB-MENU
  else if (currentScreen === "VTUBER_MENU") {
    let btnX = 30;
    let startY = 70;
    let h = 50;
    let vtuberVisuals = gallery.visuals.filter(v => v.category === 'vtuber' || (v.visual && v.visual.category === 'vtuber'));

    for (let j = 0; j < vtuberVisuals.length; j++) {
      if (isHover(btnX, startY + (j * h), 220, h - 5)) {
        let selected = vtuberVisuals[j];
        let visId = selected.id || (selected.visual && selected.visual.id) || j;
        if (typeof gallery.selectVisual === 'function') gallery.selectVisual(visId);
        currentScreen = "VISUAL";
        return false;
      }
    }
  }

  // SPACE SUB-MENU
  else if (currentScreen === "SPACE_MENU") {
    let btnX = 30;
    let startY = 80;
    let h = 50;
    let spaceVisuals = gallery.visuals.filter(v => v.category === 'space' || (v.visual && v.visual.category === 'space'));

    for (let k = 0; k < spaceVisuals.length; k++) {
      if (isHover(btnX, startY + (k * h), 220, h - 4)) {
        let selected = spaceVisuals[k];
        let visId = selected.id || (selected.visual && selected.visual.id) || k;
        if (typeof gallery.selectVisual === 'function') gallery.selectVisual(visId);
        currentScreen = "VISUAL";
        return false;
      }
    }
  }

  // ACTIVE VISUAL CLICK DELEGATION
  else if (currentScreen === "VISUAL") {
    if (gallery && gallery.selectedVisual && typeof gallery.selectedVisual.mousePressed === 'function') {
      gallery.selectedVisual.mousePressed();
    }
  }
}

// UI Drawing Routines
function drawMenuButton(x, y, w, h, bg, txt, sz, txCol, hasStroke) {
  txCol = txCol || [255, 255, 255];
  let hovered = isHover(x, y, w, h);

  if (hovered) cursor(HAND);

  push();
  if (hovered) {
    noFill();
    stroke(56, 189, 248, 180);
    strokeWeight(3);
    rect(x - 1, y - 1, w + 2, h + 2, 8);
    
    stroke(255, 255, 255, 220);
    strokeWeight(1.5);
    rect(x, y, w, h, 6);
  } else if (hasStroke) {
    stroke(0, 120, 215, 120); 
    strokeWeight(1.5);
    rect(x, y, w, h, 6);
  } else {
    noStroke();
  }
  
  let baseColor = hovered ? [min(255, bg[0] + 15), min(255, bg[1] + 15), min(255, bg[2] + 25)] : bg;
  fill(baseColor);
  rect(x, y, w, h, 6);
  
  noStroke(); 
  fill(hovered ? [255, 255, 255] : txCol);
  textAlign(CENTER, CENTER); 
  textSize(sz);
  textFont('Helvetica');
  textStyle(BOLD);
  text(txt, x + w / 2, y + h / 2);
  pop();
}

function drawHomeScreen() {
  background(255);

  stroke(0, 51, 204);
  strokeWeight(16);
  noFill();
  rect(8, 8, width - 16, height - 16);

  textAlign(CENTER, CENTER);
  fill(0, 0, 153);
  noStroke();
  textSize(min(36, width * 0.035));
  textFont('Helvetica');
  textStyle(BOLD);
  text("WORLD SUSTAINABILITY HUB", width / 2, height * 0.12);

  let rSunOffset = sin(frameCount * 0.05) * 0.5;
  drawAnimatedSun(width * 0.1, height * 0.12, 1.0 + rSunOffset * 0.1);
  drawAnimatedSun(width * 0.9, height * 0.12, 1.0 - rSunOffset * 0.1);

  let cardW = min(280, (width - 160) / 3);
  let cardH = 220;
  let startY = height * 0.32;
  let gap = (width - (cardW * 3)) / 4;

  let x1 = gap;
  drawMenuButton(x1, startY, cardW, cardH, [254, 249, 195], "", 12, [0,0,0], true);
  fill(50);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Climate Change", x1 + cardW / 2, startY + cardH - 35);
  drawAnimatedSun(x1 + cardW / 2, startY + cardH / 2 - 15, 1.2);

  let x2 = gap * 2 + cardW;
  drawMenuButton(x2, startY, cardW, cardH, [207, 250, 254], "", 12, [0,0,0], true);
  fill(50);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("VTuber Industry", x2 + cardW / 2, startY + cardH - 35);
  let hololiveScale = 1.0 + sin(frameCount * 0.08) * 0.08;
  drawHololiveBrandedTriangle(x2 + cardW / 2 - 50, startY + cardH / 2 - 15, hololiveScale);

  let x3 = gap * 3 + cardW * 2;
  drawMenuButton(x3, startY, cardW, cardH, [30, 35, 55], "", 12, [0,0,0], true);
  fill(240);
  textSize(18);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Space & Astronomy", x3 + cardW / 2, startY + cardH - 35);
  drawAnimatedMars(x3 + cardW / 2, startY + cardH / 2 - 15, 1.1);
}

function drawClimateMenuScreen() {
  background(254, 249, 195); 

  drawMenuButton(20, 15, 80, 30, [46, 213, 115], "← BACK", 11, [255, 255, 255]);

  let btnX = 30;
  let startY = 80;
  let h = 48;
  let cItems = [
    "Global Warming", "Renewable Energy", "Ocean Parameters", 
    "Climate Frequency", "Transport Emissions", "Carbon Cycle"
  ];

  for (let i = 0; i < cItems.length; i++) {
    drawMenuButton(btnX, startY + (i * h), 220, h - 4, [255, 255, 255], cItems[i], 11, [40, 40, 40], true);
  }

  drawAnimatedSun(width * 0.55, height * 0.25, 1.3);
  drawAnimatedSun(width * 0.82, height * 0.28, 0.9);
  drawWindTurbine(width * 0.72, height * 0.78, 1.3);
  drawSolarPanel(width * 0.48, height * 0.82, 1.2);
  drawPalmTree(width * 0.88, height * 0.72, 1.1);
  drawMeltingIce(width * 0.58, height * 0.48, 1.2);
}

function drawVtuberMenuScreen() {
  background(207, 250, 254); 

  drawFloatingTriangles();
  drawMenuButton(20, 15, 80, 30, [46, 213, 115], "← BACK", 11, [255, 255, 255]);
  drawHololiveBrandedTriangle(width * 0.48, 40, 0.95);

  let btnX = 30;
  let startY = 70;
  let h = 50;
  let vItems = [
    "What is a VTuber?", "VTuber Popularity", "VTuber Charity Drives", 
    "Tracking & Mocap Rigging", "VTuber Simulator"
  ];

  for (let j = 0; j < vItems.length; j++) {
    drawMenuButton(btnX, startY + (j * h), 220, h - 5, [255, 255, 255], vItems[j], 11, [40, 40, 40], true);
  }

  push();
  imageMode(CENTER);
  let spriteY = height * 0.62;
  if (guraImg)   image(guraImg, width * 0.62, spriteY, 120, 200);   
  if (pekoraImg) image(pekoraImg, width * 0.72, spriteY - 10, 90, 220);  
  if (marineImg) image(marineImg, width * 0.82, spriteY, 120, 210);  
  if (kiaraImg)  image(kiaraImg, width * 0.92, spriteY, 110, 210);  
  pop();
}

function drawSpaceMenuScreen() {
  background(11, 15, 25);

  drawStarryBackground();
  drawOrbitingSolarSystem(width * 0.68, height * 0.52, 0.95);
  drawMenuButton(20, 15, 80, 30, [46, 213, 115], "← BACK", 11, [255, 255, 255]);

  let btnX = 30;
  let startY = 80;
  let h = 50;
  let sItems = [
    "Solar System Scale", "Star Temperatures", "Exoplanet Habitability", "Sun Details"
  ];

  for (let k = 0; k < sItems.length; k++) {
    drawMenuButton(btnX, startY + (k * h), 220, h - 4, [25, 35, 60], sItems[k], 11, [220, 230, 255], true);
  }
}

function initBackgroundTriangles() {
  bgTriangles = [];
  for (let i = 0; i < 18; i++) {
    bgTriangles.push({
      x: random(280, windowWidth),
      y: random(0, windowHeight),
      size: random(14, 34),
      speedY: random(-0.3, -1.1),
      rot: random(TWO_PI),
      rotSpeed: random(-0.02, 0.02),
      alpha: random(60, 170)
    });
  }
}

function drawFloatingTriangles() {
  push();
  noStroke();
  for (let t of bgTriangles) {
    fill(3, 169, 244, t.alpha); 
    push();
    translate(t.x, t.y);
    rotate(t.rot);
    triangle(-t.size / 2, t.size / 2, t.size / 2, t.size / 2, 0, -t.size / 2);
    pop();

    t.y += t.speedY;
    t.rot += t.rotSpeed;
    if (t.y < -40) {
      t.y = height + 40;
      t.x = random(280, width);
    }
  }
  pop();
}

function drawHololiveBrandedTriangle(x, y, s = 1) {
  push();
  translate(x, y);
  scale(s);
  
  noStroke();
  fill(3, 169, 244);
  triangle(-20, -22, -20, 22, 22, 0);
  fill(255);
  triangle(-20, -14, -20, 22, 16, 22);
  fill(56, 189, 248);
  triangle(-18, -14, -18, 16, 12, 0);

  fill(3, 169, 244);
  textSize(22);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  textFont('Helvetica');
  text("hololive", 32, -4);
  
  fill(100, 130, 160);
  textSize(11);
  textStyle(ITALIC);
  text("p r o d u c t i o n", 34, 16);
  pop();
}

function drawAnimatedSun(x, y, scaleFactor = 1) {
  push();
  translate(x, y);
  scale(scaleFactor);
  rotate(radians(sunRotationAngle));
  fill(255, 215, 0);
  stroke(255, 160, 0);
  strokeWeight(2);
  
  for (let i = 0; i < 8; i++) {
    rotate(PI / 4);
    line(0, 0, 22, 0);
  }
  ellipse(0, 0, 26, 26);
  pop();

  sunRotationAngle -= 1.0; 
}

function drawAnimatedMars(x, y, scaleFactor = 1) {
  push();
  translate(x, y);
  scale(scaleFactor);
  rotate(radians(marsRotationAngle));
  fill(225, 75, 55); 
  noStroke();
  ellipse(0, 0, 32, 32);
  
  fill(170, 40, 0, 180);
  ellipse(-5, -4, 12, 8);
  ellipse(6, 6, 10, 6);
  pop();

  marsRotationAngle -= 0.6; 
}

function drawWindTurbine(x, y, s = 1) {
  push();
  translate(x, y);
  scale(s);

  fill(230);
  stroke(180);
  strokeWeight(1);
  triangle(-4, 0, 4, 0, 0, -80);

  translate(0, -80);
  fill(200);
  ellipse(0, 0, 10, 10);

  rotate(radians(turbineAngle));
  fill(245);
  noStroke();
  for (let i = 0; i < 3; i++) {
    rotate(TWO_PI / 3);
    ellipse(0, -22, 5, 40);
  }
  pop();

  turbineAngle += 2.5; 
}

function drawSolarPanel(x, y, s = 1) {
  push();
  translate(x, y);
  scale(s);

  stroke(100);
  strokeWeight(3);
  line(0, 0, 0, 15);

  fill(25, 60, 140);
  stroke(220);
  strokeWeight(1.5);
  quad(-30, -5, 30, -5, 24, -28, -24, -28);

  stroke(120, 200, 255, 180);
  strokeWeight(1);
  line(0, -5, 0, -28);
  line(-14, -5, -11, -28);
  line(14, -5, 11, -28);
  line(-26, -16, 26, -16);
  pop();
}

function drawPalmTree(x, y, s = 1) {
  push();
  translate(x, y);
  scale(s);

  fill(238, 214, 136);
  noStroke();
  arc(0, 10, 110, 45, PI, TWO_PI);

  stroke(139, 69, 19);
  strokeWeight(7);
  noFill();
  bezier(0, 0, -5, -20, 10, -45, 5, -65);

  translate(5, -65);
  stroke(34, 139, 34);
  strokeWeight(3);
  fill(46, 139, 87);

  for (let i = 0; i < 5; i++) {
    rotate(TWO_PI / 5);
    arc(18, 0, 35, 18, PI, PI + HALF_PI);
  }
  pop();
}

function drawMeltingIce(x, y, s = 1) {
  push();
  translate(x, y);
  scale(s);

  fill(30, 144, 255, 180);
  noStroke();
  rect(-50, 0, 100, 20, 0, 0, 10, 10);

  fill(230, 248, 255);
  stroke(180, 220, 245);
  strokeWeight(1.5);
  beginShape();
  vertex(-40, 0);
  vertex(-25, -28);
  vertex(-10, -20);
  vertex(8, -35);
  vertex(32, -8);
  vertex(40, 0);
  endShape(CLOSE);

  fill(160, 215, 255);
  noStroke();
  let dripY1 = (frameCount % 20) * 0.8;
  let dripY2 = ((frameCount + 10) % 20) * 0.8;
  ellipse(-10, dripY1, 3, 5);
  ellipse(12, dripY2, 3, 5);
  pop();
}

function drawStarryBackground() {
  push();
  randomSeed(1001);
  strokeWeight(1);
  for (let i = 0; i < 90; i++) {
    let sx = random(width);
    let sy = random(height);
    let size = random(1, 3);
    let alpha = random(120, 255);
    
    if (i % 5 === 0) {
      alpha = 140 + 115 * sin(frameCount * 0.05 + i);
    }
    
    stroke(255, 255, 255, alpha);
    fill(255, 255, 255, alpha);
    ellipse(sx, sy, size, size);
  }
  pop();
}

function drawOrbitingSolarSystem(cx, cy, scaleFactor = 1) {
  push();
  translate(cx, cy);
  scale(scaleFactor);

  noStroke();
  fill(255, 204, 0, 70);
  ellipse(0, 0, 54, 54);
  fill(255, 140, 0, 140);
  ellipse(0, 0, 42, 42);
  fill(255, 220, 50);
  ellipse(0, 0, 32, 32);

  let planets = [
    { r: 38,  sz: 5,  col: [170, 170, 170], speed: 3.0 },
    { r: 60,  sz: 8,  col: [224, 199, 120], speed: 2.2 },
    { r: 86,  sz: 9,  col: [65, 140, 240],  speed: 1.6 },
    { r: 110, sz: 7,  col: [225, 75, 55],   speed: 1.2 },
    { r: 142, sz: 16, col: [205, 160, 110], speed: 0.8 },
    { r: 180, sz: 13, col: [230, 200, 130], speed: 0.5, ring: true },
    { r: 212, sz: 10, col: [120, 215, 230], speed: 0.3 },
    { r: 238, sz: 10, col: [60, 100, 230],  speed: 0.2 }
  ];

  for (let p of planets) {
    noFill();
    stroke(255, 255, 255, 30);
    strokeWeight(1);
    ellipse(0, 0, p.r * 2, p.r * 2);

    let angle = radians(spaceOrbitAngle * p.speed);
    let px = cos(angle) * p.r;
    let py = sin(angle) * p.r;

    noStroke();
    fill(p.col[0], p.col[1], p.col[2]);
    ellipse(px, py, p.sz, p.sz);

    if (p.ring) {
      stroke(210, 180, 120, 180);
      strokeWeight(1.5);
      noFill();
      ellipse(px, py, p.sz * 1.9, p.sz * 0.7);
    }
  }

  pop();

  spaceOrbitAngle -= 0.8;
}