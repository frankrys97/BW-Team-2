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

  numQuestion.innerHTML = `QUESTION ${questionCounter} <span>  / 30 </span>`;

  checkLastQuestion();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    // setRemainingPathColor(timeLeft);

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

// function setRemainingPathColor(timeLeft) {
//   const { alert, warning, info } = COLOR_CODES;
//   if (timeLeft <= alert.threshold) {
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.remove(warning.color);
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.add(alert.color);
//   } else if (timeLeft <= warning.threshold) {
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.remove(info.color);
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.add(warning.color);
//   }
// }

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

const arrayEasy = [
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "How long is an IPv6 address?",
    correct_answer: "128 bits",
    incorrect_answers: ["32 bits", "64 bits", "128 bytes"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question: "Time on Computers is measured via the EPOX System.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "In computing, what does MIDI stand for?",
    correct_answer: "Musical Instrument Digital Interface",
    incorrect_answers: [
      "Musical Interface of Digital Instruments",
      "Modular Interface of Digital Instruments",
      "Musical Instrument Data Interface",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
    correct_answer: "Apple",
    incorrect_answers: ["Microsoft", "Atari", "Commodore"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "In computing, what does LAN stand for?",
    correct_answer: "Local Area Network",
    incorrect_answers: [
      "Long Antenna Node",
      "Light Access Node",
      "Land Address Navigation",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What amount of bits commonly equals one byte?",
    correct_answer: "8",
    incorrect_answers: ["1", "2", "64"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What is the domain name for the country Tuvalu?",
    correct_answer: ".tv",
    incorrect_answers: [".tu", ".tt", ".tl"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "The Python programming language gets its name from the British comedy group &quot;Monty Python.&quot;",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "The series of the Intel HD graphics generation succeeding that of the 5000 and 6000 series (Broadwell) is called:",
    correct_answer: "HD Graphics 500",
    incorrect_answers: [
      "HD Graphics 700 ",
      "HD Graphics 600",
      "HD Graphics 7000",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "How many kilobytes in one gigabyte (in decimal)?",
    correct_answer: "1000000",
    incorrect_answers: ["1024", "1000", "1048576"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What does the Prt Sc button do?",
    correct_answer:
      "Captures what&#039;s on the screen and copies it to your clipboard",
    incorrect_answers: [
      "Nothing",
      "Saves a .png file of what&#039;s on the screen in your screenshots folder in photos",
      "Closes all windows",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "HTML is what type of language?",
    correct_answer: "Markup Language",
    incorrect_answers: [
      "Macro Language",
      "Programming Language",
      "Scripting Language",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question: "The Windows ME operating system was released in the year 2000.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "The programming language &#039;Swift&#039; was created to replace what other programming language?",
    correct_answer: "Objective-C",
    incorrect_answers: ["C#", "Ruby", "C++"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What language does Node.js use?",
    correct_answer: "JavaScript",
    incorrect_answers: ["Java", "Java Source", "Joomla Source Code"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "In most programming languages, the operator ++ is equivalent to the statement &quot;+= 1&quot;.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "How many values can a single byte represent?",
    correct_answer: "256",
    incorrect_answers: ["8", "1", "1024"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What does the computer software acronym JVM stand for?",
    correct_answer: "Java Virtual Machine",
    incorrect_answers: [
      "Java Vendor Machine",
      "Java Visual Machine",
      "Just Virtual Machine",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What does LTS stand for in the software market?",
    correct_answer: "Long Term Support",
    incorrect_answers: [
      "Long Taco Service",
      "Ludicrous Transfer Speed",
      "Ludicrous Turbo Speed",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "The C programming language was created by this American computer scientist. ",
    correct_answer: "Dennis Ritchie",
    incorrect_answers: [
      "Tim Berners Lee",
      "al-Khw\u0101rizm\u012b",
      "Willis Ware",
    ],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question: "The Windows 7 operating system has six main editions.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "The numbering system with a radix of 16 is more commonly referred to as ",
    correct_answer: "Hexidecimal",
    incorrect_answers: ["Binary", "Duodecimal", "Octal"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "Which computer hardware device provides an interface for all other connected devices to communicate?",
    correct_answer: "Motherboard",
    incorrect_answers: [
      "Central Processing Unit",
      "Hard Disk Drive",
      "Random Access Memory",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "This mobile OS held the largest market share in 2012.",
    correct_answer: "iOS",
    incorrect_answers: ["Android", "BlackBerry", "Symbian"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "In any programming language, what is the most common way to iterate through an array?",
    correct_answer: "&#039;For&#039; loops",
    incorrect_answers: [
      "&#039;If&#039; Statements",
      "&#039;Do-while&#039; loops",
      "&#039;While&#039; loops",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "If you were to code software in this language you&#039;d only be able to type 0&#039;s and 1&#039;s.",
    correct_answer: "Binary",
    incorrect_answers: ["JavaScript", "C++", "Python"],
  },
];

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

  /* const correctAnswer = document.createElement("button");
  correctAnswer.classList.add("answerBox");
  correctAnswer.innerHTML = arrayEasy[randomQuestion].correct_answer;
  answers.appendChild(correctAnswer);

  arrayEasy[randomQuestion].incorrect_answers.forEach((answer) => {
    const incorrectAnswer = document.createElement("button");
    incorrectAnswer.classList.add("answerBox");
    incorrectAnswer.innerHTML = answer;
    answers.appendChild(incorrectAnswer);
  });*/

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
  //   setRemainingPathColor(timeLeft); // Aggiorniamo il colore del percorso rimanente
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

  questionCounter++;
  let numQuestion = document.getElementById("numQuestion");

  numQuestion.innerHTML = `DOMANDA ${questionCounter} <span>  / 30 </span>`;

  checkLastQuestion();
});

let numQuestion = document.getElementById("numQuestion");

numQuestion.innerHTML = `QUESTION ${questionCounter} <span>  / 30 </span>`;

const checkLastQuestion = function () {
  if (arrayOfSelectedAnswers.length === 30) {
    counterScore();
    sessionStorage.setItem("finalScore", JSON.stringify(finalScore));
    const totalQuestion = selectedQuestion.length;
    sessionStorage.setItem("totalQuestion", JSON.stringify(totalQuestion));
    window.location.href = "results.html";
  }
};
