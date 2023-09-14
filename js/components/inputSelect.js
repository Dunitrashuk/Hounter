export default function inputSelect() {
  //SELECTORS
  const select = document.querySelector(".input-select");
  const selectOptions = document.querySelectorAll(".dropdown__option");

  //FUNCTIONS
  function openDropdown() {
    const dropdown = document.querySelector(".input-select__dropdown");
    dropdown.classList.toggle("dropdown-open");
    select.classList.toggle("select-open");
  }

  function chooseOption(e) {
    const text =
      e.target.closest(".dropdown__option").firstElementChild.textContent;
    select.firstElementChild.textContent = text;
  }

  //EVENTS
  select.addEventListener("click", openDropdown);

  selectOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      chooseOption(e);
    });
  });
}
