var path,boy,chai,babita,daya,chacha,gameOver;
var pathImg,boyImg,chaiImg,babitaImg,dayaImg,chachaImg,gameOverImg;
var score = 0;
var chaiG,babitaG,dayaG,chachaGroup;
var sad,sadimg;
var champaklalsound,chaipiobiscuitkhaosound,heymamatajisound,babitajisound;
var resetimg,reset;
var gameState= "play";

function preload(){
  pathImg = loadImage("road.png");
  boyImg = loadImage("jethalal.png");
  chaiImg = loadImage("chai.png");
  babitaImg = loadImage("babita.png");
  dayaImg = loadImage("daya.png");
  chachaImg = loadImage("chacha.png");
  gameOverImg =loadImage("gameover.png");
  sadimg = loadImage("sad.png");
  champaklalsound = loadSound("champaklal.mp3");
  chaipiobiscuitkhaosound = loadSound("chai.mp3");
  heymamatajisound = loadSound("heyma.mp3");
  babitajisound = loadSound("babitaji.mp3");
  resetimg = loadImage("reset.png");
}

function setup(){
  
  createCanvas(800,1000);

// create path
path=createSprite(400,500,10,10);
path.addImage(pathImg);
path.velocityY = 4;

// create reset sprite
reset = createSprite(500,200,50,50);
reset.visible = false;
  
// create gameover sprite
gameOver = createSprite(500,250,50,50);
gameOver.visible = false;
  
// create group of chai,babita,daya,chacha
chaiG=new Group();
babitaG=new Group();
dayaG=new Group();
chachaGroup=new Group();

// create boy sprite
boy = createSprite(400,500,200,200);
boy.addImage(boyImg);
boy.scale=0.5;

// create boy sad sprite
sad = createSprite(400,500,200,200);
sad.addImage(sadimg);
sad.scale=0.5;
sad.visible = false;

// boy debug
boy.setCollider("rectangle",-15,0,200,100);
boy.debug = false;
 
}

function draw() {

  background(0);
 
 
// write if-condition to as gamestate = play
  if(gameState==="play"){
  background(0);
  console.log(gameState)
  
// move boy right side
boy.x = World.mouseX; 
  boy.setSpeedAndDirection(4,0);
  
  //snake.rotation = -90



// move boy left side

  boy.setSpeedAndDirection(4,180);
 
 // snake.rotation = 90;

  // collide boy with edges
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
  // call createchai,createbabita,createdaya,createchacha function
    createchai();
    createbabita();
    createdaya();
    createchacha();

    // write if-condition for chaiG group touching boy
    if (chaiG.isTouching(boy)) {
      score=score+50;
      chaiG.destroyEach();
      chaipiobiscuitkhaosound.play();
      
    }
    // write if-condition for babitaG group touching boy
     if (babitaG.isTouching(boy)) {
      babitaG.destroyEach();
      score=score+50;
      babitajisound.play();
     
    }
    // write if-condition for dayaG group touching boy
    if(dayaG.isTouching(boy)) {
      dayaG.destroyEach();
      score=score+50;
      heymamatajisound.play();

    }
    // write if-condition for chaachaGroup group touching boy
    else{
      if(chachaGroup.isTouching(boy)) {
        champaklalsound.play();
        boy.visible = false;
        gameOver.visible = true
        gameOver.addImage(gameOverImg);
        reset.addImage(resetimg);
        reset.visible = true;
        chaiG.visible = false;
        chachaGroup.visible = false;
        dayaG.visible = false;
        babitaG.visible = false;
  
        /*chaiG.destroyEach();
        chaiG.setVelocityEach(0);
        babitaG.destroyEach();
        babitaG.setVelocityEach(0);
        chachaGroup.destroyEach();
        chachaGroup.setVelocityEach(0);
        chachaGroup.destroyEach();
        chachaGroup.setVelocityEach(0);*/
        
        
    }
  }
  // write if-condition to call restart function here
if(mousePressedOver(reset)){
  restart();
}
 }


 drawSprites();

 // write text to display score
  textSize(20);
  fill(255);
  text("score: "+ score,150,30);


}

// create createchai function
function createchai() {
  if (World.frameCount % 400 == 0) {
  var chai = createSprite(Math.round(random(5,800),40, 10, 10));
  chai.addImage(chaiImg);
  chai.scale=0.3;
  chai.velocityY = 3;
  chai.lifetime = 3000;
  chaiG.add(chai);
  }
}

// create createbabita function
function createbabita() {
  if (World.frameCount % 100 == 0) {
  var babita = createSprite(Math.round(random(5,800),40, 10, 10));
  babita.addImage(babitaImg);
  babita.scale=0.1;
  babita.velocityY = 3;
  babita.lifetime = 3000;
  babitaG.add(babita);
}
}

// create createdaya function
function createdaya() {
  if (World.frameCount % 200 == 0) {
  var daya = createSprite(Math.round(random(5,800),40, 10, 10));
  daya.addImage(dayaImg);
  daya.scale=0.15;
  daya.velocityY = 3;
  daya.lifetime = 3000;
  dayaG.add(daya);
  }
}

// create createchacha function
function createchacha(){
  if (World.frameCount % 300 == 0) {
  var chacha = createSprite(Math.round(random(5,800),40, 10, 10));
  chacha.addImage(chachaImg);
  chacha.scale=0.15;
  chacha.velocityY = 3;
  chacha.lifetime = 3000;
  chachaGroup.add(chacha);
  }
}

// create destroy function
function destroy(){
  boy.visible = false;
  boy.x = boy.x+0;
  chaiG.visible = false;
  chachaGroup.visible = false;
  dayaG.visible = false;
  babitaG.visible = false;
  
  //gameState = "end";
 
 // boy.x = 200;
 // boy.y = 300;
  sad.visible = true     
  path.velocity = 0;
  score=score+50;
 
}

// create restart function
function restart(){
  boy.visible = true;
  chaiG.visible = true;
  chachaGroup.visible = true;
  dayaG.visible = true;
  babitaG.visible = true;
  gameState = "play";
  sad.visible = false;
  score = 0
  gameOver.visible = false;
  reset.visible = false;
  path.velocityY = 4;
}










































/*Hi  🙋‍♀️Army /everyone!

I'm also an Army/Bts fan💜💜.

There is an offer🎁 for you all.

Give me 1️⃣like❤️and in return take my one like❤️.

I'll gave u likes❤️ in ur every projects not only one project ,but you also have to give me likes ❤️on my every projects.

Don't forget ❌ to comment below while you are liking ❤️because then I'll be able to give u the likes❤️.

Don't forget to tell you fav bts member.

Hurry up🥳!

and don't forget what bts taught to us 💜💜LOVE YOURSELF💜💜 .

and also plz like my yt channel my channel name is "AISHWARYA CHAUHAN",my channel will come on 1st or 2nd number,there are 4 members on my yt channel dp,one girl with spectacles 👓with black top,one aunty(my mumma)one uncle(my papa),one girl(my sis).

there are may be 63 or 62 subscribers maximum. 

I can share the link but I'don't know😅 how to share my yt channel link because here link is not allowed😔.

Plz like my channel army😭.

It's a request of one army from another army and when u done(subscribed my channel)then comment below that done,in yt channel or on community.

nd also don't forget my offer🎁.*/