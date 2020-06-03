var trex, trexRun, ground, groundImg, invisGround

function preload() {
  trexRun = loadAnimation("trex1.png", "trex3.png",       "trex4.png");
  groundImg = loadImage("ground2.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,170,10,10);
  trex.addAnimation("trex1", trexRun);
  trex.scale = 0.5;
  
  ground = createSprite(300,180,600,10)
  ground.addImage(groundImg);
  ground.x = ground.width/2;
  
  invisGround = createSprite(300,185,600,5);
  invisGround.visible = false;
}

function draw() {
  background(255,220,100);
  
  ground.velocityX = -5;
  
  if(keyDown("space")&&trex.y>159){
    trex.velocityY = -12;
  }
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  console.log(trex.y)
  
  trex.velocityY = trex.velocityY+1;
  trex.collide(invisGround);
 
  drawSprites();
}