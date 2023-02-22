                              //ball body
let xBall = 350;
let yBall = 250;
let diametro = 30;
let raio = diametro / 2;

                              //ball speed
let speedXBall = 7;
let speedYBall = 7;

                              //barr shape
let xBarr = 5
let yBarr = 200
let Barrwidth = 10;
let Barrheight = 90;

                           //enemybarr shape
let xEnemyBarr = 685;
let yEnemyBarr = 200;
let speedYEnemy;

let hit = false;

                             //game score
let MyPoints = 0;
let EnemyPoints = 0;

                             //game sounds
let barrsound;
let score;
let Priston;

function preload(){
  priston = loadSound("priston.mp3");
  score = loadSound("score.mp3");
  barrsound = loadSound("barrsound.mp3");
  
}

function setup() {
  createCanvas(700, 500);
  priston.loop();
}

function draw() {
  background(0);
  showball();
  moveball();
  colisionedgecheck();
  rect(xBarr, yBarr, Barrwidth, Barrheight);
  showBarr(xBarr, yBarr);
  moveBarr();
  colisionBarrcheck();
  hitMyBarrlibrary();
  showBarr(xEnemyBarr, yEnemyBarr);
  moveEnemyBarr();
  hitEnemyBarrlibrary();
  addScore();
  ScoredPoints();
  fill(0,255,0);

}

function showball(){
  circle(xBall, yBall, diametro);
}

function moveball(){
  xBall += speedXBall;
  yBall += speedYBall;
}

function colisionedgecheck(){
  if (xBall + raio> width ||
     xBall - raio< 0){
    speedXBall *= -1}
  if (yBall + raio> height ||
     yBall - raio< 0){
    speedYBall *= -1}
}

function showBarr(x,y){
  rect(x, y, Barrwidth, Barrheight);
}

function moveBarr() {
  if (keyIsDown (UP_ARROW)) {
    yBarr -= 10;
  }
  if (keyIsDown (DOWN_ARROW)) {
    yBarr += 10;
  }
}

function colisionBarrcheck(){
  if (xBall - raio < xBarr + Barrwidth
     && yBall - raio < yBarr + Barrheight 
      && yBall + raio > yBarr){
    speedXBall *= -1;
    barrsound.play();
  }
}

function hitMyBarrlibrary(){
  hit =
  collideRectCircle(xBarr, yBarr, Barrwidth, Barrheight, xBall, yBall, raio);
  if(hit){
    speedXBall *= -1;
  }
}

function hitEnemyBarrlibrary(){
  hit =
  collideRectCircle(xEnemyBarr, yEnemyBarr, Barrwidth, Barrheight, xBall, yBall, raio);
  if(hit){
    speedXBall *= -1;
    barrsound.play();
  }
}

function moveEnemyBarr(){
  speedYEnemy = yBall - yEnemyBarr - Barrwidth /2 - 30;
  yEnemyBarr += speedYEnemy + chanceDeErrar
  calculaChanceDeErrar()
}

let chanceDeErrar = 0;

function calculaChanceDeErrar() {
  if (EnemyPoints >= MyPoints) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 59){
    chanceDeErrar = 60
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function addScore(){
  textAlign(CENTER);
  textSize(20);
  fill(0,255,0)
  text(MyPoints, 300, 25);
  text(EnemyPoints, 400, 25)
}

function ScoredPoints(){
  if (xBall > 680){
    MyPoints += 1;
    score.play();
  }
  if (xBall < 20){
    EnemyPoints += 1;
    score.play();
  }
}