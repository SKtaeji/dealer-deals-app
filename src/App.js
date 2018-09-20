import React, { Component } from "react";
import "./App.css";
var psHand = require("pokersolver").Hand;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: [],
      deck: [],
      shaq: ""
    };

    this.genHand = this.genHand.bind(this);
    this.genDeck = this.genDeck.bind(this);
    this.imgName = this.imgName.bind(this);
  }

  genDeck() {
    const suits = ["s", "d", "c", "h"];
    const cards = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "T",
      "J",
      "Q",
      "K",
      "A"
    ];
    const deck = [];

    suits.forEach(s => {
      cards.forEach(c => {
        deck.push(c + s);
      });
    });

    this.setState({ deck });
  }

  genHand() {
    if (this.state.deck.length < 5) this.genDeck();
    const hand = [];
    const deck = Object.assign([], this.state.deck);
    for (let i = 0; i < 5; i++) {
      hand.push(deck.splice([Math.random() * deck.length], 1)[0]);
    }
    const shaq = psHand.solve(hand).name;

    this.setState({ hand, deck, shaq });
  }

  imgName(str) {
    const map = {
      d: "diamonds",
      h: "hearts",
      c: "clubs",
      s: "spades",
      J: "jack",
      Q: "queen",
      K: "king",
      A: "ace",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      T: "10"
    };

    return `./cards/${map[str[0]]}_of_${map[str[1]]}.svg`;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Dealer Deals</h1>
        </header>
        <p className="App-intro">
          <button onClick={this.genDeck}>Shuffle</button>
          <button onClick={this.genHand}>Deal Me In</button>
        </p>
        <p>Cards in Deck: {this.state.deck.length}</p>
        <p>Hand: {this.state.shaq}</p>
        <div className="flex">
          {this.state.hand.map(card => (
            <div>
              <img src={this.imgName(card)} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
