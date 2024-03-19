/*const checkBox = document.getElementById("promise")
const button = document.querySelector(".proceed")
button.disabled = true
checkBox.addEventListener("change", () => {
    checkBox.addEventListener("change", function () {
        if (this.checked) {
            button.disabled = false;
            button.classList.add("activeButton")
        } else {
            button.disabled = true;
            button.classList.remove("activeButton")
        }
    });
})*/
const checkbox = document.getElementById('demo_opt_1');
  const button = document.querySelector('.proceed');
  button.disabled = true;

  checkbox.addEventListener('change', () => {
    button.disabled = !checkbox.checked; 
    if (checkbox.checked) {
        button.classList.add('activeButton');
      } else {
        button.classList.remove('activeButton');
      }

  }); 
 