


function VtuberPopularityVisual() {
  this.name = 'VTuber Popularity';
  this.id = 'vtuber-popularity';

  // 1. Top VTuber global subscriber data from Hololist
  this.vtuberTalents = [
    { name: 'Gawr Gura', subscribers: 4630000, agency: 'Hololive' },
    { name: 'Houshou Marine', subscribers: 4360000, agency: 'Hololive' },
    { name: 'Pmaru-sama', subscribers: 3160000, agency: 'Independent' },
    { name: 'Filian', subscribers: 3150000, agency: 'Independent' },
    { name: 'Kizuna Ai', subscribers: 3090000, agency: 'Kizuna Ai Inc.' },
    { name: 'Hoshimachi Suisei', subscribers: 2880000, agency: 'Hololive' },
    { name: 'Zilverk', subscribers: 2850000, agency: 'Independent' },
    { name: 'Usada Pekora', subscribers: 2770000, agency: 'Hololive' },
    { name: 'Kobo Kanaeru', subscribers: 2760000, agency: 'Hololive' },
    { name: 'Shirakami Fubuki', subscribers: 2650000, agency: 'Hololive' }
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
    text('Global VTuber Popularity Landscape', width / 2, 40);
    
    textSize(13);
    fill(116, 125, 140);
    text('Ecosystem leaderboard mapping global subscriber count milestones.', width / 2, 68);

    // =========================================================================
    // EXPANDED FULL-SCREEN: RANKED SUBSCRIBER HORIZONTAL BAR CHART
    // =========================================================================
    var chartStartX = 200; // Shifted left significantly since bubbles are gone
    var chartStartY = 135;
    var barHeight = 18;
    var spacing = 31;
    var maxBarWidth = 680; // Expanded to take up the full screen width gracefully

    noStroke(); fill(47, 53, 66); textSize(14); textAlign(LEFT, TOP);
    text('Top Talent Subscriber Leaderboard', chartStartX, 100);

    // Render Expanded Background Grid Ticks (0M to 5M)
    stroke(220); strokeWeight(1);
    for (var g = 0; g <= 5; g++) {
      var gridX = chartStartX + (maxBarWidth * (g / 5));
      line(gridX, chartStartY - 5, gridX, chartStartY + (spacing * this.vtuberTalents.length) - 10);
      
      noStroke(); fill(116, 125, 140); textSize(10); textAlign(CENTER, BOTTOM);
      text(g + 'M', gridX, chartStartY - 8);
      stroke(220);
    }

    // Render Rows for Talents
    for (var j = 0; j < this.vtuberTalents.length; j++) {
      var talentItem = this.vtuberTalents[j];
      var currentY = chartStartY + (j * spacing);

      // Talent name label left aligned (padded perfectly against expanded chart start)
      noStroke(); fill(47, 53, 66); textSize(11); textAlign(RIGHT, CENTER);
      text(talentItem.name, chartStartX - 15, currentY + barHeight / 2);

      // Base gray track background
      fill(235, 237, 243);
      rect(chartStartX, currentY, maxBarWidth, barHeight, 4);

      // Choose color mapping based on agency context strings
      if (talentItem.agency === 'Hololive') fill(33, 150, 243);
      else if (talentItem.agency === 'Independent') fill(156, 39, 176);
      else fill(233, 30, 99);

      var computedWidth = map(talentItem.subscribers, 0, 5000000, 0, maxBarWidth);
      rect(chartStartX, currentY, computedWidth, barHeight, 4);

      // Display numeric micro label text inside the colored bar channels
      fill(255); textSize(10); textAlign(RIGHT, CENTER);
      text((talentItem.subscribers / 1000000).toFixed(2) + 'M', chartStartX + computedWidth - 8, currentY + barHeight / 2);
    }

    // =========================================================================
    // CENTERED FOOTER LAYOUT ELEMENTS
    // =========================================================================
    
    // --- DRAW AGENCY LEGEND KEY PANEL (Centered) ---
    var legendStartX = width / 2 - 210;
    var legendY = 465;
    textSize(11);
    textAlign(LEFT, CENTER);
    
    fill(33, 150, 243);  ellipse(legendStartX, legendY, 12, 12);
    fill(47, 53, 66);    text('Hololive Production', legendStartX + 15, legendY);

    fill(156, 39, 176); ellipse(legendStartX + 150, legendY, 12, 12);
    fill(47, 53, 66);    text('Independent Talents', legendStartX + 165, legendY);

    fill(233, 30, 99);  ellipse(legendStartX + 300, legendY, 12, 12);
    fill(47, 53, 66);    text('Kizuna Ai Inc.', legendStartX + 315, legendY);

    // --- INFORMATIVE SUMMARY CONTENT CARD (Expanded & Centered) ---
    var cardWidth = 880;
    var cardX = (width - cardWidth) / 2;
    var cardY = 495;
    
    fill(214, 251, 231); // Pastel green background
    stroke(46, 213, 115); // Emerald accent border
    strokeWeight(1);
    rect(cardX, cardY, cardWidth, 45, 6);

    fill(30, 86, 49); // Dark emerald informative text
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Popularity Indicator: Top creators easily cross the 3-4 Million subscriber mark, leveraging digital avatar engagement models to eclipse mainstream streaming media.', width / 2, cardY + 22);
  };

  this.destroy = function() {};
}