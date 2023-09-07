export default function testimonialsCards() {
  //SELECTORS
  const cardsContainer = document.querySelector(".testimonials__cards");
  const bulletsContainer = document.querySelector(".testimonials__bullets");

  const cards = [
    {
      image: "./assets/images/house-5.jpg",
      title: "My House Sold Out Fast!",
      description: `I was finally able to sell my house quickly through Hounter by immediately setting me up with people who wanted my house. I also do not get a discount from the sale of my house. Awesome!`,
      user: {
        avatar: "./assets/images/user-4.jpg",
        name: "Dianne Russell",
        job: "Manchester, Kentucky",
      },
      rating: "4.3",
    },

    {
      image: "./assets/images/house-6.jpg",
      title: "Best! I got the house I wanted through Hounter",
      description: `Through this website I can get a house with the type and
    specifications I want very easily, without a complicated process
    to be able to find information on the house we want.`,
      user: {
        avatar: "./assets/images/user-5.jpg",
        name: "Jenny Wilson",
        job: "Manager Director",
      },
      rating: "4.6",
    },

    {
      image: "./assets/images/house-7.jpg",
      title: "Through the Hounter, I Can Get a House For My Self",
      description: `
      By looking for information about what kind of house we want, we managed to get the house we wanted very quickly, and directly connected with the seller to be able to ask about the details, very helpful!`,
      user: {
        avatar: "./assets/images/user-6.jpg",
        name: "Ronald Richards",
        job: "Head of Marketing",
      },
      rating: "4.8",
    },
    {
      image: "./assets/images/house-5.jpg",
      title: "My House Sold Out Fast!",
      description: `I was finally able to sell my house quickly through Hounter by immediately setting me up with people who wanted my house. I also do not get a discount from the sale of my house. Awesome!`,
      user: {
        avatar: "./assets/images/user-4.jpg",
        name: "Dianne Russell",
        job: "Manchester, Kentucky",
      },
      rating: "4.3",
    },

    {
      image: "./assets/images/house-6.jpg",
      title: "Best! I got the house I wanted through Hounter",
      description: `Through this website I can get a house with the type and
    specifications I want very easily, without a complicated process
    to be able to find information on the house we want.`,
      user: {
        avatar: "./assets/images/user-5.jpg",
        name: "Jenny Wilson",
        job: "Manager Director",
      },
      rating: "4.6",
    },

    {
      image: "./assets/images/house-7.jpg",
      title: "Through the Hounter, I Can Get a House For My Self",
      description: `
      By looking for information about what kind of house we want, we managed to get the house we wanted very quickly, and directly connected with the seller to be able to ask about the details, very helpful!`,
      user: {
        avatar: "./assets/images/user-6.jpg",
        name: "Ronald Richards",
        job: "Head of Marketing",
      },
      rating: "4.8",
    },
  ];

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
        <img src="${card.image}" alt="house ${idx}" />
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
              <img src="${card.user.avatar}" alt="user ${idx}" />
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
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }

  function changeBullet(idx) {
    bulletsEl.forEach((bullet, i) => {
      bullet.classList.remove("active-bullet");
      if (idx === i) bullet.classList.add("active-bullet");
    });
  }

  generateCardMarkup(cards);
  allignCards();
  generateBulletsMarkup(cards);

  const cardsEl = document.querySelectorAll(".testimonials-card");
  const bulletsEl = document.querySelectorAll(".testimonials__bullets__bullet");

  //TO DO: Bug,, third card glitch when tour-blur is in markup, idk why!!!

  //EVENTS
  cardsEl.forEach((card, idx) => {
    card.addEventListener("click", (e) => {
      const currCard = e.target.closest(".testimonials-card");
      scrollToCard(currCard);
      changeBullet(idx);
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
