//selezione di tutte le icone
const stars = document.querySelectorAll("svg path");
//funzione per aggiungere la classe "blueStars" alle singole icone
function highlightStars(num) {
  for (let i = 0; i < num; i++) {
    stars[i].classList.add("blueStars");
  }
}
//funzione per rimuovere la classe "blueStars" alle singole icone
function resetStars() {
  stars.forEach((star) => {
    star.classList.remove("blueStars");
  });
}
function keepStars(num) {
  for (let i = 0; i < num; i++) {
    stars[i].classList.add("keepStars");
  }
}
function resetKeepStars() {
  stars.forEach((star) => {
    star.classList.remove("keepStars");
  });
}

//metodo forEach per aggiungere l'evento mouseover con relativa funzione di aggiunta classe
stars.forEach((star, index) => {
  star.addEventListener("mouseover", () => {
    highlightStars(index + 1); // index +1 in quanto la nodelist parte da indice 0
  });
  //metodo forEach per aggiungere l'evento mouseout con relativa funzione di rimozione classe
  star.addEventListener("mouseout", () => {
    resetStars();
  });
  star.addEventListener("click", () => {
    resetKeepStars();
    keepStars(index + 1);
    removeRedParagraphStars();
  });
});
const feedbackContainer = document.getElementById("response");
const feedbackButton = document.getElementById("feedbackButton");
const body = document.querySelector("body");
const main = document.querySelector("main");
const infoButton = document.getElementById("infoButton");
const inputDiv = document.getElementById("inputDiv");
const input = document.getElementById("input");
const starsDiv = document.getElementById("stars-div");

function removeRedParagraph() {
  const redParagraph = inputDiv.querySelector("p");
  if (redParagraph) {
    inputDiv.removeChild(redParagraph);
  }
}

function removeRedParagraphStars() {
  const redParagraph = starsDiv.querySelector("p");
  if (redParagraph) {
    starsDiv.removeChild(redParagraph);
  }
}

input.addEventListener("input", removeRedParagraph);

feedbackButton.addEventListener("click", () => {
  const numStars = document.querySelectorAll(".keepStars").length;
  if (input.value === "") {
    while (inputDiv.querySelector("p")) {
      inputDiv.removeChild(inputDiv.querySelector("p"));
    }
    const required = document.createElement("p");
    required.innerHTML = "* leave a feedback";
    required.style.color = "red";
    required.style.fontSize = "1em";
    required.style.marginTop = "10px";
    inputDiv.appendChild(required);
  } else if (numStars === 0) {
    while (starsDiv.querySelector("p")) {
      starsDiv.removeChild(starsDiv.querySelector("p"));
    }
    const required2 = document.createElement("p");
    required2.innerHTML = "* leave a rating";
    required2.style.color = "red";
    required2.style.fontSize = "1em";
    required2.style.marginTop = "10px";

    starsDiv.appendChild(required2);
  } else {
    const feedbackMessage = document.createElement("p");
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    feedbackButton.style.display = "none";
    const feedbackDiv = document.createElement("div");
    feedbackDiv.classList.add("newDiv");
    main.appendChild(feedbackDiv);

    if (numStars >= 1 && numStars <= 6) {
      feedbackMessage.innerText = "We are sorry, we'll do better next time!";
    } else if (numStars === 0) {
      feedbackMessage.innerText = "No stars selected";
    } else {
      feedbackMessage.innerText = "Thanks for your feedback!";
    }
    feedbackDiv.appendChild(feedbackMessage);
    infoButton.style.display = "block";
    main.style.marginTop = "150px";
  }
});

window.history.pushState(null, null, window.location.href);
window.onpopstate = function (event) {
  window.history.go(1);
};
