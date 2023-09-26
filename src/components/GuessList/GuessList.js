import React from "react";
import Guess from "../Guess";

function GuessList({ guessList, answer }) {
  return (
    <div className="guess-results">
      {guessList.map((guessItem) => (
        <Guess key={guessItem.id} word={guessItem.guess} answer={answer} />
      ))}
    </div>
  );
}

export default GuessList;
