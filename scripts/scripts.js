const animals = [
    {
        type: "bird",
        animals: ["egret", "ibis", "eagle", "heron", "parrot", "lorikeet", "woodpecker", "kingfisher", "kookaburra", "nuthatch", "partridge", "albatross", "hummingbird", "toucan", "cardinal", "parakeet", "sparrow", "penguin", "butterfly"]
    },
    {
        type: "beast",
        animals: ["zebra", "camel", "oranutan", "tortoise", "taipan", "coyote", "armadillo", "giraffe", "kangaroo", "wallaby", "quokka", "elephant", "ocelot", "lizard", "lemur", "possum", "wombat", "squirrel", "hedgehog", "whale", "crocodile", "alligator", ]
    },
    {
        type: "fish",
        animals: ["shark", "stingray", "piranha", "salmon", "barracuda", "barramundi", "blobfish", "catfish", "goldfish", "mackerel", "octopus", "jellyfish", "lobster", "seahorse"]
    }
];

document.addEventListener("DOMContentLoaded", function() {
    console.log("script did load, ya toad.");
    function getRando(max){
        return Math.floor(Math.random() * max);
       
    }
    function getAnimal(){

        const randoIdx = getRando(animals.length);
        const gameAnimal = animals[randoIdx]
        return gameAnimal;

    }

    console.log(getAnimal())
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