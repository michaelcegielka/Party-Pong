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
    let xPos;
    if(paddlePointX < paddleWidthStatic/2) {
      xPos = paddleWidthStatic/2;
    }
    else if(paddlePointX > fieldWidth - paddleWidthStatic/2) {
      xPos = fieldWidth - paddleWidthStatic/2;
    }
    else {
      xPos = paddlePointX;
    }
    rect(xPos, -movingLineWidth/2, paddleWidthStatic, paddleHeightStatic);
  pop();

  //fill('black');
  //ellipse(originPoint.x, originPoint.y, 5, 5);
}

function calcPaddlePointX() {
  rectHeight = calculateRotatedVector(yMinPoint, yMaxPoint, rotAngle);
  let helpPos = mappaMap.latLngToPixel(paddleGeoCoor.lat, paddleGeoCoor.lng);
  let transfPos = calculateRotatedVector(yMinPoint, helpPos, rotAngle);
  let length = 2 * (startingPoint.y - yMinPointStart.y);

  if(transfPos.y < 0) {
    paddlePointX = rectHeight.y;
  }
  else if(transfPos.y > rectHeight.y) {
    paddlePointX = 0;
  }
  else {
    paddlePointX = fieldWidth - map(transfPos.y, 0, rectHeight.y, 0, fieldWidth);
  }
  //console.log(paddleGeoCoor);
}
