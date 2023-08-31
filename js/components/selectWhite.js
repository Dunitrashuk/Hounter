export default function selectWhite() {
  const select = document.querySelector(".select-white");
  const dropdown = document.querySelector(".select-white__dropdown");
  

  select.addEventListener("mouseover", (e) => {
    dropdown.classList.add("active");
  });

  select.addEventListener("mouseleave", (e) => {
    dropdown.classList.remove("active");
  });
}
