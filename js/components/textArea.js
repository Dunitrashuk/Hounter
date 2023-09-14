export default function textArea() {
  //SELECTORS
  const textArea = document.querySelector(".form__field__text-area");
  const counter = document.querySelector(".counter");

  //EVENTS
  textArea.addEventListener("input", (e) => {
    let textLength = e.target.value.length;

    if (textLength <= 500) {
      counter.textContent = `${textLength}/500`;
    }

    if (textLength > 0) {
      counter.classList.add("counter-transform");
    } else {
      counter.classList.remove("counter-transform");
    }
  });
}
