let shapes = [];

function setup() {
  createCanvas(530, 400);
  noFill();
  strokeWeight(2);

  // Generate initial shapes
  for (let i = 0; i < 100; i++) {
    shapes.push(new GlitchShape());
  }
}

function draw() {
  background(10, 10, 20, 25); // Slight trail for ghosting effect

  for (let shape of shapes) {
    shape.update();
    shape.display();
  }
}

class GlitchShape {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(10, 100);
    this.depth = random(0.5, 2.5); // Simulate distance (z-depth)
    this.shapeType = floor(random(3)); // 0 = rect, 1 = ellipse, 2 = triangle
    this.opacity = random(30, 150);
    this.xOffset = random(-2, 2);
    this.yOffset = random(-2, 2);
    this.glitchTimer = int(random(10, 60));
  }

  update() {
    // Simulate glitch shake
    this.x += this.xOffset * this.depth * 0.2;
    this.y += this.yOffset * this.depth * 0.2;

    this.glitchTimer--;
    if (this.glitchTimer <= 0) {
      this.reset();
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.depth);
    stroke(255, this.opacity);

    switch (this.shapeType) {
      case 0:
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
        break;
      case 1:
        ellipse(0, 0, this.size, this.size);
        break;
      case 2:
        let s = this.size;
        triangle(-s / 2, s / 2, 0, -s / 2, s / 2, s / 2);
        break;
    }

    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
