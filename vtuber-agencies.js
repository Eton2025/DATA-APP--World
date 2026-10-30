// =========================================================================
// VTUBER AGENCIES VS. INDIES VISUALIZATION
// =========================================================================

class VtuberAgenciesVisual {
  constructor() {
    this.id = "vtuber-agencies";
    this.title = "Corporate Agencies vs. Indie VTubers";
    this.category = "vtuber";

    this.activeTab = "AGENCIES"; // "AGENCIES", "INDIES", or "COMPARISON"
    this.selectedAgencyIndex = 0;
    this.selectedGenIndex = 0;

    // Database of Major Agencies, Generations, and Members
    this.agencies = [
      {
        name: "Hololive Production",
        company: "COVER Corp",
        color: [0, 180, 240],
        generations: [
          {
            name: "Gen 0 (Origin)",
            members: ["Tokino Sora", "Roboco", "Sakura Miko", "Hoshimachi Suisei", "AZKi"]
          },
          {
            name: "1st Generation",
            members: ["Yozora Mel", "Shirakami Fubuki", "Natsuiro Matsuri", "Aki Rosenthal", "Akai Haato"]
          },
          {
            name: "2nd Generation",
            members: ["Minato Aqua", "Murasaki Shion", "Nakiri Ayame", "Yuzuki Choco", "Oozora Subaru"]
          },
          {
            name: "GAMERS",
            members: ["Shirakami Fubuki", "Ookami Mio", "Nekomata Okayu", "Inugami Korone"]
          },
          {
            name: "3rd Gen (Fantasy)",
            members: ["Usada Pekora", "Shiranui Flare", "Shirogane Noel", "Houshou Marine"]
          },
          {
            name: "4th Gen (HoloForce)",
            members: ["Amane Kanata", "Tsunomaki Watame", "Tokoyami Towa", "Himemori Luna"]
          },
          {
            name: "5th Gen (NePolabo)",
            members: ["Yukihana Lamy", "Momosuzu Nene", "Shishiro Botan", "Omaru Polka"]
          },
          {
            name: "HoloX (6th Gen)",
            members: ["La+ Darknesss", "Takane Lui", "Hakui Koyori", "Sakamata Chloe", "Kazama Iroha"]
          },
          {
            name: "English - Myth",
            members: ["Mori Calliope", "Takanashi Kiara", "Ninomae Ina'nis", "Gawr Gura", "Watson Amelia"]
          },
          {
            name: "English - Promise",
            members: ["IRyS", "Ceres Fauna", "Ouro Kronii", "Nanashi Mumei", "Hakos Baelz"]
          },
          {
            name: "English - Advent",
            members: ["Shiori Novella", "Koseki Bijou", "Nerissa Ravencroft", "Fuwawa Abyssgard", "Mococo Abyssgard"]
          },
          {
            name: "English - Justice",
            members: ["Elizabeth Rose Bloodflame", "Gigi Murin", "Cecilia Immergreen", "Raora Panthera"]
          },
          {
            name: "Indonesia (ID)",
            members: ["Risu", "Moona", "Iofi", "Ollie", "Anya", "Reine", "Zeta", "Kaela", "Kobo"]
          },
          {
            name: "DEV_IS (ReGLOSS)",
            members: ["Hiodoshi Ao", "Otonose Kanade", "Ririka Ichijou", "Juufuutei Raden", "Todoroki Hajime"]
          },
          {
            name: "DEV_IS (FLOW GLOW)",
            members: ["Isami Rion", "Koganei Niko", "Mizumiya Su", "Rinki Vibe", "Kagami Kirari"]
          }
        ]
      },
      {
        name: "Nijisanji",
        company: "ANYCOLOR Inc.",
        color: [255, 60, 100],
        generations: [
          {
            name: "JP First Wave",
            members: ["Tsukino Mito", "Higuchi Kaede", "Shizuka Rin", "Elu", "Shibuya Hajime"]
          },
          {
            name: "Seeds & Wave 2",
            members: ["Dola", "Yashiro Kizuku", "Kuzuha", "Kanae", "Ryushen", "Joe Rikiichi"]
          },
          {
            name: "ROF-MAO Group",
            members: ["Kagami Hayato", "Kenmochi Toya", "Fuwa Minato", "K甲斐田 晴 (Kaida Haru)"]
          },
          {
            name: "Nijisanji EN - LazuLight",
            members: ["Elira Pendora", "Pomu Rainpuff", "Finana Ryugu"]
          },
          {
            name: "Nijisanji EN - OBSYDIA",
            members: ["Rosemi Lovlock", "Petra Gurin", "Selen Tatsuki"]
          },
          {
            name: "Nijisanji EN - Ethyria",
            members: ["Nina Kosaka", "Millie Parfait", "Enna Alouette", "Reimu Endou"]
          },
          {
            name: "Nijisanji EN - Luxiem",
            members: ["Ike Eveland", "Vox Akuma", "Luca Kaneshiro", "Shu Yamino", "Mysta Rias"]
          },
          {
            name: "Nijisanji EN - Noctyx",
            members: ["Sonny Brisko", "Uki Violeta", "Alban Knox", "Fulgur Ovid"]
          },
          {
            name: "Nijisanji EN - ILUNA",
            members: ["Maria Marionette", "Kyo Kaneko", "Aia Amare", "Aster Arcadia", "Scarle Yonaguni", "Ren Zotto"]
          },
          {
            name: "Nijisanji EN - XSOLEIL",
            members: ["Doppio Dropshyte", "Meloco Kyoran", "Hex Haywire", "Kotoka Torahime", "Ver Vermillion"]
          }
        ]
      },
      {
        name: "VShojo",
        company: "VShojo Inc.",
        color: [180, 70, 245],
        generations: [
          {
            name: "Founding & Core",
            members: ["Nyatasha Nyanners", "Projekt Melody", "Ironmouse", "Silvervale", "Zentrreya", "Kson"]
          },
          {
            name: "Global Additions",
            members: ["Veibae", "Apricot (Froot)", "Henya the Genius", "Giga Haruka", "Matara Kan", "Michi Mochievee"]
          }
        ]
      },
      {
        name: "Phase Connect",
        company: "Phase Connect LLC",
        color: [50, 205, 50],
        generations: [
          {
            name: "Gen 1 (Origins)",
            members: ["Rinkou Aselia", "Pipkin Pippa", "Tenma Maemi", "Uruha Rushia (Ex-Holo)", "Lunamaria"]
          },
          {
            name: "Gen 2 (Alias)",
            members: ["Shiina Amanogawa", "Rie Suzumori", "Remi Milkyway", "Erina Makina"]
          },
          {
            name: "Phase Invaders",
            members: ["Ember", "Clara", "Dizzy", "Hina"]
          }
        ]
      }
    ];

    // Indie Data Points
    this.indieTraits = [
      { label: "IP Ownership", desc: "100% owned by creator (Character model, name, lore)." },
      { label: "Revenue Split", desc: "Keep 100% of Superchats/Merch minus platform fees." },
      { label: "Production Cost", desc: "Self-funded ($2,000–$15,000 for rigging & 2D/3D model)." },
      { label: "Management", desc: "Self-managed (Sponsorships, scheduling, merch fulfillment)." },
      { label: "Notable Icons", desc: "Shylily, Filian, Vedal & Neuro-Sama, Dokibird, Bao." }
    ];
  }

