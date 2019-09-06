var level = 1;
var pattern = [];
var sequenceStep = 0;

$(document).keypress(function(){
  startGame();
});

function startGame() {
  reset();
  $("h1").text("Level " + level);
  $(document).unbind("keypress");
  activateButtons();
  setTimeout(function(){
    selectNextColor();
  }, 400);
}

function activateButtons() {
  $(".btn").click(function(){
    var buttonColor = this.id;
    animateButtonWith(buttonColor);
    checkFor(buttonColor);
  });
}

function reset() {
  level = 1;
  pattern = [];
  sequenceStep = 0;
}

function animateButtonWith(color) {
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
  $("#"+color).addClass("pressed");
  setTimeout(function() {
    $("#"+color).removeClass("pressed");
  }, 100);
}

function checkFor(buttonCol) {
  var correctColor = pattern[sequenceStep];
  if (buttonCol === correctColor) {
    proceedWithGame();
  } else {
    endGame();
  }
}

function proceedWithGame() {
  sequenceStep++;
  if (sequenceStep === pattern.length) {
    goToNextLevel();
  }
}

function goToNextLevel() {
  level++;
  sequenceStep = 0;
  setTimeout(function() {
    $("h1").text("Awesome!");
  }, 300);
  setTimeout(function() {
    $("h1").text("Level " + level);
    selectNextColor();
  }, 1000);
}

function selectNextColor() {
  var number = Math.floor(Math.random() * 4) + 1;
  switch (number) {
    case 1: //green
      push("green");
      break;
    case 2: //red
      push("red");
      break;
    case 3: //yellow
      push("yellow");
      break;
    case 4: //blue
      push("blue");
      break;
    default:
      break;
  }
}

function push(color) {
  pattern.push(color);
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
  $("#"+color).addClass("pressed");
  setTimeout(function() {
    $("#"+color).removeClass("pressed");
  }, 100);
}

function endGame() {
  $(".btn").unbind("click");
  $("h1").text("Game Over, Press Any Key to Restart");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $(document).keypress(function() {
    startGame();
  });
}
