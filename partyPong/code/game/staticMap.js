//Endung *Point: Objekt mit den Pixelkoordinaten (x,y) als Attribute

const staticMappa = new Mappa('Mapbox', mappakey);
const helperMappa = new Mappa('Mapbox', mappakey);

//Das mappa-Objekt für die Static Map.
let staticMappaMap;
let helperMappaMap;

//Die Static Map als Bild.
let mapImage;
let helperMapImage;

let middleXPoint;

let xMinPoint;
let xMaxPoint;

let originPoint;

let fieldCenter;

let paddlePointX;

let fieldWidth;
const movingLineWidth = 30;
const borderWidth = 6;
const paddleWidthStatic = 40;
const paddleHeightStatic = 20;

const staticOptions = {
  lat: 53.1060095,  //Uniwiese
  lng: 8.84913369,
  zoom: 17,
  width: 1280,
  height: 1280,
  scale: 1,
  pitch: 0,
  bearing: 0,
  style: 'dark-v9',
};

function makeHelperMap() {
  staticOptions.lat = yMinGeoCoorStart.lat;
  staticOptions.lng = yMinGeoCoorStart.lng;
  if(windowWidth < 1280) {
    staticOptions.width = windowWidth;
  }
  if(windowHeight < 1280) {
    staticOptions.height = windowHeight;
  }
  staticOptions.bearing = 0;

  helperMappaMap = helperMappa.staticMap(staticOptions);
  helperMapImage = loadImage(helperMappaMap.imgUrl, helperMapImage => {;
    helperMapImageLoaded = true;});
}

//Erstellt eine Static Map.
function makeStaticMap() {
  calculateCenterOfMap();
  if(windowWidth < 1280) {
    staticOptions.width = windowWidth;
  }
  if(windowHeight < 1280) {
    staticOptions.height = windowHeight;
  }
  staticOptions.bearing = rotAngle - 90;

  staticMappaMap = staticMappa.staticMap(staticOptions);
  mapImage = loadImage(staticMappaMap.imgUrl, mapImage => {;
    mapImageLoaded = true;});
}

function setFieldParameters() {
  setFieldPoints();
  setOriginPoint();
  calculateFieldWidth();
}

function setOriginPoint() {
  originPoint = {
    x: xMinPoint.x,
    y: xMinPoint.y + movingLineWidth / 2
  };
}

function drawPositionStatic() {
    if(typeof curPos !== 'undefined' && typeof helperMappaMap !== 'undefined') {
    let pos = helperMappaMap.latLngToPixel(curPos.lat, curPos.lng);
    fill(color('magenta'));
    ellipse(pos.x, pos.y, 15, 15);
  }
}

function drawField() {
  colorMode(RGB, 255, 255, 255, 1);
  fill(color(255, 255, 255, 0.5));
  rectMode(CENTER);
  rect(middleXPoint.x, middleXPoint.y, fieldWidth, movingLineWidth);
  rect(middleXPoint.x, middleXPoint.y - fieldWidth + movingLineWidth, fieldWidth, movingLineWidth);

  drawPaddle();
  drawOtherPaddle();
}

function drawPaddle() {
  push();
  translate(originPoint.x, originPoint.y);
    rectMode(CORNER);
    noFill();
    strokeWeight(borderWidth);
    stroke(255);
    rect(-borderWidth/2, -fieldWidth - borderWidth/2, fieldWidth + borderWidth, fieldWidth + borderWidth);

    rectMode(CENTER);
    fill('green');
    noStroke();
    rect(paddlePointX, -movingLineWidth/2, paddleWidthStatic, paddleHeightStatic);
  pop();

  //fill('black');
  //ellipse(originPoint.x, originPoint.y, 5, 5);
}

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

function drawOtherPaddle() {
  let otherX = fieldWidth - otherPlayerXCoor;
  push();
    translate(originPoint.x, originPoint.y);
    rectMode(CENTER);
    fill('yellow');
    noStroke();
    if(otherPlayerXCoor == -1) {
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
  text("Points: 0", windowWidth - 160, windowHeight - 25);
  text("Points: 0", windowWidth - 160 + 20, 25);

  let backCol = color(229, 0, 53);
  let fontCol = color(255);

  backToMenu = createButton('Back');
  backToMenu.style('background-color', backCol);
  backToMenu.style("color", fontCol);
  backToMenu.position(270, 19);
  backToMenu.mousePressed(openIndex);


}



function drawWaitingForOther() {
  background(240);
  rectMode(CENTER);
  fill(20);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Waiting for the other player.", windowWidth/2, windowHeight/2);
}


function openIndex(){
  document.location.href = "https://michaelcegielka.github.io/Party-Pong/partyPong/code/menus/index.html";

}