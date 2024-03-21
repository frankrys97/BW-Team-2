const arrayEasy = JSON.parse(sessionStorage.getItem("arrayEasy"));

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "purple",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 59;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <div class="timer-content">
    <h5 class="top-h5">SECONDS</h5>
    <span id="base-timer-label" class="base-timer__label">${formatTime(
      timeLeft
    )}</span>
    <h5 class="bottom-h5">REMAINING</h5>
  </div>
</div>
`;

startTimer();

function onTimesUp() {
  const selectedAnswer = document.querySelector(".selectedAnswer"); // Questa va inserita all'interno della funzione
  // perchè se l'avessimo dichiarata fuori il browser l'avrebbe cercata al caricamento della pagina e quindi sarebbe
  // stata semore null, mentre noi vogliamo cercarla allo scadere del tempo
  if (selectedAnswer) {
    arrayOfSelectedAnswers.push(
      document.querySelector(".selectedAnswer").innerHTML
    );
  } else {
    arrayOfSelectedAnswers.push("Risposta non data");
  }

  clearInterval(timerInterval);
  resetQuestion();
  randomQuestion();

  resetTimer();

  questionCounter++;

  let numQuestion = document.getElementById("numQuestion");

  numQuestion.innerHTML = `QUESTION ${questionCounter} <span>  / ${arrayEasy.length} </span>`;

  checkLastQuestion();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);
    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  let seconds = time;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  } else {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(alert.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(info.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

const questionTitle = document.getElementById("question");
const answers = document.getElementById("answers");

let selectedQuestion = [];

const arrayOfCorrect = [];

const randomQuestion = function () {
  if (selectedQuestion.length === arrayEasy.length) {
    return;
  }

  let randomQuestion = Math.floor(Math.random() * arrayEasy.length);

  while (selectedQuestion.includes(randomQuestion)) {
    randomQuestion = Math.floor(Math.random() * arrayEasy.length);
  }

  selectedQuestion.push(randomQuestion);

  questionTitle.innerHTML = arrayEasy[randomQuestion].question;

  const allAnswers = [
    arrayEasy[randomQuestion].correct_answer,
    ...arrayEasy[randomQuestion].incorrect_answers,
  ];

  allAnswers.sort(() => Math.random() - 0.5); // Crea un numero random da -0,5 a 0,5 in modo da assegnare ad ogni elemento un
  // proprio indice che permettere di essere pescati in modo casuale

  allAnswers.forEach((answer) => {
    const everyAnswer = document.createElement("button");
    everyAnswer.classList.add("answerBox");
    everyAnswer.innerHTML = answer;
    answers.appendChild(everyAnswer);
  });

  const arrayOfButton = document.querySelectorAll(".answerBox");

  const resetButton = function () {
    arrayOfButton.forEach((buttons) => {
      buttons.classList.remove("selectedAnswer");
    });
  };

  function highlightButton(button) {
    arrayOfButton[button].classList.add("selectedAnswer");
  }

  arrayOfButton.forEach((buttons, index) => {
    buttons.addEventListener("click", () => {
      resetButton();
      highlightButton(index);
    });
  });
  arrayOfCorrect.push(arrayEasy[randomQuestion].correct_answer);
};

randomQuestion();

const arrayOfSelectedAnswers = [];

let finalScore = 0;

let counterScore = function () {
  let score = 0;
  for (let i = 0; i < arrayOfSelectedAnswers.length; i++) {
    if (arrayOfSelectedAnswers[i] === arrayOfCorrect[i]) {
      score++;
    }
  }
  return (finalScore = score);
};

function resetTimer() {
  clearInterval(timerInterval); // Interrompe il timer attuale
  timePassed = 0; // Resettiamo il tempo passato
  timeLeft = TIME_LIMIT; // Resettiamo il tempo rimanente
  document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft); // Aggiorniamo l'etichetta del timer
  remainingPathColor = COLOR_CODES.info.color; // Reimpostiamo il colore del percorso rimanente
  setRemainingPathColor(timeLeft); // Aggiorniamo il colore del percorso rimanente
  setCircleDasharray(); // Reimpostiamo l'animazione del timer
  startTimer(); // Avviamo nuovamente il timer
}

const button = document.getElementById("proceed");

const resetQuestion = function () {
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild);
  }
};

let questionCounter = 1;

button.addEventListener("click", () => {
  const selectedAnswer = document.querySelector(".selectedAnswer"); // Questa va inserita all'interno della funzione
  // perchè se l'avessimo dichiarata fuori il browser l'avrebbe cercata al caricamento della pagina e quindi sarebbe
  // stata semore null, mentre noi vogliamo cercarla allo scadere del tempo
  if (selectedAnswer) {
    arrayOfSelectedAnswers.push(
      document.querySelector(".selectedAnswer").innerHTML
    );
  } else {
    arrayOfSelectedAnswers.push("Risposta non data");
  }
  resetQuestion();

  randomQuestion();

  resetTimer();

  setRemainingPathColor(timeLeft);

  questionCounter++;

  let numQuestion = document.getElementById("numQuestion");

  numQuestion.innerHTML = `QUESTION ${questionCounter} <span>  / ${arrayEasy.length} </span>`;
  checkLastQuestion();
});

let numQuestion = document.getElementById("numQuestion");

numQuestion.innerHTML = `QUESTION ${questionCounter} <span>  / ${arrayEasy.length} </span>`;

const checkLastQuestion = function () {
  if (arrayOfSelectedAnswers.length === arrayEasy.length) {
    counterScore();
    sessionStorage.setItem("finalScore", JSON.stringify(finalScore));
    const totalQuestion = selectedQuestion.length;
    sessionStorage.setItem("totalQuestion", JSON.stringify(totalQuestion));
    window.location.href = "results.html";
  }
};

window.history.pushState(null, null, window.location.href);
window.onpopstate = function (event) {
  window.history.go(1);
};
