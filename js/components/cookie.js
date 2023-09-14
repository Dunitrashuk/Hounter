export default function cookie() {
  const cookieEl = document.querySelector(".cookies");
  const cookieCross = document.querySelector(".cookies__cross");

  function closeCookie() {
    cookieEl.style.display = "none";
  }

  cookieCross.addEventListener("click", closeCookie, { once: true });
}
