// check spelling. as in mantaray or manta ray
const animals = [
  {
    type: "bird",
    samples: [
      "egret",
      "ibis",
      "eagle",
      "heron",
      "parrot",
      "lorikeet",
      "woodpecker",
      "kingfisher",
      "kookaburra",
      "nuthatch",
      "partridge",
      "albatross",
      "hummingbird",
      "toucan",
      "cardinal",
      "parakeet",
      "sparrow",
      "penguin",
      "butterfly",
      "bald eagle"
    ],
  },
  {
    type: "beast",
    samples: [
      "zebra",
      "camel",
      "oranutan",
      "tortoise",
      "taipan",
      "coyote",
      "armadillo",
      "giraffe",
      "kangaroo",
      "wallaby",
      "quokka",
      "elephant",
      "ocelot",
      "lizard",
      "lemur",
      "possum",
      "opossum",
      "wombat",
      "squirrel",
      "hedgehog",
      "whale",
      "crocodile",
      "alligator",
      "mountain lion",
      "beaver",
    ],
  },
  {
    type: "fish",
    samples: [
      "stingray",
      "piranha",
      "salmon",
      "barracuda",
      "barramundi",
      "blobfish",
      "catfish",
      "goldfish",
      "mackerel",
      "octopus",
      "jellyfish",
      "lobster",
      "seahorse",
      "tiger shark",
    ],
  },
];
// TO DO:
// KEEP TRACK OF ANIMALS ALREADY GIVEN FOR NO REPEATS
// SCORE VARIABLES
let playerScore = 0;
let computerScore = 0;
let scoreAmount = 0;

// TIME AS VAR SINCE I KEEP CHANGING MY MIND.
// TIME HERE FILLS HTML AND TIMER
const timeLimit = 20; // sep var since this is in html and fcn
// GAME VARS
let gameAnimal, gameAnimalExample, isWordGuessed;

let isPlaying = false;

var animalType = document.getElementById("animalType"),
  animalToGuess = document.getElementById("animalToGuess"),
  wordWrapper = document.getElementById("game-word-wrapper"),
  playButton = document.getElementById("playGame"),
  quitButton = document.getElementById("quitGame"),
  userScore = document.getElementById("user-score"),
  compScore = document.getElementById("computer-score"),
  lights = document.getElementById("lights"),
  message = document.getElementById("message");

// UPDATE SCORES
function updateScores() {
  if (playerScore >= 20) {
    userScore.innerHTML = "Winner!";
    compScore.innerHTML = "Sad sack";
    isPlaying = false;
    playButton.classList.add("disp-none");
    quitButton.innerHTML="Quit and play again?"
  } else if (computerScore >= 20) {
    userScore.innerHTML = "Sad sack";
    compScore.innerHTML = "Winner";
    isPlaying = false;
    playButton.classList.add("disp-none")
    quitButton.innerHTML="Quit and play again?"
  } else {
    userScore.innerHTML = playerScore;
    compScore.innerHTML = computerScore;
  }
}

// YE OLDE RANDE NUMBE
function getRando(max) {
  return Math.floor(Math.random() * max);
}

// GET ONE OF THE ANIMAL OBJECTS
function getAnimal() {
  const randoIdx = getRando(animals.length);
  const gameAnimalObj = animals[randoIdx];
  return gameAnimalObj;
}

// CHANGE WORD TO LETTERS + HYPHENS.
function handleGameWord(str) {
  let hiddenWordArr = [];
  const strArr = str.split("");
  // first and last letters:
  hiddenWordArr[0] = strArr[0];
  hiddenWordArr[1] = strArr[strArr.length - 1];
  // intermediate letters become dashes
  for (let i = 1; i < strArr.length - 1; i++) {
    if (strArr[i] === " ") {
      hiddenWordArr.splice(i, 0, " / ");
    } else {
      hiddenWordArr.splice(i, 0, " &#8212; ");
      // INTERMITTENT LETTERS = SCORE TAHT WILL GO TO USER OR PUTER
      scoreAmount++;
    }
  }
  return hiddenWordArr.join("").toUpperCase();
}

