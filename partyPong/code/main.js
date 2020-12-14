
//Das Canvas-Objekt für p5.js
let canvas;

//button
let button;
let slider;

//Wird ein mal zu Beginn von p5.js aufgerufen.
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  setupMap();

  
  
  setStartCoor(53.1060095, 8.84913369);
  setPaddleStartCoor();
  setRotAngle(90);
  setYLineMinMaxCoor();


  //Button try
  button = createButton('set position');
  button.position(19, 19);
  //button.mousePressed(changePlayerPosition);

  //Slider
  setSlider();
}

//Wird in einer Schleife von p5.js aufgerufen.
function draw() {
  
  mappaMap.onChange(executeOnMapChange);
  mousePosition();
  let rotationTest = slider.value();
  setRotAngle(rotationTest);

  
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
  //playersCurrentPosition()


}

//Slider
function setSlider(){

  slider = createSlider(0, 180, 90, 10);
  slider.position(windowWidth/2, windowHeight/3);
  slider.style('width', '250px');

}
