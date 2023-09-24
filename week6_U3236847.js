  //Exercise 3
  var mouseWasPressed = false;
  const listofLogos = [];
  var growSpeed = 5;
  var maxSize = 350;
  var minSize = 150;
  var minPosx = 0;
  var minPosy = 0;
  var maxPosx = 0;
  var maxPosy = 0;
  var minmag = 0.5;
  var removing = false;
  
  class MovingLogo {
    constructor() {
      if (0.5 < random(0, 1)) { //50% chance of being default colours
        this.circleColour = color(107, 192, 232) //blue
        this.stroke = color(221, 45, 227); //pink
      }
      else { //flips the colour arrangement
        this.circleColour = color(221, 45, 227)
        this.stroke = color(107, 192, 232);
      }
      this.growth = random(minSize,maxSize); //size randomisation
      this.growth = Math.floor(this.growth/growSpeed); //'Math.floor' is merely a placeholder
      //for the growSpeed process, which determines how fast circles are made
      this.radius = minSize; //stops circles being too small to interpret logo string
      this.dt = createVector(0, 0); 
      this.pos = createVector(width/2, height/2); 
    }

    grow() {
      if (this.radius <= maxSize) {
        this.radius = this.radius + growSpeed; //allows growth until the size cap is reached 
      } 
      this.growth = this.growth-1;
      if (this.growth == 0) {
      }
    }

    startMoving() {
      this.dt = p5.Vector.random2D(); //assigns a random magnitude and direction (vector)
      this.dt.mult(10); //establishes starting speed for circle movement 
    }

    update() { //moves and grows as prompted
      if (this.growth != 0) {
      }
      if (this.pos.x + (this.radius/2) >= maxPosx || this.pos.x - (this.radius/2) <= minPosx ) {
        this.dt.x =this.dt.x*-1; //collision detection for x-axis 
      }
      if (this.pos.y + (this.radius/2) >= maxPosy || this.pos.y - (this.radius/2) <= minPosy ) {
        this.dt.y =this.dt.y*-1; //collision detection for y-axis
      }
      if (this.dt.mag() > minmag) {  
          this.dt.mult(0.99); //establishes deceleration 
      }
      this.pos.add(this.dt); //applies deceleration and collision border (for rebounding)
    }

    draw() { 
      fill (this.circleColour); //applies the 50/50 colour randomisation
      stroke (this.stroke); //applies the 50/50 colour randomisation
      strokeWeight (Math.floor(this.radius/10)); //strokeWeight is proportional to circle size
      logoBase(Math.floor(this.pos.x),Math.floor(this.pos.y), this.radius);
    }  
  }

  function logoBase(posx, posy, radius) {
    fill(107, 192, 232);
    strokeWeight(20);
    strokeCap(SQUARE);
    stroke(107, 192, 232);
    arc(posx, posy, radius, radius, 0, PI / 2);
    stroke(221, 45, 227);
    arc(posx, posy, radius, radius, PI / 2, PI);
    stroke(107, 192, 232);
    arc(posx, posy, radius, radius, PI, PI * 3 / 2);
    stroke(221, 45, 227);
    arc(posx, posy, radius, radius, PI * 3 / 2, 0);
    textSize(Math.floor(radius/4));
    textWrap(WORD);
    textAlign(LEFT, BASELINE);
    fill(107, 192, 232);
    stroke(221, 45, 227);
    strokeJoin(ROUND);
    strokeWeight(Math.floor(radius/20));
    text("CDM", posx-(radius/3.6), posy+(radius/10)); 
  }  

  function setup() {
    createCanvas(1920, 1080);
    maxPosx = width; //establishes x-axis collision border
    maxPosy = height; //establishes y-axis collision border 
  }

  function keyPressed() { //these key functions are for the 'delete' process 
    if (keyCode === ENTER) { 
        removing = true; 
    }
  }

  function keyReleased() {
    if (keyCode === ENTER) {
        removing = false;
    }
  }
  
  function draw() {
    background(0);
    textSize(50);
    textWrap(WORD);
    textAlign(CENTER, CENTER);
    stroke(221, 45, 227);
    strokeJoin(ROUND);
    strokeWeight(5);
    strokeCap(SQUARE);
    fill(107, 192, 232);
    text("LEFT-CLICK TO CREATE", maxPosx/2, maxPosy/4); //constant strings for end-user guidance
    text("PRESS ENTER TO DELETE", maxPosx/2, maxPosy/4*3); 
    if (removing) { //piggy-backing off the 'create' process to validate the 'delete' process
      listofLogos.pop(); //'pop' is reciprocal for 'push' to create a smooth 'delete' animation 
      //in which 'push' saves the list state and 'pop' restores to previous state, so you can call 
      //me Marty McFly because I'm technically using time travel 
      mouseWasPressed = false; 
    }
    if (mouseIsPressed) {
      if (mouseWasPressed) {
        if (listofLogos.length != 0) {
          listofLogos[listofLogos.length-1].grow(); //circle grows while mouse is pressed
        }
      } else {
        listofLogos.push(new MovingLogo()); 
      }
    } else {
      if (listofLogos.length != 0) { //
        if (mouseWasPressed) {
          listofLogos[listofLogos.length-1].startMoving(); //circle moves if mouse is not 
          //pressed but previously was 
        }
      }
    }
    for (var i = 0;i<listofLogos.length;i++) {
      listofLogos[i].update(); //adds circle movement and growth components to constant
    }
    for (var i = 0;i<listofLogos.length;i++) {
      listofLogos[i].draw(); //adds circle draw components to constant
    }
    mouseWasPressed = mouseIsPressed; //changes mouseWasPressed state from 'false' to 'true' 
    //after other operations to avoid conflicts in the firt interaction (i.e. first click) 
  }