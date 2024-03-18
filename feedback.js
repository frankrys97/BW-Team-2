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
//metodo forEach per aggiungere l'evento mouseover con relativa funzione di aggiunta classe
stars.forEach((star, index) => {
  star.addEventListener("mouseover", () => {
    highlightStars(index + 1); // index +1 in quanto la nodelist parte da indice 0
  });
  //metodo forEach per aggiungere l'evento mouseout con relativa funzione di rimozione classe
  star.addEventListener("mouseout", () => {
    resetStars();
  });
});
