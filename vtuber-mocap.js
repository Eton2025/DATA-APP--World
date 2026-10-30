class VTuberMocapVisual {
  constructor() {
    this.id = "vtuber_mocap";
    this.title = "VTUBER TRACKING & RIGGING TECH";
    this.category = "vtubers";
    this.activeTab = 0; // 0: Face ARKit, 1: Hand/Finger, 2: Full Body Mocap, 3: Virtual Concert

    // Face mesh points simulation
    this.faceMesh = [];
    this.initFaceMesh();

    // Concert particle effects
    this.laserAngles = [0, 0, 0, 0];
    this.crowdParticles = [];
    this.initConcertParticles();
  }

  initFaceMesh() {
    this.faceMesh = [];
    // Generate facial landmark node positions
    for (let i = 0; i < 38; i++) {
      let a = map(i, 0, 38, 0, TWO_PI);
      this.faceMesh.push({
        x: cos(a) * random(50, 90),
        y: sin(a) * random(60, 100),
        baseX: cos(a) * random(50, 90),
        baseY: sin(a) * random(60, 100)
      });
    }
  }

  initConcertParticles() {
    this.crowdParticles = [];
    for (let i = 0; i < 120; i++) {
      this.crowdParticles.push({
        x: random(-250, 250),
        y: random(80, 160),
        size: random(3, 8),
        color: [random(100, 255), random(50, 200), random(200, 255)],
        glowOffset: random(100)
      });
    }
  }

  draw() {
    background(6, 8, 20);

    // Header Title
    textAlign(CENTER, TOP);
    fill(255);
    textSize(20);
    textFont('Helvetica');
    textStyle(BOLD);
    text(this.title, width / 2, 18);

    // Sub Navigation Tabs
    this.drawSubTabs(width / 2, 50);

    // Center Display Coordinates
    let cx = width / 2;
    let cy = 260;

    push();
    translate(cx, cy);
    switch (this.activeTab) {
      case 0: this.drawFaceARKitStage(); break;
      case 1: this.drawHandTrackingStage(); break;
      case 2: this.drawFullBodyMocapStage(); break;
      case 3: this.drawVirtualConcertStage(); break;
    }
    pop();

    // Telemetry HUD overlay (Top Right)
    this.drawLiveTelemetryHUD(width - 150, 100);

    // Contextual Info Box
    this.drawInfoBox(width / 2, 475);
  }

  // =========================================================================
  // STAGE VISUALIZERS
  // =========================================================================

  // Stage 1: Webcam & iPhone ARKit 52 Blendshape Face Mesh
  drawFaceARKitStage() {
    // Interactivity: Face mesh tilts toward mouse position
    let targetX = map(mouseX, 0, width, -30, 30);
    let targetY = map(mouseY, 0, height, -20, 20);

    push();
    translate(targetX, targetY);

    // Outer Head Frame Wireframe
    stroke(0, 220, 255, 120);
    strokeWeight(1.5);
    noFill();
    ellipse(0, 0, 170, 220);

    // Connect mesh node points
    stroke(0, 180, 255, 80);
    strokeWeight(1);
    for (let i = 0; i < this.faceMesh.length; i++) {
      let pt1 = this.faceMesh[i];
      let pt2 = this.faceMesh[(i + 1) % this.faceMesh.length];
      line(pt1.x, pt1.y, pt2.x, pt2.y);
      if (i % 3 === 0) line(pt1.x, pt1.y, 0, 0);
    }

    // Interactive Eyes (Blendshape Blink simulation)
    let eyeBlink = sin(frameCount * 0.08) > 0.8 ? 2 : 22;
    fill(0, 220, 255);
    noStroke();
    ellipse(-38, -30, 28, eyeBlink);
    ellipse(38, -30, 28, eyeBlink);

    // Mouth Tracking Mesh
    let jawOpen = map(sin(frameCount * 0.05), -1, 1, 6, 30);
    stroke(255, 100, 180);
    strokeWeight(2);
    noFill();
    ellipse(0, 45, 40, jawOpen);

    // Node Keypoints
    fill(255, 220, 0);
    noStroke();
    ellipse(-38, -30, 6, 6);
    ellipse(38, -30, 6, 6);
    ellipse(0, 5, 6, 6); // Nose bridge
    ellipse(0, 45 - jawOpen / 2, 5, 5); // Upper Lip
    ellipse(0, 45 + jawOpen / 2, 5, 5); // Lower Lip

    pop();

    // On-screen Blendshape metrics bar list
    this.drawBlendshapeDataList(-380, -110);
  }

  // Stage 2: Leap Motion Infrared Skeletal Hand & Finger Tracking
  drawHandTrackingStage() {
    // IR Sensor Beam emitter base
    fill(30, 40, 65);
    stroke(0, 200, 255);
    strokeWeight(1.5);
    rect(-70, 120, 140, 25, 6);
    fill(0, 220, 255, 150);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text("IR DEPTH SENSOR", 0, 132);

    // IR Light Cone
    fill(0, 200, 255, 20);
    noStroke();
    triangle(0, 120, -180, -110, 180, -110);

    // Dynamic hand bone articulation based on wave motion
    let wave = sin(frameCount * 0.06) * 20;

    push();
    translate(0, -10 + wave);

    // Wrist / Palm base
    let palmX = 0;
    let palmY = 50;

    let fingerBones = [
      { name: "Thumb",  angle: -0.8, len: 55 },
      { name: "Index",  angle: -0.4, len: 75 },
      { name: "Middle", angle: 0.0,  len: 85 },
      { name: "Ring",   angle: 0.35, len: 78 },
      { name: "Pinky",  angle: 0.65, len: 60 }
    ];

    stroke(0, 255, 200);
    strokeWeight(3);

    for (let f of fingerBones) {
      let curX = palmX;
      let curY = palmY;

      // Draw 3 joint segments per finger
      for (let j = 1; j <= 3; j++) {
        let segLen = f.len / 3;
        let flex = sin(frameCount * 0.08 + f.angle * 2) * 8;
        let nextX = curX + sin(f.angle + flex * 0.02) * segLen;
        let nextY = curY - cos(f.angle + flex * 0.02) * segLen;

        line(curX, curY, nextX, nextY);

        // Joint Node Dot
        fill(255, 220, 0);
        noStroke();
        ellipse(nextX, nextY, 7, 7);

        stroke(0, 255, 200);
        strokeWeight(2.5);
        curX = nextX;
        curY = nextY;
      }
    }

    // Palm Wireframe Connections
    fill(0, 200, 255, 60);
    stroke(0, 220, 255);
    strokeWeight(1.5);
    ellipse(palmX, palmY, 45, 35);

    pop();
  }

  // Stage 3: Full-Body Inertial (IMU) & Optical Motion Capture Suit
  drawFullBodyMocapStage() {
    let bounce = sin(frameCount * 0.08) * 8;

    push();
    translate(0, bounce);

    // Skeleton Joint Coordinates
    let joints = {
      head: { x: 0, y: -100 },
      neck: { x: 0, y: -70 },
      lShoulder: { x: -45, y: -65 },
      rShoulder: { x: 45, y: -65 },
      lElbow: { x: -70, y: -15 + sin(frameCount * 0.1) * 10 },
      rElbow: { x: 70, y: -15 - sin(frameCount * 0.1) * 10 },
      lHand: { x: -85, y: 35 + sin(frameCount * 0.1) * 15 },
      rHand: { x: 85, y: 35 - sin(frameCount * 0.1) * 15 },
      pelvis: { x: 0, y: 15 },
      lKnee: { x: -25, y: 75 },
      rKnee: { x: 25, y: 75 },
      lAnkle: { x: -30, y: 130 },
      rAnkle: { x: 30, y: 130 }
    };

    // Bone Connections
    stroke(0, 180, 255);
    strokeWeight(3);
    noFill();

    // Spine & Torso
    line(joints.head.x, joints.head.y, joints.neck.x, joints.neck.y);
    line(joints.neck.x, joints.neck.y, joints.pelvis.x, joints.pelvis.y);
    line(joints.lShoulder.x, joints.lShoulder.y, joints.rShoulder.x, joints.rShoulder.y);

    // Arms
    line(joints.lShoulder.x, joints.lShoulder.y, joints.lElbow.x, joints.lElbow.y);
    line(joints.lElbow.x, joints.lElbow.y, joints.lHand.x, joints.lHand.y);
    line(joints.rShoulder.x, joints.rShoulder.y, joints.rElbow.x, joints.rElbow.y);
    line(joints.rElbow.x, joints.rElbow.y, joints.rHand.x, joints.rHand.y);

    // Legs
    line(joints.pelvis.x, joints.pelvis.y, joints.lKnee.x, joints.lKnee.y);
    line(joints.lKnee.x, joints.lKnee.y, joints.lAnkle.x, joints.lAnkle.y);
    line(joints.pelvis.x, joints.pelvis.y, joints.rKnee.x, joints.rKnee.y);
    line(joints.rKnee.x, joints.rKnee.y, joints.rAnkle.x, joints.rAnkle.y);

    // Head Bubble
    fill(0, 220, 255, 40);
    stroke(0, 220, 255);
    strokeWeight(2);
    ellipse(joints.head.x, joints.head.y, 45, 45);

    // Render Glowing IMU Sensor Nodes on Key Joints
    for (let key in joints) {
      let j = joints[key];
      fill(255, 50, 120);
      noStroke();
      ellipse(j.x, j.y, 9, 9);
      fill(255, 220, 0, 180);
      ellipse(j.x, j.y, 4, 4);
    }

    pop();
  }

  // Stage 4: 3D Virtual Concert Stage & Lighting Rig
  drawVirtualConcertStage() {
    // Stage Floor Grid
    stroke(80, 40, 150, 120);
    strokeWeight(1);
    for (let x = -280; x <= 280; x += 40) {
      line(x, 40, x * 1.4, 150);
    }
    for (let y = 40; y <= 150; y += 22) {
      line(-280, y, 280, y);
    }

    // Sweeping Stage Lasers
    for (let i = 0; i < 4; i++) {
      let lx = -210 + i * 140;
      let sweep = sin(frameCount * 0.04 + i) * 120;
      stroke(i % 2 === 0 ? color(255, 0, 150, 180) : color(0, 220, 255, 180));
      strokeWeight(3);
      line(lx, -140, lx + sweep, 40);
    }

    // Avatar Spotlight Core
    noStroke();
    fill(255, 255, 200, 30);
    triangle(0, -150, -90, 80, 90, 80);

    // Virtual Avatar Silhouette on Stage
    fill(255, 0, 180);
    ellipse(0, -10, 22, 22); // Head
    rect(-12, 5, 24, 38, 4); // Torso
    stroke(255, 255, 255);
    strokeWeight(2);
    line(-10, 43, -15, 80);
    line(10, 43, 15, 80);

    // Penlight Crowd Glow Particles
    noStroke();
    for (let p of this.crowdParticles) {
      let glow = sin(frameCount * 0.08 + p.glowOffset) * 80 + 170;
      fill(p.color[0], p.color[1], p.color[2], glow);
      ellipse(p.x, p.y, p.size, p.size);
    }
  }

  // =========================================================================
  // HELPER UI OVERLAYS
  // =========================================================================

  drawBlendshapeDataList(x, y) {
    fill(10, 18, 35, 210);
    stroke(0, 180, 255, 120);
    strokeWeight(1);
    rect(x, y, 150, 130, 6);

    textAlign(LEFT, TOP);
    fill(0, 220, 255);
    textSize(10);
    textStyle(BOLD);
    text("ARKit BLENDSHAPES", x + 10, y + 8);

    let shapes = [
      { name: "EyeBlinkLeft", val: constrain(sin(frameCount * 0.08) * 0.5 + 0.5, 0, 1) },
      { name: "JawOpen", val: map(sin(frameCount * 0.05), -1, 1, 0.1, 0.85) },
      { name: "MouthSmile", val: 0.72 },
      { name: "BrowsLower", val: 0.15 }
    ];

    noStroke();
    for (let i = 0; i < shapes.length; i++) {
      let sy = y + 28 + i * 24;
      fill(200);
      textSize(9);
      textStyle(NORMAL);
      text(shapes[i].name, x + 10, sy);

      // Value bar
      fill(30, 50, 80);
      rect(x + 10, sy + 11, 130, 5, 2);
      fill(0, 255, 180);
      rect(x + 10, sy + 11, 130 * shapes[i].val, 5, 2);
    }
  }

  drawLiveTelemetryHUD(x, y) {
    fill(10, 18, 35, 200);
    stroke(0, 200, 255, 100);
    strokeWeight(1);
    rect(x - 65, y, 130, 75, 6);

    textAlign(CENTER, TOP);
    fill(255, 220, 0);
    textSize(10);
    textStyle(BOLD);
    text("TRACKING HUD", x, y + 8);

    fill(180, 220, 255);
    textSize(9);
    textStyle(NORMAL);
    text("FPS: 60.0 (Stable)", x, y + 24);
    text("Latency: 11.2 ms", x, y + 38);
    text("Solver: VTube / ARKit", x, y + 52);
  }

  drawSubTabs(x, y) {
    let tabs = ["1. Face Tracking (ARKit)", "2. Hand Skeletal", "3. Full-Body Mocap", "4. Virtual 3D Stage"];
    let tw = 170;
    let th = 26;
    let startX = x - (tabs.length * tw) / 2;

    for (let i = 0; i < tabs.length; i++) {
      let tx = startX + i * tw;
      let isSelected = this.activeTab === i;

      fill(isSelected ? color(0, 180, 255) : color(20, 30, 50));
      stroke(isSelected ? 255 : 70);
      strokeWeight(1);
      rect(tx + 4, y, tw - 8, th, 5);

      fill(isSelected ? 0 : 220);
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
      "Face Tracking (ARKit): iPhone TrueDepth sensors project 30,000 IR dots to track 52 individual facial blendshapes (eyebrows, winks, jaw rotation) in real-time.",
      "Hand Skeletal Rigging: Infrared camera sensors track finger bone joints without physical gloves, calculating gesture math for interactive streaming stream inputs.",
      "Full-Body Motion Capture: Inertial Measurement Units (IMUs) and optical camera markers map live body physics to 3D avatar rigs with real-time inverse kinematics (IK).",
      "Virtual 3D Concert Stages: Rendered live in engines like Unity or Unreal, allowing real-time camera angles, reactive lighting, and crowd penlight interaction."
    ];

    textAlign(LEFT, TOP);
    fill(0, 220, 255);
    textSize(12);
    textStyle(BOLD);
    text("VTUBER TECHNOLOGY MECHANICS:", x - 400, y + 10);

    fill(210);
    textSize(11);
    textStyle(NORMAL);
    text(descriptions[this.activeTab], x - 400, y + 32, 800, 32);
  }

  mousePressed() {
    let mx = (mouseX / width) * 1024;
    let my = (mouseY / height) * 576;

    // Sub-Tabs Click handling
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
  }
}