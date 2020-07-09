// ***** CONTROLLER ****

const Deck = require('./components/Deck')

const inquirer = require('inquirer')

function startProgram() {
    // **Initiate values to create cards
    var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    var suits = ["Diamonds", "Hearts", "Spades", "Clubs"];

    // **Start inquirer to begin program
    // ** IRREGULARITY: Inquirer.js currently does not clear wrong inputs in the terminal. Please press up or backspace to clear the wrong input in the CLI
    var question = [{
        type: 'number',
        name: 'players',
        message: "Please the number of players",
        validate: function (players) {
            var valid = Number.isInteger(players);
            if (players < 0) {
                return `Please enter a number higher than zero`
            } else if (!valid) {
                return `Input value does not exist or value is invalid`
            }
            return valid
        },
    }]

    function promptUser() {
        inquirer.prompt(question)
            .then(answers => {
                console.log(`You entered ${answers['players']} player(s)`)
                let deck = new Deck()
                deck.createDeck(suits, values)
                deck.shuffle()
                deck.dealMultiple(answers['players'])
                deck.showHands()
            })
            .catch(error => console.log(`Irregularity occured`))
    }

    promptUser();
}

startProgram() //Use node index.js in terminal to start program
