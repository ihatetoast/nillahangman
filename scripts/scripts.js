
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
//         samples: [ "mountain lion"]
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
    gameContainer = document.getElementById("game-container"),
    playButton = document.getElementById("playGame");
    var quitButton = document.getElementById("quitGame");

    // TIME AS VAR SINCE I KEEP CHANGING MY MIND. 
    // TIME HERE FILLS HTML AND TIMER
    var timeLimit = 20;

    
    document.getElementById("time").innerHTML = timeLimit;
    // GAME VARS
    let gameAnimal, gameAnimalExample;
 
    // DISPLAY THE GAME PARTS: ANIMAL TYPE AND DASHES
    function displayGame(){
        gameAnimal = getAnimal();
        const randoAnimalIdx = getRando(gameAnimal.samples.length - 1);
        console.log(gameAnimal.samples[randoAnimalIdx])
        gameAnimalExample = gameAnimal.samples[randoAnimalIdx]
        animalType.innerHTML = gameAnimal.type;
        animalToGuess.innerHTML = handleGameWord(gameAnimalExample);
    };

    // PLAY GAME: DISPLAY GAME BITS, MAKE PLAY BUTTON UNCLICKABLE
    function handlePlayGame(){
        displayGame();
        gameContainer.classList.remove("hidden");
        // REMOVE THE CLICK EVT AND THE UI
        playButton.classList.add("hidden");
        quitButton.classList.remove("hidden");
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
          quitButton.classList.add("hidden");
          playButton.classList.remove("hidden");
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
        gameContainer.classList.remove("hidden");
        quitButton.classList.add("hidden");
        playButton.classList.remove("hidden");
    }
    quitButton.addEventListener("click", handleQuit);
    // https://www.gutenberg.org/files/41727/41727-h/41727-h.htm#GameI_50
    // https://www.gutenberg.org/ebooks/41728
    /*
    The Traditional Games of England, Scotland, and Ireland (Vol 2 of 2) With Tunes, Singing-Rhymes, and Methods of Playing etc.
    	Gomme, Alice Bertha, 1853-1938
    This is a slate game, and two or more children play. One writes the initial and final letters of a bird’s, beast’s, or fish’s[34] name, making crosses (×) instead of the intermediate letters of the word, stating whether the name is that of bird, beast, or fish. The other players must guess in turn what the name is. The first one who succeeds takes for himself the same number of marks as there are crosses in the word, and then writes the name of anything he chooses in the same manner. If the players are unsuccessful in guessing the name, the writer takes the number to his own score and writes another. The game is won when one player gains a certain number of marks previously decided upon as “game.”—Barnes (Alice Bertha Gomme).
    */
    // while word is not solved or wrong answers < 6, play game
    // user chooses bird, beast, or fish.
    // dep on the above, a random word is chosen from an array of B, B, or F.
    // display as blanks wtih first and last letter given
    // let user pick a letter
    // store the letter
    // let user know if letter is in word or not.
    // if letter is not in word, show body part
    // if letter is in word, show letter (all instances) UI, 
  });