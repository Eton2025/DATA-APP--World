



function GlobalWarmingVisual() {
  this.name = 'Global Warming Dynamics';
  this.id = 'global-warming';

  // 1. Hardcoded data points extracted directly from the Page 2 NOAA graph
  this.data = [
    { year: 1860, co2: 286, temp: -0.30 },
    { year: 1880, co2: 291, temp: -0.20 },
    { year: 1900, co2: 296, temp: -0.25 },
    { year: 1920, co2: 303, temp: -0.23 },
    { year: 1940, co2: 311, temp: 0.05 },
    { year: 1960, co2: 317, temp: -0.03 },
    { year: 1980, co2: 338, temp: 0.25 },
    { year: 2000, co2: 369, temp: 0.62 },
    { year: 2020, co2: 414, temp: 1.02 },
    { year: 2024, co2: 425, temp: 1.22 }
  ];

  // Additional Greenhouse Gas (GHG) breakdown data for comparative metrics
  this.ghgData = [
    { gas: 'Carbon Dioxide (CO2)', share: 76, potency: '1x (Baseline)', color: [0, 161, 0] },
    { gas: 'Methane (CH4)', share: 16, potency: '28-36x more potent', color: [240, 147, 43] },
    { gas: 'Nitrous Oxide (N2O)', share: 6, potency: '265x more potent', color: [190, 46, 221] },
    { gas: 'Fluorinated Gases', share: 2, potency: 'Thousands x more potent', color: [87, 101, 116] }
  ];

  // Axis boundary layout setup (adjusted bottomMargin to make room for GHG stats)
  this.layout = {
    leftMargin: 80,
    rightMargin: 900, 
    topMargin: 60,
    bottomMargin: 390, // Raised slightly to allow room for GHG panel below
    pad: 10,
    marginSize: 40,
    numYTickLabels: 6,
    grid: true,
    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    }
  };

  // Min and Max data tracking limits for perfect pixel mapping
  this.minYear = 1860;
  this.maxYear = 2024;
  this.minTemp = -0.6;
  this.maxTemp = 1.4;
  this.minCo2 = 260;
  this.maxCo2 = 440;

  this.preload = function() {};
  this.setup = function() {};

  // Custom mapping helper functions bound to our timeline scales
  this.mapYearToX = function(value) {
    return map(value, this.minYear, this.maxYear, this.layout.leftMargin, this.layout.rightMargin);
  };

  this.mapTempToY = function(value) {
    return map(value, this.minTemp, this.maxTemp, this.layout.bottomMargin, this.layout.topMargin);
  };

  this.mapCo2ToY = function(value) {
    return map(value, this.minCo2, this.maxCo2, this.layout.bottomMargin, this.layout.topMargin);
  };

  this.draw = function() {
    background(255, 255, 150);

    // Draw the grid framework axes using helper-functions.js
    drawAxis(this.layout, 150);
    
    // --- 1. TITLE HEADER ---
    fill(47, 53, 66);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text('Atmospheric Carbon Dioxide vs. Global Temperature (1860-2024)', width / 2, 25);

    // --- 2. X-AXIS TIMELINE LABELS ---
    for (var i = 0; i < this.data.length; i++) {
      drawXAxisTickLabel(this.data[i].year, this.layout, this.mapYearToX.bind(this));
    }
    textSize(12);
    fill(116, 125, 140);
    textAlign(CENTER, TOP);
    text('Timeline (Years)', width / 2, this.layout.bottomMargin + 25);

    // --- 3. CUSTOM LEFT Y-AXIS (TEMPERATURE) ---
    textAlign(RIGHT, CENTER);
    textSize(11);
    for (var tVal = this.minTemp; tVal <= this.maxTemp + 0.01; tVal += 0.2) {
      var yPos = this.mapTempToY(tVal);
      
      stroke(220, 225, 230);
      strokeWeight(1);
      line(this.layout.leftMargin, yPos, this.layout.rightMargin, yPos);
      
      noStroke();
      fill(255, 71, 87); 
      text(tVal.toFixed(1) + '°C', this.layout.leftMargin - 10, yPos);
    }
    
    push();
    translate(this.layout.leftMargin - 50, (this.layout.topMargin + this.layout.bottomMargin) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    textSize(12);
    fill(255, 71, 87);
    text('Global Temperature Anomaly (°C)', 0, 0);
    pop();

    // --- 4. CUSTOM SECONDARY RIGHT Y-AXIS (CO2 CONCENTRATION) ---
    stroke(116, 125, 140);
    strokeWeight(1);
    line(this.layout.rightMargin, this.layout.topMargin, this.layout.rightMargin, this.layout.bottomMargin);

    textAlign(LEFT, CENTER);
    textSize(11);
    for (var co2Val = this.minCo2; co2Val <= this.maxCo2; co2Val += 30) {
      var yPosCo2 = this.mapCo2ToY(co2Val);
      
      stroke(116, 125, 140);
      line(this.layout.rightMargin, yPosCo2, this.layout.rightMargin + 6, yPosCo2);
      
      noStroke();
      fill(0, 161, 0); 
      text(co2Val + ' PPM', this.layout.rightMargin + 12, yPosCo2);
    }

    push();
    translate(this.layout.rightMargin + 75, (this.layout.topMargin + this.layout.bottomMargin) / 2);
    rotate(HALF_PI);
    textAlign(CENTER, BOTTOM);
    textSize(12);
    fill(0, 161, 0);
    text('Carbon Dioxide Concentration (PPM)', 0, 0);
    pop();

    // --- 5. RENDER TEMPERATURE DATA VECTOR LINE ---
    noFill();
    stroke(255, 71, 87);
    strokeWeight(3);
    beginShape();
    for (var t = 0; t < this.data.length; t++) {
      var xT = this.mapYearToX(this.data[t].year);
      var yT = this.mapTempToY(this.data[t].temp);
      vertex(xT, yT);
    }
    endShape();

    // --- 6. RENDER CO2 DATA VECTOR LINE ---
    noFill();
    stroke(0, 161, 0);
    strokeWeight(3);
    beginShape();
    for (var c = 0; c < this.data.length; c++) {
      var xC = this.mapYearToX(this.data[c].year);
      var yC = this.mapCo2ToY(this.data[c].co2);
      vertex(xC, yC);
    }
    endShape();

    // --- 7. DRAW PLOT DATA LEGEND BOTTOM KEY ---
    textSize(11);
    noStroke();
    
    fill(255, 71, 87);
    rect(this.layout.leftMargin, this.layout.bottomMargin + 50, 12, 12);
    fill(47, 53, 66);
    textAlign(LEFT, CENTER);
    text('Global Temperature Anomaly (°C)', this.layout.leftMargin + 18, this.layout.bottomMargin + 56);

    fill(0, 161, 0);
    rect(this.layout.leftMargin + 250, this.layout.bottomMargin + 50, 12, 12);
    fill(47, 53, 66);
    text('Carbon Dioxide Concentration (PPM)', this.layout.leftMargin + 268, this.layout.bottomMargin + 56);

    // --- 8. NEW: GREENHOUSE GAS (GHG) BREAKDOWN & POTENCY PANEL ---
    fill(240, 245, 245);
    stroke(200, 210, 210);
    rect(this.layout.leftMargin, this.layout.bottomMargin + 75, this.layout.plotWidth(), 85, 6);

    noStroke();
    fill(47, 53, 66);
    textSize(12);
    textAlign(LEFT, TOP);
    text('Global Greenhouse Gas Share & Heat-Trapping Potency (Comparative Metrics):', this.layout.leftMargin + 15, this.layout.bottomMargin + 83);

    var colWidth = this.layout.plotWidth() / 4;
    for (var g = 0; g < this.ghgData.length; g++) {
      var gX = this.layout.leftMargin + 15 + (g * colWidth);
      var gY = this.layout.bottomMargin + 110;

      // Color indicator square
      fill(this.ghgData[g].color[0], this.ghgData[g].color[1], this.ghgData[g].color[2]);
      rect(gX, gY, 10, 10);

      // Gas text details
      fill(47, 53, 66);
      textSize(11);
      text(this.ghgData[g].gas + ' (' + this.ghgData[g].share + '%)', gX + 16, gY - 1);
      
      fill(116, 125, 140);
      textSize(10);
      text('Potency: ' + this.ghgData[g].potency, gX + 16, gY + 14);
    }
  };

  this.destroy = function() {};
}