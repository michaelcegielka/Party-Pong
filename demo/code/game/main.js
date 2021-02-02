//Das Canvas-Objekt für p5.js
let canvas;

let timeBetween = 0;

let gameStarted = false;

let mapImageLoaded = false;
let helperMapImageLoaded = false;
let staticMapLoadingTime = 0;

let playerNo = 0;

//Wird ein mal zu Beginn von p5.js aufgerufen.
function preload() {
  panda = loadImage('panda.jpg');
  initializeDatabase();
}

//Wird ein mal zu Beginn von p5.js aufgerufen.
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  getCurrentPosition(setupMap);
  yLineIsSet = false;

  //Buttons und Slider
  setSlider();
  setButtons();
  getCurrentPosition(setCurPos);
  drawPosition();

  //Datenkrams
  retrievePlayerID();
  retrieveRoomID();
  playerNo = retrievePlayerNumber();
  fetchThisPlayer();
  fetchThisRoom();
}

//Wird in einer Schleife von p5.js aufgerufen.
function draw() {
  getPositionAndData();
  clear();
  //mousePosition();

  if(!gameStarted) {  //setup screen
    if(typeof mappaMap !== 'undefined') {
      playHereButton.show();
    }
    if(typeof yMinPointStart !== 'undefined') {
      slider.show();
      startGameButton.show();
      drawLinePaddle();
      //playerMoves(curPos);
    }
    drawPosition();

  } else {  //ingame screen
    if(!helperMapImageLoaded && staticMapLoadingTime < 2000) {
      makeHelperMap();
    }
    if(mapImageLoaded && staticMapLoadingTime > 2000) {

      if(otherPlayerReady) {
      //if(true) {
        background(255);
        image(mapImage, 0, 0);

        if(typeof helperMappaMap !== 'undefined' && typeof staticMappaMap !== 'undefined') {
          setFieldParameters();
          updateStartingPoint();
          setYLineMinMax();

          playerMoves(curPos);
          calcPaddlePointX();

          //testMovePaddles();

          drawField();
          drawPlayerInfo();

          updateThisPlayerAttribute("xCoordinate", paddlePointX);
        }
      } else {
        drawWaitingForOther();
      }
    } else {
      makeStaticMap();
      staticMapLoadingTime += deltaTime;
      drawWaitingForOther();
    }
  }

}

//Methode zum Testen: Überträgt beim Klicken auf die Karte die Geo-Koordinaten
//der Maus an das Paddle.
function mousePosition() {
  if(mouseIsPressed) {
    const position = mappaMap.pixelToLatLng(mouseX, mouseY);
    setPaddleGeoCoor(position.lat, position.lng);
  }
}


//Wird ausgeführt, wenn die Karte sich ändert (Verschieben, Zoomen, Drehen).
//Innerhalb dieser Methode werden all die Methoden aufgerufen, die die neuen
//Bildschirm-Koordinaten bestimmen und die Methoden, die die Objekte zeichen.
function drawLinePaddle() {
  updateStartingPoint();
  setYLineMinMax();
  drawYLine();
  //drawPaddleOnPosition();
  setRotAngle(slider.value());
}

function getPositionAndData() {
  if(timeBetween >= 30) {
    updateBallPosition();
    getCurrentPosition(setCurPos);
    fetchOtherPlayer();

    if(playerNo == 2) {
      fetchThisRoom();
    }

    timeBetween = 0;
  } else {
    timeBetween += deltaTime;
  }
}
