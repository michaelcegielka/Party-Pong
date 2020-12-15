
//Das Canvas-Objekt für p5.js
let canvas;

//button
let setButton;
let resetRotationButton;
let slider;
var panda;

//Wird ein mal zu Beginn von p5.js aufgerufen.
function preload() {
  
  panda = loadImage('panda.jpg');
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  setupMap();

  
  
  setStartCoor(53.1060095, 8.84913369);
  setPaddleStartCoor();
  setRotAngle(90);
  setYLineMinMaxCoor();
  

  //Button try
  setButton = createButton('set position');
  setButton.position(19, 19);
  setButton.mousePressed(updateStartingPoint);
  //setButton.mousePressed(changePlayerPosition);
  resetRotationButton = createButton('reset angle');
  resetRotationButton.position(windowWidth/10, 19);
  resetRotationButton.mousePressed(resetRotation);

  //Slider
  setSlider();
  
  //aktuelle Position als Text
  //showPosition()
}


//Wird in einer Schleife von p5.js aufgerufen.
function draw() {
  
  mappaMap.onChange(executeOnMapChange);
  mousePosition();

  let rotationTest = slider.value();
  setRotAngle(rotationTest);
  playersCurrentPosition();
  


  
}

//Methode zum Testen: Überträgt beim Klicken auf die Karte die Geo-Koordinaten
//der Maus an das Paddle.
function mousePosition() {
  if(mouseIsPressed) {
    const position = mappaMap.pixelToLatLng(mouseX, mouseY);
    setPaddleGeoCoor(position.lat, position.lng);
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
  drawField();
  drawYLine();
  drawPaddleOnPosition();
  pandaBg();

  
  //if(showPosition() != updateShowPosition())
  //  updateShowPosition();

}

//Slider
function setSlider(){

  slider = createSlider(0, 180, 90, 10);
  slider.position(windowWidth/3, windowHeight/3);
  slider.size(400, 80);



}
function resetRotation(){
  slider.value(90);
  fill(255, 255, 255);
 // textSize(400);
 // text('DONE', windowWidth/2, windowHeight/2);
  
  //setRotAngle(90);

}
