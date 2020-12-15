
//Das Canvas-Objekt für p5.js
let canvas;
let timeBetween = 0;

//Wird ein mal zu Beginn von p5.js aufgerufen.
//Wird ein mal zu Beginn von p5.js aufgerufen.
function preload() {
  panda = loadImage('panda.jpg');
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  yLineIsSet = false;

  //Buttons und Slider
  setSlider();
  setButtons();
  getCurrentPosition(setupMap);
  watchPosition(playerMoves);
  pandaBg();
}

//Wird in einer Schleife von p5.js aufgerufen.
function draw() {

  if(timeBetween >= 1000) {
    getCurrentPosition(playerMoves);
    timeBetween = 0;

    if(yLineIsSet) {
      executeOnMapChange();
    }
  } else {
    timeBetween += deltaTime;
  }


  //mousePosition();
}

//Methode zum Testen: Überträgt beim Klicken auf die Karte die Geo-Koordinaten
//der Maus an das Paddle.
function mousePosition() {
  if(mouseIsPressed) {
    //const position = mappaMap.pixelToLatLng(mouseX, mouseY);
    //setPaddleGeoCoor(position.lat, position.lng);
    console.log(slider.value());
    return false;
  }
}

//Wird ausgeführt, wenn die Karte sich ändert (Verschieben, Zoomen, Drehen).
//Innerhalb dieser Methode werden all die Methoden aufgerufen, die die neuen
//Bildschirm-Koordinaten bestimmen und die Methoden, die die Objekte zeichen.
function executeOnMapChange() {
  clear();
  updateStartingPoint();
  updateYLineMinMaxPoints();
  drawYLine();
  drawPaddleOnPosition();
}

function playerMoves(position) {
  setPaddleGeoCoor(position.latitude, position.longitude);
}
