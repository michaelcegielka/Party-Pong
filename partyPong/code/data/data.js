let firebaseConfig = {
    apiKey: "AIzaSyBkQLCXctDnaGSKwFVxCobeiyJKwRXoTqE",
    authDomain: "die-trashpandas.firebaseapp.com",
    databaseURL: "https://die-trashpandas-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "die-trashpandas",
    storageBucket: "die-trashpandas.appspot.com",
    messagingSenderId: "829413993875",
    appId: "1:829413993875:web:963be3d83689e6f8b60c66",
    measurementId: "G-CM09YD9D3X"
};

let database;
let playersTable;
let roomsTable;

// Attribute von diesem Spieler
let playerID = "-1";
let playerName = "-1";
let playerXCoor = -1;
let ready = false;
let playerPoints = 0;

// Attribute des Raumes, in dem das Spiel stattfindet
let roomID = "-1";
let playerOne = "-1";
let playerTwo = "-1";
let ballXCoor = 140;
let ballYCoor = -140;
let ballColorStr = "neutral";

// Attribute des Gegners
let otherPlayerID = "-1";
let otherPlayerName = "-1";
let otherPlayerXCoor = -1;
let otherPlayerReady = false;
let otherPlayerPoints = 0;
let otherPlayerTimestamp = 0;


// Initialisierung von Firebase
function initializeDatabase() {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  database = firebase.database();
  playersTable = database.ref('players/');
  roomsTable = database.ref('rooms/');
}

// Hinzufügen dieses Spielers in die Datenbank
function addThisPlayer(){
  let timeNow = Date.now();
  playersTable.child(playerID).set({
    name: playerName,
    xCoordinate: playerXCoor,
    room: roomID,
    ready: ready,
    points: playerPoints,
    timestamp: timeNow
  });
}

// Hinzufügen eines Raumes in die Datenbank mit diesem Spieler als Player One
function addThisRoom() {
  roomsTable.child(roomID).set({
    playerOne: playerID,
    playerTwo: playerTwo,
    ballXCoordinate: ballXCoor,
    ballYCoordinate: ballYCoor,
    ballColor: ballColorStr
  });
}

// Ändert den Wert eines Attributes von einem Spieler
function updatePlayerAttribute(pID, attribute, newValue) {
  if(pID != "-1" && typeof pID !== 'undefined' && pID != "left") {
    switch(attribute) {
      case "name":
        playersTable.child(pID).update({
          name: newValue
        });
        break;
      case "xCoordinate":
        playersTable.child(pID).update({
          xCoordinate: newValue
        });
        break;
      case "room":
        playersTable.child(pID).update({
          room: newValue
        });
        break;
      case "ready":
        playersTable.child(pID).update({
          ready: newValue
        });
        break;
      case "points":
        playersTable.child(pID).update({
          points: newValue
        });
        break;
      case "timestamp":
        playersTable.child(pID).update({
          timestamp: newValue
        });
        break;
    }
  }
}

// Ändert den Wert eines Attributes von diesem Spieler
function updateThisPlayerAttribute(attribute, newValue) {
  updatePlayerAttribute(playerID, attribute, newValue);
}

// Ändert den Wert eines Attributes von dem gegnerischen Spieler
function updateOtherPlayerAttribute(attribute, newValue) {
  determineOtherPlayerID();
  updatePlayerAttribute(otherPlayerID, attribute, newValue);
}

// Ändert den Wert eines Attributes von diesem Raum
function updateThisRoomAttribute(attribute, newValue) {
  switch(attribute) {
    case "playerOne":
      roomsTable.child(roomID).update({
        playerOne: newValue
      });
      break;
    case "playerTwo":
      roomsTable.child(roomID).update({
        playerTwo: newValue
      });
      break;
    case "ballXCoordinate":
      roomsTable.child(roomID).update({
        ballXCoordinate: newValue
      });
      break;
    case "ballYCoordinate":
      roomsTable.child(roomID).update({
        ballYCoordinate: newValue
      });
      break;
    case "ballColor":
      roomsTable.child(roomID).update({
        ballColor: newValue
      });
      break;
    }
}

// Holt die Werte des Raumes aus der Datenbank
function fetchThisRoom() {
  roomsTable.child(roomID).once('value', (snapshot) => {
    playerOne = snapshot.val().playerOne;
    playerTwo = snapshot.val().playerTwo;
    ballXCoor = snapshot.val().ballXCoordinate;
    ballYCoor = snapshot.val().ballYCoordinate;
    ballColorStr = snapshot.val().ballColor;
  });
}

// Holt die Werte des Raumes ohne die Attribute des Balles aus der Datenbank
function fetchThisRoomWithoutBall() {
  roomsTable.child(roomID).once('value', (snapshot) => {
    playerOne = snapshot.val().playerOne;
    playerTwo = snapshot.val().playerTwo;
  });
}


