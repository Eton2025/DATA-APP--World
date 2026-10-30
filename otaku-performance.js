


function OtakuPerformanceVisual() {
  this.name = 'Otaku Performance';
  this.id = 'otaku-performance';

  // 1. Exact VTuber Superchat Earnings Data from the provided 2025 table (in Thousands USD)
  this.revenueData = [
    { name: 'Amane Kanata', earnings: 316 },
    { name: 'Kiryu Coco', earnings: 279 },
    { name: 'Uruha Rushia', earnings: 277 },
    { name: 'Usada Pekora', earnings: 230 },
    { name: 'Inugami Korone', earnings: 147 },
    { name: 'Minato Aqua', earnings: 133 },
    { name: 'Houshou Marine', earnings: 121 },
    { name: 'Shiranui Flare', earnings: 101 },
    { name: 'Sakura Miko', earnings: 74 },
    { name: 'Natsuiro Matsuri', earnings: 57 }
  ];

  this.preload = function() {};
  this.setup = function() {};

  this.draw = function() {
    background(165, 255, 255);

    // --- SCREEN TITLE HEADER ---
    fill(47, 53, 66);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    text('Top VTuber Superchat Earnings Leaderboard', width / 2, 40);

    textSize(13);
    fill(116, 125, 140);
    text('Live streaming monetization channels tracking peak viewer micro-donations in thousands of USD.', width / 2, 68);

    // =========================================================================
    // EXPANDED FULL-SCREEN: SUPERCHAT REVENUE HORIZONTAL BAR CHART
    // =========================================================================
    var chartStartX = 200; // Left offset giving names breathing room
    var chartStartY = 135;
    var barHeight = 18;
    var spacing = 31;
    var maxBarWidth = 680; // Extended length to occupy full horizontal canvas scale

    noStroke(); fill(47, 53, 66); textSize(14); textAlign(LEFT, TOP);
    text('Highest Grossing Superchat Channels (Thousands USD)', chartStartX, 100);

    // Render Grid Financial Ticks ($0K to $350K)
    stroke(220); strokeWeight(1);
    for (var g = 0; g <= 5; g++) {
      var gridX = chartStartX + (maxBarWidth * (g / 5));
      line(gridX, chartStartY - 5, gridX, chartStartY + (spacing * this.revenueData.length) - 10);
      
      noStroke(); fill(116, 125, 140); textSize(10); textAlign(CENTER, BOTTOM);
      var labelVal = '$' + (g * 70) + 'K';
      text(labelVal, gridX, chartStartY - 8);
      stroke(220);
    }

    // Render Rows for Each Earner from Table
    for (var i = 0; i < this.revenueData.length; i++) {
      var currentY = chartStartY + (i * spacing);
      var currentTalent = this.revenueData[i];

      // Channel name left aligned perfectly padded against bar start
      noStroke(); fill(47, 53, 66); textSize(11); textAlign(RIGHT, CENTER);
      text(currentTalent.name, chartStartX - 15, currentY + barHeight / 2);

      // Base gray track background channel
      fill(235, 237, 243);
      rect(chartStartX, currentY, maxBarWidth, barHeight, 4);

      // YouTube high-contrast Superchat Red/Crimson theme color fill
      fill(255, 71, 87);
      var computedWidth = map(currentTalent.earnings, 0, 350, 0, maxBarWidth);
      rect(chartStartX, currentY, computedWidth, barHeight, 4);

      // Numeric formatted display metric label value placed inside bar channel
      fill(255); textSize(10); textAlign(RIGHT, CENTER);
      text('$' + currentTalent.earnings + 'K', chartStartX + computedWidth - 8, currentY + barHeight / 2);
    }

    // =========================================================================
    // RECONFIGURED FOOTER SUMMARY CARD (LIGHT BLUE & TEXT-WRAPPED)
    // =========================================================================
    var cardWidth = 800;
    var cardHeight = 55;
    var cardX = (width - cardWidth) / 2;
    var cardY = 485;

    // Light blue background and deep blue accent stroke
    fill(224, 242, 254); 
    stroke(56, 189, 248); 
    strokeWeight(1);
    rect(cardX, cardY, cardWidth, cardHeight, 6);

    // Dark blue readable text
    fill(7, 89, 133); 
    noStroke();
    textSize(11);
    
    // Changing alignment to LEFT and giving it an explicit text bounding area inside the card for dynamic wrapping
    textAlign(LEFT, CENTER);
    var paddingX = 15;
    text(
      'Otaku Performance Financial Indicator: Micro-donations like YouTube SuperChats represent the largest slice of direct income, allowing prominent digital avatars to outpace traditional media monetization frameworks.', 
      cardX + paddingX, 
      cardY, 
      cardWidth - (paddingX * 2), 
      cardHeight
    );
  };

  this.destroy = function() {};
}