var background = document.querySelector("#background"); // container
var office = document.querySelector("#office"); // long image
var underDesk = document.querySelector("#underDesk");
var underDeskButton = document.querySelector("#underDeskButton");
var getOutDeskButton = document.querySelector("#getOutDeskButton");
var cameraButton = document.querySelector("#cameraButton");
var closeCameraButton = document.querySelector("#closeCameraButton");
var cameraView = document.querySelector("#cameraView");
var staticOverlay = document.querySelector("#staticOverlay");
var staticOverlayStart = document.querySelector("#staticOverlayStart");
var caughtScreen = document.querySelector("#caughtScreen");
var knockingSound = new Audio('assets/knocking.mp3');
var caughtSound = new Audio('assets/caught.mp3');
var teleportSound = new Audio('assets/teleport.mp3');
var ambienceSound = new Audio('assets/ambience.m4a');
var buzzSound = new Audio('assets/buzz.m4a');
var breathingSound = new Audio('assets/breathing.mp3');
var cameraSound = new Audio('assets/camera.mp3');
var startScreen = document.querySelector("#startScreen");
var startButton = document.querySelector("#startButton");
var startScreenImage = document.querySelector("#startScreenImage");

// Game state variables


let isGameActive = false;
let isUnderDesk = false;
let isViewingCamera = false;
let isDonInRoom = false;
let isDonOnCamera = false;
let isDonKnocking = false;
let isDonTeaseKnocking = false;
let hasDonBeenOnCamera = false;
let hasDonKnocked = false;
let isCaught = false;
let donInterval;

