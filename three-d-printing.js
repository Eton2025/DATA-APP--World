



function ThreeDPrintingVisual() {
  this.name = '3D Printing';
  this.id = 'three-d-printing';

  // Hardcoded comparative manufacturing metrics (Percentages)
  this.chartData = [
    { metric: 'Material Waste', sm: 80, am: 10 },
    { metric: 'Energy Intensity', sm: 65, am: 35 },
    { metric: 'Prototype Time', sm: 90, am: 15 }
  ];

  // Right Side Data: Supply Chain Breakdown Components (Tons of CO2)
  this.co2Breakdown = [
    { source: 'Freight Logistics', tons: 6.2, colour: [255, 71, 87] },   // Crimson Red
    { source: 'Overseas Cargo',   tons: 4.8, colour: [255, 165, 2] },   // Amber
    { source: 'Heavy Packaging',   tons: 3.0, colour: [112, 161, 255] }, // Light Blue
    { source: '3D Printing Total', tons: 0.8, colour: [46, 213, 115] }   // Eco Emerald Green
  ];

  // Compressed layout coordinates to shift the bar chart left and make space
  this.layout = {
    leftMargin: 80,
    rightMargin: 440, // Optimized layout separation
    topMargin: 120,
    bottomMargin: 430, // Brought back down to maximize left chart breathing room
    pad: 10,
    marginSize: 40,
    numYTickLabels: 5,
    grid: true,
    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    }
  };

  this.preload = function() {};
  this.setup = function() {};

  this.draw = function() {
    background(255, 255, 150);

    // --- SCREEN TITLE HEADER ---
    fill(47, 53, 66);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    text('Subtractive vs. Additive (3D Printing) Manufacturing', width / 2, 45);

    // =========================================================================
    // LEFT VISUAL: COMPARISON CLUSTERED BAR CHART (COMPRESSED)
    // =========================================================================
    drawAxis(this.layout, 150);
    drawAxisLabels('Metrics', 'Efficiency Percentage Loss (%)', this.layout);
    
    // Draw Y-Axis baseline guide grids (0 to 100%)
    for (var yVal = 0; yVal <= 100; yVal += 25) {
      var yPos = map(yVal, 0, 100, this.layout.bottomMargin, this.layout.topMargin);
      stroke(220);
      line(this.layout.leftMargin, yPos, this.layout.rightMargin, yPos);
      
      noStroke();
      fill(116, 125, 140);
      textSize(10);
      textAlign(RIGHT, CENTER);
      text(yVal + '%', this.layout.leftMargin - 15, yPos);
    }

    // Render Clustered Bars
    var numGroups = this.chartData.length;
    var groupWidth = (this.layout.rightMargin - this.layout.leftMargin) / numGroups;
    var internalBarWidth = 26; 

    for (var i = 0; i < numGroups; i++) {
      var groupCenterX = this.layout.leftMargin + (i * groupWidth) + (groupWidth / 2);
      
      var smHeight = map(this.chartData[i].sm, 0, 100, 0, this.layout.bottomMargin - this.layout.topMargin);
      var amHeight = map(this.chartData[i].am, 0, 100, 0, this.layout.bottomMargin - this.layout.topMargin);

      // Subtractive Manufacturing Bar (Slate Blue)
      fill(116, 125, 140);
      rect(groupCenterX - internalBarWidth - 2, this.layout.bottomMargin - smHeight, internalBarWidth, smHeight, 2);

      // Additive Manufacturing Bar (Emerald Green)
      fill(46, 213, 115);
      rect(groupCenterX + 2, this.layout.bottomMargin - amHeight, internalBarWidth, amHeight, 2);

      // X-Axis metric labels
      noStroke();
      fill(47, 53, 66);
      textSize(10.5);
      textAlign(CENTER, TOP);
      text(this.chartData[i].metric, groupCenterX, this.layout.bottomMargin + 12);
    }

    // Chart Legends
    textSize(11);
    fill(116, 125, 140);   rect(this.layout.leftMargin, this.layout.topMargin - 30, 12, 12, 2);
    fill(47, 53, 66);      textAlign(LEFT, CENTER); text('Subtractive (SM)', this.layout.leftMargin + 18, this.layout.topMargin - 24);
    fill(46, 213, 115);    rect(this.layout.leftMargin + 140, this.layout.topMargin - 30, 12, 12, 2);
    fill(47, 53, 66);      text('3D Printing (AM)', this.layout.leftMargin + 158, this.layout.topMargin - 24);

    // =========================================================================
    // RIGHT VISUAL: CARBON EMISSIONS COMPONENT STACK BREAKDOWN
    // =========================================================================
    var rightStartX = 660; 
    var rightStartY = 150;
    var barHeight = 26;
    var spacing = 55;
    var maxRightBarWidth = 240; 

    // Section Header labels
    noStroke(); fill(47, 53, 66); textSize(13); textAlign(LEFT, TOP);
    text('Carbon Footprint Component Breakdown', 500, this.layout.topMargin - 20);

    // Render Right Grid Tracks (Scaled from 0 to 14.0 Tons)
    stroke(220); strokeWeight(1);
    for (var g = 0; g <= 4; g++) {
      var gridX = rightStartX + (maxRightBarWidth * (g * 0.25));
      line(gridX, rightStartY - 10, gridX, rightStartY + (spacing * this.co2Breakdown.length) - 15);
      
      noStroke(); fill(116, 125, 140); textSize(10); textAlign(CENTER, BOTTOM);
      var currentLabelVal = (g * 3.5).toFixed(1);
      text(currentLabelVal + ' t', gridX, rightStartY - 15);
      stroke(220);
    }

    // Render Carbon Component Rows
    for (var j = 0; j < this.co2Breakdown.length; j++) {
      var currentItem = this.co2Breakdown[j];
      var currentY = rightStartY + (j * spacing);

      // Label Description Left Alignment
      noStroke(); fill(47, 53, 66); textSize(11); textAlign(RIGHT, CENTER);
      text(currentItem.source, rightStartX - 15, currentY + barHeight / 2);

      // Track Background
      fill(235, 237, 243);
      rect(rightStartX, currentY, maxRightBarWidth, barHeight, 4);

      // Active Data Metric Fills
      var computedWidth = map(currentItem.tons, 0, 14.0, 0, maxRightBarWidth);
      fill(currentItem.colour[0], currentItem.colour[1], currentItem.colour[2]);
      rect(rightStartX, currentY, computedWidth, barHeight, 4);

      // High Contrast Values Placement
      fill(255); textSize(10); 
      if (computedWidth > 40) {
        textAlign(RIGHT, CENTER);
        text(currentItem.tons + ' t', rightStartX + computedWidth - 8, currentY + barHeight / 2);
      } else {
        fill(47, 53, 66); textAlign(LEFT, CENTER);
        text(currentItem.tons + ' t', rightStartX + computedWidth + 8, currentY + barHeight / 2);
      }
    }

    // =========================================================================
    // REPOSITIONED FOOTER SUMMARY CARD (RIGHT ALIGNED, YELLOW & WRAPPED)
    // =========================================================================
    var cardWidth = 400;  // Matches the width layout of the right section header
    var cardHeight = 80;  // Slightly taller to allow elegant paragraph block splitting
    var cardX = 500;      // Aligned exactly with the right side start coordinate
    var cardY = 385;      // Positioned directly below the breakdown metrics

    // Muted pastel yellow background container setup
    fill(254, 249, 195); 
    stroke(234, 179, 8); 
    strokeWeight(1);
    rect(cardX, cardY, cardWidth, cardHeight, 6);

    // Warm deep amber/brown text for high-contrast on yellow surface
    fill(133, 77, 14); 
    noStroke();
    textSize(11);
    
    // Kept at LEFT, CENTER for ideal scannability inside compact blocks
    textAlign(LEFT, CENTER);
    var paddingX = 15;
    text(
      '3D Printing Indicator: Global supply chains aggregate 14.0 tons of carbon waste via logistics, whereas localized on-demand production emits just 0.8 tons.', 
      cardX + paddingX, 
      cardY, 
      cardWidth - (paddingX * 2), 
      cardHeight
    );
  };

  this.destroy = function() {};
}