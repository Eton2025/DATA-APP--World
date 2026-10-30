

function Gallery() {
  this.visuals = [];
  this.selectedVisual = null;
  this.currentCategory = 'climate'; // Default active category

  // Add a new visualization with a category tag and safety check
  this.addVisual = function(vis, category) {
    if (!vis) {
      console.warn("Attempted to add an undefined visual module.");
      return;
    }
    vis.category = category; // 'climate', 'vtuber', or 'space'
    this.visuals.push(vis);
  };

  // Change active category state
  this.setCategory = function(categoryName) {
    this.currentCategory = categoryName;
  };

  // Find index of a visual by ID (-1 if not found)
  this.findVisIndex = function(visId) {
    for (var i = 0; i < this.visuals.length; i++) {
      if (this.visuals[i] && this.visuals[i].id === visId) {
        return i;
      }
    }
    return -1;
  };

  // Safely select and initialize a visual module
  this.selectVisual = function(visId) {
    var visIndex = this.findVisIndex(visId);

    if (visIndex !== -1) {
      // Call destroy on previous visual if it exists
      if (this.selectedVisual && typeof this.selectedVisual.destroy === 'function') {
        this.selectedVisual.destroy();
      }

      // Assign new visual
      this.selectedVisual = this.visuals[visIndex];

      // Call setup on new visual if it exists
      if (this.selectedVisual && typeof this.selectedVisual.setup === 'function') {
        this.selectedVisual.setup();
      }

      loop(); // Ensure p5 render loop is active
    } else {
      console.error("Visual with ID '" + visId + "' not found in gallery.");
    }
  };
}