caughtScreen.style.visibility = "hidden";
function gameState(){
    startButton.addEventListener("click", function() {
        isGameActive = true;
        //run game for 2 minutes
        ambienceSound.play();
        buzzSound.play();
        setTimeout(() => {
            isGameActive = false;
        startScreenImage.src = "assets/gameover.png";
        startButton.style.visibility = "hidden";
        startScreen.style.visibility = "visible";
        background.style.visibility = "hidden";
        office.style.visibility = "hidden";
        underDesk.style.visibility = "hidden";
        underDeskButton.style.visibility = "hidden";
        getOutDeskButton.style.visibility = "hidden";
        cameraButton.style.visibility = "hidden";
        closeCameraButton.style.visibility = "hidden";
        staticOverlay.style.visibility = "hidden";
        staticOverlayStart.style.visibility = "visible";
        cameraView.style.visibility = "hidden";
        caughtScreen.style.visibility = "hidden";
         }, 120000);
         gameState();
        setTimeout(() => {
            donEventHandler();
        }, 10000); // start after 10 seconds
    }
);
// Set initial visibility
    if (isGameActive === false) {
        startScreen.style.visibility = "visible";
        background.style.visibility = "hidden";
        office.style.visibility = "hidden";
        underDesk.style.visibility = "hidden";
        underDeskButton.style.visibility = "hidden";
        getOutDeskButton.style.visibility = "hidden";
        cameraButton.style.visibility = "hidden";
        closeCameraButton.style.visibility = "hidden";
        staticOverlay.style.visibility = "hidden";
        staticOverlayStart.style.visibility = "visible";
        cameraView.style.visibility = "hidden";
        caughtScreen.style.visibility = "hidden";
        ambienceSound.pause();
        buzzSound.pause();
    } else {
        startScreen.style.visibility = "hidden";
        background.style.visibility = "visible";
        office.style.visibility = "visible";
        underDeskButton.style.visibility = "visible";
        cameraButton.style.visibility = "visible";
        ambienceSound.play();
        buzzSound.play();
        cameraMovement();
        deskState();
        cameraState();
        
    }

};
function cameraState() {
cameraButton.addEventListener("click", function() {
    isViewingCamera = true;
    background.style.visibility = "hidden";
    cameraView.style.visibility = "visible";
    office.style.visibility = "hidden";
    underDesk.style.visibility = "hidden";
    underDeskButton.style.visibility = "hidden";
    cameraButton.style.visibility = "hidden";
    closeCameraButton.style.visibility = "visible";
    staticOverlay.style.visibility = "visible";
    cameraSound.play();
});
closeCameraButton.addEventListener("click", function() {
    cameraView.style.visibility = "hidden";
    isViewingCamera = false;
    background.style.visibility = "visible";
    underDeskButton.style.visibility = "visible";
    office.style.visibility = "visible";
    cameraButton.style.visibility = "visible";
    closeCameraButton.style.visibility = "hidden";
    staticOverlay.style.visibility = "hidden";

});
// Set initial visibility
if (isViewingCamera === true) {
    cameraView.style.visibility = "visible";
    background.style.visibility = "hidden";
    office.style.visibility = "hidden";
    underDesk.style.visibility = "hidden";
    underDeskButton.style.visibility = "hidden";
    cameraButton.style.visibility = "hidden";
    closeCameraButton.style.visibility = "visible";
    staticOverlay.style.visibility = "visible";
} else {
    cameraView.style.visibility = "hidden";
    background.style.visibility = "visible";
    office.style.visibility = "visible";
    cameraButton.style.visibility = "visible";
    closeCameraButton.style.visibility = "hidden";
    underDeskButton.style.visibility = "visible";
    staticOverlay.style.visibility = "hidden";
}
};
function resetDonStates() {
  isDonInRoom = false;
  isDonOnCamera = false;
  isDonKnocking = false;
  isDonTeaseKnocking = false;
};
function donEventHandler() {
   donInterval = setInterval(() => {
  resetDonStates(); // start fresh 🤪

  let states = ["none"]; // always allow doing nothing 😝
  
  if (!hasDonBeenOnCamera) {
    states.push("camera"); // only camera allowed until it's happened 😏
  } else {
    if (!hasDonKnocked) {
        states.push("knocking", "tease", "camera"); // knocking allowed until it happens 😬
    } else {
        states.push("room", "camera", "knocking", "tease"); // full chaos unlocked 😜💥
    }
    
  }

  // pick one at random
  let choice = states[Math.floor(Math.random() * states.length)];

  switch (choice) {
    case "room":
      isDonInRoom = true;
      break;
    case "camera":
      isDonOnCamera = true;
      hasDonBeenOnCamera = true; // unlocks other states later 🤓☝️
      break;
    case "knocking":
      isDonKnocking = true;
      hasDonKnocked = true; // unlocks other states later 🤓☝️
      break;
    case "tease":
      isDonTeaseKnocking = true;
      break;
    case "none":
    default:
      // Don does nothing 😏 chillin'
      break;
  }
  if (isGameActive === false) {
      clearInterval(donInterval); // stop Don events when game is not active
  }
    donState(); // update visuals/audio
  console.log({isDonInRoom, isDonOnCamera, isDonKnocking, isDonTeaseKnocking}); // debug 😝
}, 10000); // every 10 seconds

}
function deskState() {


underDeskButton.addEventListener("click", function() {
    isUnderDesk = true;
    underDesk.style.visibility = "visible";
    underDeskButton.style.visibility = "hidden";
    getOutDeskButton.style.visibility = "visible";
    cameraButton.style.visibility = "hidden";
    breathingSound.play();
    breathingSound.loop = true;
});
getOutDeskButton.addEventListener("click", function() {
    isUnderDesk = false;
    underDesk.style.visibility = "hidden";
    getOutDeskButton.style.visibility = "hidden";
    underDeskButton.style.visibility = "visible";
    cameraButton.style.visibility = "visible";
    breathingSound.pause();
});
// Set initial visibility
if (isUnderDesk === true) {
    underDesk.style.visibility = "visible";
    cameraButton.style.visibility = "hidden";
    
} else {
    underDesk.style.visibility = "hidden";
    getOutDeskButton.style.visibility = "hidden";
    cameraButton.style.visibility = "visible";
}
};
function cameraMovement() {
    let direction = 0; // -1 = left, +1 = right, 0 = stop

background.addEventListener("mousemove", (e) => {
  const rect = background.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const width = rect.width;

  if (x < width * 0.2) {
    direction = 1; // move right (image pans right)
  } else if (x > width * 0.8) {
    direction = -1; // move left (image pans left)
  } else {
    direction = 0; // stop
  }
});

function animate() {
    let currentLeft = parseInt(office.style.left || "0");
  if (direction !== 0) {
    const backgroundRect = background.getBoundingClientRect();
    const officeRect = office.getBoundingClientRect();

    // max boundaries
    const maxLeft = 0;
    const maxRight = -(office.width - backgroundRect.width);

    // move image
    currentLeft += direction * 5; // speed = 5px per frame

    // clamp within bounds
    if (currentLeft > maxLeft) currentLeft = maxLeft;
    if (currentLeft < maxRight) currentLeft = maxRight;

    office.style.left = currentLeft + "px";

  }

  requestAnimationFrame(animate);
}


animate(); // start loop

};
function donState() {
    // Don in room handling
    if (isDonInRoom === true) {
        underDesk.src = "assets/Under Desk With Don.png";
        // Constantly check if player leaves desk while Don is in room
        if (!donState._roomInterval) {
            donState._roomInterval = setInterval(() => {
                if (isGameActive && isDonInRoom && isUnderDesk === false && isCaught === false) {
                    isCaught = true;
                    donState(); // update visuals immediately
                }
            }, 100); // check every 100ms
        }
        getOutDeskButton.onclick = function() {
            if (isDonInRoom && isGameActive && isCaught === false) {
                isCaught = true;
                donState();
            }
        };
    } else {
        underDesk.src = "assets/Under desk.png";
        if (donState._roomInterval) {
            clearInterval(donState._roomInterval);
            donState._roomInterval = null;
        }
    }

    // Don on camera handling
    if (isDonOnCamera === true) {
        teleportSound.play();
        cameraView.src = "assets/jewels at night with jewel.png";
    } else {
        cameraView.src = "assets/jewels at night.png";
    }

    // Don knocking handling
    if (isDonKnocking === true) {
        knockingSound.play();
        // Constantly check during knocking
        if (!donState._knockInterval) {
            donState._knockInterval = setInterval(() => {
                if (isGameActive && isDonKnocking && isUnderDesk === false && isCaught === false) {
                    isCaught = true;
                    donState();
                }
            }, 100);
        }
        setTimeout(() => {
            if (donState._knockInterval) {
                clearInterval(donState._knockInterval);
                donState._knockInterval = null;
            }
            if (isDonKnocking && isUnderDesk === true) {
                teleportSound.play();
                underDesk.src = "assets/Under desk With Don.png";
            }
        }, 5000);
        getOutDeskButton.onclick = function() {
            if (isDonKnocking && isGameActive && isCaught === false) {
                isCaught = true;
                donState();
            }
        };
    } else {
        if (donState._knockInterval) {
            clearInterval(donState._knockInterval);
            donState._knockInterval = null;
        }
    }

    // Don tease knocking handling
    if (isDonTeaseKnocking === true) {
        knockingSound.play();
    }

    // Handle being caught
    if (isCaught === true) {
        caughtSound.play();
        caughtScreen.style.visibility = "visible";
        background.style.visibility = "hidden";
        office.style.visibility = "hidden";
        underDesk.style.visibility = "hidden";
        underDeskButton.style.visibility = "hidden";
        getOutDeskButton.style.visibility = "hidden";
        cameraButton.style.visibility = "hidden";
        closeCameraButton.style.visibility = "hidden";
        staticOverlay.style.visibility = "hidden";
        staticOverlayStart.style.visibility = "visible";
        cameraView.style.visibility = "hidden";
        isGameActive = false;
        // Clean up intervals
        if (donState._roomInterval) {
            clearInterval(donState._roomInterval);
            donState._roomInterval = null;
        }
        if (donState._knockInterval) {
            clearInterval(donState._knockInterval);
            donState._knockInterval = null;
        }
    }
}

gameState();