  draw() {
    background(15, 20, 32);

    // Header Title
    fill(255);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(22);
    textFont("Helvetica");
    textStyle(BOLD);
    text("VTuber Ecosystem: Agencies vs. Independents", width / 2, 60);

    // Tab Navigation
    this.drawTabs();

    // Content Switching
    if (this.activeTab === "AGENCIES") {
      this.drawAgencyBrowser();
    } else if (this.activeTab === "INDIES") {
      this.drawIndieOverview();
    } else if (this.activeTab === "COMPARISON") {
      this.drawComparisonTable();
    }
  }

  drawTabs() {
    let tabs = ["AGENCIES", "INDIES", "COMPARISON"];
    let tabW = 140;
    let tabH = 32;
    let startX = width / 2 - ((tabs.length * tabW) / 2);
    let startY = 95;

    for (let i = 0; i < tabs.length; i++) {
      let x = startX + i * tabW;
      let isActive = this.activeTab === tabs[i];

      fill(isActive ? color(0, 200, 200) : color(35, 45, 65));
      stroke(100);
      strokeWeight(1);
      rect(x, startY, tabW - 5, tabH, 6);

      fill(isActive ? 0 : 220);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(12);
      textStyle(BOLD);
      text(tabs[i], x + (tabW - 5) / 2, startY + tabH / 2);
    }
  }

