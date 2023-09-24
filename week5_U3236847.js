  //Exercise 2
  const listofLogos = [];
  var growSpeed = 8;
  var maxSize = 200;
  var minSize = 20;

  class MovingLogo {
    //this class makes it simpler to automate the animation process through all 
    //the primary functions (i.e. grow, startMoving, update, draw)
    constructor() {
      if (0.5 < random(0, 1)) { //50% chance of being default colours
        this.circleColour = color(107, 192, 232) //blue
        this.stroke = color(252,118,106); //orange
      }
      else { //flips the colour arrangement
        this.circleColour = color(252,118,106) 
        this.stroke = color(107, 192, 232);
      }
      this.growth = random(minSize,maxSize); //size randomisation
      this.growth = Math.floor(this.growth/growSpeed); //'Math.floor' is merely a placeholder
      //for the growSpeed process, which determines how fast circles are made
      this.radius = 0;
      this.dt = createVector(0, 0);
      this.pos = createVector(width/2, height/2);
    }

    grow() {
      this.radius = this.radius + growSpeed; //circle grows according to growSpeed
      this.growth = this.growth-1; 
      if (this.growth == 0) {
        this.startMoving(); //circle moves when growth matures 
      }
    }

    startMoving() {
      this.dt = p5.Vector.random2D(); //assigns a random magnitude and direction (vector) 
    }

    update() {
      //circle moves and grows as needed
      if (this.growth != 0) {
        this.grow(); //continues growing to determined size
      } else {
        this.dt.mult(1.01); //movement speed
        this.pos.add(this.dt); //compounding to produce acceleration
      }
    }

    draw() { 
      fill (this.circleColour); //follows the 50/50 colour randomization
      stroke (this.stroke); //follows the 50/50 colour randomization
      strokeWeight (Math.floor(this.radius/10)); //strokeWeight is proportional to circle size
      circle(Math.floor(this.pos.x),Math.floor(this.pos.y), this.radius); //
    }
  }

  function logoBase() { //the default logo in centre of screen
    fill(107, 192, 232);
    strokeWeight(20);
    strokeCap(SQUARE);
    stroke(107, 192, 232);
    arc(960, 540, 400, 400, 0, PI / 2); 
    stroke(252,118,106);
    arc(960, 540, 400, 400, PI / 2, PI);
    stroke(107, 192, 232);
    arc(960, 540, 400, 400, PI, PI * 3 / 2);
    stroke(252,118,106);
    arc(960, 540, 400, 400, PI * 3 / 2, 0);
    textSize(100);
    textWrap(WORD);
    fill(107, 192, 232);
    stroke(252,118,106);
    strokeJoin(ROUND);
    strokeWeight(19);
    text("CDM", 844, 580); 
  }  

  function setup() {
    createCanvas(1920, 1080);
    listofLogos.push(new MovingLogo()); 
  }
  
  function draw() {
    background(0);
    fill(255);
    for (var i = 0;i<listofLogos.length;i++) {
      listofLogos[i].update(); //adds circle movement and growth components to list
    }
    for (var i = 0;i<listofLogos.length;i++) {
      listofLogos[i].draw(); //adds circle draw components to list
    }
    if (listofLogos[listofLogos.length-1].growth == 0) {
      listofLogos.push(new MovingLogo()); //new circle is made when current circle stops growing
    }
    logoBase();
  }