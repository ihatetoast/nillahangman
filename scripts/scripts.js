
// check spelling. as in mantaray or manta ray 
const animals = [
    {
        type: "bird",
        samples: ["egret", "ibis", "eagle", "heron", "parrot", "lorikeet", "woodpecker", "kingfisher", "kookaburra", "nuthatch", "partridge", "albatross", "hummingbird", "toucan", "cardinal", "parakeet", "sparrow", "penguin", "butterfly", "bald eagle", ]
    },
    {
        type: "beast",
        samples: ["zebra", "camel", "oranutan", "tortoise", "taipan", "coyote", "armadillo", "giraffe", "kangaroo", "wallaby", "quokka", "elephant", "ocelot", "lizard", "lemur", "possum", "opossum", "wombat", "squirrel", "hedgehog", "whale", "crocodile", "alligator", "mountain lion", "beaver"]
    },
    {
        type: "fish",
        samples: ["stingray", "piranha", "salmon", "barracuda", "barramundi", "blobfish", "catfish", "goldfish", "mackerel", "octopus", "jellyfish", "lobster", "seahorse", "tiger shark"]
    }
];
// const animals = [
//     {
//         type: "bird",
//         samples: ["bald eagle", ]
//     },
//     {
//         type: "beast",
//         samples: [ "mountain lion", "pink fairy armadillo"]
//     },
//     {
//         type: "fish",
//         samples: ["tiger shark"]
//     }
// ];

    // SCORE VARIABLES
    let playerScore = 0;
    let computerScore = 0;
    let scoreAmount = 0;

    // FUNCTIONS THAT DO NOT RELY ON DOM RENDERING

    // YE OLDE RANDE NUMBE
    function getRando(max){
        return Math.floor(Math.random() * max);
    }

    // GET ONE OF THE ANIMAL OBJECTS
    function getAnimal(){
        const randoIdx = getRando(animals.length);
        const gameAnimalObj =  animals[randoIdx];
        return gameAnimalObj;
    };

    // CHANGE WORD TO LETTERS + HYPHENS.
    function handleGameWord(str){
        let hiddenWordArr =[];
        const strArr = str.split('');
        // first and last letters:
        hiddenWordArr[0] = (strArr[0]);
        hiddenWordArr[1] =(strArr[strArr.length-1]);
        // intermediate letters become dashes
        for(let i = 1; i < strArr.length - 1; i++){
            if(strArr[i]===" "){
                hiddenWordArr.splice(i, 0, " / ");
            } else {
                hiddenWordArr.splice(i, 0, " - ");
                scoreAmount++;
            }
        }
        console.log(scoreAmount)
        return hiddenWordArr.join("").toUpperCase();
    }
   

document.addEventListener("DOMContentLoaded", function() {
    console.log("script did load, ya toad.");
    //ELEMENT VARIABLES
    var animalType = document.getElementById("animalType"), 
    animalToGuess = document.getElementById("animalToGuess"),
    wordWrapper = document.getElementById("game-word-wrapper"),
    playButton = document.getElementById("playGame"),
    quitButton = document.getElementById("quitGame"),
    userScore = document.getElementById("user-score"),
    compScore = document.getElementById("computer-score");

    // TIME AS VAR SINCE I KEEP CHANGING MY MIND. 
    // TIME HERE FILLS HTML AND TIMER
    var timeLimit = 20;
    
    document.getElementById("time").innerHTML = timeLimit;
    // GAME VARS
    let gameAnimal, gameAnimalExample;
 
    // UPDATE SCORES
    function updateScores(){
        userScore.innerHTML = playerScore;
        compScore.innerHTML = computerScore;
    }
    updateScores();
    // DISPLAY THE GAME PARTS: ANIMAL TYPE AND DASHES
    function displayGame(){
        gameAnimal = getAnimal();
        const randoAnimalIdx = getRando(gameAnimal.samples.length - 1);
        console.log(gameAnimal.samples[randoAnimalIdx])
        gameAnimalExample = gameAnimal.samples[randoAnimalIdx];
        animalType.innerHTML = gameAnimal.type;
        animalToGuess.innerHTML = handleGameWord(gameAnimalExample);
        updateScores();
    };

    // PLAY GAME: DISPLAY GAME BITS, MAKE PLAY BUTTON UNCLICKABLE
    function handlePlayGame(){
        displayGame();
        wordWrapper.classList.remove("vis-hidden");
        // REMOVE THE CLICK EVT AND THE UI
        playButton.classList.add("disp-none");
        quitButton.classList.remove("disp-none");
        // playButton.
        startTimer()
    }

    // COMPARE VALUE BY GAME PLAYER TO ANIMAL
    function compareWords(str1, str2){
        if(str1.toLowerCase() === str2.toLowerCase()){
            // UI: let user know.
            // give score to user
            // number of interim blanks
            gameOver("You won.");
        } else {
            // NO UI for bad gues
            console.log(`${str1} and ${str2} DO NOT match`);
        }
        console.log(`String 1 is ${str1}, and String 2 is ${str2}.`);
    }
    playButton.addEventListener("click", handlePlayGame);

    const node = document.getElementById("guess");
    node.addEventListener("keyup", ({key}) => {
        let val = document.getElementById("guess").value;
        if (key === "Enter") {
         console.log(val);
         compareWords(val, gameAnimalExample)
         node.value = ""
        }
    })
    // GAME TIMER
    let timer; 
    let timeRem = 20; 
    // GAME OVER CLEARS INTERVAL, RESETS TIMER WORD VARS
    function gameOver(msg) {
        clearInterval(timer);
        timer = 0;
        timeRem = 20;
        gameAnimal = "";
        gameAnimalExample = "";
        alert(msg);// REMOVE THIS LATER
    }

    function updateTimer() {
        timeRem = timeRem - 1;
        if(timeRem >= 0)
          console.log(timeRem);

        else {
          gameOver("You lost.");
          quitButton.classList.add("vis-hidden");
          playButton.classList.remove("vis-hidden");
        }
      }

      function startTimer() {
        timer = setInterval(updateTimer, 1000);
      }

    // QUIT THE GAME ~ RESET
    function handleQuit(){
        // any score is reset
        playerScore = 0;
        computerScore = 0;
        scoreAmount = 0;
        
        // any timer reset
        gameOver("Player quits. All scores reset");
        wordWrapper.classList.remove("disp-none");
        quitButton.classList.add("vis-hidden");
        playButton.classList.remove("vis-hidden");
    }
    quitButton.addEventListener("click", handleQuit);
    
  });