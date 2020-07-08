var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suits = ["Diamonds", "Hearts", "Spades", "Clubs"];


class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value
    }
}

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

    deal() {
        let hand = []
        while (hand.length < 2) {
            hand.push(this.deck.pop())
        }
        return hand
    }

    dealMultiple(players) {
        let noOfCards = this.deck.length
        // console.log(noOfCards)
        //Need to round down cardsperPlayer as some number of players can result in decimals and giving undefined
        let cardsPerPlayer;
        // let cardsPerPlayer = Math.floor(noOfCards / players)

        //If the # of players is past 52, we force each player to have 1 card. Doing this allows us to add players even though no more cards are left. Assuming that is we dont have to equally distribute cards
        players >= 52 ? cardsPerPlayer = 1 : cardsPerPlayer = Math.floor(noOfCards / players)
        // console.log(cardsPerPlayer)

        for (let i = 0; i < players; i++) {
            let hand = []
            let player = { Name: 'Player ' + (i + 1), Hand: hand }

            //If statement here, >52, give no more cards
            if (i >= 52) {
                // hand.push(`No more cards`)
                hand.push({ suit: `Nil`, value: `Nil` })
                this.allPlayers.push(player)
            } else {

                for (let j = 0; hand.length < cardsPerPlayer; j++) {
                    hand.push(this.deck.pop())
                    // console.log(` ${hand[j].value}`)
                }
                this.allPlayers.push(player)
                // console.log(hand.length)
                // console.log(` ${hand[0].value} of ${hand[0].suit} `)

            }


        }
        return this.allPlayers
    }

    showHands() {
        this.allPlayers.forEach(player => {
            // console.log(player)
            let arr = []
            player.Hand.forEach(card => { arr.push(`${card.value}-${card.suit}`) })
            // console.log(arr)
            let arr1 = arr.toString()
            console.log(`${player.Name} has : ${arr1}`)

            // console.log(player.Name)
            // player.Hand.forEach(card => console.log(card.value + ' of ' + card.suit))
        })
    }

}

let deck = new Deck()
// console.log(deck.createDeck(suits, values))
deck.createDeck(suits, values)
deck.shuffle()
// console.log(deck.shuffle())
// deck.deal()
// console.log(deck.deal())
// console.log(deck.dealMultiple(54))
deck.dealMultiple(20)
deck.showHands()



// let noOfCards = this.deck.length
// let players = 2
// let cardsPerPlayer = noOfCards / players
// let hand = []
// while (hand.length < cardsPerPlayer) {
//     hand.push(this.deck.pop())
// }
// return hand.length