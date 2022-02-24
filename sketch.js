var pc1, pc2;
var obstacle1;
var obstacle2;
var obstacle3;
var gameState = "start";
var bg; 
var bluescore = 0;
var redscore = 0;
var informationbuttonImg, playbuttonImg, logoImg;
var exitButtonImg; 
var cloudsStartImg, cloudsInfoImg;
var edges;

//Average of Red Score & Blue Score
score = (redscore+bluescore)/2;

function preload() {
  pc1 = loadImage("redplane.png");
  pc2 = loadImage("blueplane.png");
  obstacle1 = loadImage("carrot.png");
  obstacle2 = loadImage("knife.png");
  obstacle3 = loadImage("redball.png");
  bg = loadImage("background.jpeg");
  informationbuttonImg = loadImage("informationbutton.png");
  playbuttonImg = loadImage("playbutton.png");
  logoImg = loadImage("logo.png");
  exitButtonImg = loadImage("exit.png");
  cloudsStartImg = loadImage("clouds2.jpeg");
  cloudsInfoImg = loadImage("clouds1.jpeg");

}

function setup() {
 createCanvas(800,400);

  carrotGroup = new Group();
  knifeGroup = new Group();
  redballGroup = new Group();

  // PC
  character = createSprite(150,300,50,50);
  character.addImage(pc1);
  character.scale = 0.8;
  character.visible = false;
  //character.debug = true;
  character.setCollider("rectangle", -10,0,character.width-15,30);

  // PC
  character2 = createSprite(250,300,50,50);
  character2.addImage(pc2);
  character2.scale = 0.8;
  character2.visible = false;
  //character2.debug = true;
  character2.setCollider("rectangle", -10,0,character2.width-15,30);

  //Start Button 
  startButton = createSprite(370,330,50,50);
  startButton.addImage(playbuttonImg);
  startButton.scale = 3;
  
  //Logo Button 
  logoButton = createSprite(370,220,50,50);
  logoButton.addImage(logoImg);
  logoButton.visible = false;
  logoButton.scale = 3;

  //Information Button
  informationButton = createSprite(470,330,50,50);
  informationButton.addImage(informationbuttonImg);
  informationButton.scale = 3;

  //Exit Button
  exitButton = createSprite(750,350,50,50);
  exitButton.addImage(exitButtonImg);
  exitButton.scale = 3;
  exitButton.visible = false;

  // Creating Edges
  edges = createEdgeSprites();

}

