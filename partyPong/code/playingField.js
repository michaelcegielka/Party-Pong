/*
function drawPongField() {
  rectMode(CORNERS);
  noStroke();
  fill(0);
  rect(windowWidth-(windowWidth/2), windowHeight - (windowWidth/2), windowWidth, windowHeight);
  stroke(255);
}
*/



function drawField(){
  noStroke();
  fill(0);
  transformModeOn();

  
  rect(-235, 278, 500, 555);
  transformModeOff();
  stroke(255);
}

function pandaBg(){


  image(panda, windowWidth/2, 0, 150, 150);

}
function setPlayerPos(position) {
  //playerCoordX 
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  //fill(255, 255, 255);
  //textSize(50);
  //text("Current position: " + nf(lat,2,2) + " " + nf(lng,2,2), 0, 100);

}



function playersCurrentPosition(){

  if (!navigator.geolocation) {
    alert("navigator.geolocation is not available");
  }
  navigator.geolocation.getCurrentPosition(setPlayerPos);
}


