/* function SymmetricalCell(p, radius, numVertices) {
  this.radius = radius;
  this.numVertices = numVertices;
  this.vertices = [];
  this.theta = 360 / this.numVertices;

  for (let i = 0; i < this.numVertices; i++) {
    if (i % 2) {
      radius = this.radius;
    } else {
      radius = this.radius / 2;
    }
    this.vertices[i] = new Point(
      p.int(p.cos(p.radians(i * this.theta)) * radius),
      p.int(p.sin(p.radians(i * this.theta)) * radius)
    );
  }

  this.draw = function () {
    p.beginShape();
    for (let i = 0; i < this.numVertices; i++) {
      p.curveVertex(this.vertices[i].x, this.vertices[i].y);
    }
    // draw the first three points again to close the shape with a curve
    for (let i = 0; i < 3; i++) {
      p.curveVertex(this.vertices[i].x, this.vertices[i].y);
    }
    p.endShape();
  };
} */

/* function harmonyGrid(horizontalCells, verticalCells,shapes) {
  this.cellWidth = canvas.width/horizontalCells;
  this.cellHeight = canvas.height/verticalCells;
  counter = 0;
  for (var i=-(canvas.width/2-this.cellWidth/2);i<=canvas.width/2;i+=this.cellWidth) {
    for (var j=-(canvas.height/2-this.cellHeight/2);j<=canvas.height/2;j+=this.cellHeight) {
      push();
      translate(i,j);
      // variation after Vera Molnar
      push();
      translate(random(-second(),second()),random(-second(),second()));
      rect(0,0,this.cellWidth,this.cellHeight);
      shapes[counter].draw();
      pop();
      counter++;
      pop();
    }
  }
}

function harmonyCircle(shapes, radius) {
  background(255,255,255,255);
  for (var i = 0; i < shapes.length; i++) {
      push();
      rotate(radians(i*360/shapes.length));
      translate(0,-radius);
      shapes[i].draw();
      pop();
  }
  fill(0,0,0,8);
  noStroke();
  ellipse(0,0,radius*4,radius*4);
  stroke('black');
  noFill();
}

function NonSymmetricalCell(radius, numVertices) {
  this.radius = radius;
  this.numVertices = numVertices;
  this.vertices = [];
  this.theta = 360/this.numVertices;

  for (var i = 0; i < this.numVertices; i++) {
    radius = random(this.radius/2,this.radius*2);
    this.vertices[i] = new Point(int(cos(radians(i*this.theta))*radius),int(sin(radians(i*this.theta))*radius));
  }

  this.draw = function() {
//    fill(random(256),random(256),random(256));
    beginShape();
    for (var i = 0; i < this.numVertices; i++) {
      curveVertex(this.vertices[i].x,this.vertices[i].y);

      // draw the control points
      stroke(0,0,0,8);
      fill(0,0,0,32);
      ellipse(this.vertices[i].x,this.vertices[i].y,5,5);
      stroke('black');
      noFill();
    }
    // draw the first three points again to close the shape with a curve
    for (var i = 0; i < 3; i++) {
      curveVertex(this.vertices[i].x,this.vertices[i].y);
    }
    endShape();

    // draw the circle that constrains the shape
    stroke(0,0,0,8);
    fill(0,0,0,8);
    ellipse(0,0,this.radius*4,this.radius*4);
    stroke('black');
    noFill();
  }
}

function OppositionMoulding(spaceWidth,spaceHeight) {
  this.width = spaceWidth;
  this.height = spaceHeight;

  this.draw = function() {
    // draw some number of oppositions
    var numMouldings = random(0,9);
    for (var i=0; i<= numMouldings; i++) {
      this.spacing = int(random(2,(this.width > this.height) ? this.height/16 : this.width/16));
      var opposition = new Opposition(this.width,this.height);
      this.width = this.width-this.spacing;
      this.height = this.height-this.spacing;
      opposition.draw();
    }
    space.width=this.width;
    space.height=this.height;
  }
}

function Opposition(spaceWidth,spaceHeight) {
  this.width = spaceWidth;
  this.height = spaceHeight;

  this.draw = function () {
    // draw the top and the bottom
    push();
    translate(0,-this.height/2);
    line(-this.width/2,0,this.width/2,0);
    pop();
    push();
    rotate(PI);
    translate(0,-this.height/2);
    line(-this.width/2,0,this.width/2,0);
    pop();

    // draw the left and the right
    push();
    translate(-this.width/2,0);
    line(0,-this.height/2,0,this.height/2);
    pop();
    push();
    rotate(PI);
    translate(-this.width/2,0);
    line(0,-this.height/2,0,this.height/2);
    pop();
  }
}

function SymmetricalCell(radius, numVertices) {
  this.radius = radius;
  this.numVertices = numVertices;
  this.vertices = [];
  this.theta = 360/this.numVertices;

    for (let i = 0; i < this.numVertices; i++) {
      if (i % 2) {
        radius = this.radius;
      } else {
        radius = this.radius/2;
      }
      this.vertices[i] = new Point(int(cos(radians(i*this.theta))*radius),int(sin(radians(i*this.theta))*radius));
    }

  this.draw = function() {
    beginShape();
    for (let i = 0; i < this.numVertices; i++) {
      curveVertex(this.vertices[i].x,this.vertices[i].y);
    }
    // draw the first three points again to close the shape with a curve
    for (let i = 0; i < 3; i++) {
      curveVertex(this.vertices[i].x,this.vertices[i].y);
    }
    endShape();
  }
}

function TransitionBrackets(spaceWidth,spaceHeight) {
  this.width = spaceWidth;
  this.height = spaceHeight;

  this.draw = function() {
    // draw some number of oppositions
    var numMouldings = random(0,9);
    for (var i=0; i<= numMouldings; i++) {
      this.spacing = int(random(2,(this.width > this.height) ? this.height/4 : this.width/4));
      var transition = new Transition(this.width,this.height);
      this.width = this.width-this.spacing;
      this.height = this.height-this.spacing;
      transition.draw();
    }
    space.width=this.width;
    space.height=this.height;
  }
}

function Transition(spaceWidth,spaceHeight) {
  this.width = spaceWidth;
  this.height = spaceHeight;

  this.draw = function () {
    // draw the square
    rect(0,0,this.width,this.height);
    // draw the top corners then rotate to draw the bottom corners
    for (var i = 0; i <=1; i++) {
      push();
      rotate(i*PI);
      // draw the top left curve
      beginShape();
      curveVertex(-this.width/2,-this.height/4);
      curveVertex(-this.width/2,-this.height/4);
      curveVertex(-this.width/2+this.width/16,-this.height/2+this.height/16);
      curveVertex(-this.width/4,-this.height/2);
      curveVertex(-this.width/4,-this.height/2);
      endShape();
      // draw the top left curve
      beginShape();
      curveVertex(this.width/4,-this.height/2);
      curveVertex(this.width/4,-this.height/2);
      curveVertex(this.width/2-this.width/16,-this.height/2+this.height/16);
      curveVertex(this.width/2,-this.height/4);
      curveVertex(this.width/2,-this.height/4);
      endShape();
      pop();
    }
  }
}

function Tree(spaceWidth,spaceHeight) {
  this.width = spaceWidth;
  this.height = spaceHeight;
  this.trunkLength = 2*this.height/3;

  this.draw = function() {
    // draw a straight line for the trunk
    push();
    translate(0,this.height/6);
    line(0,-this.trunkLength/2,0,this.trunkLength/2);

    // draw branches starting below the origin
    translate(0,this.trunkLength/6);
    this.numBranches = int(random(5,10));
//    this.numBranches = int((2*this.trunkLength/3)/random(5,10));
    this.branchSpacing = (2*this.trunkLength/(3*this.numBranches));
    this.branchLength = (this.width > this.height) ? int((random(this.height/2))) : int((random(this.width/2)));
//    this.branchLength = int((random(this.trunkLength/2)));
    this.branch = new LineCurves(this.branchLength,int(random(10,20)), int(random(5,10)));

    // draw branches on one side then the other
    for (var j = 0; j < 2; j++) {
      push();
      for (var i = 0; i<= this.numBranches; i++) {
        push();
        // first on the right then on the left
        (j == 0) ? rotate(-PI/4) : rotate(3*-PI/4);
        translate(this.branchLength/2,0);
        this.branch.draw();
        pop();
        translate(0,-this.branchSpacing);
      }
      pop();
    }
    pop();
  }
}

// subordination about the centre
function Petals(spaceWidth,spaceHeight,numPetals) {
  this.width = spaceWidth;
  this.height = spaceHeight;
  this.numPetals = numPetals;
  this.petalWidth = this.width/4;
  this.petalHeight = int(random(2,this.height/8));

  this.draw = function () {
    // draw the  petals
    push();
    for (var i = 0; i<= TWO_PI; i+=TWO_PI/this.numPetals) {
      push();
      translate(this.width/8,0);
      ellipse(0,0,this.petalWidth,this.petalHeight);
      pop();
//      line(0,0,this.width/4,0);
      rotate(TWO_PI/this.numPetals);
    }
    pop();
  }
}

function Flower(spaceWidth,spaceHeight,numPetals) {
  this.width = spaceWidth;
  this.height = spaceHeight;
  this.numPetals = int(random(degrees(PI)/4));

  this.draw = function() {
    // draw the stem
    var stem = new LineZigzag(this.height/2, int(random(1,4)), int(random(10,40)));
    push();
    translate(0,this.height/4);
    rotate(-PI/2);
    stem.draw();
    pop();

    // draw the petals
    petals = new Petals(this.width,this.height,this.numPetals);
    petals.draw();
    fill(255);
    ellipse(0,0,20,20);
    noFill();
  }
} */