// Holt die Werte des Spielers aus der Datenbank
function fetchThisPlayer() {
  playersTable.child(playerID).once('value', (snapshot) => {
    playerName = snapshot.val().name;
    playerXCoor = snapshot.val().xCoordinate;
    ready = snapshot.val().ready;
    playerPoints = snapshot.val().points;
    roomID = snapshot.val().room;
  });
}

// Holt die Punkte dieses Spielers aus der Datenbank
function fetchThisPlayersPoints() {
  playersTable.child(playerID).once('value', (snapshot) => {
    playerPoints = snapshot.val().points;
  });
}

// Holt die Werte des gegnerischen Spielers aus der Datenbank
function fetchOtherPlayer() {
  determineOtherPlayerID();
  if(otherPlayerID == "left") {
    console.log("fetchOtherPlayer: the other player has left the game");
  } else if(otherPlayerID != "-1") {
    playersTable.child(otherPlayerID).once('value', (snapshot) => {
      if(snapshot.val() != null) {
        otherPlayerName = snapshot.val().name;
        otherPlayerXCoor = snapshot.val().xCoordinate;
        otherPlayerReady = snapshot.val().ready;
        otherPlayerPoints = snapshot.val().points;
        otherPlayerTimestamp = snapshot.val().timestamp;
      } else {
        console.log("fetchOtherPlayer: playerID not valid");
      }
    });
  } else {
    console.log("fetchOtherPlayer: there is no other player yet");
  }
}

// Bestimmt die Spieler-ID des Gegners
function determineOtherPlayerID() {
  let pNum = retrievePlayerNumber();
  if(pNum == 1) {
    otherPlayerID = playerTwo;
  }
  else if(pNum == 2) {
    otherPlayerID = playerOne;
  }
}

// Entfernt inaktive Spieler
function removeInactivePlayers() {
  let timeNow = Date.now();
  let cutoff = timeNow - 20000; //Zeitpunkt vor 0s
  let old = playersTable.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
  let listener = old.on('child_added', function (snapshot) {  //alle Elemente länder als 20s inaktiv
    console.log("Delete: ", snapshot.key, "; cutoff = ", timeNow, "; timestamp = ", snapshot.val().timestamp);

    let pID = snapshot.key;  //ID des inaktiven Spielers
    let rID = snapshot.val().room;
    let pTime = snapshot.val().timestamp;

    roomsTable.child(rID).once('value', (snapshotRoom) => {
      let pOne = snapshotRoom.val().playerOne;
      let pTwo = snapshotRoom.val().playerTwo;

      if(pID == pOne) {
        roomsTable.child(rID).update({
          playerOne: "left"
        });
        if(pTwo == "left" || pTwo == "-1") {
          snapshotRoom.ref.remove();
        }
      }
      if(pID == pTwo) {
        roomsTable.child(rID).update({
          playerTwo: "left"
        });
        if(pOne == "left" || pOne == "-1") {
          snapshotRoom.ref.remove();
        }
      }
    });
    snapshot.ref.remove();
    });
}

function removeAbandonedRooms() {
  roomsTable.once('value')
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.val().playerOne == "left" && (childSnapshot.val().playerTwo == "left" ||
        childSnapshot.val().playerTwo == "-1")) {
          childSnapshot.ref.remove();
        }
      });
    });
}

function otherPlayerInactive() {
  let cutoffTime = Date.now() - 20000;
  if(otherPlayerID == "left" || (otherPlayerID != "-1" && otherPlayerTimestamp < cutoffTime)) {
    return true;
  }
  return false;
}

// Entfernen des Spielers
function removeThisPlayer() {
  playersTable.child(playerID).remove();
}

// Entfernen des Raumes
function removeThisRoom() {
  roomsTable.child(roomID).remove();
}

// Speichert die Spieler-ID im lokalen Zwischenspeicher
function storePlayerID() {
  sessionStorage.playerIDStorage = playerID;
}

// Holt die Spieler-ID aus dem lokalen Zwischenspeicher
function retrievePlayerID() {
  playerID = sessionStorage.playerIDStorage;
}

function storeRoomID() {
  sessionStorage.roomIDStorage = roomID;
}

function retrieveRoomID() {
  roomID = sessionStorage.roomIDStorage;
}

function storePlayerName() {
  sessionStorage.playerNameStorage = playerName;
}

function retrievePlayerName() {
  playerName = sessionStorage.playerNameStorage;
}

function storePlayerNumber(num) {
  sessionStorage.playerNoStorage = num;
}

function retrievePlayerNumber() {
  return sessionStorage.playerNoStorage;
}
