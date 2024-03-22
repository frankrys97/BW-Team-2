const totalQuestion = JSON.parse(sessionStorage.getItem("totalQuestion"));
const finalScore = JSON.parse(sessionStorage.getItem("finalScore"));

const correctPercentage = ((100 / totalQuestion) * finalScore).toFixed(1);
const wrongPercentage = (
  (100 / totalQuestion) *
  (totalQuestion - finalScore)
).toFixed(1);
const correctContainer = document.querySelector(".correct-percentage");
correctContainer.classList.add("perc");
const wrongContainer = document.querySelector(".wrong-percentage");
correctContainer.innerHTML = `${correctPercentage}%`;
wrongContainer.innerHTML = `${wrongPercentage}%`;
const numberOfCorrect = document.querySelector(".numberOfCorrect");
const numberOfWrong = document.querySelector(".numberOfWrong");
numberOfCorrect.innerHTML = `${finalScore}/ ${totalQuestion} Questions`;
numberOfWrong.innerHTML = `${
  totalQuestion - finalScore
}/ ${totalQuestion} Questions`;
const container = document.querySelector("#cerchio_1");
const resultsText = document.querySelector("#results-text");
const resultsP = document.querySelector(".results-p");
if (parseFloat(correctPercentage) >= 60) {
  resultsText.innerHTML = ` Congratulations!<span>You passed the exam.</span>`;
  resultsP.innerHTML = `We'll send you the certificate in few minutes. Check your email
  (including promotions / spam folder)`;
} else {
  resultsText.innerHTML = `We're sorry.<span>You didn't pass the exam.</span>`;
  resultsP.innerHTML = `You will be able to retry your exam on the next available date.`;
  const resultsSpan = document.querySelector("span");
  resultsSpan.style.color = "red";
}

// funzione per far funzionare la sbarra di progressione dei Results
function progressioneBarraRisultati() {
  // mi aggancio al cerchio in questione
  let path = document.querySelector("#purple-circle");
  console.log(path);

  // calcolo la progressione del cerchio che deve effettuare
  let progressionePath = (880 / totalQuestion) * finalScore;
  console.log(progressionePath);

  path.style.strokeDashoffset = `${progressionePath}px`;
}

progressioneBarraRisultati();

window.history.pushState(null, null, window.location.href);
window.onpopstate = function (event) {
  window.history.go(1);
};

// container.innerHTML = `<svg class="svg" viewBox="-1 -1 141 141">
// <defs>
//   <clipPath id="clip-path">
//     <path d="M70,70 v-50 a50,50 0 1,0 0,100 a50,50 0 1,0 0,-100 v-20 a70,70 0 0,1 0,140 a70,70 0 1,1 0,-140" />
//   </clipPath>
// </defs>
// <g clip-path="url(#clip-path)">
//   <path class="purple" d="M70,70 v-70 a70,70 0 0,1 0,140 a70,70 0 1,1 0,-140" fill="#d20094" />
//   <path class="lightBlue"  fill="#00ffff" />
// </g>

// </svg
// >
// <div class="middle-result">
// <h4 id="results-text"></h4>

// <p class="results-p"></p>
// </div>
// `;

// // Seleziona gli elementi con la classe 'lightBlue' e calcola il raggio del cerchio
// let lightBlue = document.getElementsByClassName("lightBlue"),
//   radius = document.querySelector("svg").getBBox().width / 2,
//   t = 0.5, // Intervallo di aggiornamento dell'animazione
//   theta = {}, // Oggetto per memorizzare l'angolo theta per ogni fetta
//   maxTheta = calcTheta(document.getElementsByClassName("perc")), // Calcola l'angolo massimo per ogni fetta
//   intervals = []; // Array per memorizzare gli ID degli intervalli

// // Funzione per calcolare l'angolo massimo per ogni fetta
// function calcTheta(el) {
//   let jbo = {};
//   // Per ogni elemento nella lista passata
//   for (let i = 0; i < el.length; i++) {
//     theta[i] = 0; // Imposta l'angolo theta iniziale a 0
//     // Imposta la traslazione per centrare la fetta
//     lightBlue[i].setAttribute(
//       "transform",
//       "translate(" + radius + "," + radius + ")"
//     );
//     // Calcola l'angolo massimo in base alla percentuale
//     jbo[i] = (180 * parseInt(el[i].innerHTML.slice(0, -1), 10)) / 50;
//   }
//   return jbo; // Restituisce un oggetto contenente gli angoli massimi per ogni fetta
// }

// // Funzione per l'animazione di una fetta
// let anim = function (j) {
//   return function () {
//     theta[j] += 0.5; // Incrementa l'angolo theta
//     // Costruisce il percorso per disegnare la fetta
//     let d =
//       "M0,0 v" +
//       -radius +
//       "A" +
//       radius +
//       "," +
//       radius +
//       " 1 " +
//       (theta[j] > 180 ? 1 : 0) +
//       ",1 " +
//       Math.sin((theta[j] * Math.PI) / 180) * radius +
//       "," +
//       Math.cos((theta[j] * Math.PI) / 180) * -radius +
//       "z";
//     // Imposta il percorso della fetta
//     lightBlue[j].setAttribute("d", d);
//     // Interrompe l'animazione quando l'angolo theta raggiunge l'angolo massimo
//     if (theta[j] > maxTheta[j]) {
//       clearInterval(intervals[j]);
//     }
//   };
// };

// // Avvia l'animazione per ogni fetta
// for (let j = 0; j < lightBlue.length; j++) {
//   // Memorizza l'ID dell'intervallo per poterlo fermare in seguito
//   intervals.push(setInterval(anim(j), t));
// }
