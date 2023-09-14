export default function videoModal() {
  //selectors
  const videoButton = document.querySelector(
    ".tour__content__images__main-img"
  );
  const videoModal = document.querySelector(".video-modal");

  //events
  videoButton.addEventListener("click", (e) => {
    videoModal.classList.add("open-modal");
    document.querySelector("html").style.overflow = "hidden";
  });

  videoModal.addEventListener("click", (e) => {
    videoModal.classList.remove("open-modal");
    document.querySelector("html").style.overflowY = "visible";
  });
}
