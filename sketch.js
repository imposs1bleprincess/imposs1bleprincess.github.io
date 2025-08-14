let shapes = [];

function setup() {
  createCanvas(600, 600);
  noStroke();
  
  // Create initial shapes
  for (let i = 0; i < 13; i++) {
    shapes.push(new BouncingShape());
  }
}

function draw() {
  background(210);
  
  for (let shape of shapes) {
    shape.update();
    shape.display();
  }
}

class BouncingShape {
  constructor() {
    this.size = random(65, 100);
    this.x = random(this.size, width - this.size);
    this.y = random(this.size, height - this.size);
    this.xSpeed = random(3, 2) * (random() < 0.5 ? 1 : -1);
    this.ySpeed = random(2, 3) * (random() < 0.5 ? 1 : -1);
    this.opacity = random(100, 255);
    this.opacityChange = random(3, 5) * (random() < 0.35 ? 1 : -1);
    this.shapeType = random() < 0.5 ? 'circle' : 'square'; // Either circle or square
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Check for wall collisions and reverse direction
    if (this.x < this.size || this.x > width - this.size) {
      this.xSpeed *= -1;
    }
    if (this.y < this.size || this.y > height - this.size) {
      this.ySpeed *= -1;
    }

    // Update opacity fluctuation
    this.opacity += this.opacityChange;
    if (this.opacity > 255 || this.opacity < 50) {
      this.opacityChange *= -1;
    }
  }

  display() {
    fill(265, this.opacity);
    if (this.shapeType === 'circle') {
      ellipse(this.x, this.y, this.size);
    } else {
      rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
  }
}
