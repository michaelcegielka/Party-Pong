
//Koordinaten von Spieler 1.
var xPosOne = 0;
var yPosOne = 0;
//Koordinaten von Spieler 2.
var xPosTwo = 0;
var yPosTwo = 0;
let button;
let slider;
// var distance;
// const max = 50;
var backgroundColor;
var panda;

function preload() {
  
  panda = loadImage('panda.jpg');
}


function setup(){
    //Unser Fenster
    createCanvas(windowWidth, windowHeight);

    //Die Objekte sind nicht ausgemalt
    noFill(0)
            //   intervalCurrentPosition(positionPing, 5000);
            //   distance = calcGeoDistance(46.785844, -92.015965, 44.940834, -93.311287, 'mi')
            //	 print(distance);
    //setzt die Spieler an die Startposition
    sliderShow();


    button = createButton('click me');
    button.position(19, 19);

    
    setPosition();


    //Aktualisierungsrate
    // @param = FPS --> wenn leer wir die FPS des Gerätes genommen.
    frameRate(5)

    

}



function draw(){


  let rotationTest = slider.value();
  background(rotationTest);
    //Arbeitsbereich skalieren und platzieren
    translate(width / 2, height / 2);

    scale(4, -4);
    // Hintergrundfarbe
    pandaBg();
    
    // Disko Background ;=)
    // backgroundC();
    
    //Linienstärke
    strokeWeight(1 / scale)

    //Spielfeldlinien
    rect(-75, -75, 150, 150);

    //Begrenzung des Spielfeldes
    limit();


    spielerEins();
    spielerZwei();
    ball();
    button.mousePressed(changeBG);
    playerPos();





}
     // function setMobilePos(){
     // var mobileX = mobileDatenX;
     // var mobileY = mobileDatenY;


     //SIMPLE? :
        //function movement(){
     // if (mobileDatenX < mobileX)
     // xPosOne += -5;
     //   else  if (mobileDatenX > mobileX)
      //      xPosOne += 5;}

      //OPTIMAL? :
        //function movement(){
     // if (mobileDatenX < mobileDatenX vor 2 Sek)
     // xPosOne += -5;
     //   else  if (mobileDatenX > mobileDatenX vor 2 Sek)
      //      xPosOne += 5;}

        //function positionPing(position){
        //  print("lat: " + position.latitude);
         // print("long: " + position.longitude);
        //}

    //Setzt Startposition
    function setPosition(){
    xPosOne = -20;
    yPosOne = -70;
    xPosTwo = -20;
    yPosTwo = 60; 
    }
    //Diskobackground
    function backgroundC(){
     r = random(0, 255);
     g = random(0, 255);
     b = random(0, 255);
    background(r, g, b);

    }
    //Erzeugt den Ball
    function ball(){
        r = random(0, 255);
        g = random(0, 255);
        b = random(0, 255);
    fill(r, g, b);
    ellipse(0, 0, 10, 10);
    noFill();
    } 
    //Spieler 1
    function spielerEins(){
    fill(0);
    rect(xPosOne, yPosOne, 40, 10);
    noFill();
    }
    //Spieler 2
    function spielerZwei(){
    fill(0);
    rect(xPosTwo, yPosTwo, 40, 10);
    noFill();   
    }
    //Spieler bewegen sich durch drücken von "A" und "D" bzw. "<-" und "->"
    function keyPressed(){
      //Die Zahlen sind die jeweiligen Tasten
    if(keyCode === 65)
          xPosOne += 5;
          else if(keyCode === 68)
           xPosOne += -5;
            else    
                  xPosOne = xPosOne;
                  if(keyCode === 37)
                  xPosTwo += 5;
                  else if(keyCode === 39)
                   xPosTwo += -5;
                    else    
                          xPosTwo = xPosTwo;
      

  }
  //Spielbegrenzung
  function limit(){
    if(xPosOne <= -75)
        xPosOne = -75; 
        else if(xPosOne >= 35)
        xPosOne = 35; 
    
    if(xPosTwo <= -75)
        xPosTwo = -75; 
        else if(xPosTwo >= 35)
        xPosTwo = 35; 

  }
  function pandaBg(){

    rotate(PI, 3.0)
    image(panda, -75, -75, 150, 150 );
  }




function changeBG() {
  textSize(32);
text('TEST', 0, 10);
fill(0, 102, 153);
}
//function setup() {
//  createCanvas(windowWidth, windowHeight);
 // console.log('starting');
//	noStroke();
  // get position once
//  if (!navigator.geolocation) {
//    alert("navigator.geolocation is not available");
//  }
//  navigator.geolocation.getCurrentPosition(setPos);
//}

function setPos(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  
  fill(255, 100, 100);
  textSize(32);
  text("Current position: " + doNf(lat,2,2) + " " + doNf(lng,2,2), -200, 200);
  noFill();
}
function sliderShow(){
  slider = createSlider(0, 255, 100);
  slider.position(windowWidth/2 + 400, windowHeight/2);
  slider.style('width', '300px');
}
  function playerPos(){
    scale(-1/2, 1/2);
    if (!navigator.geolocation) {
      alert("navigator.geolocation is not available");
    }
    navigator.geolocation.getCurrentPosition(setPos);
  }
  
