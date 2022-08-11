var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;




function playSound(name) {
  var nextButtonSound = new Audio(name);
  nextButtonSound.play();
}




function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var sound = "sounds/" + randomChosenColor + ".mp3";
  playSound(sound);
  
  level++;
  $("#level-title").text("Level " + level);
}




$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  
  playSound("sounds/" + this.id + ".mp3");
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});




function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}




$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});




function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } 
  
  else {
    var wrongAnswerSound = new Audio("sounds/wrong.mp3");
    wrongAnswerSound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