  drawAgencyBrowser() {
    // Left Panel: Agency Selector
    let panelY = 140;
    let agencyW = 200;
    
    fill(25, 32, 48);
    stroke(50);
    rect(30, panelY, agencyW, 400, 8);

    fill(200);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text("SELECT AGENCY", 42, panelY + 12);

    for (let i = 0; i < this.agencies.length; i++) {
      let ag = this.agencies[i];
      let btnY = panelY + 40 + i * 50;
      let isSel = this.selectedAgencyIndex === i;

      fill(isSel ? color(ag.color[0], ag.color[1], ag.color[2]) : color(40, 50, 70));
      stroke(isSel ? 255 : 80);
      rect(40, btnY, agencyW - 20, 42, 6);

      fill(isSel ? 255 : 200);
      noStroke();
      textAlign(LEFT, CENTER);
      textSize(13);
      textStyle(BOLD);
      text(ag.name, 50, btnY + 15);
      
      textSize(10);
      textStyle(NORMAL);
      fill(isSel ? 230 : 150);
      text(ag.company, 50, btnY + 30);
    }

    // Right Panel: Generation & Member Explorer
    let currentAgency = this.agencies[this.selectedAgencyIndex];
    let detailX = 245;
    let detailW = 750;

    fill(25, 32, 48);
    stroke(50);
    rect(detailX, panelY, detailW, 400, 8);

    // Agency Header Banner
    fill(currentAgency.color[0], currentAgency.color[1], currentAgency.color[2], 50);
    rect(detailX, panelY, detailW, 45, 8, 8, 0, 0);

    fill(255);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(16);
    textStyle(BOLD);
    text(`${currentAgency.name} — Roster Explorer`, detailX + 15, panelY + 22);

    // Generation Selector (Horizontal pills)
    let genX = detailX + 15;
    let genY = panelY + 55;
    let curGenX = genX;
    let curGenY = genY;

    for (let g = 0; g < currentAgency.generations.length; g++) {
      let gen = currentAgency.generations[g];
      let genW = textWidth(gen.name) + 20;

      if (curGenX + genW > detailX + detailW - 15) {
        curGenX = genX;
        curGenY += 32;
      }

      let isGenSel = this.selectedGenIndex === g;
      fill(isGenSel ? color(currentAgency.color[0], currentAgency.color[1], currentAgency.color[2]) : color(45, 55, 75));
      stroke(isGenSel ? 255 : 80);
      rect(curGenX, curGenY, genW, 26, 13);

      fill(isGenSel ? 255 : 200);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(11);
      textStyle(isGenSel ? BOLD : NORMAL);
      text(gen.name, curGenX + genW / 2, curGenY + 13);

      curGenX += genW + 8;
    }

    // Member List for Selected Generation
    let activeGen = currentAgency.generations[this.selectedGenIndex] || currentAgency.generations[0];
    let memberStartY = curGenY + 45;

    fill(0, 200, 200);
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text(`Members of ${activeGen.name}:`, detailX + 20, memberStartY);

    // Member Badges Grid
    let gridX = detailX + 20;
    let gridY = memberStartY + 25;
    let cardW = 165;
    let cardH = 40;

    for (let m = 0; m < activeGen.members.length; m++) {
      let col = m % 4;
      let row = floor(m / 4);
      let mx = gridX + col * (cardW + 15);
      let my = gridY + row * (cardH + 12);

      fill(35, 45, 65);
      stroke(60, 80, 110);
      rect(mx, my, cardW, cardH, 6);

      fill(255);
      noStroke();
      textAlign(LEFT, CENTER);
      textSize(12);
      textStyle(BOLD);
      text(activeGen.members[m], mx + 12, my + cardH / 2);
    }
  }

  drawIndieOverview() {
    let startY = 140;

    fill(25, 32, 48);
    stroke(50);
    rect(50, startY, 924, 400, 8);

    fill(0, 255, 200);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(18);
    textStyle(BOLD);
    text("The Independent (Indie) VTuber Model", 75, startY + 20);

    textSize(12);
    fill(200);
    textStyle(NORMAL);
    text("Indie creators operate autonomously, acting as their own producer, director, and business manager.", 75, startY + 45);

    // Trait Cards Grid
    let gridY = startY + 85;
    for (let i = 0; i < this.indieTraits.length; i++) {
      let tr = this.indieTraits[i];
      let cardY = gridY + i * 58;

      fill(35, 45, 65);
      stroke(0, 180, 200, 150);
      rect(75, cardY, 874, 48, 6);

      fill(0, 255, 200);
      noStroke();
      textAlign(LEFT, CENTER);
      textSize(13);
      textStyle(BOLD);
      text(tr.label, 90, cardY + 24);

      fill(230);
      textSize(12);
      textStyle(NORMAL);
      text(tr.desc, 240, cardY + 24);
    }
  }

