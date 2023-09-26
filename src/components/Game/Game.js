import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput";
import GuessList from "../GuessList/";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";
import Banner from "../Banner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guessList, SetGuessList] = React.useState(
    range(NUM_OF_GUESSES_ALLOWED).map(() => ({ id: crypto.randomUUID() }))
  );
  const [numGuesses, setNumGuesses] = React.useState(0);

  function handleGuess(guess) {
    const newGuess = { ...guessList[numGuesses], guess };
    const newGuessList = [...guessList];
    newGuessList[numGuesses] = newGuess;
    SetGuessList(newGuessList);
    setNumGuesses(numGuesses + 1);
  }

  function isLastGuessCorrect() {
    if (numGuesses <= 0 || !guessList[numGuesses - 1].guess) {
      return false;
    }
    console.log(guessList[numGuesses - 1].guess);
    return checkGuess(guessList[numGuesses - 1].guess, answer).every(
      (c) => c.status === "correct"
    );
  }

  function getBanner() {
    if (isLastGuessCorrect()) {
      return (
        <Banner type="happy">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{numGuesses} guesses</strong>.
          </p>
        </Banner>
      );
    }

    if (numGuesses >= NUM_OF_GUESSES_ALLOWED) {
      return (
        <Banner type="sad">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </Banner>
      );
    }
  }

  return (
    <>
      <GuessList guessList={guessList} answer={answer}></GuessList>
      <GuessInput
        handleGuess={handleGuess}
        disabled={numGuesses >= NUM_OF_GUESSES_ALLOWED || isLastGuessCorrect()}
      ></GuessInput>
      {getBanner()}
    </>
  );
}

export default Game;
