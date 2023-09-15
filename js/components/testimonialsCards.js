export default async function testimonialsCards() {
  async function fetchTestimonialsCards() {
    try {
      const response = await fetch(
        "http://localhost:3000/testimonials/testimonialsCards"
      ); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const cards = await fetchTestimonialsCards();

  //SELECTORS
  const cardsContainer = document.querySelector(".testimonials__cards");
  const bulletsContainer = document.querySelector(".testimonials__bullets");

  generateCardMarkup(cards);
  allignCards();
  generateBulletsMarkup(cards);
  onScrollStop(changeBulletOnScroll);

  const cardsEl = document.querySelectorAll(".testimonials-card");
  const bulletsEl = document.querySelectorAll(".testimonials__bullets__bullet");

  //FUNCTIONS
  function allignCards() {
    const windowWidth = window.innerWidth;
    const firstCard = cardsContainer.firstElementChild;
    const lastCard = cardsContainer.lastElementChild;
    firstCard.style.marginLeft =
      windowWidth / 2 - firstCard.offsetWidth / 2 + "px";
    lastCard.style.marginRight =
      windowWidth / 2 - lastCard.offsetWidth / 2 + "px";
  }

  function renderCardMarkup(cardMarkup) {
    cardsContainer.innerHTML += cardMarkup;
  }

  function generateCardMarkup(cards) {
    cards.forEach((card, idx) => {
      let template = `
      <div class="testimonials-card">
      <div class="testimonials-card__img-container">
        <img src="http://localhost:8080${card.image}" alt="house ${idx}" />
      </div>

      <div class="testimonials-card__info">
        <h5 class="heading-4">
          ${card.title}
        </h5>

        <p class="label-text-regular text-grey-3">
          ${card.description}
        </p>

        <div class="testimonials__review">
          <div class="testimonials__review__user-container">
            <div class="testimonials__review__user-container__img">
              <img src="http://localhost:8080${card.user.avatar}" alt="user ${idx}" />
            </div>

            <div class="testimonials__review__user-container__text">
              <h5 class="label-text-bold">${card.user.name}</h5>
              <p class="label-text-regular text-grey-2">
                ${card.user.job}
              </p>
            </div>
          </div>

          <div class="testimonials__review__rating">
            <svg>
              <use href="./assets/svgs/sprite.svg#star"></use>
            </svg>
            <h5 class="heading-4">${card.rating}</h5>
          </div>
        </div>
      </div>
    </div>
          `;
      renderCardMarkup(template);
    });
    cardsContainer.scrollTo(0, 0);
  }

  function renderBulletMarkup(markup) {
    bulletsContainer.innerHTML += markup;
  }

  function generateBulletsMarkup() {
    cards.forEach((card, idx) => {
      let template = `
      <div class="testimonials__bullets__bullet ${
        idx === 0 ? "active-bullet" : ""
      }"></div>
      `;
      renderBulletMarkup(template);
    });
  }

  function scrollToCard(card) {
    card.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }

  function changeBullet(idx) {
    bulletsEl.forEach((bullet, i) => {
      bullet.classList.remove("active-bullet");
      if (idx === i) bullet.classList.add("active-bullet");
    });
  }

  function changeBulletOnScroll() {
    const marginLeft = Math.floor(
      parseInt(window.getComputedStyle(cardsEl[0]).marginLeft)
    );

    cardsEl.forEach((card, idx) => {
      let cardCenter = Math.floor(card.getBoundingClientRect().x);

      if (marginLeft >= cardCenter - card.offsetWidth / 2) changeBullet(idx);
    });
  }

  function onScrollStop(callback) {
    let isScrolling;
    cardsContainer.addEventListener(
      "scroll",
      (e) => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          callback();
        }, 50);
      },
      false
    );
  }

  //EVENTS
  cardsEl.forEach((card) => {
    card.addEventListener("click", (e) => {
      const currCard = e.target.closest(".testimonials-card");
      scrollToCard(currCard);
    });
  });

  bulletsEl.forEach((bullet, idx) => {
    bullet.addEventListener("click", (e) => {
      const card = cardsEl[idx];
      scrollToCard(card);
      changeBullet(idx);
    });
  });
}
