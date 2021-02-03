
function calcPaddlePointX() {
  rectHeight = calculateRotatedVector(yMinPoint, yMaxPoint, rotAngle);
  let helpPos = mappaMap.latLngToPixel(paddleGeoCoor.lat, paddleGeoCoor.lng);
  let transfPos = calculateRotatedVector(yMinPoint, helpPos, rotAngle);

  if(transfPos.y < 0) {
    paddlePointX = fieldWidth;
  }
  else if(transfPos.y > rectHeight.y) {
    paddlePointX = 0;
  }
  else {
    paddlePointX = fieldWidth - map(transfPos.y, 0, rectHeight.y, 0, fieldWidth);
  }

  if(paddlePointX < paddleWidthStatic/2) {
    paddlePointX = paddleWidthStatic/2;
  }
  else if(paddlePointX > fieldWidth - paddleWidthStatic/2) {
    paddlePointX = fieldWidth - paddleWidthStatic/2;
  }
}

function drawPaddle() {
  push();
  translate(originPoint.x, originPoint.y);
    rectMode(CENTER);
    fill('green');
    noStroke();
    rect(paddlePointX, -movingLineWidth/2, paddleWidthStatic, paddleHeightStatic);
  pop();

  //fill('black');
  //ellipse(originPoint.x, originPoint.y, 5, 5);
}

function drawOtherPaddle() {
  let otherX = fieldWidth - otherPlayerXCoor;
  push();
    translate(originPoint.x, originPoint.y);
    rectMode(CENTER);
    fill('yellow');
    noStroke();
    if(otherPlayerXCoor <= -1) {
      otherX = fieldWidth/2;
    }
    rect(otherX, -fieldWidth + movingLineWidth/2, paddleWidthStatic, paddleHeightStatic);
  pop();
}

function drawPlayerInfo() {
  rectMode(CORNER);
  fill(240);
  noStroke();
  rect(0, windowHeight - 50, windowWidth, 50);
  rect(0, 0, windowWidth, 50);

  rectMode(CENTER);
  fill(20);
  textSize(23);
  textAlign(CENTER, CENTER);
  text(playerName, 80, windowHeight - 25, 200, 50);
  text(otherPlayerName, 80, 25, 200, 50);
  /*
  text("Points: 0", windowWidth - 130, windowHeight - 25);
  text("Points: 0", windowWidth - 130 + 20, 25);
  */
}

function drawWaitingForOther() {
  background(240);
  rectMode(CENTER);
  fill(20);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Waiting for the", windowWidth/2, windowHeight/2 - 25);
  text("other player", windowWidth/2, windowHeight/2 + 25);
}

let xVelocity;  //in pixels/second
let yVelocity;
let ballDiameter = 15;
let firstRound = true;
let xBallDraw;
let yBallDraw;

function setBallStart() {
  ballXCoor = fieldWidth/2;
  ballYCoor = -fieldWidth/2;
  updateThisRoomAttribute("ballXCoordinate", ballXCoor);
  updateThisRoomAttribute("ballYCoordinate", ballYCoor);
  xVelocity = 20;
  yVelocity = -10;
}

function drawBall() {
  if(firstRound) {
    setFirstRound();
  }

  if(playerNo == 1) {
    let fps = frameRate();
    let xVelPerFrame = xVelocity / fps;
    let yVelPerFrame = yVelocity / fps;

    ballXCoor += xVelPerFrame;
    ballYCoor += yVelPerFrame;
    xBallDraw = ballXCoor;
    yBallDraw = ballYCoor;

    testCollision();

  } else if(playerNo == 2) {
    xBallDraw = fieldWidth - ballXCoor;
    yBallDraw = -fieldWidth - ballYCoor;
  }

  fill('red');
  push();
    translate(originPoint.x, originPoint.y);
    circle(xBallDraw, yBallDraw, ballDiameter);
  pop();
}

function testCollision() {
  if((xBallDraw - ballDiameter/2 <= 0 && xVelocity < 0) ||                //linke Wand
     (xBallDraw + ballDiameter/2 >= fieldWidth && xVelocity > 0)) {  //rechte Wand
    xVelocity *= -1;
  }

  //Collision mit eigenem Paddle
  if(yBallDraw + ballDiameter/2 >= -movingLineWidth/2 - paddleHeightStatic/2 &&
     paddlePointX - paddleWidthStatic/2 <= xBallDraw && xBallDraw <= paddlePointX + paddleWidthStatic/2 && yVelocity > 0) {
    yVelocity *= -1;
  }

  let otherXDraw = fieldWidth - otherPlayerXCoor;

  //Collision mit Paddle des Gegners
  if(yBallDraw - ballDiameter/2 <= -fieldWidth + movingLineWidth/2 + paddleHeightStatic/2 &&
     otherXDraw - paddleWidthStatic/2 <= xBallDraw && xBallDraw <= otherXDraw + paddleWidthStatic/2 && yVelocity < 0) {
       yVelocity *= -1;
   }

   if((yBallDraw - ballDiameter/2 <= - fieldWidth && yVelocity < 0) || //Wand oben
      (yBallDraw + ballDiameter/2 >= 0 && yVelocity > 0)) {           //Wand unten
     yVelocity *= -1;
   }
}

function updateBallPosition() {
  if(playerNo == 1) {
    updateThisRoomAttribute("ballXCoordinate", ballXCoor);
    updateThisRoomAttribute("ballYCoordinate", ballYCoor);
  }
}

function setFirstRound() {
  setBallStart();
  firstRound = false;
}

let i = 0;
function testMovePaddles() {
  if(i == 0) {
    paddlePointX = fieldWidth/2;
    ++i;
  }
  if(keyIsDown(LEFT_ARROW)) {
    paddlePointX -= 4;
  }
  if(keyIsDown(RIGHT_ARROW)) {
    paddlePointX += 4;
  }

  if(paddlePointX < paddleWidthStatic/2) {
    paddlePointX = paddleWidthStatic/2;
  }
  else if(paddlePointX > fieldWidth - paddleWidthStatic/2) {
    paddlePointX = fieldWidth - paddleWidthStatic/2;
  }

  /*
  if(keyIsDown(65)) {
    otherPlayerXCoor += 4;
  }
  if(keyIsDown(68)) {
    otherPlayerXCoor -= 4;
  }

  if(otherPlayerXCoor < paddleWidthStatic/2) {
    otherPlayerXCoor = paddleWidthStatic/2;
  }
  else if(otherPlayerXCoor > fieldWidth - paddleWidthStatic/2) {
    otherPlayerXCoor = fieldWidth - paddleWidthStatic/2;
  } */
}
