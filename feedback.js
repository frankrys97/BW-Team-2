//selezione di tutte le icone
const stars = document.querySelectorAll("i");
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
  });
});
const feedbackContainer = document.getElementById("response");
const feedbackButton = document.getElementById("feedbackButton");
feedbackButton.addEventListener("click", () => {
  while (feedbackContainer.firstChild) {
    feedbackContainer.removeChild(feedbackContainer.firstChild);
  }
  const numStars = document.querySelectorAll(".keepStars").length;
  const feedbackMessage = document.createElement("p");
  if (numStars >= 1 && numStars <= 6) {
    feedbackMessage.innerText = "We are sorry, we'll do better the next time!";
  } else if (numStars === 0) {
    feedbackMessage.innerText = "No stars selected";
  } else {
    feedbackMessage.innerText = "Thanks for your feedback!";
  }
  feedbackContainer.appendChild(feedbackMessage);
});
