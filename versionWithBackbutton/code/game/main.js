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
  clear();
  //mousePosition();

  if(!gameStarted) {  //setup screen
    /*
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCurPos, geoError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 6000
      });
    }
    */
    if(timeBetween >= 50) {
      getCurrentPosition(setCurPos);
      fetchThisRoom();
      fetchOtherPlayer();
      timeBetween = 0;
    } else {
      timeBetween += deltaTime;
    }

    if(yLineIsSet) {
      drawLinePaddle();
      playerMoves(curPos);
    }
    drawPosition();

  } else {  //ingame screen
    fetchThisRoom();
    fetchOtherPlayer();
    if(!helperMapImageLoaded && staticMapLoadingTime < 2000) {
      makeHelperMap();
    }
    if(mapImageLoaded && staticMapLoadingTime > 2000) {

      if(otherPlayerReady) {
        background(255);
        image(mapImage, 0, 0);

        if(timeBetween >= 50) {
          getCurrentPosition(setCurPos);
          timeBetween = 0;
        } else {
          timeBetween += deltaTime;
        }

        if(typeof helperMappaMap !== 'undefined') {
          setFieldParameters();
          updateStartingPoint();
          setYLineMinMax();
          playerMoves(curPos);
          calcPaddlePointX();
          updateThisPlayerAttribute("xCoordinate", paddlePointX);
          drawField();
          drawPlayerInfo();
          //drawPositionStatic();
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
