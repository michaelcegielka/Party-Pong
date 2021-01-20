//Buttons und Slider
let playHereButton;
let startGameButton;


let slider;

let yLineIsSet;
let oldSliderValue;

let panda;

//Wird ausgeführt, wenn der playHereButton gedrückt wird.
function setButtonPressed() {
  getCurrentPosition(setYLine);
}

//Zeichnet die Bewegungsachse an der aktuellen Position und mit dem durch den
//Slider festgelegten Winkel.
function setYLine(position) {
  yLineIsSet = true;
  setStartCoor(position.latitude, position.longitude);
  updateStartingPoint();
  setPaddleStartCoor(position.latitude, position.longitude);
  setRotAngle(slider.value());
  setYLineMinStart();
  setYLineMinMax();
  initPlayerGeoCoor();
}

//Slider
function setSlider(){
  rectMode(CENTER);
  slider = createSlider(0, 180, 90, 10);
  oldSliderValue = 90;
  slider.position(50, windowHeight-100);
  slider.size(windowWidth-100, 20);
  slider.style('color', color(255));
}

//Buttons
function setButtons() {
  playHereButton = createButton('Play Here');
  let backCol = color(229, 0, 53);
  let fontCol = color(255);
  playHereButton.style('background-color', backCol);
  playHereButton.style("color", fontCol);
  playHereButton.position(19, 19);
  playHereButton.mousePressed(setButtonPressed);

  startGameButton = createButton('Start Game');
  startGameButton.style('background-color', backCol);
  startGameButton.style("color", fontCol);
  startGameButton.position(120, 19);
  startGameButton.mousePressed(startGame);
}

//Setzt den Slider zurück.
function startGame() {
  gameStarted = true;
  slider.hide();
  playHereButton.hide();
  startGameButton.hide();
}

function pandaBg(){
  image(panda, windowWidth/2-75, 0, 150, 150);
}
