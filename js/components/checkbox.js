export default function checkbox() {
  //SELECTORS
  const label = document.querySelector(".checkbox__label");
  const box = document.querySelector(".checkbox__box");

  //FUNCTIONS
  function toggleCheckbox() {
    box.classList.toggle("checked");
  }

  //EVENTS
  label.addEventListener("click", toggleCheckbox);
  box.addEventListener("click", toggleCheckbox);
}
