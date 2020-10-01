var trex, trex_running;
var ground,groundImage;
var PLAY=1,END=0;
var gameState=PLAY;
var count=0;
var invisibleGround,cloudImage;
var CloudsGroup,ObstaclesGroup, gameOver,gameOverImg,restart,restartImg;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var jumpSound,dieSound,checkSound;
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
   obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");    obstacle4=loadImage("obstacle4.png");
    obstacle5=loadImage("obstacle5.png");
    obstacle6=loadImage("obstacle6.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkSound=loadSound("checkPoint.mp3");
  }

//function explosion() { ball.velocityY=random(-8,8); }

function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,160,20,20);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5
  ground = createSprite(300,180,600,20);
 // ground.setAnimation("ground2");
  ground.addImage(groundImage) 
  ground.velocityX=-4;
   invisibleGround = createSprite(300,185,600,5);
  invisibleGround.visible = false;
  CloudsGroup=new Group();
  ObstaclesGroup=new Group();
gameOver = createSprite(300,100);
restart = createSprite(300,140);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
restart.addImage(restartImg);
restart.scale = 0.5;
  gameOver.visible = false;
restart.visible = false;
  trex.addAnimation("collided", trex_collided);
  trex.setCollider("circle",0,0,30);
}

function draw() {
  background(255);
   text("Score: "+ count, 500, 50);
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count=count+ Math.round(getFrameRate()/60);
    
    if (count>0 && count%100 === 0){
    checkSound.play();
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
     jumpSound.play();
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    spawnClouds();
    spawnObstacles();
    if (trex.isTouching(ObstaclesGroup)){
      gameState=END;
      dieSound.play();
    }
  }
    else if (gameState===END){
       gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
   if(mousePressedOver(restart)) {
    reset();
  }
    }
    //ball.bounceOff(paddle,explosion);
  
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,40,10);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);   
      break;
        case 2:obstacle.addImage(obstacle2);   
      break;
      case 3:obstacle.addImage(obstacle3);   
      break;
      case 4:obstacle.addImage(obstacle4);   
      break;
      case 5:obstacle.addImage(obstacle5);   
      break;
      case 6:obstacle.addImage(obstacle6);   
      break;
    }
    //obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,10,40);
    cloud.y = Math.round (random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 220;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}
function reset(){
  gameState=PLAY;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
 trex.changeAnimation("running",trex_running);
  gameOver.visible=false;
  restart.visible=false;
  count=0;
}