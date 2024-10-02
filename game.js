const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userPattern = []
let gameOn = false
let score = 1

const playSound = (color) => {
  const sound = new Audio(`./sounds/${color}.mp3`)
  sound.play()
}

const animatePress = (color) => {
  $("#" + color).addClass("pressed")
  setTimeout(() => $("#" + color).removeClass("pressed"), 100)
}

const nextSequence = () => {
  userPattern = []
  const randomNumber = Math.floor(Math.random() * 4)
  const randomChosenColour = buttonColors[randomNumber]
  gamePattern.push(randomChosenColour)
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100)
  playSound(randomChosenColour)
}

const checkAnswer = (buttonColor) => {
  const lastClickIndex = userPattern.length - 1
  if (gamePattern[lastClickIndex] === userPattern[lastClickIndex]) {
    playSound(buttonColor)
    if (gamePattern.length == userPattern.length) {
      score += 1
      setTimeout(() => $("h1").text("Level " + score), 500)
      setTimeout(nextSequence, 1000)
    }
  } else {
    playSound("wrong")
    gameOn = false
    $("h1").text("Game Over.")
    $("body").addClass("game-over")
    setTimeout(() => $("body").removeClass("game-over"), 200)
    setTimeout(() => $("h1").text("Press A Key to Start"), 3000)
  }
}

const handleClick = (buttonId) => {
  if (gameOn) {
    userPattern.push(buttonId)
    animatePress(buttonId)
    checkAnswer(buttonId)
  }
}

const startGame = () => {
  if (gameOn == false) {
    gameOn = true
    score = 1
    $("h1").text("Level " + score)
    gamePattern = []
    setTimeout(nextSequence, 800)
  }
}

const toggleRules = () => {
  $(".rules-text").fadeToggle()
}

$(".rules-btn").click(toggleRules)
$(".btn").click((e) => handleClick(e.target.id))
$(".start-btn").click(startGame)
$(document).keypress(startGame)

toggleRules()
