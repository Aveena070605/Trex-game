var DINO,dino_image
var GROUND,ground_image
var invisible;
var clouds,cloud_image
var cactus,catus_image1,catus_image2,catus_image3,catus_image4,catus_image5,catus_image6
var PLAY=1
var END=0
var Gamestate=PLAY
var cactusgroup
var cloudsgroup
var dinostop
var score=0
var gameoverimage,restartimage,gameover,restart


function preload(){
  dino_image=loadAnimation("trex1.png","trex3.png","trex4.png")
  ground_image=loadImage("ground2.png")
  cloud_image=loadImage("cloud.png")
  cactus_image1=loadImage("obstacle1.png")
  cactus_image2=loadImage("obstacle2.png")
  cactus_image3=loadImage("obstacle3.png")
  cactus_image4=loadImage("obstacle4.png")
  cactus_image5=loadImage("obstacle5.png")
  cactus_image6=loadImage("obstacle6.png")
  dinostop=loadAnimation("trex_collided.png")
  gameoverimage=loadImage("gameOver.png")
  restartimage=loadImage("restart.png")
}
function setup(){
  createCanvas(400,400)
  DINO=createSprite(50,350,20,20)
  DINO.addAnimation("dino_image",dino_image)
  DINO.addAnimation("dinostop",dinostop)
  DINO.scale=0.5
  GROUND=createSprite(200,370,400,60)
  GROUND.addImage("ground_image",ground_image)
  invisible=createSprite(200,385,400,20)
  invisible.visible=false
  cactusgroup=new Group()
  cloudsgroup= new Group()
  gameover=createSprite(150,150,10,10)
  gameover.addImage("gameoverimage",gameoverimage)
  gameover.scale=0.5
  gameover.visible=false
  restart=createSprite(200,240,10,10)
  restart.addImage("restartimage",restartimage)
  restart.scale=0.5
  restart.visible=false
  
}
function draw(){
  background("white ")
  drawSprites()
  text("score:"+score,340,30  )
  if (Gamestate===PLAY){
    if(frameCount%5===0){
      score=score+1
    }
    if(keyDown("space")&& DINO.y>=351.5){
  DINO.velocityY=-12 
 
  }  
    DINO.velocityY=DINO.velocityY+0.8 
    GROUND.velocityX=-5  
  if(GROUND.x<0){
    GROUND.x=GROUND.width/2
    }
    cloud()
  Cactus()
    if(cactusgroup.isTouching(DINO)){
      Gamestate=END
    }
  }
  else if(Gamestate===END){
    GROUND.velocityX=0
    DINO.velocityY=0
    cloudsgroup.setVelocityXEach(0)
    cactusgroup.setVelocityXEach(0)
    cloudsgroup.setLifetimeEach(-1)
    cactusgroup.setLifetimeEach(-1)
    DINO.changeAnimation("dinostop",dinostop)
    gameover.visible=true
    restart.visible=true
  }
  if(mousePressedOver(restart)&&Gamestate===END){
    reset()
  }
  
  
  
  DINO.collide(invisible) 
  
console.log(DINO.y)
  
}
function cloud(){
  if(frameCount%60===0){
  clouds=createSprite(400,30,20,20)
  clouds.velocityX=-5
  clouds.addImage(cloud_image)
  clouds.y=random(120,280)
  DINO.depth=clouds.depth
  DINO.depth=DINO.depth+1
  clouds.lifetime=90
    cloudsgroup.add(clouds)
  }
  
  
}
function Cactus(){
  if(frameCount%70===0){
    cactus=createSprite(400,340,20,20)
    cactus.velocityX=-5
    var r= Math.round(random(1,6))
    switch(r){
      case 1:cactus.addImage(cactus_image1)
        break;
        case 2:cactus.addImage(cactus_image2)
        break;
        case 3:cactus.addImage(cactus_image3)
        break;
        case 4:cactus.addImage(cactus_image4)
        break;
        case 5:cactus.addImage(cactus_image5)
        break;
        case 6:cactus.addImage(cactus_image6)
        break;
        default:break; 
    }
    cactus.scale=0.7
    cactus.lifetime=90
    cactusgroup.add(cactus)
    
  }
  
}
function reset(){
  Gamestate=PLAY
  cactusgroup.destroyEach()
  cloudsgroup.destroyEach()
  score=0
  DINO.changeAnimation("dino_image",dino_image)
  gameover.visible=false
  restart.visible=false
  
}