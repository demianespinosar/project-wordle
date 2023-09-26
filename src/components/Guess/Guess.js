import React from "react";
import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";

function Guess({ word, answer }) {
  const checkedWord = checkGuess(word, answer);

  return (
    <p className="guess">
      {range(5).map((idx) => (
        <span
          key={idx}
          className={`cell ${checkedWord ? checkedWord[idx].status : ""}`}
        >
          {word?.charAt(idx) ?? ""}
        </span>
      ))}
    </p>
  );
}

export default Guess;