function draw() {
  background(cloudsStartImg); 

  //Code for Not getting out of Canvas
  character.collide(edges[2]);
  character.collide(edges[3]);
  character2.collide(edges[2]);
  character2.collide(edges[3]);

  if(gameState==="start") {
    logoButton.visible = true;
    informationButton.visible = true;
    exitButton.visible = false;
    startButton.visible = true;
    
    if(mousePressedOver(startButton)) {
      gameState = "level1play";
      //startButton.destroy();
    }

    if(mousePressedOver(informationButton)){
      gameState="information";
      
    }

  }

  if(gameState==="information") {
    background(cloudsInfoImg);
    // Exit Button
    exitButton.visible = true;
    informationButton.visible = false;
    logoButton.visible = false;
    startButton.visible = false;

    fill("white");
    stroke("black");
    strokeWeight(2);
    textSize(15);
    text("Once upon a time, a guy named Harry got into an argument with his best friend named Jerry. ", 10,20);
    text("They argued on which plane can fly faster and wanted to race.", 10,40);
    text("There is trash flying around.", 10,60);
    text("Your job is avoid the trash and beat the other player by your score.", 10,80);
    text("Each time the score goes up by 1000 your plane will go up a number of speed.", 10,100);
    text("If you hit the objects you will lose score of 20.", 10,120);
    text("To win you have to hit 10,000 score. Good Luck.", 10,140);

    if(mousePressedOver(exitButton)) {
      gameState="start";
    } 

  }

  if(gameState==="level1play") {
    background(bg);
    spawnCarrot();
    spawnKnife();
    spawnRedBall();
    character.visible = true;
    character2.visible = true;
    informationButton.visible = false;
    logoButton.visible = false;
    startButton.destroy();
    exitButton.destroy();
    
    // Player Controls Lowercase (Caps Lock Off)
    if(keyCode===119) {
      character.y = character.y-5;
    }

    if(keyCode===115) {
      character.y = character.y+5;
    }

    if(keyCode===105) {
      character2.y = character2.y-5;
    }

    if(keyCode===107) {
      character2.y = character2.y+5;
    }

    fill("white");
    textSize(20);
    text('Blue Plane Score = ' + bluescore, 500,50);
    text('Red Plane Score = ' + redscore, 200,50);
    bluescore = bluescore + Math.round(getFrameRate()/60);
    redscore = redscore + Math.round(getFrameRate()/60);



    // Character 1 
    if(carrotGroup.isTouching(character)) {
      carrotGroup[0].destroy();
      redscore = redscore - 30;
    }

    if(redballGroup.isTouching(character)) {
      redballGroup[0].destroy();
      redscore = redscore - 20;
    }

    if(knifeGroup.isTouching(character)) {
      knifeGroup[0].destroy();
      redscore = redscore - 40;
    }

    // Character 2
    if(carrotGroup.isTouching(character2)) {
      carrotGroup[0].destroy();
      bluescore = bluescore - 30;
    }

    if(redballGroup.isTouching(character2)) {
      redballGroup[0].destroy();
      bluescore = bluescore - 20;
    }

    if(knifeGroup.isTouching(character2)) {
      knifeGroup[0].destroy();
      bluescore = bluescore - 40;
    }

    if(redscore===10000 || bluescore===10000) {
      gameState='win';
    }

    if(redscore<0 || bluescore<0) {
      gameState='end';
    }
    
  }

  if(gameState==='win') {
    if(redscore===10000) {
      textSize(40);
      fill("white");
      strokeWeight(5);
      stroke("black");
      text("Red Plane won with a score of " + redscore, 50,200);
      carrotGroup.destroyEach();
      knifeGroup.destroyEach();
      redballGroup.destroyEach();
      character.destroy();
      character2.destroy(); 
    }

    if(bluescore===10000) {
      textSize(40);
      fill("white");
      strokeWeight(5);
      stroke("black");
      text("Blue Plane won with a score of " + bluescore, 50,200);
      carrotGroup.destroyEach();
      knifeGroup.destroyEach();
      redballGroup.destroyEach();
      character.destroy();
      character2.destroy(); 
    }

    
  }

  if(gameState==='end') {
    if(redscore<0) {
      textSize(40);
      fill("white");
      strokeWeight(5);
      stroke("black");
      text("Blue Plane won with a score of " + bluescore, 50,200);
      carrotGroup.destroyEach();
      knifeGroup.destroyEach();
      redballGroup.destroyEach();
      character.destroy();
      character2.destroy(); 
    }

    if(bluescore<0) {
      textSize(40);
      fill("white");
      strokeWeight(5);
      stroke("black");
      text("Red Plane won with a score of " + redscore, 50,200);
      carrotGroup.destroyEach();
      knifeGroup.destroyEach();
      redballGroup.destroyEach();
      character.destroy();
      character2.destroy(); 
    }

    
  }

  drawSprites();
  
}

function spawnCarrot() {
  if(frameCount%170===0) {
  // NPC First Obstacle
  obstacle01 = createSprite(800,100,50,50);
  obstacle01.y = random(100,350);
  obstacle01.velocityX = -[5.5 + score/10000]
  obstacle01.addImage(obstacle1);
  obstacle01.scale = 0.9;
  //obstacle01.debug = true;
  obstacle01.lifetime = 250;
  obstacle01.setCollider("circle",0,0,40);
  carrotGroup.add(obstacle01);
  }
}

function spawnKnife() {
  if(frameCount%130===0) {
  // NPC Second Obstacle
  obstacle02 = createSprite(800,100,50,50);
  obstacle02.y = random(50,400);
  obstacle02.velocityX = -[5 + score/10000]
  obstacle02.addImage(obstacle2);
  obstacle02.scale = 0.9;
  //obstacle02.debug = true;
  obstacle02.lifetime = 200;
  obstacle02.setCollider("circle",0,0,40);
  knifeGroup.add(obstacle02);
  }
}

function spawnRedBall() {
  if(frameCount%150===0) {
  // NPC Third Obstacle
  obstacle03 = createSprite(800,100,50,50);
  obstacle03.y = random(100,350);
  obstacle03.velocityX = -[5.25 + score/10000]
  obstacle03.addImage(obstacle3);
  obstacle03.scale = 0.9;
  //obstacle03.debug = true;
  obstacle03.lifetime = 400;
  obstacle03.setCollider("circle",15,0,40);
  redballGroup.add(obstacle03);
  }
}