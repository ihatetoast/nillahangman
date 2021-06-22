
// check spelling. as in mantaray or manta ray 
const animals = [
    {
        type: "bird",
        samples: ["egret", "ibis", "eagle", "heron", "parrot", "lorikeet", "woodpecker", "kingfisher", "kookaburra", "nuthatch", "partridge", "albatross", "hummingbird", "toucan", "cardinal", "parakeet", "sparrow", "penguin", "butterfly", "bald eagle" ]
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


    // TIME AS VAR SINCE I KEEP CHANGING MY MIND. 
    // TIME HERE FILLS HTML AND TIMER
    const timeLimit = 20;// sep var since this is in html and fcn
    // GAME VARS
    let gameAnimal, gameAnimalExample, isWordGuessed;

    

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
     function updateScores(){
        userScore.innerHTML = playerScore;
        compScore.innerHTML = computerScore;
    }

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
                // INTERMITTENT LETTERS = SCORE TAHT WILL GO TO USER OR PUTER
                scoreAmount++;
            }
        }
        return hiddenWordArr.join("").toUpperCase();
    }
   
    // TAKES AND ARRAY AND TOGGLES CLASS. USU FOR THE BUTTONS HERE
    function toggleClass(els, cls){     
        els.forEach(el => el.classList.contains(cls) ? el.classList.remove(cls) : el.classList.add(cls))
    };
    

// DOM 
// DOM LOADED 
// DOM LOADED DOM 
// DOM LOADED DOM LOADED 
// DOM LOADED DOM LOADED DOM 
// DOM LOADED DOM LOADED DOM LOADED
// DOM LOADED DOM LOADED DOM LOADED DOM
// DOM LOADED DOM LOADED DOM LOADED DOM DOM DOM DOM DOMMMMMM
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("time").innerHTML = timeLimit;
    
    updateScores();
    resetLights();
    // DISPLAY THE GAME PARTS: ANIMAL TYPE AND DASHES
    function displayGame(){
        gameAnimal = getAnimal();
        const randoAnimalIdx = getRando(gameAnimal.samples.length - 1);
        console.log(gameAnimal.samples[randoAnimalIdx])
        gameAnimalExample = gameAnimal.samples[randoAnimalIdx];
        animalType.innerHTML = gameAnimal.type;
        animalToGuess.innerHTML = handleGameWord(gameAnimalExample);
        
    };
    // PLAY GAME: DISPLAY GAME BITS, MAKE PLAY BUTTON UNCLICKABLE
    function handlePlayGame(){
        isWordGuessed = false;
        displayGame();
        toggleClass([wordWrapper], "vis-hidden");
        document.getElementById("guess").focus();
        document.getElementById("guess").select();
        toggleClass([playButton, quitButton], "disp-none");
        startTimer();
    }
    // CLICK EVT
    playButton.addEventListener("click", handlePlayGame);

    // COMPARE VALUE BY GAME PLAYER TO ANIMAL
    function compareWords(str1, str2){
        if(str1.toLowerCase() === str2.toLowerCase()){
            // PLAYER GETS SCORE
            isWordGuessed = true;
            playerScore += scoreAmount;
            
            updateScores();
            resetLights();
//  TO DO: ASK PLAYER IF THEY WANT TO PLAY AGAIN. IF SO, RESET, OTHERWISE FIRE QUIT
            roundReset();
        } else {
            return;

        }
    };
    function resetLights(time){
        // CREATE LIGHTS FOR COUNTDOWN
        Array.from(document.querySelectorAll('.lightbulbs.off')).forEach(function(el, i) { 
            el.classList.remove('off');
            el.innerHTML = "x";
        });
    }


    // COMPARE WORDS FIRED ON ENTER
    const node = document.getElementById("guess");
    node.addEventListener("keyup", ({key}) => {
        let val = document.getElementById("guess").value;
        if (key === "Enter") {
         compareWords(val, gameAnimalExample)
         node.value = ""
        }
    })

    // GAME OVER CLEARS INTERVAL, RESETS TIMER WORD VARS
    function roundReset() {
        clearInterval(timer);
        timer = 0;
        timeRem = timeLimit;
        resetLights();
        gameAnimal = "";
        gameAnimalExample = "";
        toggleClass([message], "vis-hidden");
        setTimeout(() => {
            toggleClass([message], "vis-hidden");
        }, 3000);
        
        
    }
    
// TIMER FUNCTIONS
  
    let timer; 
    let timeRem = timeLimit;
    function updateTimer() {
        if(timeRem > 0){
            console.log(timeRem);
            let lt = document.getElementById("light-"+timeRem);
            console.log(lt)
            lt.classList.add("off");
            lt.innerHTML = "-"
        }
        else {
            if(!isWordGuessed){
                compScore += scoreAmount;
                updateScores();
                roundReset();
                resetLights();
            }    
            clearInterval(timer);        
        }
        timeRem = timeRem - 1;
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
        timeRem = timeLimit;
        clearInterval(timer);
        resetLights();
        updateScores();
        toggleClass([wordWrapper], "vis-hidden");
        toggleClass([playButton, quitButton], "disp-none");
    }
    quitButton.addEventListener("click", handleQuit);
    
  });