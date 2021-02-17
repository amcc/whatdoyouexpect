let startRotation = 0;
let squares;
let colours = ['cyan', 'magenta', 'yellow']
let counterReset = 200;
let randomNumber = 10;
let row;
let col;

function setupGrid() {
  pixelDensity(1);
  squares = []
  row = ceil(random(randomNumber));
  col = ceil(random(randomNumber));
  console.log(`rows ${row} cols ${col}`)
  let xMargin = width / row;
  let yMargin = height / col;
  let xSpace = (width - xMargin / 2) / row;
  let ySpace = (height - yMargin / 2) / col;

  let w = xMargin + random(randomNumber*2)-randomNumber;
  let h = yMargin + random(randomNumber*2)-randomNumber;

  let squareCount = 0;
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      squares[squareCount] = new TripleSquare((j * xMargin) + xMargin / 2, (i * yMargin) + yMargin / 2, w, h, -(i + j) * 4);
      squareCount++;
    }
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)
  blendMode(MULTIPLY);
  noStroke();
  background(0);

  //sizing
  setupGrid()
  
}

function draw() {
  clear();

  for (let i = 0; i < col * row; i++) {
    squares[i].display(0.03 + i / 5000)
  }

}

// Jitter class
class RotateSquare {
  constructor(x, y, w, h, easing, colour) {
    this.rotation = startRotation;
    this.targetRotation = PI;
    this.easing = easing;
    this.colour = colour
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  reset() {
    this.rotation = startRotation;
    // console.log("reset")
  }

  display(easing) {
    this.deltaRotation = this.targetRotation - this.rotation;
    this.rotation += this.deltaRotation * easing

    push()
    translate(this.x, this.y)
    rotate(this.rotation)
    fill(this.colour);
    rect(0, 0, this.w, this.h)
    pop()
  }
}

class TripleSquare {
  constructor(x, y, w, h, count = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.squares = [];
    for (let i = 0; i < 3; i++) {
      this.squares[i] = new RotateSquare(this.x, this.y, this.w, this.h, 0.02 + i / 100, colours[i])
    }
    this.counter = count;
  }

  reset() {
    for (let i = 0; i < 3; i++) {
      this.squares[i].reset()
    }
  }

  display(easing) {
    for (let i = 0; i < 3; i++) {
      this.squares[i].display(easing + i / 100);
    }
    if (this.counter === counterReset) {
      this.reset();
      this.counter = 0;
    }
    this.counter++;
  }
}

function windowResized() {
  setupGrid()
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas('CMYK-squares', 'png')
}
function mousePressed() {
  setupGrid()
}