// DOM
// DOM LOADED
// DOM LOADED DOM
// DOM LOADED DOM LOADED
// DOM LOADED DOM LOADED DOM
// DOM LOADED DOM LOADED DOM LOADED
// DOM LOADED DOM LOADED DOM LOADED DOM
// DOM LOADED DOM LOADED DOM LOADED DOM DOM DOM DOM DOMMMMMM
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("time").innerHTML = timeLimit;

  updateScores();
  resetLights();
  // DISPLAY THE GAME PARTS: ANIMAL TYPE AND DASHES
  function displayGame() {
    gameAnimal = getAnimal();
    const randoAnimalIdx = getRando(gameAnimal.samples.length - 1);
    console.log(gameAnimal.samples[randoAnimalIdx]);
    gameAnimalExample = gameAnimal.samples[randoAnimalIdx];
    animalType.innerHTML = gameAnimal.type;
    animalToGuess.innerHTML = handleGameWord(gameAnimalExample);
    document.getElementById("guess").focus();
    document.getElementById("guess").select();
    wordWrapper.classList.remove("vis-hidden");
  }
  // PLAY GAME: DISPLAY GAME BITS, MAKE PLAY BUTTON UNCLICKABLE
  function handlePlayGame() {
    isWordGuessed = false;
    isPlaying = true;
    displayGame();
    startTimer();
    quitButton.classList.remove("disp-none");
    playButton.classList.add("noclick");
  }
  // CLICK EVT
  playButton.addEventListener("click", handlePlayGame);

  // COMPARE VALUE BY GAME PLAYER TO ANIMAL
  function compareWords(str1, str2) {
    if (str1.toLowerCase() === str2.toLowerCase()) {
      // PLAYER GETS SCORE
      isWordGuessed = true;
      animalToGuess.innerHTML = `${gameAnimalExample.toUpperCase()}! Yay!`;
      playerScore += scoreAmount;
      clearInterval(timer);
      updateScores();
      if (isPlaying) {
        resetLights();
        roundReset();
      }
    } else {
      return;
    }
  }
  function resetLights(time) {
    // CREATE LIGHTS FOR COUNTDOWN
    Array.from(document.querySelectorAll(".lightbulbs.off")).forEach(function (
      el,
      i
    ) {
      el.classList.remove("off");
      el.innerHTML = "x";
    });
  }

  // COMPARE WORDS FIRED ON ENTER
  const node = document.getElementById("guess");
  node.addEventListener("keyup", ({ key }) => {
    let val = document.getElementById("guess").value;
    if (key === "Enter") {
      compareWords(val, gameAnimalExample);
      node.value = "";
    }
  });

  // GAME OVER CLEARS INTERVAL, RESETS TIMER WORD VARS
  function roundReset() {
    stopTimer();
    timeRem = timeLimit;
    resetLights();
    playButton.classList.remove("noclick");
    scoreAmount = 0;
    gameAnimal = "";
    gameAnimalExample = "";
    playButton.innerHTML = "Play again?";
  }

  // TIMER FUNCTIONS

  let timer;
  let timeRem = timeLimit;
  function updateTimer() {
    if (timeRem > 0) {
      console.log(timeRem);
      let lt = document.getElementById("light-" + timeRem);
      lt.classList.add("off");
      lt.innerHTML = "-";
    } else if (!isWordGuessed && timeRem === 0) {
      animalToGuess.innerHTML = `The animal was ${gameAnimalExample.toUpperCase()}`;
      computerScore += scoreAmount;
      updateScores();
      playButton.classList.remove("noclick");

      if (isPlaying) {
        resetLights();
        roundReset();
      }
    }
    timeRem = timeRem - 1;
  }

  function startTimer() {
    timer = setInterval(updateTimer, 1000);
  }
  function stopTimer() {
    clearInterval(timer);
    console.log("time's up", timeRem);
    timeRem = timeLimit;
    console.log("time rem is now: ", timeRem);
  }
  //
  // QUIT THE GAME ~ RESET
  function handleQuit() {
    // any score is reset
    playerScore = 0;
    computerScore = 0;
    scoreAmount = 0;
    timeRem = timeLimit;
    isPlaying = false;
    isWordGuessed = false;
    clearInterval(timer);
    resetLights();
    updateScores();
    wordWrapper.classList.add("vis-hidden");
    playButton.classList.remove("noclick");
    playButton.innerHTML = "Play!";
    playButton.classList.remove("disp-none");
    quitButton.innerHTML="Quit!"
  }
  quitButton.addEventListener("click", handleQuit);
});
