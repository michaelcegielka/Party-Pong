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
  slider.size(windowWidth-100, 10);
  slider.style('color', color(255));
  slider.style('border', "2.5px solid black");
  slider.style('borderRadius', "30px");
  slider.style('appearance', "none");
  slider.style('background-color', color(128, 255, 170));
  slider.hide();
}

//Buttons
function setButtons() {
  playHereButton = createButton('Play Here');
  //let backCol = color(229, 0, 53);  //red
  //let backCol = color(0, 34, 102);  //blue
  //let backCol = color(255, 77, 210);  //pink
  let backCol = color(128, 255, 170);  //mint green
  let fontCol = color(20);
  playHereButton.style('background-color', backCol);
  playHereButton.style('color', fontCol);
  playHereButton.style('fontWeight',"bold");
  playHereButton.style('border',"2.5px solid black");
  playHereButton.style('borderRadius',"30px");
  playHereButton.position(45, 25);
  playHereButton.size(playHereButton.size().width + 35, playHereButton.size().height + 5);
  playHereButton.mousePressed(setButtonPressed);
  playHereButton.hide();

  startGameButton = createButton('Start Game');
  startGameButton.style('background-color', backCol);
  startGameButton.style("color", fontCol);
  startGameButton.style('fontWeight',"bold");
  startGameButton.style('border',"2.5px solid black");
  startGameButton.style('borderRadius',"30px");
  //startGameButton.position(140, 25);
  startGameButton.position(windowWidth-(startGameButton.size().width + 80), 25);
  startGameButton.size(startGameButton.size().width + 35, startGameButton.size().height + 5);
  startGameButton.mousePressed(startGame);
  startGameButton.hide();

  setStartNewGameButton();
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
