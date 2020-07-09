// *** DECK MODEL AND METHODS ***

const Card = require('./Card')

class Deck {
    constructor() {
        this.deck = [];
        this.allPlayers = [];
    }

    createDeck(suits, values) {
        for (let suit of suits) {
            for (let value of values) {
                this.deck.push(new Card(suit, value))
            }
        }
        return this.deck
    }

    shuffle() {
        let counter = this.deck.length, temp, i;

        while (counter) {
            i = Math.floor(Math.random() * counter--);
            temp = this.deck[counter];
            this.deck[counter] = this.deck[i]
            this.deck[i] = temp
        }
        return this.deck
    }

    dealMultiple(players) {
        //We assign a hand and name for each Player here, and then add them to state

        let noOfCards = this.deck.length
        let cardsPerPlayer;

        // ** ASSUMING WE DONT HAVE TO EQUALLY DISTRIBUTE CARDS **
        //1) We assign 1 card minimum if there are 52 players. If there are more players we include them but assign Nil for card values. 
        //2) cardsPerPlayer is rounded down to ensure no decimals are passed through
        players >= 52 ? cardsPerPlayer = 1 : cardsPerPlayer = Math.floor(noOfCards / players)

        for (let i = 0; i < players; i++) {
            let hand = []
            let player = { Name: 'Player ' + (i + 1), Hand: hand }

            //If there are more than 52 players, we assign Nil for card values for those players
            if (i >= 52) {
                hand.push({ suit: `Nil`, value: `Nil` })
                this.allPlayers.push(player)
            } else {
                for (let j = 0; hand.length < cardsPerPlayer; j++) {
                    hand.push(this.deck.pop())
                }
                this.allPlayers.push(player)
            }
        }
        return this.allPlayers
    }

    showHands() {
        this.allPlayers.forEach(player => {
            let arr = []
            player.Hand.forEach(card => { arr.push(`${card.value}-${card.suit}`) })
            let arr1 = arr.toString()
            console.log(`${player.Name} has : ${arr1}`)
        })
    }
}

module.exports = Deck