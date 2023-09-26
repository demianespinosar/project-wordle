import React from "react";

function GuessInput({ handleGuess, disabled }) {
  const [guess, SetGuess] = React.useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleGuess(guess);
        SetGuess("");
      }}
      className="guess-input-wrapper"
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        value={guess}
        onChange={(event) => {
          SetGuess(event.target.value.toUpperCase());
        }}
        id="guess-input"
        type="text"
        pattern="[A-Z]{5}"
        disabled={disabled}
      />
    </form>
  );
}

export default GuessInput;
