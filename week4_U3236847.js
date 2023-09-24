//Exercise 1
let midx = 960
let midy = 540

function setup() {
    createCanvas(1920, 1080) 
    background(105, 50, 120) //purple
    }
  
function draw() {
    logoStatic()
    noLoop()
    }
  
function logoStatic() {
    //logoStatic could be used for animations/interactions
    stroke(250, 250, 250) //white
    fill(250, 250, 250)
    rect(midx-414, midy-210, 870, 435)
    //this rect could be used as a border for other elements
    textSize(100)
    textWrap(WORD)
    fill(107, 192, 232)
    stroke(221, 45, 227)
    strokeWeight(19)
    strokeJoin(ROUND)
    text("Conroy \nDigital \nMarketing", 945, 450) 
    strokeWeight(8)
    quad(midx-374, midy-170, midx-104, midy-120, midx-74, midy+53, midx-374, midy+60)
    quad(midx-234, midy+58, midx-194, midy+57, midx-204, midy+97, midx-244, midy+88)
    quad(midx-304, midy+89, midx-139, midy+86, midx-124, midy+104, midx-284, midy+120)
  
  function playButton(midx, midy) {
    //playButton could be used for animations/interactions
    circle(midx-222, midy-44, 100)
    triangle(midx-239, midy-66, midx-194, midy-45, midx-239, midy-21)  
    }
    
    playButton(960, 540); 
    }  