import React, { useState } from "react";
import "./index.css";

let max = new Date();
let min = new Date("1900/01/01");
let calculatedDate;
let firstTime = true;
let guesses = 0;
let earlierDateArray = [];
let laterDateArray = [];
function App() {
  let today = new Date();

  const [date, setDate] = useState(today);
  const [guess, setGuess] = useState(0);
  const [earlierDateArr, setEarlierDateArr] = useState("");
  const [laterDateArr, setLaterDateArr] = useState("");
  const [congrats, setCongrats] = useState("");

  function calculateDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function handleClickEarlier() {
    setGuess((prevGuess) => prevGuess + 1);
    max = date;

    if (max === today && firstTime) {
      calculatedDate = calculateDays(date, -365 * 100);
    } else {
      calculatedDate = new Date((min.getTime() + max.getTime()) / 2);
    }
    firstTime = false;

    earlierDateArray.push(calculatedDate);
    setEarlierDateArr(
      earlierDateArray
        .slice(earlierDateArray.length - 3, earlierDateArray.length)
        .map((item) => {
          return (
            <h1>
              {item.getDate() +
                " " +
                item.toLocaleString("default", { month: "long" }) +
                ", " +
                item.getFullYear()}
            </h1>
          );
        })
    );
    setDate(calculatedDate);
  }

  function handleClickLater() {
    setGuess((prevGuess) => prevGuess + 1);
    let calculatedDate;
    min = date;

    if (min === today && firstTime) {
      calculatedDate = calculateDays(date, 365 * 100);
    } else {
      calculatedDate = new Date((min.getTime() + max.getTime()) / 2);
    }
    firstTime = false;

    setDate(calculatedDate);
    laterDateArray.push(calculatedDate);
    setLaterDateArr(
      laterDateArray
        .slice(laterDateArray.length - 3, laterDateArray.length)
        .map((item) => {
          return (
            <h1>
              {item.getDate() +
                " " +
                item.toLocaleString("default", { month: "long" }) +
                ", " +
                item.getFullYear()}
            </h1>
          );
        })
    );
  }

  function success() {
    setCongrats("No need to thank me.");
  }

  return (
    <div className="App">
      <div className="App--wrapper">
        <h1 className="App--question">Is this your birthday?</h1>
        <div className="App--dates">
          <h1 className="App--guessedDates datesLeft">{earlierDateArr}</h1>
          <button
            type="button"
            className="dates--buttons dates--earlier"
            onClick={handleClickEarlier}
          >
            Earlier
          </button>
          <h1 className="dates--text">
            {date.getDate() +
              " " +
              date.toLocaleString("default", { month: "long" }) +
              ", " +
              date.getFullYear()}
          </h1>
          <button
            type="button"
            className="dates--buttons dates--later"
            onClick={handleClickLater}
          >
            Later
          </button>
          <h1 className="App--guessedDates datesRight">{laterDateArr}</h1>
        </div>
        <div>Guesses: {guess}</div>
      </div>
      <button
        type="button"
        className="dates--buttons dates--correct"
        onClick={success}
      >
        This is my birthday
      </button>
      <div className="App--congrats">{congrats}</div>
    </div>
  );
}

export default App;