  drawComparisonTable() {
    let startY = 140;
    let tableX = 50;
    let tableW = 924;

    fill(25, 32, 48);
    stroke(50);
    rect(tableX, startY, tableW, 400, 8);

    // Headers
    let headers = ["Feature", "Corporate Agency Member", "Independent (Indie) Creator"];
    let colWidths = [180, 360, 360];

    let headerY = startY + 15;
    let curX = tableX + 20;

    for (let h = 0; h < headers.length; h++) {
      fill(h === 0 ? 180 : h === 1 ? color(0, 180, 240) : color(0, 255, 180));
      noStroke();
      textAlign(LEFT, TOP);
      textSize(13);
      textStyle(BOLD);
      text(headers[h], curX, headerY);
      curX += colWidths[h];
    }

    stroke(60);
    line(tableX + 15, startY + 40, tableX + tableW - 15, startY + 40);

    // Rows
    let rows = [
      ["IP Rights", "Owned by company (leaving means new avatar)", "100% owned by the creator"],
      ["3D & Assets", "Funded by agency ($10k–$50k value)", "Self-funded or crowdfunded"],
      ["Merch & Legal", "Handled by company team & staff", "Self-managed / contractor outsourced"],
      ["Collabs", "Easy cross-generation internal collabs", "Requires external network outreach"],
      ["Cut / Split", "Agency takes revenue split (~30%-50%)", "Creator retains 100% (after platform cut)"]
    ];

    let rowY = startY + 55;
    for (let r = 0; r < rows.length; r++) {
      let rx = tableX + 20;
      fill(r % 2 === 0 ? color(30, 38, 55) : color(22, 28, 42));
      rect(tableX + 10, rowY - 5, tableW - 20, 56, 4);

      for (let c = 0; c < rows[r].length; c++) {
        fill(c === 0 ? 220 : 190);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(11);
        textStyle(c === 0 ? BOLD : NORMAL);
        text(rows[r][c], rx, rowY + 23);
        rx += colWidths[c];
      }
      rowY += 62;
    }
  }

  mousePressed() {
    let mx = (mouseX / width) * 1024;
    let my = (mouseY / height) * 576;

    // 1. Tab Bar Clicking
    let tabs = ["AGENCIES", "INDIES", "COMPARISON"];
    let tabW = 140;
    let startX = width / 2 - ((tabs.length * tabW) / 2);
    let startY = 95;

    if (my >= startY && my <= startY + 32) {
      for (let i = 0; i < tabs.length; i++) {
        let x = startX + i * tabW;
        if (mx >= x && mx <= x + tabW - 5) {
          this.activeTab = tabs[i];
          return;
        }
      }
    }

    // 2. Agency Selection Clicking
    if (this.activeTab === "AGENCIES") {
      let panelY = 140;
      for (let i = 0; i < this.agencies.length; i++) {
        let btnY = panelY + 40 + i * 50;
        if (mx >= 40 && mx <= 220 && my >= btnY && my <= btnY + 42) {
          this.selectedAgencyIndex = i;
          this.selectedGenIndex = 0; // Reset generation to 1st on agency switch
          return;
        }
      }

      // 3. Generation Selection Clicking
      let currentAgency = this.agencies[this.selectedAgencyIndex];
      let detailX = 245;
      let detailW = 750;
      let genX = detailX + 15;
      let genY = panelY + 55;
      let curGenX = genX;
      let curGenY = genY;

      for (let g = 0; g < currentAgency.generations.length; g++) {
        let gen = currentAgency.generations[g];
        let genW = textWidth(gen.name) + 20;

        if (curGenX + genW > detailX + detailW - 15) {
          curGenX = genX;
          curGenY += 32;
        }

        if (mx >= curGenX && mx <= curGenX + genW && my >= curGenY && my <= curGenY + 26) {
          this.selectedGenIndex = g;
          return;
        }

        curGenX += genW + 8;
      }
    }
  }
}