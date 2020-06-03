var trex, trexRun, ground, groundImg, invisGround, cloudImg, ob1, ob2, ob3, ob4, ob5, ob6, obstacleGroup, cloudsGroup, gameState, PLAY, END, trexCollided, gameOver, restart, gameOverImg, restartImg, score;

function preload() {
  trexRun = loadAnimation("trex1.png", "trex3.png",       "trex4.png");
  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  
  trexCollided = loadAnimation("trex_collided.png")
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  
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
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
  cloudsGroup = createGroup();
  obstacleGroup = createGroup();
  
  trex.addAnimation("trex2", trexCollided);
  
  gameOver = createSprite(300,80,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  
  restart = createSprite(300,120,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.6
  restart.visible = false;
}

function draw() {
  background(200,180,100);
  
  if(gameState===PLAY){
    ground.velocityX = -5;
    if(keyDown("space")&&trex.y>159){
      trex.velocityY = -12;
    }
    if(ground.x<0){
      ground.x = ground.width/2;
    }
    trex.velocityY = trex.velocityY+1;
    spawnClouds();
    spawnObstacles();
    if(obstacleGroup.isTouching(trex)){
      gameState=END;
    }
    
  }
  else if(gameState===END){
    ground.velocityX = 0;
    cloudsGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    trex.velocityY=0;
    trex.changeAnimation("trex2");
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
  }
  
  if(mousePressedOver(restart)) {
  reset();
  }
  
  trex.collide(invisGround);
  
  drawSprites();
}

function spawnClouds() {

  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round (random (80,120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    console.log(rand);
    switch(rand) {
      case 1: obstacle.addImage(ob1); break;
      case 2: obstacle.addImage(ob2); break;
      case 3: obstacle.addImage(ob3); break;
      case 4: obstacle.addImage(ob4); break;
      case 5: obstacle.addImage(ob5); break;
      case 6: obstacle.addImage(ob6); break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("trex1",trexRun);
  
  count = 0;
  
}