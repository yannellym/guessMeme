
import './App.css';
import React, { useState, useEffect } from "react"
import SingleCard from "./components/SingleCard"
import JSConfetti from 'js-confetti'


const cardImages= [
  { "src" : "./images/cry.png" , matched: false },
  { "src" : "./images/fire.png" , matched: false},
  { "src" : "./images/kevin.png" , matched: false},
  { "src" : "./images/look.png" , matched: false},
  { "src" : "./images/ohno.png" , matched: false},
  { "src" : "./images/party.png" , matched: false},
  { "src" : "./images/smart.png" , matched: false},
  { "src" : "./images/umg.png" , matched: false},
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [score, setScore] = useState(0)

  const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
}

//handles the card chosen

const handleChoice = (card) => {
  choiceOne? setChoiceTwo(card) : setChoiceOne(card)
  console.log(choiceOne)
console.log(choiceTwo)
}


//compare two cards

useEffect(() => {
  if(choiceOne && choiceTwo) {
    setDisabled(true)

    if(choiceOne.src === choiceTwo.src) {
      setCards( prevCards => {
        return prevCards.map(card => {
          if(card.src === choiceOne.src) {
            return { ...card, matched: true}
          } else {
            return card
          }
        })
      })
      console.log("cards do match")
      setScore(prevScore=> prevScore +1)
      celebration()
      resetTurn()
    } else {
      console.log("they dont match :(")
      setTimeout(() => resetTurn(), 1000)
    }
  }
}, [choiceOne, choiceTwo, celebration])
console.log(cards)

//reset choice and increase turn

const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns +1)
  setDisabled(false)
}


// start a new game automatically 
useEffect(() => {
  shuffleCards()
}, [])

//confetti function
const jsConfetti = new JSConfetti()
let celebration = () => {
    jsConfetti.addConfetti({
    emojis: ['👍🏽'],
    emojiSize: 200,
    confettiNumber: 1,
 })
}

let winningCelebration = () => {
  jsConfetti.addConfetti({
  emojiSize: 200,
})
}


function youWon(){
 return (
   winningCelebration(),
  <h1>YOU WIN! <br/>
    <img src="./images/winning.png" className="winImg" alt="you won!" />
    <button onClick={refreshPage} className="reload">RESTART GAME</button>
  </h1>)
}

function refreshPage() {
  window.location.reload(false);
}

  return (
    <div className="App">
      <h1>Match The Meme</h1>
            <button onClick={shuffleCards} className="startGame">New Game</button>
            <p>Turns: {turns}  <span>Score: {score}</span></p>
            {score >=8? youWon():
            <div className="card-grid">
                {cards.map(card => (
                <SingleCard  
                  key={card.id} 
                  card={card}
                  handleChoice={handleChoice} 
                  flipped={ card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
                  />
                ))}
            </div>
            }
    </div>
  );
}

export default App;
